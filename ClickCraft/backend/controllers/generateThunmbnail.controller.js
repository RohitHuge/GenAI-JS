import { finalPromptGeneratorText, finalPromptGeneratorImage } from "./llm.controllers.js/finalPromptGenerator.js";
import { photoGeneratorText } from "./llm.controllers.js/photoGenerator.js";


export const generateThumbnails = async (req, res) => {

    const data = req.body;
    const structuredPrompt = data.updatedStructuredPrompt;
    
    const imageDescription = data.imagedata.imageDescription;
    const onlyHuman = data.imagedata.onlyHumanPhotoAdd;

    const imagedatamini = {
        imageDescription: imageDescription,
        onlyHuman: onlyHuman
    }
    const imageBase64 = data.imagedata.imageFilebase64;

    let finalPrompt;
    if (structuredPrompt.mode === "without_photo") {
        const response = await finalPromptGeneratorText(structuredPrompt);
        finalPrompt = response.finalPrompt;
       }
    else if (structuredPrompt.mode === "with_photo") {
        response = await finalPromptGeneratorImage(structuredPrompt, imageBase64,imagedatamini);
    }
    console.log(finalPrompt);

    const imageBuffer = await photoGeneratorText(finalPrompt);
    // console.log(JSON.stringify(imageBuffer));
    // console.log(imageBuffer.toString('base64'));

    const base64Image = imageBuffer.toString('base64');



    

    res.json({ message: 'Thumbnails generated successfully', base64Image }).status(200);
}
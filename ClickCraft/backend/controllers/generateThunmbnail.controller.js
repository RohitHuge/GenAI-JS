import { finalPromptGeneratorText, finalPromptGeneratorImage } from "./llm.controllers.js/finalPromptGenerator.js";
import { photoGeneratorText, photoGeneratorImage } from "./llm.controllers.js/photoGenerator.js";


export const generateThumbnails = async (req, res) => {

    const data = req.body;
    const structuredPrompt = data.updatedStructuredPrompt;
    
    const imageDescription = data.imagedata.imageDescription;
    const onlyHuman = data.imagedata.onlyHumanPhotoAdd;

    const imagedatamini = {
        imageDescription: imageDescription,
        onlyHuman: onlyHuman
    }
    const imageUrl = data.imagedata.imageUrl;

    let finalPrompt;
    if (structuredPrompt.mode === "without_photo") {
        const response = await finalPromptGeneratorText(structuredPrompt);
        finalPrompt = response.finalPrompt;
       }
    else if (structuredPrompt.mode === "with_photo") {
        finalPrompt = await finalPromptGeneratorImage(structuredPrompt, imageUrl,imagedatamini);
        finalPrompt = finalPrompt.finalPrompt;
    }

    if(!finalPrompt){
        return res.status(400).json({ message: "Final prompt not generated" });
    }

    console.log(finalPrompt);


    let imageBuffer;
    if (structuredPrompt.mode === "without_photo") {
        imageBuffer = await photoGeneratorText(finalPrompt);
    }else if (structuredPrompt.mode === "with_photo") {
        imageBuffer = await photoGeneratorImage(finalPrompt, imageUrl);
    }
    
    // console.log(JSON.stringify(imageBuffer));
    // console.log(imageBuffer.toString('base64'));




    const base64Image = imageBuffer.toString('base64');
    res.json({ message: 'Thumbnails generated successfully', base64Image }).status(200);
}
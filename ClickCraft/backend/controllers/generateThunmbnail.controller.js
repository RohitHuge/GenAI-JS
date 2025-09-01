import { finalPromptGeneratorText, finalPromptGeneratorImage } from "./llm.controllers.js/finalPromptGenerator.js";


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
        finalPrompt = await finalPromptGeneratorText(structuredPrompt);
       }
    else if (structuredPrompt.mode === "with_photo") {
        finalPrompt = await finalPromptGeneratorImage(structuredPrompt, imageBase64,imagedatamini);
    }
    

    res.json({ message: 'Thumbnails generated successfully' }).status(200);
}
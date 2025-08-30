import fs from "fs";

export const initialPrompt = async (req, res) => {

    const promptStructure ={
  "initialPrompt": "",
  "imageFilebase64": "",
  "mode": "",
  "analysis": {
    "segment": "",
    "missingBullets": []
  },
  "questions": [
    {
      "id": "",
      "q": "",
      "options": [],
      "answer": null
    }
  ]
};
    // For FormData, the data comes in req.body
    const prompt = req.body.prompt;
    const mode = req.body.mode;
    const imageFile = req.files; // Files come in req.files when using multer
    
    if(!prompt || !mode){
        return res.status(400).json({ message: "Prompt and mode are required" });
        console.log('Validation failed: missing prompt or mode');
    }

    if(!imageFile && mode === "with_photo"){
        return res.status(400).json({ message: "Image file is required || error sending to backend" });
        console.log('Validation failed: missing image file for with_photo mode');
    }
    promptStructure.initialPrompt = prompt;
    promptStructure.mode = mode;

    if(!!imageFile){
        // Since we're using memoryStorage, the file data is in imageFile.buffer
        promptStructure.imageFilebase64 = imageFile[0].buffer.toString("base64");
        console.log('Image file received');
    }
    console.log(promptStructure);

    
    res.json({ 
        message: "Initial prompt received"
    }).status(200); 
}
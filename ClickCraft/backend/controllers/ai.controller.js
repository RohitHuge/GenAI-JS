import fs from "fs";

export const initialPrompt = async (req, res) => {
    // console.log('=== Backend Request Received ===');
    // console.log('Request body:', req.body);
    // console.log('Request files:', req.files);
    // console.log('Request headers:', req.headers);

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
    
    console.log('Extracted data:', { prompt, mode, hasImageFile: !!imageFile, imageFileCount: imageFile?.length || 0 });
    
    if(!prompt || !mode){
        console.log('Validation failed: missing prompt or mode');
        return res.status(400).json({ message: "Prompt and mode are required" });
    }

    if(!imageFile && mode === "with_photo"){
        console.log('Validation failed: missing image file for with_photo mode');
        return res.status(400).json({ message: "Image file is required || error sending to backend" });
    }
    promptStructure.initialPrompt = prompt;
    promptStructure.mode = mode;

    if(imageFile){
        // Since we're using memoryStorage, the file data is in imageFile.buffer
        promptStructure.imageFilebase64 = imageFile[0].buffer.toString("base64");
    }


    
    console.log(promptStructure);
    
    res.json({ 
        message: "Initial prompt received",
        // receivedData: { prompt, mode, hasImageFile: !!imageFile }
    }).status(200); 
    // }
}
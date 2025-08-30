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
    const imageFile = req.files?.imageFile; // Files come in req.files when using multer
    if(!prompt || !mode){
        return res.status(400).json({ message: "Prompt and mode are required" });
    }

    if(!imageFile && mode === "with_photo"){
        return res.status(400).json({ message: "Image file is required || error sending to backend" });
    }
    promptStructure.initialPrompt = prompt;
    promptStructure.mode = mode;

    if(imageFile){
        const imageBuffer = fs.readFileSync(imageFile.path);
        promptStructure.imageFilebase64 = imageBuffer.toString("base64");
    }


    
    console.log(promptStructure);
    
    res.json({ 
        message: "Initial prompt received",
        // receivedData: { prompt, mode, hasImageFile: !!imageFile }
    }).status(200); 
    // }
}
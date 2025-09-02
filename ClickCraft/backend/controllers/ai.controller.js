// import fs from "fs";
import { segmentDetectionText, segmentDetectionImage } from "./llm.controllers.js/segmentDetection.js";
import { techBulletPointAnalysis, gamingBulletPointAnalysis, foodBulletPointAnalysis, travelBulletPointAnalysis, educationBulletPointAnalysis, entertainmentBulletPointAnalysis } from "./llm.controllers.js/bulltetPointAnalysis.js";
import { questionGenerator } from "./llm.controllers.js/questionGenerator.js";
import { uploadOnCloudinary } from "./cloudinary.js";


export const initialPrompt = async (req, res) => {
  console.log("Initial prompt received");

    const promptStructure ={
  "initialPrompt": "",
  "isImageUrl": false,
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

    const imagedata = {
        "imageUrl": "",
        "imageDescription": "",
        "onlyHumanPhotoAdd": false
    }

    const imageDataMini = {
      "imageDescription": "",
      "onlyHumanPhotoAdd": false
    }
    // For FormData, the data comes in req.body
    const prompt = req.body.prompt;
    const mode = req.body.mode;
    const imageFile = req.files; // Files come in req.files when using multer
    
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

    if(mode === "with_photo"){
        // Since we're using memoryStorage, the file data is in imageFile.buffer
        // imagedata.imageFilebase64 = imageFile[0].buffer.toString("base64");
        // promptStructure.isImageBase64 = true;
        const imageUrl = await uploadOnCloudinary(imageFile[0].buffer);
        imagedata.imageUrl = imageUrl.url;
        promptStructure.isImageUrl = true;
        console.log('Image file received'+imagedata.imageUrl);
    }


    // console.log(promptStructure);
    // if(imagedata.imageFilebase64){
    //     console.log(imagedata);
    // }
    let segmentResult;
    if(promptStructure.mode === "with_photo"){
      segmentResult = await segmentDetectionImage(promptStructure, imagedata.imageUrl);
    }else{
      segmentResult = await segmentDetectionText(promptStructure);
    }
    // console.log(segment);
    promptStructure.analysis.segment = segmentResult.segment;
    if (mode === "with_photo") {
      imagedata.imageDescription = segmentResult.imageDescription;
      imagedata.onlyHumanPhotoAdd = segmentResult.onlyHumanPhotoAdd;
      imageDataMini.imageDescription = segmentResult.imageDescription;
      imageDataMini.onlyHumanPhotoAdd = segmentResult.onlyHumanPhotoAdd;
    }else{
      imageDataMini.imageDescription = "no image description";
      imageDataMini.onlyHumanPhotoAdd = false;
    }

    
    let bulletPointAnalysisResult;

    if(promptStructure.analysis.segment === "Tech"){
      bulletPointAnalysisResult = await techBulletPointAnalysis(promptStructure, imageDataMini);
    }else if(promptStructure.analysis.segment === "Gaming"){
      bulletPointAnalysisResult = await gamingBulletPointAnalysis(promptStructure, imageDataMini);
    }else if(promptStructure.analysis.segment === "Food"){
      bulletPointAnalysisResult = await foodBulletPointAnalysis(promptStructure, imageDataMini);
    }else if(promptStructure.analysis.segment === "Travel / Vlogs"){
      bulletPointAnalysisResult = await travelBulletPointAnalysis(promptStructure, imageDataMini);
    }else if(promptStructure.analysis.segment === "Education / Tutorials"){
      bulletPointAnalysisResult = await educationBulletPointAnalysis(promptStructure, imageDataMini);
    }else if(promptStructure.analysis.segment === "Entertainment / Lifestyle"){
      bulletPointAnalysisResult = await entertainmentBulletPointAnalysis(promptStructure, imageDataMini);
    }

    promptStructure.analysis.missingBullets = bulletPointAnalysisResult.missingBulletPoints;
    const questions = await questionGenerator(promptStructure, imageDataMini);
    // console.log(questions);

    promptStructure.questions = questions.questions;
    // console.log(promptStructure);
    // console.log(imageDataMini);

    const finalResponse = {
      promptStructure,
      imagedata
    }


    // promptStructure.analysis.missingBullets = bulletPointAnalysisResult.missingBullets;

    
    res.json({ 
        finalResponse
    }).status(200); 
}
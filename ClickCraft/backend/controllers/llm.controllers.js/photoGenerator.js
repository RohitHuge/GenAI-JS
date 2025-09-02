import { gemini } from "../../index.js";
import { getBase64FromCloudinaryForImage } from "../health.js";

export const photoGeneratorText = async (prompt) => {

    try {
        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash-image-preview",
            contents: prompt
        });
        
        const imagePart = response.candidates[0].content.parts.find(
            (part) => part.inlineData
          );
        
        if (!imagePart) {
            return {error: "No image generated"};
          }
        
          const imageData = imagePart.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          return buffer;
    } catch (error) {
        return {error: error.message};
    }
    //   console.log(buffer);
    
    
}

export const photoGeneratorImage = async (prompt, imageUrl) => {

    try {
        const imageBase64 = await getBase64FromCloudinaryForImage(imageUrl);
        // console.log(imageBase64);
        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash-image-preview",
            contents: [
                { text: prompt },
                {
                    inlineData: {
                        mimeType: "image/png",
                        data: imageBase64,
                    },
                },
            ]
        });


        const imagePart = response.candidates[0].content.parts.find(
            (part) => part.inlineData
          );
        
        if (!imagePart) {
            return {error: "No image generated"};
          }
        
          const imageData = imagePart.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
        //   console.log(buffer);
          return buffer;

    } catch (error) {
        return {error: error.message};
    }
}
    
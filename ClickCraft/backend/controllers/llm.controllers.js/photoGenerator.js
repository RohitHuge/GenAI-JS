import { gemini } from "../../index.js";

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
            return "No image generated";
          }
        
          const imageData = imagePart.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          return buffer;
    } catch (error) {
        return {error: error.message};
    }
    //   console.log(buffer);
    
    
}

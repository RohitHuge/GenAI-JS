import { openai } from "../../index.js";
import z from "zod";
import { zodTextFormat } from "openai/helpers/zod";

const bulletPointAnalysisSchema = z.object({
    missingBulletPoints: z.array(z.string()),
});

export const techBulletPointAnalysis = async (promptStructure, imageDataMini) => {

    const text = JSON.stringify(promptStructure) + "\n" + JSON.stringify(imageDataMini);
    // console.log(text);

    const response = await openai.responses.create({
        model: "gpt-4.1-2025-04-14",
        input: [
            {
                role: "system",
                content: `You are an AI assistant that is part of a Thumbnail Making Orchestration System.
                Your specific role in this pipeline is to analyze structured data about a YouTube video thumbnail request and determine which important bullet points are missing from the provided information.
                
                Input Format
                
                You will always receive data in the following structured JSON format (example below):
                
                {
                  "initialPrompt": "make a thumbnail for the youtube video showing the mountains of maharashtra",
                  "isImageBase64": true,
                  "mode": "with_photo",
                  "analysis": {
                    "segment": "Travel / Vlogs",
                    "missingBullets": []
                  },
                  "questions": [
                    { "id": "", "q": "", "options": [], "answer": null }
                  ]
                }
                
                
                If an image is also provided, you will get an additional JSON object with its description:
                
                {
                  "imageDescription": "A young man standing in front of a rustic fence with golden grass around him. Behind him, there are lush green mountains under a partly cloudy sky, showcasing a scenic mountain landscape.",
                  "onlyHumanPhotoAdd": false
                }
                
                
                📌 Note: The image description object may or may not be present, depending on the user’s input.
                
                Your Task
                
                Understand the context:
                
                The initialPrompt describes what the user wants in the thumbnail.
                
                If available, the imageDescription gives you additional visual context.
                
                The segment specifies the category of video content (e.g., Tech, Gaming, Food, Travel, etc.).
                
                Focus on Tech segment:
                When the segment is "Tech", your job is to check whether the following bullet points are covered in the provided input (initialPrompt + imageDescription):
                
                Tech topic (e.g., AI, smartphones, software, hardware, etc.)
                
                Company/Brand (e.g., Apple, Samsung, Google, etc.)
                
                Product/Feature (e.g., iPhone 16 Pro, M3 chip, new VR headset, etc.)
                
                Tone (e.g., comparison, review, tutorial, unboxing, announcement, etc.)
                
                Logos/Icons (e.g., Apple logo, YouTube logo, Windows icon, etc.)
                
                Design style (e.g., minimal, bold, modern, professional, playful, etc.)
                
                How to check:
                
                Look for explicit mentions in the initialPrompt.
                
                Look for implicit visual cues in the imageDescription (if present).
                
                If the input does not provide clear evidence for a bullet point, mark it as missing.
                
                Other segments:
                
                If the segment is not "Tech", return an empty list for missing bullet points.
                
                You do not need to validate bullet points for other segments in this step.
                
                Output Format
                
                Always return your result in structured JSON format, like this:
                
                {
                  "missingBulletPoints": [
                    "Company/Brand",
                    "Logos/Icons",
                    "Design style",
                  ]
                }
                
                
                If all bullet points are present, return an empty array.
                
                If the segment is not Tech, return:
                
                { "missingBulletPoints": [] }
                
                Example Walkthrough
                Input:
                {
                  "initialPrompt": "make a thumbnail for a video about the latest iPhone review",
                  "analysis": { "segment": "Tech", "missingBullets": [] }
                }
                
                Output:
                {
                  "missingBulletPoints": [
                    "Logos/Icons",
                    "Design style"
                  ]
                }

                if no bullet points are missing, then check for the is there anything about the style of the thumbnail in the initialPrompt or imageDescription.
                If there is, then add the style to the missing bullet points.
                If there is no information about the style, then do not add the style to the missing bullet points.
                
                
                This ensures that the thumbnail orchestration pipeline knows exactly which details still need clarification before final thumbnail generation.
                `
            },
            {
                role: "user",
                content: text
            }

        ]
        ,
        text: {
            format: zodTextFormat(bulletPointAnalysisSchema, "missingBulletPoints"),
        }
    })
    // console.log(response);
    const resText = response.output_text;
    const resJson = JSON.parse(resText);
    // console.log(resJson);
    return resJson;
}

export const gamingBulletPointAnalysis = async (promptStructure, imageDataMini) => {

    const text = JSON.stringify(promptStructure) + "\n" + JSON.stringify(imageDataMini);
    // console.log(text);

    const response = await openai.responses.create({
        model: "gpt-4.1-2025-04-14",
        input: [
            {
                role: "system",
                content: `You are an AI assistant that is part of a Thumbnail Making Orchestration System.
                Your specific role in this pipeline is to analyze structured data about a YouTube video thumbnail request and determine which important bullet points are missing from the provided information.
                
                Input Format
                
                You will always receive data in the following structured JSON format (example below):
                
                {
                  "initialPrompt": "make a thumbnail for the youtube video showing the mountains of maharashtra",
                  "isImageBase64": true,
                  "mode": "with_photo",
                  "analysis": {
                    "segment": "Travel / Vlogs",
                    "missingBullets": []
                  },
                  "questions": [
                    { "id": "", "q": "", "options": [], "answer": null }
                  ]
                }
                
                
                If an image is also provided, you will get an additional JSON object with its description:
                
                {
                  "imageDescription": "A young man standing in front of a rustic fence with golden grass around him. Behind him, there are lush green mountains under a partly cloudy sky, showcasing a scenic mountain landscape.",
                  "onlyHumanPhotoAdd": false
                }
                
                
                📌 Note: The image description object may or may not be present, depending on the user’s input.
                
                Your Task
                
                Understand the context:
                
                The initialPrompt describes what the user wants in the thumbnail.
                
                If available, the imageDescription gives you additional visual context.
                
                The segment specifies the category of video content (e.g., Tech, Gaming, Food, Travel, etc.).
                
                Focus on Gaming segment:
                When the segment is "Gaming", your job is to check whether the following bullet points are covered in the provided input (initialPrompt + imageDescription):
                
                Game title (e.g., GTA VI, Minecraft, Fortnite, etc.)

                Character/Item (e.g., Mario, Master Chief, rare weapon, etc.)

                Content type (e.g., gameplay, walkthrough, review, funny moments, etc.)

                Level/Map (e.g., Dust II in CS:GO, Elden Ring boss arena, etc.)

                Game branding (e.g., Xbox, PlayStation, Steam logos, etc.)

                Tone (e.g., competitive, casual, funny, tutorial, cinematic, etc.)
                
                How to check:
                
                Look for explicit mentions in the initialPrompt.
                
                Look for implicit visual cues in the imageDescription (if present).
                
                If the input does not provide clear evidence for a bullet point, mark it as missing.
                
                Other segments:
                
                If the segment is not "Gaming", return an empty list for missing bullet points.
                
                You do not need to validate bullet points for other segments in this step.
                
                Output Format
                
                Always return your result in structured JSON format, like this:
                
                {
                  "missingBulletPoints": [
                    "Game title",
                    "Logos/Icons",
                    "Tone",
                  ]
                }
                
                
                If all bullet points are present, return an empty array.
                
                If the segment is not Gaming, return:
                
                { "missingBulletPoints": [] }
                
                Example Input:

                {
                "initialPrompt": "make a thumbnail for a gameplay video of GTA VI heist mission",
                "analysis": { "segment": "Gaming", "missingBullets": [] }
                }


                Example Output:

                {
                "missingBulletPoints": [
                    "Character/Item",
                    "Game branding",
                    "Tone"
                ]
                }

                if no bullet points are missing, then check for the is there anything about the style of the thumbnail in the initialPrompt or imageDescription.
                If there is, then add the style to the missing bullet points.
                If there is no information about the style, then do not add the style to the missing bullet points.
                
                
                This ensures that the thumbnail orchestration pipeline knows exactly which details still need clarification before final thumbnail generation.
                `
            },
            {
                role: "user",
                content: text
            }

        ]
        ,
        text: {
            format: zodTextFormat(bulletPointAnalysisSchema, "missingBulletPoints"),
        }
    })
    // console.log(response);
    const resText = response.output_text;
    const resJson = JSON.parse(resText);
    // console.log(resJson);
    return resJson;
}

export const foodBulletPointAnalysis = async (promptStructure, imageDataMini) => {

    const text = JSON.stringify(promptStructure) + "\n" + JSON.stringify(imageDataMini);
    // console.log(text);

    const response = await openai.responses.create({
        model: "gpt-4.1-2025-04-14",
        input: [
            {
                role: "system",
                content: `You are an AI assistant that is part of a Thumbnail Making Orchestration System.
                Your specific role in this pipeline is to analyze structured data about a YouTube video thumbnail request and determine which important bullet points are missing from the provided information.
                
                Input Format
                
                You will always receive data in the following structured JSON format (example below):
                
                {
                  "initialPrompt": "make a thumbnail for the youtube video showing the mountains of maharashtra",
                  "isImageBase64": true,
                  "mode": "with_photo",
                  "analysis": {
                    "segment": "Food",
                    "missingBullets": []
                  },
                  "questions": [
                    { "id": "", "q": "", "options": [], "answer": null }
                  ]
                }
                
                
                If an image is also provided, you will get an additional JSON object with its description:
                
                {
                  "imageDescription": "A young man standing in front of a rustic fence with golden grass around him. Behind him, there are lush green mountains under a partly cloudy sky, showcasing a scenic mountain landscape.",
                  "onlyHumanPhotoAdd": false
                }
                
                
                📌 Note: The image description object may or may not be present, depending on the user’s input.
                
                Your Task
                
                Understand the context:
                
                The initialPrompt describes what the user wants in the thumbnail.
                
                If available, the imageDescription gives you additional visual context.
                
                The segment specifies the category of video content (e.g., Tech, Gaming, Food, Travel, etc.).
                
                Focus on Food segment:
                When the segment is "Food", your job is to check whether the following bullet points are covered in the provided input (initialPrompt + imageDescription):
                
                Cuisine type (e.g., Italian, Indian, Mexican)

                Dish/Meal (e.g., Pizza, Sushi, Biryani)

                Location/Place (e.g., street food, fine dining, home kitchen)

                People vs Dish (e.g., person eating vs only showing dish)

                Food brand/spot (e.g., McDonald’s, Starbucks, Domino’s)

                Vibe (e.g., cozy, festive, aesthetic, casual)
                
                How to check:
                
                Look for explicit mentions in the initialPrompt.
                
                Look for implicit visual cues in the imageDescription (if present).
                
                If the input does not provide clear evidence for a bullet point, mark it as missing.
                
                Other segments:
                
                If the segment is not "Food", return an empty list for missing bullet points.
                
                You do not need to validate bullet points for other segments in this step.
                
                Output Format
                
                Always return your result in structured JSON format, like this:
                
                {
                  "missingBulletPoints": [
                    "Cuisine ",
                    "Location/Place",
                  ]
                }
                
                
                If all bullet points are present, return an empty array.
                
                If the segment is not Food, return:
                
                { "missingBulletPoints": [] }
                
                Example Input:

{
  "initialPrompt": "make a thumbnail for a video reviewing Domino’s pizza",
  "analysis": { "segment": "Food", "missingBullets": [] }
}


Example Output:

{
  "missingBulletPoints": [
    "Cuisine type",
    "Location/Place",
    "People vs Dish",
    "Vibe",
  ]
}

                if no bullet points are missing, then check for the is there anything about the style of the thumbnail in the initialPrompt or imageDescription.
                If there is, then add the style to the missing bullet points.
                If there is no information about the style, then do not add the style to the missing bullet points.
                
                
                This ensures that the thumbnail orchestration pipeline knows exactly which details still need clarification before final thumbnail generation.
                `
            },
            {
                role: "user",
                content: text
            }

        ]
        ,
        text: {
            format: zodTextFormat(bulletPointAnalysisSchema, "missingBulletPoints"),
        }
    })
    // console.log(response);
    const resText = response.output_text;
    const resJson = JSON.parse(resText);
    // console.log(resJson);
    return resJson;
}

export const travelBulletPointAnalysis = async (promptStructure, imageDataMini) => {

    const text = JSON.stringify(promptStructure) + "\n" + JSON.stringify(imageDataMini);
    // console.log(text);

    const response = await openai.responses.create({
        model: "gpt-4.1-2025-04-14",
        input: [
            {
                role: "system",
                content: `You are an AI assistant that is part of a Thumbnail Making Orchestration System.
                Your specific role in this pipeline is to analyze structured data about a YouTube video thumbnail request and determine which important bullet points are missing from the provided information.
                
                Input Format
                
                You will always receive data in the following structured JSON format (example below):
                
                {
                  "initialPrompt": "make a thumbnail for the youtube video showing the mountains of maharashtra",
                  "isImageBase64": true,
                  "mode": "with_photo",
                  "analysis": {
                    "segment": "Travel / Vlogs",
                    "missingBullets": []
                  },
                  "questions": [
                    { "id": "", "q": "", "options": [], "answer": null }
                  ]
                }
                
                
                If an image is also provided, you will get an additional JSON object with its description:
                
                {
                  "imageDescription": "A young man standing in front of a rustic fence with golden grass around him. Behind him, there are lush green mountains under a partly cloudy sky, showcasing a scenic mountain landscape.",
                  "onlyHumanPhotoAdd": false
                }
                
                
                📌 Note: The image description object may or may not be present, depending on the user’s input.
                
                Your Task
                
                Understand the context:
                
                The initialPrompt describes what the user wants in the thumbnail.
                
                If available, the imageDescription gives you additional visual context.
                
                The segment specifies the category of video content (e.g., Tech, Gaming, Food, Travel, etc.).
                
                Focus on Travel / Vlogs segment:
                When the segment is "Travel / Vlogs", your job is to check whether the following bullet points are covered in the provided input (initialPrompt + imageDescription):
                
                Location (e.g., Paris, Himalayas, New York City)

Landmarks (e.g., Eiffel Tower, Taj Mahal, Golden Gate Bridge)

Activity (e.g., hiking, sightseeing, food tasting)

Event/Incident (e.g., festival, road trip accident, wedding vlog)

Mood (e.g., adventurous, relaxing, family-friendly, luxury)

Cultural elements (e.g., traditional dress, local markets, customs)
                
                How to check:
                
                Look for explicit mentions in the initialPrompt.
                
                Look for implicit visual cues in the imageDescription (if present).
                
                If the input does not provide clear evidence for a bullet point, mark it as missing.
                
                Other segments:
                
                If the segment is not "Travel / Vlogs", return an empty list for missing bullet points.
                
                You do not need to validate bullet points for other segments in this step.
                
                Output Format
                
                Always return your result in structured JSON format, like this:
                
                {
                  "missingBulletPoints": [
                    "Location ",
                    "Location/Place",
                  ]
                }
                
                
                If all bullet points are present, return an empty array.
                
                If the segment is not Travel / Vlogs, return:
                
                { "missingBulletPoints": [] }
                
                Example Input:

{
  "initialPrompt": "make a thumbnail of me hiking in the mountains",
  "analysis": { "segment": "Travel / Vlogs", "missingBullets": [] }
}


Example Output:

{
  "missingBulletPoints": [
    "Location",
    "Landmarks",
    "Event/Incident",
    "Mood",
    "Cultural elements",
    "Design style"
  ]
}

                if no bullet points are missing, then check for the is there anything about the style of the thumbnail in the initialPrompt or imageDescription.
                If there is, then add the style to the missing bullet points.
                If there is no information about the style, then do not add the style to the missing bullet points.
                
                
                This ensures that the thumbnail orchestration pipeline knows exactly which details still need clarification before final thumbnail generation.
                `
            },
            {
                role: "user",
                content: text
            }

        ]
        ,
        text: {
            format: zodTextFormat(bulletPointAnalysisSchema, "missingBulletPoints"),
        }
    })
    // console.log(response);
    const resText = response.output_text;
    const resJson = JSON.parse(resText);
    // console.log(resJson);
    return resJson;
}

export const educationBulletPointAnalysis = async (promptStructure, imageDataMini) => {

    const text = JSON.stringify(promptStructure) + "\n" + JSON.stringify(imageDataMini);
    // console.log(text);

    const response = await openai.responses.create({
        model: "gpt-4.1-2025-04-14",
        input: [
            {
                role: "system",
                content: `You are an AI assistant that is part of a Thumbnail Making Orchestration System.
                Your specific role in this pipeline is to analyze structured data about a YouTube video thumbnail request and determine which important bullet points are missing from the provided information.
                
                Input Format
                
                You will always receive data in the following structured JSON format (example below):
                
                {
                  "initialPrompt": "make a thumbnail for the youtube video showing the mountains of maharashtra",
                  "isImageBase64": true,
                  "mode": "with_photo",
                  "analysis": {
                    "segment": "Education / Tutorials",
                    "missingBullets": []
                  },
                  "questions": [
                    { "id": "", "q": "", "options": [], "answer": null }
                  ]
                }
                
                
                If an image is also provided, you will get an additional JSON object with its description:
                
                {
                  "imageDescription": "A young man standing in front of a rustic fence with golden grass around him. Behind him, there are lush green mountains under a partly cloudy sky, showcasing a scenic mountain landscape.",
                  "onlyHumanPhotoAdd": false
                }
                
                
                📌 Note: The image description object may or may not be present, depending on the user’s input.
                
                Your Task
                
                Understand the context:
                
                The initialPrompt describes what the user wants in the thumbnail.
                
                If available, the imageDescription gives you additional visual context.
                
                The segment specifies the category of video content (e.g., Tech, Gaming, Food, Travel, etc.).
                
                Focus on Education / Tutorials segment:
                When the segment is "Education / Tutorials", your job is to check whether the following bullet points are covered in the provided input (initialPrompt + imageDescription):
                
                Subject (e.g., Mathematics, Physics, History)

Concept/Chapter (e.g., Pythagoras theorem, Photosynthesis, World War II)

Format (e.g., step-by-step, quick tips, tutorial, lecture style)

Diagrams/Icons (e.g., graphs, charts, book icon, calculator icon)

Style (e.g., clean, colorful, infographic, blackboard theme)

Text emphasis (e.g., “Easy Tricks”, “Top 5”, “Exam Tips” as standout words)
                
                How to check:
                
                Look for explicit mentions in the initialPrompt.
                
                Look for implicit visual cues in the imageDescription (if present).
                
                If the input does not provide clear evidence for a bullet point, mark it as missing.
                
                Other segments:
                
                If the segment is not "Education / Tutorials", return an empty list for missing bullet points.
                
                You do not need to validate bullet points for other segments in this step.
                
                Output Format
                
                Always return your result in structured JSON format, like this:
                
                    {
                    "missingBulletPoints": [
                        "Subject ",
                        "Location/Place",
                    ]
                    }
                
                
                If all bullet points are present, return an empty array.
                
                If the segment is not Education / Tutorials, return:
                
                { "missingBulletPoints": [] }
                
                Example Input:  



{
  "initialPrompt": "make a thumbnail for photosynthesis explained simply",
  "analysis": { "segment": "Education / Tutorials", "missingBullets": [] }
}


Example Output:

{
  "missingBulletPoints": [
    "Format",
    "Diagrams/Icons",
    "Style",
    "Text emphasis"
  ]
}

                if no bullet points are missing, then check for the is there anything about the style of the thumbnail in the initialPrompt or imageDescription.
                If there is, then add the style to the missing bullet points.
                If there is no information about the style, then do not add the style to the missing bullet points.
                
                
                This ensures that the thumbnail orchestration pipeline knows exactly which details still need clarification before final thumbnail generation.
                `
            },
            {
                role: "user",
                content: text
            }

        ]
        ,
        text: {
            format: zodTextFormat(bulletPointAnalysisSchema, "missingBulletPoints"),
        }
    })
    // console.log(response);
    const resText = response.output_text;
    const resJson = JSON.parse(resText);
    // console.log(resJson);
    return resJson;
}

export const entertainmentBulletPointAnalysis = async (promptStructure, imageDataMini) => {

    const text = JSON.stringify(promptStructure) + "\n" + JSON.stringify(imageDataMini);
    // console.log(text);

    const response = await openai.responses.create({
        model: "gpt-4.1-2025-04-14",
        input: [
            {
                role: "system",
                content: `You are an AI assistant that is part of a Thumbnail Making Orchestration System.
                Your specific role in this pipeline is to analyze structured data about a YouTube video thumbnail request and determine which important bullet points are missing from the provided information.
                
                Input Format
                
                You will always receive data in the following structured JSON format (example below):
                
                {
                  "initialPrompt": "make a thumbnail for the youtube video showing the mountains of maharashtra",
                  "isImageBase64": true,
                  "mode": "with_photo",
                  "analysis": {
                    "segment": "Education / Tutorials",
                    "missingBullets": []
                  },
                  "questions": [
                    { "id": "", "q": "", "options": [], "answer": null }
                  ]
                }
                
                
                If an image is also provided, you will get an additional JSON object with its description:
                
                {
                  "imageDescription": "A young man standing in front of a rustic fence with golden grass around him. Behind him, there are lush green mountains under a partly cloudy sky, showcasing a scenic mountain landscape.",
                  "onlyHumanPhotoAdd": false
                }
                
                
                📌 Note: The image description object may or may not be present, depending on the user’s input.
                
                Your Task
                
                Understand the context:
                
                The initialPrompt describes what the user wants in the thumbnail.
                
                If available, the imageDescription gives you additional visual context.
                
                The segment specifies the category of video content (e.g., Tech, Gaming, Food, Travel, etc.).
                
                Focus on Entertainment / Lifestyle segment:
                When the segment is "Entertainment / Lifestyle", your job is to check whether the following bullet points are covered in the provided input (initialPrompt + imageDescription):
                
                Category (e.g., Fashion, Fitness, Daily Life, Entertainment show)

Celebrity/Influencer/Self (e.g., featuring a known personality, the creator themself)

Mood (e.g., happy, dramatic, inspiring, casual)

Props (e.g., sunglasses, gym equipment, coffee mug, microphone)

Background (e.g., stage, street, living room, beach)

Text overlay (e.g., catchy words, quotes, episode title, trending phrase)
                
                How to check:
                
                Look for explicit mentions in the initialPrompt.
                
                Look for implicit visual cues in the imageDescription (if present).
                
                If the input does not provide clear evidence for a bullet point, mark it as missing.
                
                Other segments:
                
                If the segment is not "Entertainment / Lifestyle", return an empty list for missing bullet points.
                
                You do not need to validate bullet points for other segments in this step.
                
                Output Format
                
                Always return your result in structured JSON format, like this:
                
                    {
                    "missingBulletPoints": [
                        "Activity ",
                        "Location/Place",
                    ]
                    }
                
                
                If all bullet points are present, return an empty array.
                
                If the segment is not Entertainment / Lifestyle, return:
                
                { "missingBulletPoints": [] }
                
                Example Input:

{
  "initialPrompt": "make a thumbnail showing a fitness vlogger at the gym",
  "analysis": { "segment": "Entertainment / Lifestyle", "missingBullets": [] }
}


Example Output:

{
  "missingBulletPoints": [
    "Mood",
    "Text overlay",
    "Design style"
  ]
}

                if no bullet points are missing, then check for the is there anything about the style of the thumbnail in the initialPrompt or imageDescription.
                If there is, then add the style to the missing bullet points.
                If there is no information about the style, then do not add the style to the missing bullet points.
                
                
                This ensures that the thumbnail orchestration pipeline knows exactly which details still need clarification before final thumbnail generation.
                `
            },
            {
                role: "user",
                content: text
            }

        ]
        ,
        text: {
            format: zodTextFormat(bulletPointAnalysisSchema, "missingBulletPoints"),
        }
    })
    // console.log(response);
    const resText = response.output_text;
    const resJson = JSON.parse(resText);
    // console.log(resJson);
    return resJson;
}



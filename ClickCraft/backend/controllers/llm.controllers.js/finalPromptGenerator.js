import { openai } from "../../index.js";
import z from "zod";
import { zodTextFormat } from "openai/helpers/zod";

const FinalPromptSchema = z.object({
    finalPrompt: z.string(),
  });

export const finalPromptGeneratorText = async (structuredPrompt) => {

    const text = JSON.stringify(structuredPrompt);
    // console.log(text);
    const response = await openai.responses.create({
        model: "gpt-4.1",
        input: [
            {
                role : "system",
                content : `🟢 Final System Prompt for Thumbnail Generation

You are an AI assistant whose goal is to generate the final, highly descriptive, and detailed prompt for Google’s Nano Banana model so that it can create a YouTube thumbnail.

The inputs provided to you include:

Initial Prompt: The raw idea from the user about the thumbnail.

Analysis Results: Segmentation of the video type and a list of missing essential details.

Questions and Answers: Follow-up clarifications that fill in the missing pieces with user choices.

Your job is to combine all of this information into one final, polished, descriptive thumbnail prompt.

🔹 How you should process the inputs

Understand the Initial Prompt

Extract the subject (what the video is about).

Note any keywords or descriptive terms given by the user.

Incorporate Analysis

Identify the segment/category (e.g., Tech, Lifestyle, Entertainment).

Look at the missing bullet points (e.g., Company/Brand, Product/Feature, Tone, Logos/Icons, Design Style).

Use Answers to Questions

Each missing bullet was resolved by asking targeted questions.

Insert the chosen answers directly into the final prompt.

Follow Google’s Good Prompt Guide

Subject: Clearly describe the main subject(s) of the thumbnail.

Context & Background: Describe the setting (indoor, outdoor, abstract, cinematic, vlog-style, etc.).

Style: Specify the visual style (e.g., cinematic, minimal, colorful, vlog-style, 3D, painting).

Modifiers: Add extra descriptive keywords (lighting, color scheme, mood, perspective, props, etc.).

🔹 Output Requirements

Always generate a single, coherent, descriptive text prompt.

The prompt must cover:

Main subject(s) (with brand/product if relevant).

Highlighted feature(s).

Tone and mood.

Icons/logos (if included).

Background/environment.

Design style.

Ensure the result is suitable for a YouTube thumbnail: high contrast, attention-grabbing, and visually clear even at small sizes.

Avoid vague words like “good” or “nice.” Instead, use descriptive and specific words.

Keep the output in plain text (no JSON).

🔹 Example Input
{
  "initialPrompt":"Generate a thumbnail for video containing the explorinration of new tech laptops",
  "isImageBase64":false,
  "mode":"without_photo",
  "analysis":{
    "segment":"Tech",
    "missingBullets":["Company/Brand","Product/Feature","Tone","Logos/Icons","Design style"]
  },
  "questions":[
    {
      "id":"q1",
      "q":"Which laptop brands should be featured in the thumbnail?",
      "options":["Apple","Dell","HP","Lenovo","Mixed Brands"],
      "answer":"Dell"
    },
    {
      "id":"q2",
      "q":"What key feature of the laptops do you want to highlight in the thumbnail?",
      "options":["Performance","Battery Life","Display","Portability","All New Features"],
      "answer":"Battery Life"
    },
    {
      "id":"q3",
      "q":"What overall tone should the thumbnail have?",
      "options":["Exciting","Professional","Minimal","Futuristic"],
      "answer":"Professional"
    },
    {
      "id":"q4",
      "q":"Which logos or icons do you want to include in the thumbnail?",
      "options":["Laptop Icon","Brand Logos","No Icons"],
      "answer":"Brand Logos"
    },
    {
      "id":"q5",
      "q":"What design style do you want for the thumbnail?",
      "options":["Cinematic","Minimal","Colorful","Vlog-style"],
      "answer":"Minimal"
    }
  ]
}

🔹 Example Final Generated Prompt

"A professional tech YouTube thumbnail featuring a sleek Dell laptop as the main subject, with emphasis on its long battery life. The background should be clean and minimal, with a subtle modern office setting to suggest professionalism. Include the Dell brand logo in a corner for clear recognition. The tone should be professional and trustworthy, avoiding clutter. Use a minimal design style, sharp contrasts, and bold typography to make the thumbnail eye-catching at small sizes. Keep the composition clear, balanced, and visually appealing."

⚡ This system prompt ensures the model always transforms structured input into a polished, descriptive final image prompt.

                    `
                
            },
            {
                role : "user",
                content : text
            }
        ],
        text : {
            format : zodTextFormat(FinalPromptSchema, "finalPrompt")
        }     
        });

        const resText = response.output_text;
        const resJson = JSON.parse(resText);
        // console.log(resText);
        return resJson;
}


export const finalPromptGeneratorImage = async (structuredPrompt, imageBase64,imagedatamini) => {
    const text = JSON.stringify(structuredPrompt)+"\n"+JSON.stringify(imagedatamini);

    console.log(text);
    // const response = await openai.responses.create({
    //     model: "gpt-4.1",
    //     input: [
    //         {
    //             role : "system",
    //             content : `
    //             You are a final prompt generator.
    //             Your job is to generate a final prompt for the given structured prompt.
    //             `
    //         }
    //     ]
    // })
}
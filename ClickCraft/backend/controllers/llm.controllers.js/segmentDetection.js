

import z from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import {openai} from "../../index.js";
import { getBase64FromCloudinary } from "../health.js";


const CategorySchemaText = z.object({
  segment: z.enum([
    "Tech",
    "Gaming",
    "Food",
    "Travel / Vlogs",
    "Education / Tutorials",
    "Entertainment / Lifestyle",
  ]),
});



export const segmentDetectionText = async (promptStructure) => {

    const text = promptStructure.initialPrompt;
    const response = await openai.responses.parse({
      model: "gpt-4.1-nano-2025-04-14",
      input: [
        {
          role: "system",
          content: `You are a Thumbnail Generator Assistant.

          Your first and mandatory step is to analyze the video topic text provided by the user and classify it into exactly one category from the list below:

          - Tech  
          - Gaming  
          - Food  
          - Travel / Vlogs  
          - Education / Tutorials  
          - Entertainment / Lifestyle  

          Rules for classification:
          1. Choose ONLY ONE category from the above list.  
          2. If the text is about gadgets, devices, software, coding, AI, reviews of electronics, or technology trends → always classify as **Tech**.  
          3. If the text is about PC/console/mobile games, eSports, or gaming commentary → classify as **Gaming**.  
          4. If the text is about recipes, food reviews, cooking, or dining experiences → classify as **Food**.  
          5. If the text is about travel guides, vlogs, or destination reviews → classify as **Travel / Vlogs**.  
          6. If the text is about teaching, tutorials, or step-by-step learning → classify as **Education / Tutorials**.  
          7. If the text is about lifestyle, entertainment, fun activities, or daily life → classify as **Entertainment / Lifestyle**.  
          8. Smartphones, laptops, gadgets, tech reviews → always fall under **Tech**, NOT lifestyle.  

          Your output must be in strict JSON format, validated against the schema provided.  
          Do not explain or add extra text.  
          `,
        },
        {
          role: "user",
          content: text,
        },
      ],
      text: {
        format: zodTextFormat(CategorySchemaText, "segment"),
      },
    });
  
  
    const resText = response.output_text;
    const resJson = JSON.parse(resText);
    return resJson;
}

const segmentDetectionImageSchema = z.object({
  segment: z.enum([
    "Tech",
    "Gaming",
    "Food",
    "Travel / Vlogs",
    "Education / Tutorials",
    "Entertainment / Lifestyle",
  ]),
  imageDescription: z.string(), // one concise sentence, allow empty string if no image
  onlyHumanPhotoAdd: z.boolean(),
});



export const segmentDetectionImage = async (promptStructure, imageUrl) => {
  const imageBase64 = await getBase64FromCloudinary(imageUrl);
  console.log('imageBase64 converted');
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: `You are Thumbnail Generator – Segment & Image Analyzer.
This function receives user text (e.g., title/description) and may also receive an image (often a user selfie to include in the thumbnail).
Assume no prior context. Your job is to (1) classify the video topic into exactly one segment category, (2) describe the image (if any), and (3) indicate whether the image is merely a human photo to overlay—i.e., not useful for deciding the segment.

Categories (choose EXACTLY one)

Tech — gadgets/devices (phones, laptops, cameras), software/apps, AI, programming, benchmarks, reviews, comparisons, product launches, tech news.

Gaming — video games, gameplay, walkthroughs, eSports, stream highlights, game characters/weapons/maps.

Food — cooking, recipes, tastings, restaurant/street-food reviews, food challenges.

Travel / Vlogs — destinations, itineraries, travel diaries, city/landmark tours, trip activities, daily vlogs centered on travel.

Education / Tutorials — structured learning: how-to, step-by-step guides, lessons, exam prep, tips/tricks (regardless of domain).
• Tie-breaker: If the primary intent is to teach, use Education / Tutorials even if the topic is tech/gaming/etc.

Entertainment / Lifestyle — fashion, beauty, music, film/TV, pranks, challenges (non-food/non-gaming), daily routines, behind-the-scenes, personality-driven content without strong instructional focus.

Decision Rules & Tie-Breakers

Text first, then image: Determine the segment primarily from the text. Use the image only to support/clarify, not to override a clear text topic.

Smartphone/laptop reviews & comparisons → Tech (not Lifestyle).

Instructional focus dominates: If the text clearly teaches something (e.g., “how to code X”, “tutorial”, “exam prep”), choose Education / Tutorials, even if in a tech/game context.

Ambiguity: If multiple segments seem plausible, choose the most dominant topic implied by the text. If still unclear, prefer the domain category over Lifestyle (e.g., a non-tutorial gadget video → Tech).

Image does not set the topic: A selfie/portrait should not move a clear “laptop comparison” away from Tech. The image can still be used decoratively in the thumbnail.

Image Handling & onlyHumanPhotoAdd

Set onlyHumanPhotoAdd: true when the provided image is primarily a human photo (selfie/portrait/group shot) without topical context (no relevant objects/scenes that determine the segment) AND the text defines a different subject (e.g., “laptop comparison”, “Bangkok street food tour”).

Set onlyHumanPhotoAdd: false when the image itself is topically relevant (e.g., laptops on a table for a tech review; a street-food stall for food; a game screenshot/overlay for gaming).





Image Description Guidelines

imageDescription must be detailed and descriptive, describing only what is visibly present (people, objects, scene, notable text/logos if clearly visible).

Do not infer brand/model specifics unless unambiguously visible.`
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: promptStructure.initialPrompt,
          },
          {
            type: "input_image",
            image_url: imageBase64,
          },
          
        ]
      }
    ],
    text: {
      format: zodTextFormat(segmentDetectionImageSchema, "thumbnail"),
    },
  });

  const resText = response.output_text;
  const resJson = JSON.parse(resText);
  console.log('Segment Detection completed');
  return resJson;
}


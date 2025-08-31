import { openai } from "../../index.js";
import z from "zod";
import { zodTextFormat } from "openai/helpers/zod";


export const QuestionSchema = z.object({
    id: z.string(),
    q: z.string(),
    options: z.array(z.string()),
    answer: z.string().nullable(), // either string or null
  });
  
  export const QuestionsSchema = z.object({
    questions: z.array(QuestionSchema), // <-- array of question objects
  });


export const questionGenerator = async (promptStructure, imageDataMini) => {
    const text = JSON.stringify(promptStructure) + "\n" + JSON.stringify(imageDataMini);
    // console.log(text);

    const response = await openai.responses.create({
        model: "gpt-4.1",
        input: [
            {
                role : "system",
                content : `
                You are a thumbnail clarifying question generator.
                Your job is to analyze the input JSON and generate one clarifying question per missing bullet point for the given segment.

                Rules:

                The number of questions must equal the number of items in analysis.missingBullets.

                Each missing bullet point → one direct, human-understandable question.

                Questions should be short, specific, and multiple-choice friendly.

                The field answer should always be set to null (to be filled later by the user/AI).

                Each question must have a unique id (string/UUID format or "q1", "q2" style).

                The "q" field is the question text.

                The "options" field should contain 3–5 reasonable choices related to the bullet point.

                If the missing bullet is "Design style", ask something like “What design style do you want for the thumbnail?” with options such as ["Cinematic", "Minimal", "Colorful", "Vlog-style"].

                Always return the result in the following JSON schema.

                🟢 2. Role in Orchestration

                This step is the bridge between missing bullet detection and thumbnail generation:

                Step 1 (Validator): Finds missing bullet points.

                Step 2 (This Layer - Q Generator): Turns missing bullet points into questions.

                Step 3 (User/AI Answer): These answers will fill in missing context.

                Step 4 (Thumbnail Prompt Builder): Combines initial prompt + answers to form a final complete thumbnail prompt for the image model.

                So this layer ensures no ambiguity remains before the image is generated. It guarantees consistency and completeness in orchestration.

                🟢 3. How It Will Work Step by Step

                Receive the JSON input (with initialPrompt, analysis.segment, and missingBullets).

                For each missingBulletPoint, generate a specific clarifying question.

                Populate each question in the following schema:

                {
                "id": "q1",
                "q": "What logos or icons do you want to include in the thumbnail?",
                "options": ["Apple Logo", "iPhone Icon", "No Logos"],
                "answer": null
                }


                Collect all questions into an array questions.

                Return the updated JSON with the new questions field filled.

                🟢 4. Example with Your Input
                Input
                {
                "initialPrompt": "Make a YouTube thumbnail about Apple's new iPhone 16 release with a modern tech style.\r\n",
                "isImageBase64": false,
                "mode": "without_photo",
                "analysis": {
                    "segment": "Tech",
                    "missingBullets": [ "Logos/Icons", "Tone", "Product/Feature" ]
                },
                "questions": [
                    { "id": "", "q": "", "options": [], "answer": null }
                ],
                "imageDescription": "no image description",
                "onlyHumanPhotoAdd": false
                }

                Output
                {
                "questions": [
                    {
                    "id": "q1",
                    "q": "Which logos or icons should be included in the thumbnail?",
                    "options": ["Apple Logo", "iPhone Icon", "No Logos"],
                    "answer": null
                    },
                    {
                    "id": "q2",
                    "q": "What tone should the thumbnail convey?",
                    "options": ["Exciting", "Professional", "Minimal", "Futuristic"],
                    "answer": null
                    },
                    {
                    "id": "q3",
                    "q": "Which specific product or feature of the iPhone 16 should be highlighted?",
                    "options": ["Camera", "Performance", "Design", "Battery Life"],
                    "answer": null
                    }
                ]
                }
                `
            },
            {
                role : "user",
                content : text
            }
        ],
       text : {
        format : zodTextFormat(QuestionsSchema, "questions"),
       }
    });

       const resText = response.output_text;
    //    console.log(response);

       const resJson = JSON.parse(resText);
    //    console.log(resJson);

    return resJson;
}

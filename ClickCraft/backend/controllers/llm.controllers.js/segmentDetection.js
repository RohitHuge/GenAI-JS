import {OpenAI} from "openai";

import z from "zod";
import { zodTextFormat } from "openai/helpers/zod";


// const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const segmentDetection = async () => {
    const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "write a list of 7 wonders of world" }],
  });
  
  console.log(response.choices[0].message);
//   return response.choices[0].message;
return ;
}

segmentDetection();
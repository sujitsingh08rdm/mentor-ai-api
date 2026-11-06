import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

export interface PromptInterface {
  systemPrompt: string;
  userPrompt: string;
}

const ai = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getContentFromAi = async (data: PromptInterface) => {
  const result = await ai.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    messages: [
      { role: "system", content: data.systemPrompt },
      {
        role: "user",
        content: data.userPrompt,
      },
    ],
  });

  const response = result.choices[0].message.content;

  if (!response || response === "null") {
    throw new Error("Invalid topic");
  }
  return response;
};

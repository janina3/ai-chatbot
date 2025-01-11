import { GenerateContentResult, GenerativeModel } from '@google/generative-ai';

const model = new GenerativeModel(
    process.env.GEMINI_API_KEY || "",
  { model: "gemini-1.5-pro-latest" }
); 

export const generateResponse = async (prompt: string): Promise<GenerateContentResult> => {
  try {
    const response = await model.generateContent(prompt);
    return response;
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Error generating response'); 
  }
};
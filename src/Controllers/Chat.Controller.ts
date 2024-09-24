import 'dotenv/config';
import { GoogleGenerativeAI, GenerateContentRequest } from "@google/generative-ai";

export async function gerarDescricaoGemini(topicos: string[]) {
  const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const model = await generativeAI.getGenerativeModel({model: "gemini-1.5-flash"})
  const prompt = `Crie uma breve descrição de 250 characteres sobre : ${topicos.join(', ')}`;
  const result = await model.generateContent(prompt,);
  return result.response.text()
}
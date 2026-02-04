
import { GoogleGenAI } from "@google/genai";

export const getFragranceRecommendation = async (userInput: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a world-class sommelier of fragrances for the luxury brand MONTCL△IRÉ. 
      The user wants advice: "${userInput}". 
      Recommend a type of scent profile (e.g., Woody, Floral, Oriental) and describe it with luxury prose. 
      Keep it elegant and concise.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our scent specialists are currently unavailable, but our collection awaits your discovery.";
  }
};

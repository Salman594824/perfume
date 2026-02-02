
import { GoogleGenAI, Type } from "@google/genai";
import { ScentRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getScentConsultation = async (preferences: string): Promise<ScentRecommendation> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Recommend a fragrance profile for someone with these preferences: ${preferences}. 
    Respond as a luxury perfume consultant.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          scentProfile: {
            type: Type.STRING,
            description: "The name of the recommended scent family or style (e.g., 'Ethereal Floral', 'Dark Woody')",
          },
          explanation: {
            type: Type.STRING,
            description: "A detailed, poetic explanation of why this profile fits the user.",
          },
          suggestedNotes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3-5 specific perfume notes that would work well.",
          },
        },
        required: ["scentProfile", "explanation", "suggestedNotes"],
      },
    },
  });

  return JSON.parse(response.text.trim());
};

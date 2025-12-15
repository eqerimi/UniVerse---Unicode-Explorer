import { GoogleGenAI, Type } from "@google/genai";
import { UnicodeCharData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchCharactersWithAI = async (query: string): Promise<UnicodeCharData[]> => {
  if (!query) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find 12 interesting, relevant, or visually unique Unicode characters related to the concept: "${query}". 
      Do not just return emojis unless specifically asked. Include symbols, historical scripts, math symbols, or punctuation if relevant.
      Return a JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              char: { type: Type.STRING, description: "The single unicode character/glyph" },
              name: { type: Type.STRING, description: "The official Unicode name (e.g., LATIN SMALL LETTER A)" },
              category: { type: Type.STRING, description: "The general category (e.g., Symbol, Currency, Math)" },
              description: { type: Type.STRING, description: "A very brief explanation of why this matches the query (max 10 words)" }
            },
            required: ["char", "name", "category", "description"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as UnicodeCharData[];
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};

export const explainCharacterWithAI = async (char: string, name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a fascinating, brief 2-paragraph fact sheet about this Unicode character: ${char} (Name: ${name}). 
      Discuss its history, usage in languages or mathematics, or technical quirks. Keep it educational but engaging.`,
    });
    return response.text || "No explanation available.";
  } catch (error) {
    console.error("Gemini Explain Error:", error);
    return "Failed to retrieve AI explanation.";
  }
};
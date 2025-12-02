import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateReportSummary = async (prompt: string, dataContext: object): Promise<string> => {
  if (!API_KEY) {
    return Promise.reject(new Error("API key for Gemini is not configured."));
  }

  try {
    const fullPrompt = `
      You are a helpful data analyst for a company named SARIC Engineering. 
      Analyze the following data and answer the user's question. 
      Provide a clear, concise, and well-formatted summary.
      
      DATA CONTEXT:
      ${JSON.stringify(dataContext, null, 2)}
      
      USER QUESTION:
      "${prompt}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate report from AI. Please check your connection or API key.");
  }
};
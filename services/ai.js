import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAcVU87wn1HlyYsnXCwa5MgBmy7TZfhuzU", // keep this in .env
});

export async function askGemini(prompt) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const response = await model.generateContent([
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ]);

    // Extract text
    const output = response.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    return output || "Sorry, I didn’t understand that.";
  } catch (err) {
    console.error("Gemini error:", err);
    return "Something went wrong with Gemini API.";
  }
}
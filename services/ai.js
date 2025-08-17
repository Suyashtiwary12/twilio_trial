// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: "AIzaSyAcVU87wn1HlyYsnXCwa5MgBmy7TZfhuzU", // keep this in .env
// });

// export async function askGemini(prompt) {
//   try {
//     const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: prompt,
//   });

//     // Extract text
//     console.log("Gemini response:", response);
//     const output = response.response?.candidates?.[0]?.content?.parts?.[0]?.text;

//     return output || "Sorry, I didn’t understand that.";
//   } catch (err) {
//     console.error("Gemini error:", err);
//     return "Something went wrong with Gemini API.";
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

// Create client
const ai = new GoogleGenerativeAI("AIzaSyAcVU87wn1HlyYsnXCwa5MgBmy7TZfhuzU"); // ✅ keep key in .env

export async function askGemini(prompt) {
  try {
    // Get model
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Generate content
    const result = await model.generateContent(prompt);

    
    const output = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("Gemini response:", output);

    return output || "Sorry, I didn’t understand that.";
  } catch (err) {
    console.error("Gemini error:", err);
    return "Something went wrong with Gemini API.";
  }
}

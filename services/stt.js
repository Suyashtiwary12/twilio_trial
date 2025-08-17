import gTTS from "gtts";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Fix __dirname since ESM doesn't have it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function textToSpeech(text, filename = "output.mp3") {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, filename);
    const gtts = new gTTS(text, "en");

    gtts.save(filepath, (err) => {
      if (err) return reject(err);
      resolve(filepath);
    });
  });
}

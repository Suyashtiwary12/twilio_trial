import gTTS from "gtts";
import fs from "fs";

export function textToSpeech(text, filename = "output.mp3") {
  return new Promise((resolve, reject) => {
    const gtts = new gTTS(text, "en");
    gtts.save(filename, (err) => {
      if (err) reject(err);
      else resolve(filename);
    });
  });
}

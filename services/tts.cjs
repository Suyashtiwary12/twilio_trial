const gTTS = require("gtts");
const fs = require("fs");

function textToSpeech(text, filename = "output.mp3") {
  return new Promise((resolve, reject) => {
    try {
      const gtts = new gTTS(text, "en");
      gtts.save(filename, (err) => {
        if (err) reject(err);
        else resolve(filename);
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { textToSpeech };
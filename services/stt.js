import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "inVus87BpIXPGegXfCNwj85X", // put your API key in .env
});

export async function speechToText(audioFile) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioFile),
    model: "whisper-1", // OpenAI’s Whisper model
  });
  return transcription.text;
}

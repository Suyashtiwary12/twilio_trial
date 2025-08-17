import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";
import { askGemini } from "./ai.js";
import { textToSpeech } from "./tts.js"; // should return a public URL

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const VoiceResponse = twilio.twiml.VoiceResponse;

// Incoming call handler
export const handleCall= async(req, res) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    input: "speech",
    action: "/process_speech",
    speechTimeout: "auto"
  });

  gather.say("Hello! Please tell me how I can help you today.");

  res.type("text/xml");
  res.send(twiml.toString());
};

// Handle gathered speech
export const processSpeech=async(req, res) => {
  const userSpeech = req.body.SpeechResult; // already transcribed by Twilio
  console.log("User said:", userSpeech);

  // Get AI response
  const aiResponse = await askGemini(userSpeech);

  // Convert to speech (should return a PUBLIC URL)
  const audioUrl = await textToSpeech(aiResponse);

  const twiml = new VoiceResponse();
  twiml.play(audioUrl);

  res.type("text/xml");
  res.send(twiml.toString());
};
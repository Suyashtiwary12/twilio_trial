// const express = require('express');

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
import twilio from "twilio";
import { speechToText } from "./stt.js";
import { textToSpeech } from "./tts.js";
import { askGemini } from "./ai.js";
const VoiceResponse = twilio.twiml.VoiceResponse;

export async function handleCall(req, res) {
  const twiml = new VoiceResponse();

  // Gather speech input
  const gather = twiml.gather({
    input: "speech",
    action: "/process_speech",
    speechTimeout: "auto"
  });
  gather.say("Hello! Please tell me how I can help you today.");

  res.type("text/xml");
  res.send(twiml.toString());
}

// Handle user speech
export async function processSpeech(req, res) {
  const speechText = await speechToText(req.body.SpeechResult);

  // Send to Gemini
  const aiResponse = await askGemini(speechText);

  // Convert AI response to speech
  const audioFile = await textToSpeech(aiResponse);

  const twiml = new VoiceResponse();
  twiml.play(audioFile); // play the generated mp3

  res.type("text/xml");
  res.send(twiml.toString());
}

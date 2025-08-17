import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";
import { askGemini } from "./ai.js";
import { textToSpeech } from "./tts.cjs"; // should return a public URL

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const VoiceResponse = twilio.twiml.VoiceResponse;

// Incoming call handler
export const handleCall = async (req, res) => {
    const twiml = new VoiceResponse();

    const gather = twiml.gather({
        input: "speech",
        action: "https://twilio-trial.onrender.com/process_speech",
        speechTimeout: "auto"
    });

    gather.say("Hello! Please tell me how I can help you today.");

    res.type("text/xml");
    res.send(twiml.toString());
};

// Handle gathered speech
export const processSpeech = async (req, res) => {
    try {
        const userSpeech = req.body.SpeechResult;
        console.log("User said:", userSpeech);

        const aiResponse = await askGemini(userSpeech);
        if (!aiResponse) throw new Error("No AI response");

        const audioUrl = await textToSpeech(aiResponse);
        if (!audioUrl) throw new Error("No audio URL");

        const twiml = new VoiceResponse();
        twiml.play(audioUrl);

        res.type("text/xml");
        res.send(twiml.toString());
    } catch (err) {
        console.error("Error in processSpeech:", err);
        res.status(500).send("<Response><Say>Sorry, there was an error.</Say></Response>");
    }
};
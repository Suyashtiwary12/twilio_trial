import express from "express";
import { handleCall, processSpeech } from "./services/index.js";
import { makeCall } from "./services/call.js";

const app = express();
app.use(express.urlencoded({ extended: false })); // Twilio sends form-encoded data

// Route Twilio will hit
app.post("/handle_call", handleCall);
app.post("/process_speech", processSpeech);

// Route to initiate outgoing call
app.get("/start_call", async (req, res) => {
  const result = await makeCall();
  res.json({ message: "Call initiated", result });
});

app.listen(3000, () => console.log("Server running on port 3000"));

// call.js
import twilio from "twilio";

const accountSid = "AC10d7504a42ac3772fa979488e734eec0"; // replace with your SID
const authToken = "34d2662a58c90bf7ce77f82fd28aa4d4";   // replace with your token
const client = twilio(accountSid, authToken);

// Function to initiate a phone call
export async function makeCall() {
  try {
    const call = await client.calls.create({
      url: "https://twilio-trial.onrender.com/handle_call", // webhook for instructions
      to: "+919097703682", // 👈 user’s phone number
      from: "+14159916325", // 👈 your Twilio number
    });

    console.log("Call SID:", call.sid);
    return call;
  } catch (error) {
    console.error("Error making call:", error);
  }
}

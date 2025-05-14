const functions = require("firebase-functions");
const axios = require("axios");

const HUGGINGFACE_API_KEY = "api"; // replace with your API key
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/Hate-speech-CNERG/indic-abusive-allInOne-MuRIL";

exports.profanityCheck = functions.https.onRequest(async (req, res) => {
  // CORS preflight support
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Text must be a string" });
  }

  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const labelScores = response.data[0]; // array of label-score pairs

    let normalScore = 0;
    let abusiveScore = 0;

    for (const item of labelScores) {
      if (item.label === "LABEL_0") normalScore = item.score;
      if (item.label === "LABEL_1") abusiveScore = item.score;
    }

    const containsProfanity = abusiveScore > normalScore && abusiveScore > 0.65;

    return res.status(200).json({
      containsProfanity,
      confidence: abusiveScore,
      analysis: { normalScore, abusiveScore },
    });

  } catch (err) {
    console.error("Hugging Face error:", {
      message: err.message,
      responseData: err.response?.data,
      responseStatus: err.response?.status,
      requestBody: text,
    });

    return res.status(500).json({ error: "Profanity detection failed" });
  }
});


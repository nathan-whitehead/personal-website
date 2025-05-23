const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3001; // Choose a port that doesn't conflict with your main site

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Discord webhook URL
const webhookUrl =
  "https://discord.com/api/webhooks/1374797270683353138/kuU4bIw6t7_CB3P1_dLKzzJMpUiGmayuG3uv8K5gNLNprwnJoCdlsuoIcbwA97l5JQ5B";

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Build Discord message
    const payload = {
      embeds: [
        {
          title: "New Contact Form Submission",
          color: 3447003,
          fields: [
            {
              name: "Name",
              value: name,
              inline: true,
            },
            {
              name: "Email",
              value: email,
              inline: true,
            },
            {
              name: "Message",
              value: message,
              inline: false,
            },
          ],
          footer: {
            text: `Sent on ${new Date().toLocaleString()}`,
          },
        },
      ],
    };

    // Send to Discord
    await axios.post(webhookUrl, payload);

    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Failed to process form" });
  }
});

app.listen(port, () => {
  console.log(`Form API running on port ${port}`);
});

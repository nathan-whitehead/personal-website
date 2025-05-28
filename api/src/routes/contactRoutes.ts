import express from "express";
import rateLimit from "express-rate-limit";
import { validateContactForm } from "../middleware/validation";
import { sendContactToDiscord } from "../services/discordService";

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post("/", contactLimiter, validateContactForm, async (req, res) => {
  console.log("Received contact form submission:", req.body);
  try {
    const { name, email, message } = req.body;

    await sendContactToDiscord({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send your message. Please try again later.",
    });
  }
});

export const contactRouter = router;

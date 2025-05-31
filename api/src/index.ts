import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { contactRouter } from "./routes/contactRoutes";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:4321", // Astro default dev port
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const apiRouter = express.Router({ mergeParams: true });

// Routes
apiRouter.use("/contact", contactRouter);

// Health check endpoint
apiRouter.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/", apiRouter);
app.use("/api", apiRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

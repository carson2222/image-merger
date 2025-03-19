import express from "express";
import { PORT } from "./config/constants.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/", imageRoutes);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

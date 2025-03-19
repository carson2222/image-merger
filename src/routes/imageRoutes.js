import express from "express";
import { queueMiddleware, processNextInQueue } from "../middleware/queueMiddleware.js";
import { fetchImageBuffer } from "../utils/fetchImageBuffer.js";
import { mergeImages } from "../utils/mergeImages.js";
import sharp from "sharp";

const router = express.Router();

// GET endpoint to check if the server is working
router.get("/", (req, res) => {
  res.send("Server is running!");
});

// POST endpoint to merge images with queue
router.post("/merge-images", queueMiddleware, async (req, res) => {
  try {
    const { layers, canvasOptions, returnType, watermark } = req.body;

    // Fetch and resize all images
    const resizedBuffers = await Promise.all(
      layers.map(async (url) => {
        const buffer = await fetchImageBuffer(url);
        return sharp(buffer).resize(canvasOptions.width, canvasOptions.height).toBuffer();
      })
    );

    // Load the watermark image if provided
    if (watermark) {
      const watermarkBuffer = await sharp("src/watermark.png")
        .resize(canvasOptions.width, canvasOptions.height)
        .toBuffer();
      resizedBuffers.push(watermarkBuffer);
    }

    // Combine all images
    const finalBuffer = await mergeImages(resizedBuffers, canvasOptions);

    // Return the result as Buffer or Base64
    if (returnType === "buffer") {
      res.set("Content-Type", "image/png");
      res.send(finalBuffer);
    } else {
      res.json({ image: `data:image/png;base64,${finalBuffer.toString("base64")}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    processNextInQueue(); // Process the next request in the queue
  }
});

export default router;

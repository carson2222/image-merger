import sharp from "sharp";

/**
 * Merges multiple images into a single image.
 * @param {Buffer[]} imageBuffers - Array of image buffers to merge.
 * @param {Object} canvasOptions - Options for the canvas (width, height).
 * @returns {Promise<Buffer>} - The merged image as a Buffer.
 */
export async function mergeImages(imageBuffers, canvasOptions) {
  try {
    const baseImage = sharp(imageBuffers[0]);

    // Get dimensions of the first image
    const { width, height } = await baseImage.metadata();

    const canvasWidth = canvasOptions?.width || width;
    const canvasHeight = canvasOptions?.height || height * imageBuffers.length;

    // Create a blank canvas with the required size
    const compositeImage = sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 }, // Transparent background
      },
    });

    // Prepare composites for layering images
    const composites = imageBuffers.map((buffer) => ({
      input: buffer,
      top: 0, // Stacking vertically
      left: 0,
    }));

    // Merge images onto the blank canvas
    return compositeImage.composite(composites).png().toBuffer();
  } catch (error) {
    throw new Error("Error while merging images: " + error.message);
  }
}

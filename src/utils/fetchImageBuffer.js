import fetch from "node-fetch";

/**
 * Fetches an image from a URL and returns it as a Buffer.
 * @param {string} url - The URL of the image to fetch.
 * @returns {Promise<Buffer>} - The image as a Buffer.
 */
export async function fetchImageBuffer(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    throw new Error(`Failed to fetch image from URL: ${url}`);
  }
}

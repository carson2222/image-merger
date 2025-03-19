# Image Merging Server

This project is a Node.js server designed to handle image merging tasks. It was created to address the limitations of AWS Lambda for image processing, particularly when merging multiple images into a single image. Since AWS Lambda has constraints on execution time, memory, and binary dependencies (like `sharp`), this server provides a scalable and efficient solution for handling image merging externally.

---

## Features

- **Merge Multiple Images**: Combine multiple images into a single image.
- **Queue System**: Handles concurrent requests using a queue to avoid overloading the server.
- **Flexible Output**: Returns the merged image as a `Buffer` or `Base64` string.
- **Watermark Support**: Optionally add a watermark to the merged image.
- **Scalable**: Designed to be deployed on external servers (e.g., EC2, Docker, etc.) to handle heavy image processing tasks.

---

## Why This Project?

I created this server because I needed to handle image merging in a project that initially used AWS Lambda. However, AWS Lambda has limitations that made it impossible to efficiently process and merge images:

- **Execution Time Limit**: Lambda functions have a maximum execution time of 15 minutes.
- **Memory Constraints**: Image processing requires significant memory, which is limited in Lambda.
- **Binary Dependencies**: Libraries like `sharp` are difficult to set up in Lambda.

This server solves these issues by offloading image processing to an external server, ensuring reliability and scalability.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/carson2222/image-merger.git
   cd image-merging-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node src/server.js
   ```

The server will start running on `http://localhost:3001`.

---

## API Endpoints

### 1. **Check Server Status**

- **Endpoint**: `GET /`
- **Response**: Returns a simple message to confirm the server is running.

### 2. **Merge Images**

- **Endpoint**: `POST /merge-images`
- **Request Body**:
  ```json
  {
    "layers": ["https://example.com/image1.png", "https://example.com/image2.png"],
    "canvasOptions": {
      "width": 800,
      "height": 600
    },
    "returnType": "buffer", // or "base64"
    "watermark": true // optional
  }
  ```
- **Response**:
  - If `returnType` is `buffer`, the server returns the merged image as a binary buffer.
  - If `returnType` is `base64`, the server returns a JSON object with the Base64-encoded image.

---

## How It Works

1. **Queue System**: The server uses a queue to handle multiple requests sequentially, ensuring that the server doesn't get overloaded.
2. **Image Fetching**: Images are fetched from the provided URLs and resized to fit the specified canvas dimensions.
3. **Merging**: The images are merged into a single image using the `sharp` library.
4. **Watermarking**: If enabled, a watermark is added to the merged image.
5. **Response**: The merged image is returned as a `Buffer` or `Base64` string, depending on the request.

---

## Deployment

This server can be deployed on any platform that supports Node.js, such as:

- **AWS EC2**
- **Docker**
- **Heroku**
- **DigitalOcean**

### Example: Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t image-merging-server .
   ```
2. Run the container:
   ```bash
   docker run -p 3001:3001 image-merging-server
   ```

---

## Dependencies

- [Express](https://expressjs.com/): Web framework for handling HTTP requests.
- [Sharp](https://sharp.pixelplumbing.com/): Image processing library.
- [node-fetch](https://www.npmjs.com/package/node-fetch): For fetching images from URLs.

---

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

[Carson ](https://github.com/carson2222)
[X/Twitter](https://x.com/carson3068)

---

## Acknowledgments

- Thanks to the creators of `sharp` for making image processing in Node.js so efficient.
- Inspired by the need to overcome AWS Lambda's limitations for image processing tasks.

// Queue and lock for `/merge-images`
let isProcessing = false;
const requestQueue = [];

/**
 * Helper function to process the next request in the queue.
 */
export function processNextInQueue() {
  if (requestQueue.length > 0) {
    const nextRequest = requestQueue.shift();
    isProcessing = true;
    nextRequest.resolve(); // Resolve the promise to process the next request
  } else {
    isProcessing = false;
  }
}

/**
 * Middleware to add requests to the queue.
 */
export function queueMiddleware(req, res, next) {
  if (isProcessing) {
    return new Promise((resolve, reject) => {
      requestQueue.push({ resolve, reject });
    }).then(() => {
      isProcessing = true;
      next();
    });
  }
  isProcessing = true;
  next();
}

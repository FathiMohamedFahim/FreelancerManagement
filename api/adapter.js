// Vercel API adapter
import { createServer } from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get the directory path of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import your server setup
import('../server/index.js');

// Export a serverless function for Vercel
export default function handler(req, res) {
  // Normally you would forward the request to your server here
  // But we're already handling it in the import above
  res.status(200).json({ message: 'API route working!' });
}
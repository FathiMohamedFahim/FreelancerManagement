// Main API handler for Vercel
import express from 'express';
import app from '../server/index.js';

// This file is needed for Vercel serverless functions

export default function handler(req, res) {
  // Forward the request to our Express app
  return app(req, res);
}
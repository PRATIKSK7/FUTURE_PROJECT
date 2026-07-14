import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import 'dotenv/config'; // Load .env
import handler from './api/book.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors()); // Allow all origins if needed
app.use(express.json());
app.use(express.static(__dirname)); // Serve frontend files

app.post('/api/book', async (req, res) => {
  // Pass to the serverless function handler
  await handler(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

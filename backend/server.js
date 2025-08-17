// server.js
// -----------------------------------------------------------------------------
// Main entry point for your back-end server. Uses ES modules thanks to
// "type": "module" in package.json.
// -----------------------------------------------------------------------------

// (A) Imports
// -----------------------------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import { itemRouter } from './routes/itemRoutes.js';

// (B) Connect to MongoDB
// -----------------------------------------------------------------------------
await connectDB();

// (C) Initialize Express
// -----------------------------------------------------------------------------
const app = express();

// (D) Middleware
// -----------------------------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());

// (E) Routes
// -----------------------------------------------------------------------------
app.use('/items', itemRouter);   // All item-related routes

// (F) Start Server
// -----------------------------------------------------------------------------
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





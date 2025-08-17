// config/db.js
// -----------------------------------------------------------------------------
// This file establishes a connection to MongoDB using environment variables
// from .env. It exports a connectDB function so we can call it from server.js
// -----------------------------------------------------------------------------

import mongoose from 'mongoose';

export async function connectDB() {
  try {
    // Access environment variables
    const { MONGODB_URI } = process.env;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Failed to connect to MongoDB Atlas:', err);
    process.exit(1); // Exit process if DB connection fails
  }
}

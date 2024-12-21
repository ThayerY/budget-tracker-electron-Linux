// models/Item.js
// -----------------------------------------------------------------------------
// Defines the Mongoose schema and model for items. Exports the model as "Item".
// -----------------------------------------------------------------------------

import mongoose from 'mongoose';

// Define Schema
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  date: String,
  time: String,
  day: {
    type: String,
    default: 'No day provided'
  },
});

// Create and Export Model
export const Item = mongoose.model('Item', itemSchema);

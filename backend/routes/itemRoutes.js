// routes/itemRoutes.js
// -----------------------------------------------------------------------------
// This file defines the routes (GET/POST/PUT/DELETE) for items. It uses the Item
// model and the convertTo12HourFormat helper to ensure times are stored/shown
// properly.
// -----------------------------------------------------------------------------

import express from 'express';
import { Item } from '../models/Item.js';
import { convertTo12HourFormat } from '../helpers/timeConversion.js';

export const itemRouter = express.Router();

// GET /items
itemRouter.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    const formattedItems = items.map(item => ({
      ...item.toObject(),
      time: convertTo12HourFormat(item.time),
    }));
    res.json(formattedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching items' });
  }
});

// POST /items
itemRouter.post('/', async (req, res) => {
  try {
    const itemToSave = {
      ...req.body,
      time: convertTo12HourFormat(req.body.time),
    };
    const newItem = new Item(itemToSave);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding item' });
  }
});

// PUT /items/:id
itemRouter.put('/:id', async (req, res) => {
  try {
    const updatedItemData = {
      ...req.body,
      time: convertTo12HourFormat(req.body.time),
    };
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updatedItemData,
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating item' });
  }
});

// DELETE /items/:id
itemRouter.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting item' });
  }
});

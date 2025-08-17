// modules/fetchItems.js
// -----------------------------------------------------------------------------
// This file handles fetching existing items from the backend and storing them
// in our local state, then calls updateDisplay.
// -----------------------------------------------------------------------------

import { shoppingHistory } from './state.js';
import { updateDisplay } from './display.js';

export async function fetchItems() {
  try {
    const response = await fetch('http://localhost:5002/items');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    shoppingHistory.length = 0; // Clear existing items
    shoppingHistory.push(...data); // Push fetched items
    console.log("Fetched items:", shoppingHistory);
    updateDisplay();
  } catch (error) {
    console.error("Could not fetch items:", error);
  }
}

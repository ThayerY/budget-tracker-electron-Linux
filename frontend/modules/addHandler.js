// modules/addHandler.js
// -----------------------------------------------------------------------------
// This file handles the logic for adding a new item, including checking the
// five-day cycle limit, formatting the time in AM/PM, etc.
// -----------------------------------------------------------------------------

import { shoppingHistory, currentDate } from './state.js';
import { getDayName, formatTo12Hour, getFiveDayCycleStart, getFiveDayCycleEnd } from './helpers.js';
import { dailyLimit } from './state.js';
import { updateDisplay } from './display.js';

export async function handleAddItem(e) {
  e.preventDefault();

  const itemName = document.getElementById('item-name').value.trim();
  const itemPrice = parseFloat(document.getElementById('item-price').value);

  if (!itemName || isNaN(itemPrice)) {
    alert("Please enter a valid item name and price.");
    return;
  }

  // Check five-day cycle limit
  const cycleStartDate = getFiveDayCycleStart(new Date(currentDate));
  const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
  const cycleSpending = shoppingHistory
    .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
    .reduce((sum, item) => sum + item.price, 0);

  if (cycleSpending + itemPrice > dailyLimit) {
    alert("Five-day limit exceeded!");
    return;
  }

  // Build new item
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const time24 = `${hours}:${minutes}`;
  const timeAMPM = formatTo12Hour(time24);

  const newItem = {
    name: itemName,
    price: itemPrice,
    date: currentDate,
    time: timeAMPM,
    day: getDayName(currentDate)
  };

  try {
    const response = await fetch('http://localhost:5002/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const addedItem = await response.json();
    shoppingHistory.push(addedItem);

    // Clear form
    document.getElementById('shopping-form').reset();

    // Refresh display
    updateDisplay();
  } catch (error) {
    console.error("Error adding item:", error);
    alert("Failed to add item. Check console for details.");
  }
}

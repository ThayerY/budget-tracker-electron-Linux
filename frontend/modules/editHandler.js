// modules/editHandler.js
// -----------------------------------------------------------------------------
// This file handles the "edit item" logic, including converting times to/from AM/PM.
// -----------------------------------------------------------------------------

import { shoppingHistory } from './state.js';
import { getDayName, convertTo24Hour, formatTo12Hour } from './helpers.js';
import { updateDisplay } from './display.js';

/** handleEditItem: triggered by clicking the "Edit" button for a row */
export async function handleEditItem(e) {
  const itemId = e.target.dataset.id;
  const itemIndex = shoppingHistory.findIndex(it => it._id === itemId);
  if (itemIndex === -1) return;

  const item = shoppingHistory[itemIndex];
  const row = e.target.closest('tr');
  if (!row) return;

  // We'll replace the date & time cells with input fields
  const dateCell = row.children[2];
  const timeCell = row.children[3];
  const actionsCell = row.children[4];

  // Create input fields
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.value = item.date;

  const timeInput = document.createElement('input');
  timeInput.type = 'time';
  timeInput.value = convertTo24Hour(item.time);

  // Clear existing cells and place inputs
  dateCell.innerHTML = '';
  timeCell.innerHTML = '';
  dateCell.appendChild(dateInput);
  timeCell.appendChild(timeInput);

  // Replace actions with a Save button
  actionsCell.innerHTML = '';
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  actionsCell.appendChild(saveBtn);

  // On Save
  saveBtn.addEventListener('click', async () => {
    const newDate = dateInput.value;
    const newTime24 = timeInput.value;
    if (!newDate || !newTime24) {
      alert("Please enter both date and time.");
      return;
    }

    // Convert 24-hour back to AM/PM
    const newTimeAMPM = formatTo12Hour(newTime24);
    const updatedItem = {
      ...item,
      date: newDate,
      time: newTimeAMPM,
      day: getDayName(newDate)
    };

    try {
      const response = await fetch(`http://localhost:5002/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local array
      shoppingHistory[itemIndex] = updatedItem;
      updateDisplay();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  });
}

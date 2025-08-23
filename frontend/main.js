// main.js (the new entry point for your frontend)
// -----------------------------------------------------------------------------
// This file ties everything together. It imports the modules that define state,
// DOM references, helper functions, display logic, add/edit/delete handlers, etc.
// Then, it sets up initial event listeners and fetches the items on load.
// -----------------------------------------------------------------------------


import { currentDate, setCurrentDate } from './modules/state.js';
import { dateSelector, form } from './modules/dom.js';
import { updateDisplay } from './modules/display.js';
import { fetchItems } from './modules/fetchItems.js';
import { handleAddItem } from './modules/addHandler.js';

// Function to close popup (global function)
window.closeLimitPopup = function() {
  const popup = document.getElementById('limit-popup');
  if (popup) {
    popup.classList.remove('show');
  }
};

// ----------------------------------------------------------------------------
// 1) On page load, set date selector and attach event
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  if (dateSelector) {
    dateSelector.value = currentDate;
    dateSelector.addEventListener('change', () => {
      setCurrentDate(dateSelector.value);
      updateDisplay();
    });
  }

  // Add popup event listeners
  const popup = document.getElementById('limit-popup');
  if (popup) {
    // Close popup when clicking on the overlay (outside the popup content)
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        window.closeLimitPopup();
      }
    });
  }

  // Close popup with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLimitPopup();
    }
  });

  // ----------------------------------------------------------------------------
  // 2) Hook up the "Add Item" form
  // ----------------------------------------------------------------------------
  form.addEventListener('submit', handleAddItem);

  // ----------------------------------------------------------------------------
  // 3) Fetch items initially
  // ----------------------------------------------------------------------------
  fetchItems();
});
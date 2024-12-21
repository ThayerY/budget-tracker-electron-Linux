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

  // ----------------------------------------------------------------------------
  // 2) Hook up the "Add Item" form
  // ----------------------------------------------------------------------------
  form.addEventListener('submit', handleAddItem);

  // ----------------------------------------------------------------------------
  // 3) Fetch items initially
  // ----------------------------------------------------------------------------
  fetchItems();
});

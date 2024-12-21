// modules/dom.js
// -----------------------------------------------------------------------------
// This file caches references to DOM elements and exports them for others to use.
// It helps keep "document.getElementById" calls out of the main code and in one place.
// -----------------------------------------------------------------------------

export const dailyLimitEl = document.getElementById('daily-limit');
export const dailyTotalEl = document.getElementById('daily-total');
export const monthlyBudgetEl = document.getElementById('monthly-budget');
export const historyTable = document.getElementById('history-table');
export const form = document.getElementById('shopping-form');
export const dateSelector = document.getElementById('date-selector');

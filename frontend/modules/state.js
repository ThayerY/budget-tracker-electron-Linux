// modules/state.js
// -----------------------------------------------------------------------------
// This file defines and exports the main "state" variables and constants
// used throughout the application. Keeping them in one place helps with
// future maintainability, especially when integrating with Electron.
// -----------------------------------------------------------------------------

export let shoppingHistory = []; // Updated by fetch calls and handlers

// Constants
export const dailyLimit = 25000;  // The five-day spending limit
export const monthlyBudget = 150000; // The monthly budget

// We'll store currentDate as a "mutable" variable that we can change on dateSelector change
export let currentDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

// A function to set currentDate from other modules (like main.js)
export function setCurrentDate(newDate) {
  currentDate = newDate;
}

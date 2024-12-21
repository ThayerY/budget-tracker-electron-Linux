// modules/display.js
// -----------------------------------------------------------------------------
// This file handles "updateDisplay" and "renderHistory"—the main UI logic.
// It uses the helper functions as well as the shared state, and updates DOM elements.
// -----------------------------------------------------------------------------

import { dailyLimit, monthlyBudget, shoppingHistory, currentDate } from './state.js';
import { dailyLimitEl, dailyTotalEl, monthlyBudgetEl, historyTable, form } from './dom.js';
import { getMonthlySpent, getFiveDayCycleStart, getFiveDayCycleEnd } from './helpers.js';

// We'll reimport other helpers as needed for time, day, etc. if used in rendering
import { renderHistory } from './renderHistory.js'; // We'll split table rendering if we want

export function updateDisplay() {
  // (1) Calculate monthly spending
  const monthlySpentThisMonth = getMonthlySpent(shoppingHistory, currentDate);
  const monthlyBudgetRemaining = monthlyBudget - monthlySpentThisMonth;

  // (2) Five-day cycle
  const today = new Date(currentDate);
  const cycleStartDate = getFiveDayCycleStart(today);
  const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
  const cycleSpending = shoppingHistory
    .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
    .reduce((sum, item) => sum + item.price, 0);

  const dailyTotal = cycleSpending;
  const fiveDayLimitRemaining = dailyLimit - dailyTotal;

  // (3) Update the UI
  if (monthlyBudgetEl) {
    monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
  }
  if (dailyLimitEl) {
    dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
  }
  if (dailyTotalEl) {
    dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
  }

  // (4) Disable form if five-day limit exceeded
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = (fiveDayLimitRemaining <= 0);
  }

  // (5) Render table
  renderHistory();
}


// // modules/display.js
// // -----------------------------------------------------------------------------
// // This file handles "updateDisplay" and "renderHistory"—the main UI logic.
// // It uses the helper functions as well as the shared state, and updates DOM elements.
// // -----------------------------------------------------------------------------

// import { dailyLimit, monthlyBudget, shoppingHistory, currentDate } from './state.js';
// import { dailyLimitEl, dailyTotalEl, monthlyBudgetEl, historyTable, form } from './dom.js';
// import { getMonthlySpent, getFiveDayCycleStart, getFiveDayCycleEnd } from './helpers.js';

// // We'll reimport other helpers as needed for time, day, etc. if used in rendering
// import { renderHistory } from './renderHistory.js'; // We'll split table rendering if we want

// export function updateDisplay() {
//   // (1) Calculate monthly spending
//   const monthlySpentThisMonth = getMonthlySpent(shoppingHistory, currentDate);
//   const monthlyBudgetRemaining = monthlyBudget - monthlySpentThisMonth;

//   // (2) Five-day cycle
//   const today = new Date(currentDate);
//   const cycleStartDate = getFiveDayCycleStart(today);
//   const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
//   const cycleSpending = shoppingHistory
//     .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//     .reduce((sum, item) => sum + item.price, 0);

//   const dailyTotal = cycleSpending;
//   const fiveDayLimitRemaining = dailyLimit - dailyTotal;

//   // (3) Update the UI
//   if (monthlyBudgetEl) {
//     monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
//   }
//   if (dailyLimitEl) {
//     dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
//   }
//   if (dailyTotalEl) {
//     dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//   }

//   // (4) Disable form if five-day limit exceeded
//   const submitBtn = form.querySelector('button[type="submit"]');
//   if (submitBtn) {
//     submitBtn.disabled = (fiveDayLimitRemaining <= 0);
//   }

//   // (5) Render table
//   renderHistory();
// }










//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------









// // modules/display.js
// // -----------------------------------------------------------------------------
// // This file handles "updateDisplay" and "renderHistory"—the main UI logic.
// // It uses the helper functions as well as the shared state, and updates DOM elements.
// // -----------------------------------------------------------------------------
// import { dailyLimit, monthlyBudget, shoppingHistory, currentDate } from './state.js';
// import { dailyLimitEl, dailyTotalEl, monthlyBudgetEl, historyTable, form } from './dom.js';
// import { getMonthlySpent, getFiveDayCycleStart, getFiveDayCycleEnd } from './helpers.js';
// import { renderHistory } from './renderHistory.js';

// export function updateDisplay() {
//   console.log("Updating display...");
//   console.log("Current date:", currentDate);
//   console.log("Shopping history:", shoppingHistory);
  
//   // (1) Calculate monthly spending
//   const monthlySpentThisMonth = getMonthlySpent(shoppingHistory, currentDate);
//   const monthlyBudgetRemaining = monthlyBudget - monthlySpentThisMonth;
  
//   console.log("Monthly spent:", monthlySpentThisMonth);
//   console.log("Monthly budget remaining:", monthlyBudgetRemaining);

//   // (2) Five-day cycle - Fix the date comparison
//   const today = new Date(currentDate);
//   const cycleStartDate = getFiveDayCycleStart(today);
//   const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
  
//   console.log("Cycle start:", cycleStartDate);
//   console.log("Cycle end:", cycleEndDate);
  
//   // Filter items within the five-day cycle (compare date strings properly)
//   const cycleSpending = shoppingHistory
//     .filter(item => {
//       const itemDate = item.date;
//       const inCycle = itemDate >= cycleStartDate && itemDate <= cycleEndDate;
//       if (inCycle) {
//         console.log("Item in cycle:", item.name, item.date, item.price);
//       }
//       return inCycle;
//     })
//     .reduce((sum, item) => sum + item.price, 0);
  
//   console.log("Cycle spending:", cycleSpending);
  
//   const fiveDayLimitRemaining = dailyLimit - cycleSpending;
  
//   // (3) Daily total for current date only
//   const dailyTotal = shoppingHistory
//     .filter(item => item.date === currentDate)
//     .reduce((sum, item) => sum + item.price, 0);
  
//   console.log("Daily total for", currentDate, ":", dailyTotal);

//   // (4) Update the UI
//   if (monthlyBudgetEl) {
//     monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
//   }
  
//   if (dailyLimitEl) {
//     dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
//   }
  
//   if (dailyTotalEl) {
//     dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//   }

//   // (5) Disable form if five-day limit exceeded
//   const submitBtn = form.querySelector('button[type="submit"]');
//   if (submitBtn) {
//     submitBtn.disabled = (fiveDayLimitRemaining <= 0);
//     if (fiveDayLimitRemaining <= 0) {
//       submitBtn.textContent = "Limit Reached";
//       submitBtn.style.backgroundColor = "#dc3545";
//     } else {
//       submitBtn.textContent = "Add Item";
//       submitBtn.style.backgroundColor = "#007bff";
//     }
//   }

//   // (6) Render table
//   renderHistory();
// }












//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------






// modules/display.js
// -----------------------------------------------------------------------------
// This file handles "updateDisplay" and "renderHistory"—the main UI logic.
// It uses the helper functions as well as the shared state, and updates DOM elements.
// -----------------------------------------------------------------------------
import { dailyLimit, monthlyBudget, shoppingHistory, currentDate } from './state.js';
import { dailyLimitEl, dailyTotalEl, monthlyBudgetEl, historyTable, form } from './dom.js';
import { getMonthlySpent, getFiveDayCycleStart, getFiveDayCycleEnd } from './helpers.js';
import { renderHistory } from './renderHistory.js';

export function updateDisplay() {
  console.log("=== UPDATING DISPLAY ===");
  console.log("Current selected date:", currentDate);
  console.log("Total items in history:", shoppingHistory.length);
  
  // (1) Calculate monthly spending for the selected date's month
  const monthlySpentThisMonth = getMonthlySpent(shoppingHistory, currentDate);
  const monthlyBudgetRemaining = monthlyBudget - monthlySpentThisMonth;
  
  console.log("Monthly spent:", monthlySpentThisMonth);
  console.log("Monthly budget remaining:", monthlyBudgetRemaining);

  // (2) Five-day cycle calculations for the SELECTED DATE
  const selectedDate = new Date(currentDate + 'T00:00:00');
  const cycleStartDate = getFiveDayCycleStart(selectedDate);
  const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
  
  console.log("=== FIVE-DAY CYCLE FOR SELECTED DATE ===");
  console.log("Selected date:", currentDate);
  console.log("Cycle start:", cycleStartDate);
  console.log("Cycle end:", cycleEndDate);
  
  // Calculate spending for this specific 5-day cycle
  const cycleSpending = shoppingHistory
    .filter(item => {
      const itemDate = item.date;
      const inCycle = itemDate >= cycleStartDate && itemDate <= cycleEndDate;
      if (inCycle) {
        console.log("Item in this cycle:", item.name, item.date, "$" + item.price);
      }
      return inCycle;
    })
    .reduce((sum, item) => sum + item.price, 0);
  
  console.log("Total spending in this 5-day cycle:", cycleSpending);
  const fiveDayLimitRemaining = dailyLimit - cycleSpending;
  console.log("Five day limit remaining:", fiveDayLimitRemaining);
  
  // (3) Daily total for ONLY the selected date
  const dailyTotal = shoppingHistory
    .filter(item => item.date === currentDate)
    .reduce((sum, item) => sum + item.price, 0);
  
  console.log("Daily total for selected date (" + currentDate + "):", dailyTotal);

  // (4) Update the UI elements
  if (monthlyBudgetEl) {
    monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
  }
  
  if (dailyLimitEl) {
    dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
  }
  
  if (dailyTotalEl) {
    dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
  }

  // (5) Update button state based on the selected date's cycle
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    const isLimitExceeded = fiveDayLimitRemaining <= 0;
    
    console.log("Is limit exceeded for this cycle?", isLimitExceeded);
    
    submitBtn.disabled = isLimitExceeded;
    
    if (isLimitExceeded) {
      submitBtn.textContent = "Limit Reached";
      submitBtn.style.backgroundColor = "#dc3545";
      console.log("Button set to 'Limit Reached'");
    } else {
      submitBtn.textContent = "Add Item";
      submitBtn.style.backgroundColor = "#007bff";
      console.log("Button set to 'Add Item'");
    }
  }

  // (6) Render table for the selected date
  renderHistory();
  
  console.log("=== DISPLAY UPDATE COMPLETE ===");
}
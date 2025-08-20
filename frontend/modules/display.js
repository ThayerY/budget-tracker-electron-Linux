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
//   console.log("=== UPDATING DISPLAY ===");
//   console.log("Current selected date:", currentDate);
//   console.log("Total items in history:", shoppingHistory.length);
  
//   // (1) Calculate monthly spending for the selected date's month
//   const monthlySpentThisMonth = getMonthlySpent(shoppingHistory, currentDate);
//   const monthlyBudgetRemaining = monthlyBudget - monthlySpentThisMonth;
  
//   console.log("Monthly spent:", monthlySpentThisMonth);
//   console.log("Monthly budget remaining:", monthlyBudgetRemaining);

//   // (2) Five-day cycle calculations for the SELECTED DATE
//   const selectedDate = new Date(currentDate + 'T00:00:00');
//   const cycleStartDate = getFiveDayCycleStart(selectedDate);
//   const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
  
//   console.log("=== FIVE-DAY CYCLE FOR SELECTED DATE ===");
//   console.log("Selected date:", currentDate);
//   console.log("Cycle start:", cycleStartDate);
//   console.log("Cycle end:", cycleEndDate);
  
//   // Calculate spending for this specific 5-day cycle
//   const cycleSpending = shoppingHistory
//     .filter(item => {
//       const itemDate = item.date;
//       const inCycle = itemDate >= cycleStartDate && itemDate <= cycleEndDate;
//       if (inCycle) {
//         console.log("Item in this cycle:", item.name, item.date, "$" + item.price);
//       }
//       return inCycle;
//     })
//     .reduce((sum, item) => sum + item.price, 0);
  
//   console.log("Total spending in this 5-day cycle:", cycleSpending);
//   const fiveDayLimitRemaining = dailyLimit - cycleSpending;
//   console.log("Five day limit remaining:", fiveDayLimitRemaining);
  
//   // (3) Daily total for ONLY the selected date
//   const dailyTotal = shoppingHistory
//     .filter(item => item.date === currentDate)
//     .reduce((sum, item) => sum + item.price, 0);
  
//   console.log("Daily total for selected date (" + currentDate + "):", dailyTotal);

//   // (4) Update the UI elements
//   if (monthlyBudgetEl) {
//     monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
//   }
  
//   if (dailyLimitEl) {
//     dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
//   }
  
//   if (dailyTotalEl) {
//     dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//   }

//   // (5) Update button state based on the selected date's cycle
//   const submitBtn = form.querySelector('button[type="submit"]');
//   if (submitBtn) {
//     const isLimitExceeded = fiveDayLimitRemaining <= 0;
    
//     console.log("Is limit exceeded for this cycle?", isLimitExceeded);
    
//     submitBtn.disabled = isLimitExceeded;
    
//     if (isLimitExceeded) {
//       submitBtn.textContent = "Limit Reached";
//       submitBtn.style.backgroundColor = "#dc3545";
//       console.log("Button set to 'Limit Reached'");
//     } else {
//       submitBtn.textContent = "Add Item";
//       submitBtn.style.backgroundColor = "#007bff";
//       console.log("Button set to 'Add Item'");
//     }
//   }

//   // (6) Render table for the selected date
//   renderHistory();
  
//   console.log("=== DISPLAY UPDATE COMPLETE ===");
// }















//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------








// // modules/display.js - FIXED VERSION
// // -----------------------------------------------------------------------------
// import { dailyLimit, monthlyBudget, shoppingHistory, currentDate, setBudgetData, getBudgetData } from './state.js';
// import { dailyLimitEl, dailyTotalEl, monthlyBudgetEl, historyTable, form } from './dom.js';
// import { getMonthlySpent, getFiveDayCycleStart, getFiveDayCycleEnd } from './helpers.js';
// import { renderHistory } from './renderHistory.js';

// export function updateDisplay() {
//     console.log("=== UPDATING DISPLAY ===");
//     console.log("Current selected date:", currentDate);
//     console.log("Total items in history:", shoppingHistory.length);

//     // Get or initialize budget data
//     let budgetData = getBudgetData();
    
//     // Calculate days since budget started
//     const budgetStartDate = new Date(budgetData.startDate);
//     const currentDateObj = new Date(currentDate + 'T00:00:00');
//     const daysSinceStart = Math.floor((currentDateObj - budgetStartDate) / (1000 * 60 * 60 * 24));
    
//     console.log("Budget start date:", budgetData.startDate);
//     console.log("Days since budget start:", daysSinceStart);
    
//     // Calculate how many 5-day periods have passed
//     const fiveDayPeriods = Math.floor(daysSinceStart / 5);
//     const currentPeriodDay = daysSinceStart % 5; // 0-4
    
//     console.log("Five-day periods completed:", fiveDayPeriods);
//     console.log("Current day in period:", currentPeriodDay);
    
//     // (1) Monthly Budget Calculation - reduces by $25,000 every 5 days
//     const totalReduction = fiveDayPeriods * 25000;
//     const monthlyBudgetRemaining = Math.max(0, budgetData.initialMonthlyBudget - totalReduction);
    
//     console.log("Total reduction from completed periods:", totalReduction);
//     console.log("Monthly budget remaining:", monthlyBudgetRemaining);
    
//     // (2) Calculate current 5-day period spending
//     const currentPeriodStart = new Date(budgetStartDate);
//     currentPeriodStart.setDate(budgetStartDate.getDate() + (fiveDayPeriods * 5));
//     const currentPeriodEnd = new Date(currentPeriodStart);
//     currentPeriodEnd.setDate(currentPeriodStart.getDate() + 4);
    
//     const periodStartStr = currentPeriodStart.toISOString().split('T')[0];
//     const periodEndStr = currentPeriodEnd.toISOString().split('T')[0];
    
//     console.log("Current 5-day period:", periodStartStr, "to", periodEndStr);
    
//     // Calculate spending for current 5-day period
//     const periodSpending = shoppingHistory
//         .filter(item => {
//             const itemDate = item.date;
//             const inPeriod = itemDate >= periodStartStr && itemDate <= periodEndStr;
//             if (inPeriod) {
//                 console.log("Item in current period:", item.name, item.date, "$" + item.price);
//             }
//             return inPeriod;
//         })
//         .reduce((sum, item) => sum + item.price, 0);
    
//     console.log("Total spending in current 5-day period:", periodSpending);
//     const fiveDayLimitRemaining = Math.max(0, dailyLimit - periodSpending);
//     console.log("Five day limit remaining:", fiveDayLimitRemaining);
    
//     // (3) Daily total for ONLY the selected date
//     const dailyTotal = shoppingHistory
//         .filter(item => item.date === currentDate)
//         .reduce((sum, item) => sum + item.price, 0);
//     console.log("Daily total for selected date (" + currentDate + "):", dailyTotal);
    
//     // (4) Update the UI elements
//     if (monthlyBudgetEl) {
//         monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
//     }
//     if (dailyLimitEl) {
//         dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
//     }
//     if (dailyTotalEl) {
//         dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//     }
    
//     // (5) Update button state based on limits
//     const submitBtn = form.querySelector('button[type="submit"]');
//     if (submitBtn) {
//         const isLimitExceeded = fiveDayLimitRemaining <= 0 || monthlyBudgetRemaining <= 0;
//         console.log("Is limit exceeded?", isLimitExceeded);
        
//         submitBtn.disabled = isLimitExceeded;
//         if (isLimitExceeded) {
//             submitBtn.textContent = fiveDayLimitRemaining <= 0 ? "5-Day Limit Reached" : "Monthly Budget Exceeded";
//             submitBtn.style.backgroundColor = "#dc3545";
//             console.log("Button disabled:", submitBtn.textContent);
//         } else {
//             submitBtn.textContent = "Add Item";
//             submitBtn.style.backgroundColor = "#007bff";
//             console.log("Button enabled: Add Item");
//         }
//     }
    
//     // (6) Render table for the selected date
//     renderHistory();
//     console.log("=== DISPLAY UPDATE COMPLETE ===");
// }










//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------








// modules/display.js - CORRECTED VERSION
// -----------------------------------------------------------------------------
import { dailyLimit, monthlyBudget, shoppingHistory, currentDate, getBudgetData } from './state.js';
import { dailyLimitEl, dailyTotalEl, monthlyBudgetEl, historyTable, form } from './dom.js';
import { getMonthlySpent } from './helpers.js';
import { renderHistory } from './renderHistory.js';

export function updateDisplay() {
    console.log("=== UPDATING DISPLAY ===");
    console.log("Current selected date:", currentDate);
    console.log("Total items in history:", shoppingHistory.length);

    // Get budget data
    const budgetData = getBudgetData();
    
    // Calculate days since budget started
    const budgetStartDate = new Date(budgetData.startDate);
    const currentDateObj = new Date(currentDate + 'T00:00:00');
    const daysSinceStart = Math.floor((currentDateObj - budgetStartDate) / (1000 * 60 * 60 * 24));
    
    console.log("Budget start date:", budgetData.startDate);
    console.log("Days since budget start:", daysSinceStart);
    
    // Calculate how many 5-day periods have passed
    const fiveDayPeriods = Math.floor(daysSinceStart / 5);
    
    console.log("Five-day periods completed:", fiveDayPeriods);
    
    // (1) Monthly Budget Calculation - reduces by $25,000 every 5 days
    const totalReduction = fiveDayPeriods * 25000;
    const monthlyBudgetRemaining = Math.max(0, budgetData.initialMonthlyBudget - totalReduction);
    
    console.log("Total reduction from completed periods:", totalReduction);
    console.log("Monthly budget remaining:", monthlyBudgetRemaining);
    
    // (2) Calculate current 5-day period spending
    const currentPeriodStart = new Date(budgetStartDate);
    currentPeriodStart.setDate(budgetStartDate.getDate() + (fiveDayPeriods * 5));
    const currentPeriodEnd = new Date(currentPeriodStart);
    currentPeriodEnd.setDate(currentPeriodStart.getDate() + 4);
    
    const periodStartStr = currentPeriodStart.toISOString().split('T')[0];
    const periodEndStr = currentPeriodEnd.toISOString().split('T')[0];
    
    console.log("Current 5-day period:", periodStartStr, "to", periodEndStr);
    
    // FIXED: Calculate spending for current 5-day period properly
    const periodSpending = shoppingHistory
        .filter(item => {
            const itemDate = item.date;
            const inPeriod = itemDate >= periodStartStr && itemDate <= periodEndStr;
            if (inPeriod) {
                console.log("Item in current period:", item.name, item.date, "$" + item.price);
            }
            return inPeriod;
        })
        .reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    
    console.log("Total spending in current 5-day period:", periodSpending);
    
    // FIXED: Calculate five day limit remaining properly
    const fiveDayLimitRemaining = Math.max(0, dailyLimit - periodSpending);
    console.log("Five day limit remaining:", fiveDayLimitRemaining);
    
    // (3) Daily total for ONLY the selected date
    const dailyTotal = shoppingHistory
        .filter(item => item.date === currentDate)
        .reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
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
    
    // (5) FIXED: Update button state based on limits
    const submitBtn = form?.querySelector('button[type="submit"]');
    if (submitBtn) {
        const isLimitExceeded = fiveDayLimitRemaining <= 0 || monthlyBudgetRemaining <= 0;
        console.log("Is limit exceeded?", isLimitExceeded);
        console.log("Five day limit remaining:", fiveDayLimitRemaining);
        console.log("Monthly budget remaining:", monthlyBudgetRemaining);
        
        submitBtn.disabled = isLimitExceeded;
        if (isLimitExceeded) {
            if (fiveDayLimitRemaining <= 0) {
                submitBtn.textContent = "5-Day Limit Reached";
            } else {
                submitBtn.textContent = "Monthly Budget Exceeded";
            }
            submitBtn.style.backgroundColor = "#dc3545";
            console.log("Button disabled:", submitBtn.textContent);
        } else {
            submitBtn.textContent = "Add Item";
            submitBtn.style.backgroundColor = "#007bff";
            console.log("Button enabled: Add Item");
        }
    }
    
    // (6) Render table for the selected date
    renderHistory();
    console.log("=== DISPLAY UPDATE COMPLETE ===");
}















//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------







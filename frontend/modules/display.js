
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





















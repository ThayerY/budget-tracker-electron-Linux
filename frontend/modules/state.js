
// modules/state.js - FIXED VERSION
// -----------------------------------------------------------------------------
// Global state for the shopping app with proper budget tracking
// -----------------------------------------------------------------------------

export const dailyLimit = 25000; // $25,000 per 5-day period
export const monthlyBudget = 150000; // Initial monthly budget

export let shoppingHistory = [];
export let currentDate = new Date().toISOString().split('T')[0];

// Budget tracking data
const BUDGET_STORAGE_KEY = 'budgetTrackerData';

// Default budget data structure
const defaultBudgetData = {
    initialMonthlyBudget: 150000,
    startDate: new Date().toISOString().split('T')[0], // When budget tracking started
    lastResetDate: new Date().toISOString().split('T')[0], // Last time 5-day period reset
    version: '1.0' // For future migrations
};

export function setCurrentDate(dateString) {
    currentDate = dateString;
    console.log("Current date updated to:", currentDate);
}

// Get budget data from localStorage or create new
export function getBudgetData() {
    try {
        const stored = localStorage.getItem(BUDGET_STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            console.log("Loaded budget data:", data);
            return { ...defaultBudgetData, ...data };
        }
    } catch (error) {
        console.error("Error loading budget data:", error);
    }
    
    console.log("Creating new budget data");
    const newData = { ...defaultBudgetData };
    setBudgetData(newData);
    return newData;
}

// Save budget data to localStorage
export function setBudgetData(data) {
    try {
        localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(data));
        console.log("Saved budget data:", data);
    } catch (error) {
        console.error("Error saving budget data:", error);
    }
}

// Reset budget data (for testing or new month)
export function resetBudgetData() {
    const newData = {
        ...defaultBudgetData,
        startDate: new Date().toISOString().split('T')[0],
        lastResetDate: new Date().toISOString().split('T')[0]
    };
    setBudgetData(newData);
    console.log("Budget data reset");
    return newData;
}

// Check if we need to advance to a new 5-day period
export function checkAndUpdatePeriod() {
    const budgetData = getBudgetData();
    const now = new Date();
    const startDate = new Date(budgetData.startDate);
    const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    
    // If we've completed full 5-day periods, update the data
    const completedPeriods = Math.floor(daysSinceStart / 5);
    
    if (completedPeriods > 0) {
        // Update last reset date to the start of the current period
        const currentPeriodStart = new Date(startDate);
        currentPeriodStart.setDate(startDate.getDate() + (completedPeriods * 5));
        
        const updatedData = {
            ...budgetData,
            lastResetDate: currentPeriodStart.toISOString().split('T')[0]
        };
        
        setBudgetData(updatedData);
        console.log("Updated period data:", updatedData);
        return updatedData;
    }
    
    return budgetData;
}

// Get current 5-day period info
export function getCurrentPeriodInfo() {
    const budgetData = getBudgetData();
    const startDate = new Date(budgetData.startDate);
    const currentDate = new Date();
    const daysSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    
    const completedPeriods = Math.floor(daysSinceStart / 5);
    const currentPeriodDay = daysSinceStart % 5;
    
    const currentPeriodStart = new Date(startDate);
    currentPeriodStart.setDate(startDate.getDate() + (completedPeriods * 5));
    
    const currentPeriodEnd = new Date(currentPeriodStart);
    currentPeriodEnd.setDate(currentPeriodStart.getDate() + 4);
    
    return {
        periodNumber: completedPeriods + 1,
        dayInPeriod: currentPeriodDay + 1,
        periodStart: currentPeriodStart.toISOString().split('T')[0],
        periodEnd: currentPeriodEnd.toISOString().split('T')[0],
        completedPeriods: completedPeriods
    };
}

// modules/helpers.js - FIXED VERSION
// -----------------------------------------------------------------------------

// Convert a date string (YYYY-MM-DD) to a weekday name
export function getDayName(dateString) {
    const dateObj = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dateObj.getDay()];
}

// Convert "10:05 AM" -> "10:05" or "9:40 PM" -> "21:40"
export function convertTo24Hour(timeStr) {
    if (!timeStr.includes('AM') && !timeStr.includes('PM')) {
        return timeStr;
    }
    let [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

// Convert "10:05" -> "10:05 AM" or "21:05" -> "9:05 PM"
export function formatTo12Hour(timeStr) {
    if (!timeStr) return '12:00 AM';
    let [hour, minute] = timeStr.split(':').map(Number);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, '0')} ${amPm}`;
}

// SIMPLIFIED: These functions are no longer needed with the new budget logic
// but keeping them for backward compatibility

export function getFiveDayCycleStart(date) {
    // This function is now handled in state.js and display.js
    // Keeping for compatibility
    const dayOfMonth = date.getDate();
    const cycleNumber = Math.floor((dayOfMonth - 1) / 5);
    const cycleStartDay = (cycleNumber * 5) + 1;
    const cycleStartDate = new Date(date.getFullYear(), date.getMonth(), cycleStartDay);
    return cycleStartDate.toISOString().split('T')[0];
}

export function getFiveDayCycleEnd(cycleStartDate) {
    // This function is now handled in state.js and display.js
    // Keeping for compatibility
    const startDate = new Date(cycleStartDate + 'T00:00:00');
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);
    return endDate.toISOString().split('T')[0];
}

// SIMPLIFIED: Monthly spending calculation
export function getMonthlySpent(shoppingHistory, dateStr) {
    const dateObj = new Date(dateStr + 'T00:00:00');
    const currentYear = dateObj.getFullYear();
    const currentMonth = dateObj.getMonth();
    
    return shoppingHistory
        .filter(item => {
            const itemDate = new Date(item.date + 'T00:00:00');
            return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth;
        })
        .reduce((sum, item) => sum + item.price, 0);
}

// NEW HELPER: Calculate budget remaining for a given date
export function calculateBudgetRemaining(shoppingHistory, budgetData, targetDate) {
    const budgetStartDate = new Date(budgetData.startDate);
    const targetDateObj = new Date(targetDate + 'T00:00:00');
    const daysSinceStart = Math.floor((targetDateObj - budgetStartDate) / (1000 * 60 * 60 * 24));
    
    const fiveDayPeriods = Math.floor(daysSinceStart / 5);
    const totalReduction = fiveDayPeriods * 25000;
    
    return Math.max(0, budgetData.initialMonthlyBudget - totalReduction);
}

// NEW HELPER: Get current 5-day period spending
export function getCurrentPeriodSpending(shoppingHistory, budgetData, targetDate) {
    const budgetStartDate = new Date(budgetData.startDate);
    const targetDateObj = new Date(targetDate + 'T00:00:00');
    const daysSinceStart = Math.floor((targetDateObj - budgetStartDate) / (1000 * 60 * 60 * 24));
    
    const fiveDayPeriods = Math.floor(daysSinceStart / 5);
    
    const currentPeriodStart = new Date(budgetStartDate);
    currentPeriodStart.setDate(budgetStartDate.getDate() + (fiveDayPeriods * 5));
    const currentPeriodEnd = new Date(currentPeriodStart);
    currentPeriodEnd.setDate(currentPeriodStart.getDate() + 4);
    
    const periodStartStr = currentPeriodStart.toISOString().split('T')[0];
    const periodEndStr = currentPeriodEnd.toISOString().split('T')[0];
    
    return shoppingHistory
        .filter(item => item.date >= periodStartStr && item.date <= periodEndStr)
        .reduce((sum, item) => sum + item.price, 0);
}
// // modules/helpers.js
// // -----------------------------------------------------------------------------
// // Contains all the helper functions: date/time conversions, cycle calculations,
// // monthly spending logic, etc. Each function is exported individually so that
// // any module can import exactly what it needs.
// // -----------------------------------------------------------------------------

// // Convert a date string (YYYY-MM-DD) to a weekday name
// export function getDayName(dateString) {
//   const dateObj = new Date(dateString);
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   return days[dateObj.getDay()];
// }

// // Convert "10:05 AM" -> "10:05" or "9:40 PM" -> "21:40"
// export function convertTo24Hour(timeStr) {
//   if (!timeStr.includes('AM') && !timeStr.includes('PM')) {
//     return timeStr;
//   }
//   let [time, modifier] = timeStr.split(' ');
//   let [hours, minutes] = time.split(':');
//   hours = parseInt(hours, 10);

//   if (modifier === 'PM' && hours < 12) hours += 12;
//   if (modifier === 'AM' && hours === 12) hours = 0;

//   return `${hours.toString().padStart(2, '0')}:${minutes}`;
// }

// // Convert "10:05" -> "10:05 AM" or "21:05" -> "9:05 PM"
// export function formatTo12Hour(timeStr) {
//   if (!timeStr) return '12:00 AM';
//   let [hour, minute] = timeStr.split(':').map(Number);
//   const amPm = hour >= 12 ? 'PM' : 'AM';
//   hour = hour % 12 || 12;
//   return `${hour}:${minute.toString().padStart(2, '0')} ${amPm}`;
// }

// // Return the start of the current five-day cycle for a given Date
// export function getFiveDayCycleStart(date) {
//   const startDate = new Date(date.getFullYear(), 0, 1);
//   const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
//   const cycleStartDay = Math.floor(daysSinceStart / 5) * 5;
//   startDate.setDate(startDate.getDate() + cycleStartDay);
//   return startDate.toISOString().split('T')[0];
// }

// // Return the end of the current five-day cycle
// export function getFiveDayCycleEnd(cycleStartDate) {
//   const endDate = new Date(cycleStartDate);
//   endDate.setDate(endDate.getDate() + 4);
//   return endDate.toISOString().split('T')[0];
// }

// // Calculate how much has been spent in the current month
// export function getMonthlySpent(shoppingHistory, dateStr) {
//   const dateObj = new Date(dateStr);
//   const currentYear = dateObj.getFullYear();
//   const currentMonth = dateObj.getMonth();

//   return shoppingHistory
//     .filter(item => {
//       const itemDate = new Date(item.date);
//       return (
//         itemDate.getFullYear() === currentYear &&
//         itemDate.getMonth() === currentMonth
//       );
//     })
//     .reduce((sum, item) => sum + item.price, 0);
// }











//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------











// // modules/helpers.js
// // -----------------------------------------------------------------------------
// // Contains all the helper functions: date/time conversions, cycle calculations,
// // monthly spending logic, etc. Each function is exported individually so that
// // any module can import exactly what it needs.
// // -----------------------------------------------------------------------------

// // Convert a date string (YYYY-MM-DD) to a weekday name
// export function getDayName(dateString) {
//   const dateObj = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   return days[dateObj.getDay()];
// }

// // Convert "10:05 AM" -> "10:05" or "9:40 PM" -> "21:40"
// export function convertTo24Hour(timeStr) {
//   if (!timeStr.includes('AM') && !timeStr.includes('PM')) {
//     return timeStr;
//   }
//   let [time, modifier] = timeStr.split(' ');
//   let [hours, minutes] = time.split(':');
//   hours = parseInt(hours, 10);
//   if (modifier === 'PM' && hours < 12) hours += 12;
//   if (modifier === 'AM' && hours === 12) hours = 0;
//   return `${hours.toString().padStart(2, '0')}:${minutes}`;
// }

// // Convert "10:05" -> "10:05 AM" or "21:05" -> "9:05 PM"
// export function formatTo12Hour(timeStr) {
//   if (!timeStr) return '12:00 AM';
//   let [hour, minute] = timeStr.split(':').map(Number);
//   const amPm = hour >= 12 ? 'PM' : 'AM';
//   hour = hour % 12 || 12;
//   return `${hour}:${minute.toString().padStart(2, '0')} ${amPm}`;
// }

// // Return the start of the current five-day cycle for a given Date
// export function getFiveDayCycleStart(date) {
//   console.log("Getting five-day cycle start for:", date);
  
//   // Create start of year
//   const startOfYear = new Date(date.getFullYear(), 0, 1);
//   console.log("Start of year:", startOfYear);
  
//   // Calculate days since start of year
//   const daysSinceStart = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
//   console.log("Days since start:", daysSinceStart);
  
//   // Find which 5-day cycle we're in
//   const cycleNumber = Math.floor(daysSinceStart / 5);
//   const cycleStartDay = cycleNumber * 5;
//   console.log("Cycle number:", cycleNumber, "Cycle start day:", cycleStartDay);
  
//   // Calculate the actual start date
//   const cycleStartDate = new Date(startOfYear);
//   cycleStartDate.setDate(startOfYear.getDate() + cycleStartDay);
  
//   const result = cycleStartDate.toISOString().split('T')[0];
//   console.log("Cycle start date:", result);
//   return result;
// }

// // Return the end of the current five-day cycle
// export function getFiveDayCycleEnd(cycleStartDate) {
//   console.log("Getting cycle end for start date:", cycleStartDate);
  
//   const endDate = new Date(cycleStartDate + 'T00:00:00');
//   endDate.setDate(endDate.getDate() + 4); // 5 days total (0,1,2,3,4)
  
//   const result = endDate.toISOString().split('T')[0];
//   console.log("Cycle end date:", result);
//   return result;
// }

// // Calculate how much has been spent in the current month
// export function getMonthlySpent(shoppingHistory, dateStr) {
//   console.log("Calculating monthly spent for date:", dateStr);
//   console.log("Shopping history length:", shoppingHistory.length);
  
//   const dateObj = new Date(dateStr + 'T00:00:00');
//   const currentYear = dateObj.getFullYear();
//   const currentMonth = dateObj.getMonth();
  
//   console.log("Looking for items in year:", currentYear, "month:", currentMonth);
  
//   const monthlyItems = shoppingHistory.filter(item => {
//     const itemDate = new Date(item.date + 'T00:00:00');
//     const itemYear = itemDate.getFullYear();
//     const itemMonth = itemDate.getMonth();
    
//     const matches = itemYear === currentYear && itemMonth === currentMonth;
//     if (matches) {
//       console.log("Monthly item found:", item.name, item.date, item.price);
//     }
//     return matches;
//   });
  
//   const total = monthlyItems.reduce((sum, item) => sum + item.price, 0);
//   console.log("Monthly total:", total);
//   return total;
// }













//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------








// // modules/helpers.js
// // -----------------------------------------------------------------------------
// // Contains all the helper functions: date/time conversions, cycle calculations,
// // monthly spending logic, etc. Each function is exported individually so that
// // any module can import exactly what it needs.
// // -----------------------------------------------------------------------------

// // Convert a date string (YYYY-MM-DD) to a weekday name
// export function getDayName(dateString) {
//   const dateObj = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   return days[dateObj.getDay()];
// }

// // Convert "10:05 AM" -> "10:05" or "9:40 PM" -> "21:40"
// export function convertTo24Hour(timeStr) {
//   if (!timeStr.includes('AM') && !timeStr.includes('PM')) {
//     return timeStr;
//   }
//   let [time, modifier] = timeStr.split(' ');
//   let [hours, minutes] = time.split(':');
//   hours = parseInt(hours, 10);
//   if (modifier === 'PM' && hours < 12) hours += 12;
//   if (modifier === 'AM' && hours === 12) hours = 0;
//   return `${hours.toString().padStart(2, '0')}:${minutes}`;
// }

// // Convert "10:05" -> "10:05 AM" or "21:05" -> "9:05 PM"
// export function formatTo12Hour(timeStr) {
//   if (!timeStr) return '12:00 AM';
//   let [hour, minute] = timeStr.split(':').map(Number);
//   const amPm = hour >= 12 ? 'PM' : 'AM';
//   hour = hour % 12 || 12;
//   return `${hour}:${minute.toString().padStart(2, '0')} ${amPm}`;
// }

// // Return the start of the current five-day cycle for a given Date
// export function getFiveDayCycleStart(date) {
//   console.log("Getting five-day cycle start for:", date);
  
//   // Create start of year (January 1st)
//   const startOfYear = new Date(date.getFullYear(), 0, 1);
//   console.log("Start of year:", startOfYear);
  
//   // Calculate days since start of year (0-based)
//   const daysSinceStart = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
//   console.log("Days since start of year:", daysSinceStart);
  
//   // Find which 5-day cycle we're in (0-based)
//   // Day 0-4 = Cycle 0, Day 5-9 = Cycle 1, etc.
//   const cycleNumber = Math.floor(daysSinceStart / 5);
//   const cycleStartDay = cycleNumber * 5;
//   console.log("Cycle number:", cycleNumber, "Cycle start day:", cycleStartDay);
  
//   // Calculate the actual start date of this cycle
//   const cycleStartDate = new Date(startOfYear);
//   cycleStartDate.setDate(startOfYear.getDate() + cycleStartDay);
  
//   const result = cycleStartDate.toISOString().split('T')[0];
//   console.log("Cycle start date:", result);
//   console.log("This means days", cycleStartDay + 1, "to", cycleStartDay + 5, "of the year share the same $25,000 limit");
//   return result;
// }

// // Return the end of the current five-day cycle
// export function getFiveDayCycleEnd(cycleStartDate) {
//   console.log("Getting cycle end for start date:", cycleStartDate);
  
//   const endDate = new Date(cycleStartDate + 'T00:00:00');
//   endDate.setDate(endDate.getDate() + 4); // 5 days total (0,1,2,3,4)
  
//   const result = endDate.toISOString().split('T')[0];
//   console.log("Cycle end date:", result);
//   return result;
// }

// // Calculate how much has been spent in the current month
// export function getMonthlySpent(shoppingHistory, dateStr) {
//   console.log("Calculating monthly spent for date:", dateStr);
//   console.log("Shopping history length:", shoppingHistory.length);
  
//   const dateObj = new Date(dateStr + 'T00:00:00');
//   const currentYear = dateObj.getFullYear();
//   const currentMonth = dateObj.getMonth();
  
//   console.log("Looking for items in year:", currentYear, "month:", currentMonth);
  
//   const monthlyItems = shoppingHistory.filter(item => {
//     const itemDate = new Date(item.date + 'T00:00:00');
//     const itemYear = itemDate.getFullYear();
//     const itemMonth = itemDate.getMonth();
    
//     const matches = itemYear === currentYear && itemMonth === currentMonth;
//     if (matches) {
//       console.log("Monthly item found:", item.name, item.date, item.price);
//     }
//     return matches;
//   });
  
//   const total = monthlyItems.reduce((sum, item) => sum + item.price, 0);
//   console.log("Monthly total:", total);
//   return total;
// }













//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------









// // modules/helpers.js
// // -----------------------------------------------------------------------------
// // Contains all the helper functions: date/time conversions, cycle calculations,
// // monthly spending logic, etc. Each function is exported individually so that
// // any module can import exactly what it needs.
// // -----------------------------------------------------------------------------

// // Convert a date string (YYYY-MM-DD) to a weekday name
// export function getDayName(dateString) {
//   const dateObj = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   return days[dateObj.getDay()];
// }

// // Convert "10:05 AM" -> "10:05" or "9:40 PM" -> "21:40"
// export function convertTo24Hour(timeStr) {
//   if (!timeStr.includes('AM') && !timeStr.includes('PM')) {
//     return timeStr;
//   }
//   let [time, modifier] = timeStr.split(' ');
//   let [hours, minutes] = time.split(':');
//   hours = parseInt(hours, 10);
//   if (modifier === 'PM' && hours < 12) hours += 12;
//   if (modifier === 'AM' && hours === 12) hours = 0;
//   return `${hours.toString().padStart(2, '0')}:${minutes}`;
// }

// // Convert "10:05" -> "10:05 AM" or "21:05" -> "9:05 PM"
// export function formatTo12Hour(timeStr) {
//   if (!timeStr) return '12:00 AM';
//   let [hour, minute] = timeStr.split(':').map(Number);
//   const amPm = hour >= 12 ? 'PM' : 'AM';
//   hour = hour % 12 || 12;
//   return `${hour}:${minute.toString().padStart(2, '0')} ${amPm}`;
// }

// // CORRECTED: Return the start of the current five-day cycle for a given Date
// export function getFiveDayCycleStart(date) {
//   console.log("Getting five-day cycle start for:", date);
  
//   // Get the day of month (1-31)
//   const dayOfMonth = date.getDate();
//   console.log("Day of month:", dayOfMonth);
  
//   // Calculate which 5-day cycle this day belongs to within the month
//   // Days 1-5 = Cycle 0, Days 6-10 = Cycle 1, Days 11-15 = Cycle 2, etc.
//   const cycleNumber = Math.floor((dayOfMonth - 1) / 5);
//   const cycleStartDay = (cycleNumber * 5) + 1;
  
//   console.log("Cycle number:", cycleNumber);
//   console.log("Cycle starts on day:", cycleStartDay, "of the month");
  
//   // Create the start date of this cycle
//   const cycleStartDate = new Date(date.getFullYear(), date.getMonth(), cycleStartDay);
//   const result = cycleStartDate.toISOString().split('T')[0];
  
//   console.log("Cycle start date:", result);
//   console.log("This cycle includes days", cycleStartDay, "to", Math.min(cycleStartDay + 4, 31), "of the month");
  
//   return result;
// }

// // Return the end of the current five-day cycle
// export function getFiveDayCycleEnd(cycleStartDate) {
//   console.log("Getting cycle end for start date:", cycleStartDate);
  
//   const startDate = new Date(cycleStartDate + 'T00:00:00');
//   const endDate = new Date(startDate);
//   endDate.setDate(startDate.getDate() + 4); // 5 days total (0,1,2,3,4)
  
//   const result = endDate.toISOString().split('T')[0];
//   console.log("Cycle end date:", result);
//   return result;
// }

// // Calculate how much has been spent in the current month
// export function getMonthlySpent(shoppingHistory, dateStr) {
//   console.log("Calculating monthly spent for date:", dateStr);
//   console.log("Shopping history length:", shoppingHistory.length);
  
//   const dateObj = new Date(dateStr + 'T00:00:00');
//   const currentYear = dateObj.getFullYear();
//   const currentMonth = dateObj.getMonth();
  
//   console.log("Looking for items in year:", currentYear, "month:", currentMonth);
  
//   const monthlyItems = shoppingHistory.filter(item => {
//     const itemDate = new Date(item.date + 'T00:00:00');
//     const itemYear = itemDate.getFullYear();
//     const itemMonth = itemDate.getMonth();
    
//     const matches = itemYear === currentYear && itemMonth === currentMonth;
//     if (matches) {
//       console.log("Monthly item found:", item.name, item.date, item.price);
//     }
//     return matches;
//   });
  
//   const total = monthlyItems.reduce((sum, item) => sum + item.price, 0);
//   console.log("Monthly total:", total);
//   return total;
// }














//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------









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
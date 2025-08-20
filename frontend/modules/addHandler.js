// modules/addHandler.js
// -----------------------------------------------------------------------------
// This file handles the logic for adding a new item, including checking the
// five-day cycle limit, formatting the time in AM/PM, etc.
// -----------------------------------------------------------------------------



// import { shoppingHistory, currentDate } from './state.js';
// import { getDayName, formatTo12Hour, getFiveDayCycleStart, getFiveDayCycleEnd } from './helpers.js';
// import { dailyLimit } from './state.js';
// import { updateDisplay } from './display.js';

// export async function handleAddItem(e) {
//   e.preventDefault();

//   const itemName = document.getElementById('item-name').value.trim();
//   const itemPrice = parseFloat(document.getElementById('item-price').value);

//   if (!itemName || isNaN(itemPrice)) {
//     alert("Please enter a valid item name and price.");
//     return;
//   }

//   // Check five-day cycle limit
//   const cycleStartDate = getFiveDayCycleStart(new Date(currentDate));
//   const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
//   const cycleSpending = shoppingHistory
//     .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//     .reduce((sum, item) => sum + item.price, 0);

//   if (cycleSpending + itemPrice > dailyLimit) {
//     alert("Five-day limit exceeded!");
//     return;
//   }

//   // Build new item
//   const now = new Date();
//   const hours = now.getHours().toString().padStart(2, '0');
//   const minutes = now.getMinutes().toString().padStart(2, '0');
//   const time24 = `${hours}:${minutes}`;
//   const timeAMPM = formatTo12Hour(time24);

//   const newItem = {
//     name: itemName,
//     price: itemPrice,
//     date: currentDate,
//     time: timeAMPM,
//     day: getDayName(currentDate)
//   };

//   try {
//     const response = await fetch('http://localhost:5002/items', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newItem),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const addedItem = await response.json();
//     shoppingHistory.push(addedItem);

//     // Clear form
//     document.getElementById('shopping-form').reset();

//     // Refresh display
//     updateDisplay();
//   } catch (error) {
//     console.error("Error adding item:", error);
//     alert("Failed to add item. Check console for details.");
//   }
// }








// ****************************************************************************************
// ****************************************************************************************







// // modules/addHandler.js
// // -----------------------------------------------------------------------------
// // This file handles the logic for adding a new item, including checking the
// // five-day cycle limit, formatting the time in AM/PM, etc.
// // -----------------------------------------------------------------------------
// import { shoppingHistory, currentDate } from './state.js';
// import { getDayName, formatTo12Hour, getFiveDayCycleStart, getFiveDayCycleEnd } from './helpers.js';
// import { dailyLimit } from './state.js';
// import { updateDisplay } from './display.js';

// // Function to show popup
// function showLimitPopup() {
//   const popup = document.getElementById('limit-popup');
//   if (popup) {
//     popup.classList.add('show');
//   }
// }

// export async function handleAddItem(e) {
//   e.preventDefault();
//   const itemName = document.getElementById('item-name').value.trim();
//   const itemPrice = parseFloat(document.getElementById('item-price').value);
  
//   if (!itemName || isNaN(itemPrice)) {
//     alert("Please enter a valid item name and price.");
//     return;
//   }
  
//   // Check five-day cycle limit
//   const cycleStartDate = getFiveDayCycleStart(new Date(currentDate));
//   const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
//   const cycleSpending = shoppingHistory
//     .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//     .reduce((sum, item) => sum + item.price, 0);
  
//   if (cycleSpending + itemPrice > dailyLimit) {
//     // Show the popup instead of alert
//     showLimitPopup();
//     return;
//   }
  
//   // Build new item
//   const now = new Date();
//   const hours = now.getHours().toString().padStart(2, '0');
//   const minutes = now.getMinutes().toString().padStart(2, '0');
//   const time24 = `${hours}:${minutes}`;
//   const timeAMPM = formatTo12Hour(time24);
  
//   const newItem = {
//     name: itemName,
//     price: itemPrice,
//     date: currentDate,
//     time: timeAMPM,
//     day: getDayName(currentDate)
//   };
  
//   try {
//     const response = await fetch('http://localhost:5002/items', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newItem),
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const addedItem = await response.json();
//     shoppingHistory.push(addedItem);
    
//     // Clear form
//     document.getElementById('shopping-form').reset();
    
//     // Refresh display
//     updateDisplay();
    
//   } catch (error) {
//     console.error("Error adding item:", error);
//     alert("Failed to add item. Check console for details.");
//   }
// }













//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------








// // modules/addHandler.js
// // -----------------------------------------------------------------------------
// // This file handles the logic for adding a new item, including checking the
// // five-day cycle limit, formatting the time in AM/PM, etc.
// // -----------------------------------------------------------------------------
// import { shoppingHistory, currentDate } from './state.js';
// import { getDayName, formatTo12Hour, getFiveDayCycleStart, getFiveDayCycleEnd } from './helpers.js';
// import { dailyLimit } from './state.js';
// import { updateDisplay } from './display.js';

// // Function to show popup with fallback
// function showLimitPopup() {
//   console.log("Trying to show popup...");
//   const popup = document.getElementById('limit-popup');
  
//   if (popup) {
//     console.log("Popup found, adding 'show' class");
//     popup.classList.add('show');
//     popup.style.display = 'flex'; // Force display
//     popup.style.opacity = '1';
//     popup.style.visibility = 'visible';
//   } else {
//     console.log("Popup not found, using alert fallback");
//     alert("You reached your limit for 5 days");
//   }
// }

// export async function handleAddItem(e) {
//   e.preventDefault();
  
//   console.log("Form submitted");
  
//   const itemName = document.getElementById('item-name').value.trim();
//   const itemPrice = parseFloat(document.getElementById('item-price').value);
  
//   console.log("Item name:", itemName, "Price:", itemPrice);
  
//   if (!itemName || isNaN(itemPrice)) {
//     alert("Please enter a valid item name and price.");
//     return;
//   }
  
//   // Check five-day cycle limit for the CURRENT SELECTED DATE
//   const selectedDate = new Date(currentDate + 'T00:00:00');
//   const cycleStartDate = getFiveDayCycleStart(selectedDate);
//   const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
//   const cycleSpending = shoppingHistory
//     .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//     .reduce((sum, item) => sum + item.price, 0);
  
//   console.log("=== CHECKING LIMIT FOR SELECTED DATE ===");
//   console.log("Selected date:", currentDate);
//   console.log("Cycle start:", cycleStartDate);
//   console.log("Cycle end:", cycleEndDate);
//   console.log("Current cycle spending:", cycleSpending);
//   console.log("New item price:", itemPrice);
//   console.log("Total would be:", cycleSpending + itemPrice);
//   console.log("Daily limit:", dailyLimit);
  
//   if (cycleSpending + itemPrice > dailyLimit) {
//     console.log("LIMIT EXCEEDED! Showing popup...");
//     // Show the popup instead of alert
//     showLimitPopup();
//     return;
//   }
  
//   console.log("Limit OK, proceeding to add item...");
  
//   console.log("Adding item...");
  
//   // Build new item
//   const now = new Date();
//   const hours = now.getHours().toString().padStart(2, '0');
//   const minutes = now.getMinutes().toString().padStart(2, '0');
//   const time24 = `${hours}:${minutes}`;
//   const timeAMPM = formatTo12Hour(time24);
  
//   const newItem = {
//     name: itemName,
//     price: itemPrice,
//     date: currentDate,
//     time: timeAMPM,
//     day: getDayName(currentDate)
//   };
  
//   try {
//     const response = await fetch('http://localhost:5002/items', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newItem),
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const addedItem = await response.json();
//     shoppingHistory.push(addedItem);
    
//     // Clear form
//     document.getElementById('shopping-form').reset();
    
//     // Refresh display
//     updateDisplay();
    
//   } catch (error) {
//     console.error("Error adding item:", error);
//     alert("Failed to add item. Check console for details.");
//   }
// }















//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------








// // modules/addHandler.js - FIXED VERSION
// // -----------------------------------------------------------------------------
// import { shoppingHistory, currentDate, dailyLimit, getBudgetData } from './state.js';
// import { updateDisplay } from './display.js';
// import { getDayName, formatTo12Hour } from './helpers.js';

// export async function handleAddItem(e) {
//     e.preventDefault();
    
//     const form = e.target;
//     const itemName = form.querySelector('#item-name').value.trim();
//     const itemPriceStr = form.querySelector('#item-price').value;
//     const itemPrice = parseFloat(itemPriceStr);
    
//     console.log("=== ADDING ITEM ===");
//     console.log("Item name:", itemName);
//     console.log("Item price:", itemPrice);
//     console.log("Selected date:", currentDate);
    
//     // Validation
//     if (!itemName) {
//         alert('Please enter an item name');
//         return;
//     }
    
//     if (!itemPrice || itemPrice <= 0 || isNaN(itemPrice)) {
//         alert('Please enter a valid price');
//         return;
//     }
    
//     // Get current budget status
//     const budgetData = getBudgetData();
//     const budgetStartDate = new Date(budgetData.startDate);
//     const currentDateObj = new Date(currentDate + 'T00:00:00');
//     const daysSinceStart = Math.floor((currentDateObj - budgetStartDate) / (1000 * 60 * 60 * 24));
    
//     // Calculate current 5-day period
//     const fiveDayPeriods = Math.floor(daysSinceStart / 5);
//     const currentPeriodStart = new Date(budgetStartDate);
//     currentPeriodStart.setDate(budgetStartDate.getDate() + (fiveDayPeriods * 5));
//     const currentPeriodEnd = new Date(currentPeriodStart);
//     currentPeriodEnd.setDate(currentPeriodStart.getDate() + 4);
    
//     const periodStartStr = currentPeriodStart.toISOString().split('T')[0];
//     const periodEndStr = currentPeriodEnd.toISOString().split('T')[0];
    
//     // Calculate current period spending
//     const periodSpending = shoppingHistory
//         .filter(item => {
//             const itemDate = item.date;
//             return itemDate >= periodStartStr && itemDate <= periodEndStr;
//         })
//         .reduce((sum, item) => sum + item.price, 0);
    
//     // Calculate remaining budgets
//     const totalReduction = fiveDayPeriods * 25000;
//     const monthlyBudgetRemaining = Math.max(0, budgetData.initialMonthlyBudget - totalReduction);
//     const fiveDayLimitRemaining = Math.max(0, dailyLimit - periodSpending);
    
//     console.log("Current period spending:", periodSpending);
//     console.log("Monthly budget remaining:", monthlyBudgetRemaining);
//     console.log("Five day limit remaining:", fiveDayLimitRemaining);
    
//     // Budget validation
//     if (itemPrice > fiveDayLimitRemaining) {
//         alert(`Cannot add item. Price ($${itemPrice.toLocaleString()}) exceeds 5-day limit remaining ($${fiveDayLimitRemaining.toLocaleString()})`);
//         showLimitPopup();
//         return;
//     }
    
//     if (itemPrice > monthlyBudgetRemaining) {
//         alert(`Cannot add item. Price ($${itemPrice.toLocaleString()}) exceeds monthly budget remaining ($${monthlyBudgetRemaining.toLocaleString()})`);
//         return;
//     }
    
//     // Check if selected date is in the future
//     const today = new Date().toISOString().split('T')[0];
//     if (currentDate > today) {
//         const confirmFuture = confirm(`You're adding an item for a future date (${currentDate}). Continue?`);
//         if (!confirmFuture) {
//             return;
//         }
//     }
    
//     // Create the new item
//     const now = new Date();
//     const newItem = {
//         name: itemName,
//         price: itemPrice,
//         date: currentDate,
//         time: formatTo12Hour(now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0')),
//         day: getDayName(currentDate)
//     };
    
//     console.log("New item created:", newItem);
    
//     try {
//         // Send to backend
//         const response = await fetch('http://localhost:5002/items', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newItem)
//         });
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const savedItem = await response.json();
//         console.log("Item saved to backend:", savedItem);
        
//         // Add to local state
//         shoppingHistory.push(savedItem);
        
//         // Clear form
//         form.querySelector('#item-name').value = '';
//         form.querySelector('#item-price').value = '';
        
//         // Update display
//         updateDisplay();
        
//         // Show success message
//         alert(`Item "${itemName}" added successfully for ${currentDate}!`);
        
//         // Check if we've hit the limit after adding
//         const newPeriodSpending = periodSpending + itemPrice;
//         const newFiveDayLimitRemaining = dailyLimit - newPeriodSpending;
        
//         if (newFiveDayLimitRemaining <= 0) {
//             showLimitPopup();
//         }
        
//     } catch (error) {
//         console.error('Error adding item:', error);
//         alert('Failed to add item. Please check your connection and try again.');
//     }
// }

// function showLimitPopup() {
//     const popup = document.getElementById('limit-popup');
//     if (popup) {
//         popup.classList.add('show');
//         console.log("Limit popup shown");
//     }
// }










//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------








// modules/addHandler.js - CORRECTED VERSION
// -----------------------------------------------------------------------------
import { shoppingHistory, currentDate, dailyLimit, getBudgetData } from './state.js';
import { updateDisplay } from './display.js';
import { getDayName, formatTo12Hour } from './helpers.js';

export async function handleAddItem(e) {
    e.preventDefault();
    
    const form = e.target;
    const itemName = form.querySelector('#item-name').value.trim();
    const itemPriceStr = form.querySelector('#item-price').value;
    const itemPrice = parseFloat(itemPriceStr);
    
    console.log("=== ADDING ITEM ===");
    console.log("Item name:", itemName);
    console.log("Item price:", itemPrice);
    console.log("Selected date:", currentDate);
    
    // Validation
    if (!itemName) {
        alert('Please enter an item name');
        return;
    }
    
    if (!itemPrice || itemPrice <= 0 || isNaN(itemPrice)) {
        alert('Please enter a valid price');
        return;
    }
    
    // Get current budget status
    const budgetData = getBudgetData();
    const budgetStartDate = new Date(budgetData.startDate);
    const currentDateObj = new Date(currentDate + 'T00:00:00');
    const daysSinceStart = Math.floor((currentDateObj - budgetStartDate) / (1000 * 60 * 60 * 24));
    
    // Calculate current 5-day period
    const fiveDayPeriods = Math.floor(daysSinceStart / 5);
    const currentPeriodStart = new Date(budgetStartDate);
    currentPeriodStart.setDate(budgetStartDate.getDate() + (fiveDayPeriods * 5));
    const currentPeriodEnd = new Date(currentPeriodStart);
    currentPeriodEnd.setDate(currentPeriodStart.getDate() + 4);
    
    const periodStartStr = currentPeriodStart.toISOString().split('T')[0];
    const periodEndStr = currentPeriodEnd.toISOString().split('T')[0];
    
    // FIXED: Calculate current period spending properly
    const periodSpending = shoppingHistory
        .filter(item => {
            const itemDate = item.date;
            return itemDate >= periodStartStr && itemDate <= periodEndStr;
        })
        .reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    
    // Calculate remaining budgets
    const totalReduction = fiveDayPeriods * 25000;
    const monthlyBudgetRemaining = Math.max(0, budgetData.initialMonthlyBudget - totalReduction);
    const fiveDayLimitRemaining = Math.max(0, dailyLimit - periodSpending);
    
    console.log("Current period spending:", periodSpending);
    console.log("Monthly budget remaining:", monthlyBudgetRemaining);
    console.log("Five day limit remaining:", fiveDayLimitRemaining);
    
    // FIXED: Strict budget validation
    if (itemPrice > fiveDayLimitRemaining) {
        alert(`Cannot add item!\n\nItem price: $${itemPrice.toLocaleString()}\n5-day limit remaining: $${fiveDayLimitRemaining.toLocaleString()}\n\nYou would exceed your 5-day spending limit.`);
        showLimitPopup();
        return;
    }
    
    if (itemPrice > monthlyBudgetRemaining) {
        alert(`Cannot add item!\n\nItem price: $${itemPrice.toLocaleString()}\nMonthly budget remaining: $${monthlyBudgetRemaining.toLocaleString()}\n\nYou would exceed your monthly budget.`);
        return;
    }
    
    // Check if selected date is in the future
    const today = new Date().toISOString().split('T')[0];
    if (currentDate > today) {
        const confirmFuture = confirm(`You're adding an item for a future date (${currentDate}). Continue?`);
        if (!confirmFuture) {
            return;
        }
    }
    
    // Create the new item
    const now = new Date();
    const newItem = {
        name: itemName,
        price: itemPrice, // Make sure it's a number
        date: currentDate,
        time: formatTo12Hour(now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0')),
        day: getDayName(currentDate)
    };
    
    console.log("New item created:", newItem);
    
    try {
        // Send to backend
        const response = await fetch('http://localhost:5002/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const savedItem = await response.json();
        console.log("Item saved to backend:", savedItem);
        
        // IMPORTANT: Make sure price is stored as number
        savedItem.price = parseFloat(savedItem.price);
        
        // Add to local state
        shoppingHistory.push(savedItem);
        
        // Clear form
        form.querySelector('#item-name').value = '';
        form.querySelector('#item-price').value = '';
        
        // Update display
        updateDisplay();
        
        // Show success message
        alert(`Item "${itemName}" added successfully for ${currentDate}!`);
        
        // Check if we've hit the limit after adding
        const newPeriodSpending = periodSpending + itemPrice;
        const newFiveDayLimitRemaining = dailyLimit - newPeriodSpending;
        
        if (newFiveDayLimitRemaining <= 0) {
            setTimeout(() => {
                showLimitPopup();
            }, 1000);
        }
        
    } catch (error) {
        console.error('Error adding item:', error);
        alert('Failed to add item. Please check your connection and try again.');
    }
}

function showLimitPopup() {
    const popup = document.getElementById('limit-popup');
    if (popup) {
        popup.classList.add('show');
        console.log("Limit popup shown");
    }
}











//---------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------






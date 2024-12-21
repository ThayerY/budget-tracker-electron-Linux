// // Initialize budgets and history
// const monthlyBudget = 150000;
// const dailyLimit = 5000;

// let day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
// let currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
// let dailySpent = 0;
// let dailyTotal = 0;

// const form = document.getElementById('shopping-form');
// const historyTable = document.getElementById('history-table');
// const monthlyBudgetEl = document.getElementById('monthly-budget');
// const dailyLimitEl = document.getElementById('daily-limit');
// const dailyTotalEl = document.getElementById('daily-total');

// // Shopping history will be fetched from the database
// let shoppingHistory = [];

// // Helper function to get the day of the week
// function getDayName(dateString) {
//   const date = new Date(dateString);
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   return days[date.getDay()];
// }

// // Helper function to format time as hh:mm AM/PM
// function formatTime(input) {
//   let hours, minutes, amPm;

//   if (input instanceof Date) {
//     // Input is a Date object
//     hours = input.getHours();
//     minutes = input.getMinutes();
//     amPm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12; // Convert 0 (midnight) or 12 (noon) to 12-hour format
//     return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//   }

//   if (typeof input === 'string') {
//     if (input.includes('AM') || input.includes('PM')) {
//       // Input is already in 12-hour format
//       return input; // No conversion needed
//     }

//     // Input is in 24-hour format (HH:mm)
//     const parts = input.split(':');
//     if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
//       hours = parseInt(parts[0], 10);
//       minutes = parseInt(parts[1], 10);
//       amPm = hours >= 12 ? 'PM' : 'AM';
//       hours = hours % 12 || 12; // Convert to 12-hour format
//       return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//     } else {
//       throw new Error(`Invalid time format: ${input}`);
//     }
//   }

//   throw new Error('Invalid input for formatTime');
// }

// // Fetch shopping history from the backend
// async function fetchItems() {
//   try {
//     const response = await fetch('http://localhost:5000/items', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     shoppingHistory = await response.json();
//     updateDisplay();
//   } catch (error) {
//     console.error("Could not fetch items:", error);
//   }
// }

// // Update budget and history display
// function updateDisplay() {
//   const spentToday = shoppingHistory
//     .filter(item => item.date === currentDate)
//     .reduce((total, item) => total + item.price, 0);
//   dailySpent = spentToday;
//   dailyTotal = spentToday;
//   console.log(`this is for checking ${dailySpent}`)

//   const remainingBudget = monthlyBudget - shoppingHistory.reduce((total, item) => total + item.price, 0);

//   monthlyBudgetEl.textContent = `$${remainingBudget.toLocaleString()}`;
//   dailyLimitEl.textContent = `$${(dailyLimit - dailySpent).toLocaleString()}`;
//   dailyTotalEl.textContent = `$${(dailyTotal).toLocaleString()}`;

//   renderHistory();
// }

// // Render shopping history
// function renderHistory() {
//   const tbody = historyTable.querySelector('tbody');
//   tbody.innerHTML = '';

//   shoppingHistory.forEach((item, index) => {
//     let formattedTime;
//     try {
//       formattedTime = formatTime(item.time); // Format the time
//     } catch (error) {
//       console.error(`Error formatting time for item ${item.name}:`, error);
//       formattedTime = 'Invalid Time'; // Fallback for display
//     }

//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${item.name}</td>
//       <td>$${item.price.toLocaleString()}</td>
//       <td>${item.date}</td>
//       <td>${formattedTime}</td>
//       <td>${getDayName(item.date)}</td>
//       <td>
//         <button class="edit-btn" data-index="${index}">Edit</button>
//         <button class="delete-btn" data-index="${index}">Delete</button>
//       </td>
//     `;

//     tbody.appendChild(row);
//   });
//   console.log('Shopping history:', shoppingHistory);

//   // Attach event listeners to Edit and Delete buttons
//   document.querySelectorAll('.edit-btn').forEach(button => {
//     button.addEventListener('click', handleEditDateTime);
//   });
//   document.querySelectorAll('.delete-btn').forEach(button => {
//     button.addEventListener('click', handleDeleteItem);
//   });
// }

// // Handle deleting an item
// async function handleDeleteItem(e) {
//   const index = e.target.dataset.index;
//   const itemId = shoppingHistory[index]._id;

//   const confirmDelete = confirm("Are you sure you want to delete this item?");
//   if (confirmDelete) {
//     try {
//       await fetch(`http://localhost:5000/items/${itemId}`, {
//         method: 'DELETE'
//       });
//       shoppingHistory.splice(index, 1);
//       updateDisplay();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   }
// }

// // Handle editing the date and time
// async function handleEditDateTime(e) {
//   const index = e.target.dataset.index;
//   const item = shoppingHistory[index];
//   const row = e.target.parentElement.parentElement;

//   const dateInput = document.createElement('input');
//   dateInput.type = 'date';
//   dateInput.value = item.date;
//   dateInput.className = 'edit-date-input';

//   const timeInput = document.createElement('input');
//   timeInput.type = 'time';
//   timeInput.value = item.time;
//   timeInput.className = 'edit-time-input';

//   const saveBtn = document.createElement('button');
//   saveBtn.textContent = 'Save';
//   saveBtn.className = 'save-btn';

//   const dateCell = row.children[2];
//   const timeCell = row.children[3];
//   dateCell.innerHTML = '';
//   timeCell.innerHTML = '';
//   dateCell.appendChild(dateInput);
//   timeCell.appendChild(timeInput);
//   e.target.replaceWith(saveBtn);

//   saveBtn.addEventListener('click', async () => {
//     const newDate = dateInput.value;
//     const newTime = timeInput.value;

//     if (newDate && newTime) {
//       const updatedItem = {
//         ...item,
//         date: newDate,
//         time: formatTime(new Date(`${newDate}T${newTime}`)),
//         day: getDayName(newDate)
//       };

//       try {
//         await fetch(`http://localhost:5000/items/${item._id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(updatedItem),
//         });

//         shoppingHistory[index] = updatedItem;
//         dateCell.textContent = newDate;
//         timeCell.textContent = updatedItem.time;
//         saveBtn.replaceWith(e.target);
//         e.target.addEventListener('click', handleEditDateTime);

//         updateDisplay();
//       } catch (error) {
//         console.error("Error updating item:", error);
//       }
//     }
//   });
// }

// // Add new item to history
// form.addEventListener('submit', async e => {
//   e.preventDefault();
//   const itemName = document.getElementById('item-name').value;
//   const itemPrice = parseFloat(document.getElementById('item-price').value);

//   const now = new Date();
//   const time = formatTime(now);
//   // const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

//   if (dailySpent + itemPrice > dailyLimit) {
//     const addToNextDay = confirm(
//       "Daily limit exceeded! Would you like to add this item to the next day's budget?"
//     );

//     if (addToNextDay) {
//       const nextDate = new Date(now);
//       nextDate.setDate(now.getDate() + 1);
//       const nextDay = nextDate.toISOString().split('T')[0];

//       try {
//         const newItem = {
//           name: itemName,
//           price: itemPrice,
//           date: nextDay,
//           time,
//           day: getDayName(nextDay)
//         };

//         const response = await fetch('http://localhost:5000/items', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(newItem),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const addedItem = await response.json();
//         shoppingHistory.push(addedItem);
//         alert(`Item added to the next day's budget (Date: ${nextDay}, Day: ${getDayName(nextDay)})`);
//         form.reset();
//         updateDisplay();
//       } catch (error) {
//         console.error("Error adding item:", error);
//         alert("Failed to add item. Please check the console for details.");
//       }
//       return;
//     } else {
//       return;
//     }
//   }

//   try {
//     const newItem = {
//       name: itemName,
//       price: itemPrice,
//       date: currentDate,
//       time,
//       day: getDayName(currentDate)
//     };

//     const response = await fetch('http://localhost:5000/items', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newItem),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const addedItem = await response.json();
//     shoppingHistory.push(addedItem);
//     form.reset();
//     updateDisplay();
//   } catch (error) {
//     console.error("Error adding item:", error);
//     alert("Failed to add item. Please check the console for details.");
//   }
// });

// // Automatically handle date change
// function handleDateChange() {
//   const now = new Date();
//   const today = now.toISOString().split('T')[0];
//   if (currentDate !== today) {
//     currentDate = today;
//     dailySpent = 0; // Reset daily spent
//     updateDisplay();
//   }
// }

// setInterval(handleDateChange, 60000);

// fetchItems(); // Load data from the backend






//-------------------------------------------------------------------------------
//--------------------------------------------------------------------------------







// // Initialize budgets and history
// const monthlyBudget = 150000;
// const dailyLimit = 5000;
// const cycleLength = 5; // 5-day cycle
// const cycleMax = 25000; // $25,000 max over 5 days

// let day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
// let currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
// let dailySpent = 0;
// let dailyTotal = 0;

// // Cycle-related variables
// // Set the cycle start date to the current date initially
// let cycleStartDate = currentDate;
// let cycleSpent = 0; // total spent in the current cycle

// const form = document.getElementById('shopping-form');
// const historyTable = document.getElementById('history-table');
// const monthlyBudgetEl = document.getElementById('monthly-budget');
// const dailyLimitEl = document.getElementById('daily-limit');
// const dailyTotalEl = document.getElementById('daily-total');

// // Shopping history will be fetched from the database
// let shoppingHistory = [];

// // Helper function to get the day of the week
// function getDayName(dateString) {
//   const date = new Date(dateString);
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   return days[date.getDay()];
// }

// // Helper function to format time as hh:mm AM/PM
// function formatTime(input) {
//   let hours, minutes, amPm;

//   if (input instanceof Date) {
//     // Input is a Date object
//     hours = input.getHours();
//     minutes = input.getMinutes();
//     amPm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12;
//     return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//   }

//   if (typeof input === 'string') {
//     if (input.includes('AM') || input.includes('PM')) {
//       // Already in 12-hour format
//       return input;
//     }

//     // Input is in 24-hour format (HH:mm)
//     const parts = input.split(':');
//     if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
//       hours = parseInt(parts[0], 10);
//       minutes = parseInt(parts[1], 10);
//       amPm = hours >= 12 ? 'PM' : 'AM';
//       hours = hours % 12 || 12;
//       return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//     } else {
//       throw new Error(`Invalid time format: ${input}`);
//     }
//   }

//   throw new Error('Invalid input for formatTime');
// }

// // Calculate the number of days between two dates
// function daysBetween(date1Str, date2Str) {
//   const d1 = new Date(date1Str);
//   const d2 = new Date(date2Str);
//   const diffTime = d2.getTime() - d1.getTime();
//   return Math.floor(diffTime / (1000 * 60 * 60 * 24));
// }

// // Fetch shopping history from the backend
// async function fetchItems() {
//   try {
//     const response = await fetch('http://localhost:5000/items', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     shoppingHistory = await response.json();
//     updateDisplay();
//   } catch (error) {
//     console.error("Could not fetch items:", error);
//   }
// }

// // Update budget and history display
// function updateDisplay() {
//   // Check if 5-day cycle needs to reset
//   checkCycleReset();

//   const spentToday = shoppingHistory
//     .filter(item => item.date === currentDate)
//     .reduce((total, item) => total + item.price, 0);

//   dailySpent = spentToday;
//   dailyTotal = spentToday;

//   // Calculate how much has been spent in the current 5-day cycle
//   // The cycle starts from cycleStartDate and ends today (or currentDate)
//   const daysPassed = daysBetween(cycleStartDate, currentDate);
//   const cycleItems = shoppingHistory.filter(item => {
//     // Include only items from cycleStartDate to currentDate (inclusive)
//     return item.date >= cycleStartDate && item.date <= currentDate;
//   });
//   cycleSpent = cycleItems.reduce((sum, item) => sum + item.price, 0);

//   // Check again if cycleSpent exceeded 25000; if yes, reset cycle
//   if (cycleSpent >= cycleMax || daysPassed >= cycleLength) {
//     resetCycle();
//   }

//   const remainingBudget = monthlyBudget - shoppingHistory.reduce((total, item) => total + item.price, 0);

//   monthlyBudgetEl.textContent = `$${remainingBudget.toLocaleString()}`;
//   dailyLimitEl.textContent = `$${(dailyLimit - dailySpent).toLocaleString()}`;
//   dailyTotalEl.textContent = `$${(dailyTotal).toLocaleString()}`;

//   renderHistory();
// }

// // Check if we need to reset the cycle (called before updating display)
// function checkCycleReset() {
//   const daysPassed = daysBetween(cycleStartDate, currentDate);
//   // If 5 days have passed or cycleSpent exceeds 25000, reset
//   if (daysPassed >= cycleLength || cycleSpent >= cycleMax) {
//     resetCycle();
//   }
// }

// // Reset the 5-day cycle
// function resetCycle() {
//   cycleStartDate = currentDate;
//   cycleSpent = 0;
//   dailySpent = 0;
//   dailyTotal = 0;
//   console.log("Cycle reset completed. New cycle starts from:", cycleStartDate);
// }

// // Render shopping history
// function renderHistory() {
//   const tbody = historyTable.querySelector('tbody');
//   tbody.innerHTML = '';

//   shoppingHistory.forEach((item, index) => {
//     let formattedTime;
//     try {
//       formattedTime = formatTime(item.time); // Format the time
//     } catch (error) {
//       console.error(`Error formatting time for item ${item.name}:`, error);
//       formattedTime = 'Invalid Time'; // Fallback for display
//     }

//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${item.name}</td>
//       <td>$${item.price.toLocaleString()}</td>
//       <td>${item.date}</td>
//       <td>${formattedTime}</td>
//       <td>${getDayName(item.date)}</td>
//       <td>
//         <button class="edit-btn" data-index="${index}">Edit</button>
//         <button class="delete-btn" data-index="${index}">Delete</button>
//       </td>
//     `;

//     tbody.appendChild(row);
//   });
//   console.log('Shopping history:', shoppingHistory);

//   // Attach event listeners to Edit and Delete buttons
//   document.querySelectorAll('.edit-btn').forEach(button => {
//     button.addEventListener('click', handleEditDateTime);
//   });
//   document.querySelectorAll('.delete-btn').forEach(button => {
//     button.addEventListener('click', handleDeleteItem);
//   });
// }

// // Handle deleting an item
// async function handleDeleteItem(e) {
//   const index = e.target.dataset.index;
//   const itemId = shoppingHistory[index]._id;

//   const confirmDelete = confirm("Are you sure you want to delete this item?");
//   if (confirmDelete) {
//     try {
//       await fetch(`http://localhost:5000/items/${itemId}`, {
//         method: 'DELETE'
//       });
//       shoppingHistory.splice(index, 1);
//       updateDisplay();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   }
// }

// // Handle editing the date and time
// async function handleEditDateTime(e) {
//   const index = e.target.dataset.index;
//   const item = shoppingHistory[index];
//   const row = e.target.parentElement.parentElement;

//   const dateInput = document.createElement('input');
//   dateInput.type = 'date';
//   dateInput.value = item.date;
//   dateInput.className = 'edit-date-input';

//   const timeInput = document.createElement('input');
//   timeInput.type = 'time';
//   timeInput.value = item.time;
//   timeInput.className = 'edit-time-input';

//   const saveBtn = document.createElement('button');
//   saveBtn.textContent = 'Save';
//   saveBtn.className = 'save-btn';

//   const dateCell = row.children[2];
//   const timeCell = row.children[3];
//   dateCell.innerHTML = '';
//   timeCell.innerHTML = '';
//   dateCell.appendChild(dateInput);
//   timeCell.appendChild(timeInput);
//   e.target.replaceWith(saveBtn);

//   saveBtn.addEventListener('click', async () => {
//     const newDate = dateInput.value;
//     const newTime = timeInput.value;

//     if (newDate && newTime) {
//       const updatedItem = {
//         ...item,
//         date: newDate,
//         time: formatTime(new Date(`${newDate}T${newTime}`)),
//         day: getDayName(newDate)
//       };

//       try {
//         await fetch(`http://localhost:5000/items/${item._id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(updatedItem),
//         });

//         shoppingHistory[index] = updatedItem;
//         dateCell.textContent = newDate;
//         timeCell.textContent = updatedItem.time;
//         saveBtn.replaceWith(e.target);
//         e.target.addEventListener('click', handleEditDateTime);

//         updateDisplay();
//       } catch (error) {
//         console.error("Error updating item:", error);
//       }
//     }
//   });
// }

// // Add new item to history
// form.addEventListener('submit', async e => {
//   e.preventDefault();
//   const itemName = document.getElementById('item-name').value;
//   const itemPrice = parseFloat(document.getElementById('item-price').value);

//   const now = new Date();
//   const time = formatTime(now);

//   // Check if adding this item exceeds today's limit (5,000)
//   if (dailySpent + itemPrice > dailyLimit) {
//     const addToNextDay = confirm(
//       "Daily limit exceeded! Would you like to add this item to the next day's budget?"
//     );

//     if (addToNextDay) {
//       const nextDate = new Date(now);
//       nextDate.setDate(now.getDate() + 1);
//       const nextDay = nextDate.toISOString().split('T')[0];

//       try {
//         const newItem = {
//           name: itemName,
//           price: itemPrice,
//           date: nextDay,
//           time,
//           day: getDayName(nextDay)
//         };

//         const response = await fetch('http://localhost:5000/items', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(newItem),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const addedItem = await response.json();
//         shoppingHistory.push(addedItem);
//         alert(`Item added to the next day's budget (Date: ${nextDay}, Day: ${getDayName(nextDay)})`);
//         form.reset();
//         updateDisplay();
//       } catch (error) {
//         console.error("Error adding item:", error);
//         alert("Failed to add item. Please check the console for details.");
//       }
//       return;
//     } else {
//       return;
//     }
//   }

//   try {
//     const newItem = {
//       name: itemName,
//       price: itemPrice,
//       date: currentDate,
//       time,
//       day: getDayName(currentDate)
//     };

//     const response = await fetch('http://localhost:5000/items', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newItem),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const addedItem = await response.json();
//     shoppingHistory.push(addedItem);
//     form.reset();
//     updateDisplay();
//   } catch (error) {
//     console.error("Error adding item:", error);
//     alert("Failed to add item. Please check the console for details.");
//   }
// });

// // Automatically handle date change
// function handleDateChange() {
//   const now = new Date();
//   const today = now.toISOString().split('T')[0];
//   if (currentDate !== today) {
//     currentDate = today;
//     dailySpent = 0; // Reset daily spent as it's a new day
//     updateDisplay();
//   }
// }

// setInterval(handleDateChange, 60000);

// fetchItems(); // Load data from the backend






//--------------------------------------------------------------------------------
//-------------------------------------------------------------------------------





// document.addEventListener('DOMContentLoaded', () => {
//   // Initialize budgets and history
//   const monthlyBudget = 150000;
//   const dailyLimit = 5000;
//   const cycleLength = 5; // 5-day cycle
//   const cycleMax = 25000; // $25,000 max over 5 days

//   // Set initial currentDate to today's date
//   let currentDate = new Date().toISOString().split('T')[0]; // e.g. "2024-12-20"
//   let dailySpent = 0;
//   let dailyTotal = 0;
//   let cycleStartDate = currentDate; // Start the cycle now
//   let cycleSpent = 0; // total spent in current cycle

//   const form = document.getElementById('shopping-form');
//   const historyTable = document.getElementById('history-table');
//   const monthlyBudgetEl = document.getElementById('monthly-budget');
//   const dailyLimitEl = document.getElementById('daily-limit');
//   const dailyTotalEl = document.getElementById('daily-total');

//   const dateSelector = document.getElementById('date-selector');
//   if (dateSelector) {
//     // Set the date selector to current date initially
//     dateSelector.value = currentDate;
//     dateSelector.addEventListener('change', () => {
//       currentDate = dateSelector.value;
//       updateDisplay();
//     });
//   }

//   let shoppingHistory = [];

//   // Helper function to get the day name
//   function getDayName(dateString) {
//     const date = new Date(dateString);
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return days[date.getDay()];
//   }

//   // Helper function to format time as hh:mm AM/PM
//   function formatTime(input) {
//     let hours, minutes, amPm;

//     if (input instanceof Date) {
//       hours = input.getHours();
//       minutes = input.getMinutes();
//       amPm = hours >= 12 ? 'PM' : 'AM';
//       hours = hours % 12 || 12;
//       return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//     }

//     if (typeof input === 'string') {
//       if (input.includes('AM') || input.includes('PM')) {
//         return input; // Already 12-hour format
//       }

//       // Input in 24-hour format (HH:mm)
//       const parts = input.split(':');
//       if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
//         hours = parseInt(parts[0], 10);
//         minutes = parseInt(parts[1], 10);
//         amPm = hours >= 12 ? 'PM' : 'AM';
//         hours = hours % 12 || 12;
//         return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//       } else {
//         throw new Error(`Invalid time format: ${input}`);
//       }
//     }

//     throw new Error('Invalid input for formatTime');
//   }

//   // Calculate days between two dates (YYYY-MM-DD)
//   function daysBetween(date1Str, date2Str) {
//     const d1 = new Date(date1Str);
//     const d2 = new Date(date2Str);
//     const diffTime = d2 - d1;
//     return Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   }

//   // Check if cycle should reset
//   function checkCycleReset() {
//     const daysPassed = daysBetween(cycleStartDate, currentDate);

//     // Calculate cycleSpent: sum all items from cycleStartDate to currentDate
//     const cycleItems = shoppingHistory.filter(item =>
//       item.date >= cycleStartDate && item.date <= currentDate
//     );
//     cycleSpent = cycleItems.reduce((sum, i) => sum + i.price, 0);

//     console.log(`Days since cycle start: ${daysPassed}, cycleSpent: ${cycleSpent}`);

//     // If conditions (5 days passed or $25,000 exceeded) met, reset cycle
//     if (daysPassed >= cycleLength || cycleSpent >= cycleMax) {
//       console.log("Resetting cycle conditions met.");
//       resetCycle();
//     }
//   }

//   // Reset cycle
//   function resetCycle() {
//     cycleStartDate = currentDate;  // new cycle starts today
//     dailySpent = 0;
//     dailyTotal = 0;
//     cycleSpent = 0;
//     console.log("Cycle has been reset. New cycleStartDate:", cycleStartDate);
//   }

//   // Update display: refresh dailySpent, dailyTotal, and UI text
//   function updateDisplay() {
//     checkCycleReset();

//     const spentToday = shoppingHistory
//       .filter(item => item.date === currentDate)
//       .reduce((total, item) => total + item.price, 0);

//     dailySpent = spentToday;
//     dailyTotal = spentToday;

//     const totalSpent = shoppingHistory.reduce((total, item) => total + item.price, 0);
//     const remainingBudget = monthlyBudget - totalSpent;

//     console.log("Updating display:");
//     console.log("Current Date:", currentDate);
//     console.log("dailySpent:", dailySpent, "dailyTotal:", dailyTotal);
//     console.log("remainingBudget:", remainingBudget);

//     monthlyBudgetEl.textContent = `Monthly Budget Remaining : $${remainingBudget.toLocaleString()}`;
//     dailyLimitEl.textContent = `Daily Limit Remaining : $${(dailyLimit - dailySpent).toLocaleString()}`;
//     dailyTotalEl.textContent = `Daily Total : $${dailyTotal.toLocaleString()}`;

//     renderHistory();
//   }

//   // Render shopping history into the table
//   function renderHistory() {
//     const tbody = historyTable.querySelector('tbody');
//     tbody.innerHTML = '';

//     shoppingHistory.forEach((item, index) => {
//       let formattedTime;
//       try {
//         formattedTime = formatTime(item.time);
//       } catch (error) {
//         console.error(`Error formatting time for item ${item.name}:`, error);
//         formattedTime = 'Invalid Time';
//       }

//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${item.name}</td>
//         <td>$${item.price.toLocaleString()}</td>
//         <td>${item.date}</td>
//         <td>${formattedTime}</td>
//         <td>${getDayName(item.date)}</td>
//         <td>
//           <button class="edit-btn" data-index="${index}">Edit</button>
//           <button class="delete-btn" data-index="${index}">Delete</button>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });

//     console.log('Rendered Shopping History:', shoppingHistory);

//     document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', handleEditDateTime));
//     document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleDeleteItem));
//   }

//   // Handle deleting an item
//   async function handleDeleteItem(e) {
//     const index = e.target.dataset.index;
//     const itemId = shoppingHistory[index]._id;

//     if (confirm("Are you sure you want to delete this item?")) {
//       try {
//         const response = await fetch(`http://localhost:5000/items/${itemId}`, {
//           method: 'DELETE'
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         shoppingHistory.splice(index, 1);
//         updateDisplay();
//       } catch (error) {
//         console.error("Error deleting item:", error);
//       }
//     }
//   }

//   // Handle editing date/time
//   async function handleEditDateTime(e) {
//     const index = e.target.dataset.index;
//     const item = shoppingHistory[index];
//     const row = e.target.parentElement.parentElement;

//     const dateInput = document.createElement('input');
//     dateInput.type = 'date';
//     dateInput.value = item.date;

//     const timeInput = document.createElement('input');
//     timeInput.type = 'time';
//     timeInput.value = item.time;

//     const saveBtn = document.createElement('button');
//     saveBtn.textContent = 'Save';
//     saveBtn.className = 'save-btn';

//     const dateCell = row.children[2];
//     const timeCell = row.children[3];
//     dateCell.innerHTML = '';
//     timeCell.innerHTML = '';
//     dateCell.appendChild(dateInput);
//     timeCell.appendChild(timeInput);
//     e.target.replaceWith(saveBtn);

//     saveBtn.addEventListener('click', async () => {
//       const newDate = dateInput.value;
//       const newTime = timeInput.value;

//       if (newDate && newTime) {
//         const updatedItem = {
//           ...item,
//           date: newDate,
//           time: formatTime(new Date(`${newDate}T${newTime}`)),
//           day: getDayName(newDate)
//         };

//         try {
//           const response = await fetch(`http://localhost:5000/items/${item._id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updatedItem),
//           });

//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }

//           shoppingHistory[index] = updatedItem;
//           dateCell.textContent = newDate;
//           timeCell.textContent = updatedItem.time;
//           saveBtn.replaceWith(e.target);
//           e.target.addEventListener('click', handleEditDateTime);

//           updateDisplay();
//         } catch (error) {
//           console.error("Error updating item:", error);
//         }
//       }
//     });
//   }

//   // Add new item to history
//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     const itemName = document.getElementById('item-name').value.trim();
//     const itemPrice = parseFloat(document.getElementById('item-price').value);

//     if (!itemName || isNaN(itemPrice)) {
//       alert("Please enter a valid item name and price.");
//       return;
//     }

//     const now = new Date();
//     const time = formatTime(now);

//     // Check daily limit
//     if (dailySpent + itemPrice > dailyLimit) {
//       const addToNextDay = confirm("Daily limit exceeded! Would you like to add this item to the next day's budget?");
//       if (addToNextDay) {
//         const nextDate = new Date(now);
//         nextDate.setDate(now.getDate() + 1);
//         const nextDay = nextDate.toISOString().split('T')[0];

//         try {
//           const newItem = {
//             name: itemName,
//             price: itemPrice,
//             date: nextDay,
//             time,
//             day: getDayName(nextDay)
//           };

//           const response = await fetch('http://localhost:5000/items', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(newItem),
//           });

//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }

//           const addedItem = await response.json();
//           shoppingHistory.push(addedItem);
//           alert(`Item added to the next day's budget (Date: ${nextDay})`);
//           form.reset();
//           updateDisplay();
//         } catch (error) {
//           console.error("Error adding item:", error);
//           alert("Failed to add item. Please check the console for details.");
//         }
//         return;
//       } else {
//         return;
//       }
//     }

//     // Normal add
//     try {
//       const newItem = {
//         name: itemName,
//         price: itemPrice,
//         date: currentDate,
//         time,
//         day: getDayName(currentDate)
//       };

//       const response = await fetch('http://localhost:5000/items', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newItem),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const addedItem = await response.json();
//       shoppingHistory.push(addedItem);
//       form.reset();
//       updateDisplay();
//     } catch (error) {
//       console.error("Error adding item:", error);
//       alert("Failed to add item. Please check the console for details.");
//     }
//   });

//   // Automatically handle date change (for real-time date rollover)
//   function handleDateChange() {
//     const now = new Date();
//     const today = now.toISOString().split('T')[0];
//     if (currentDate !== today) {
//       currentDate = today;
//       // Also update the date selector if available
//       if (dateSelector) {
//         dateSelector.value = currentDate;
//       }
//       dailySpent = 0; // Reset daily spent for the new day
//       updateDisplay();
//     }
//   }

//   setInterval(handleDateChange, 60000);

//   // Fetch initial data
//   async function fetchItems() {
//     try {
//       const response = await fetch('http://localhost:5000/items', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       shoppingHistory = await response.json();
//       updateDisplay();
//     } catch (error) {
//       console.error("Could not fetch items:", error);
//     }
//   }

//   fetchItems();
// });










//--------------------------------------------------------------------------------
//-------------------------------------------------------------------------------




// document.addEventListener('DOMContentLoaded', () => {
//   const dailyLimit = 25000;
//   let currentDate = new Date().toISOString().split('T')[0]; // today's date
//   let shoppingHistory = [];

//   const dailyLimitEl = document.getElementById('daily-limit');
//   const dailyTotalEl = document.getElementById('daily-total');
//   const historyTable = document.getElementById('history-table');
//   const form = document.getElementById('shopping-form');
//   const dateSelector = document.getElementById('date-selector');

//   // Set the date selector to today's date initially
//   if (dateSelector) {
//     dateSelector.value = currentDate;
//     dateSelector.addEventListener('change', () => {
//       currentDate = dateSelector.value;
//       updateDisplay();
//     });
//   }

//   // Helper function to get the day of the week
//   function getDayName(dateString) {
//     const date = new Date(dateString);
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return days[date.getDay()];
//   }


//   // Helper function to format time as hh:mm AM/PM
//   function formatTime(input) {
//     let hours, minutes, amPm;

//     if (input instanceof Date) {
//       // Input is a Date object
//       hours = input.getHours();
//       minutes = input.getMinutes();
//       amPm = hours >= 12 ? 'PM' : 'AM';
//       hours = hours % 12 || 12; // Convert 0 (midnight) or 12 (noon) to 12-hour format
//       return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//     }

//     if (typeof input === 'string') {
//       if (input.includes('AM') || input.includes('PM')) {
//         // Input is already in 12-hour format
//         return input; // No conversion needed
//       }

//       // Input is in 24-hour format (HH:mm)
//       const parts = input.split(':');
//       if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
//         hours = parseInt(parts[0], 10);
//         minutes = parseInt(parts[1], 10);
//         amPm = hours >= 12 ? 'PM' : 'AM';
//         hours = hours % 12 || 12; // Convert to 12-hour format
//         return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//       } else {
//         throw new Error(`Invalid time format: ${input}`);
//       }
//     }

//     throw new Error('Invalid input for formatTime');
//   }


//   async function fetchItems() {
//     try {
//       const response = await fetch('http://localhost:5000/items');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       shoppingHistory = await response.json();
//       updateDisplay();
//     } catch (error) {
//       console.error("Could not fetch items:", error);
//     }
//   }

//   function updateDisplay() {
//     // Filter items by currentDate
//     const itemsToday = shoppingHistory.filter(item => item.date === currentDate);
//     const dailyTotal = itemsToday.reduce((sum, i) => sum + i.price, 0);

//     dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//     dailyLimitEl.textContent = `$${(dailyLimit - dailyTotal).toLocaleString()}`;

//     renderHistory(itemsToday);
//   }

//   function renderHistory(items) {
//     const tbody = historyTable.querySelector('tbody');
//     tbody.innerHTML = '';

//     items.forEach((item, index) => {
//       const row = document.createElement('tr');

//       // Format time if it's stored as a simple string HH:MM or similar
//       const formattedTime = formatTime(item.time);

//       row.innerHTML = `
//         <td>${item.name}</td>
//         <td>$${item.price.toLocaleString()}</td>
//         <td>${item.date}</td>
//         <td>${formattedTime}</td>
//         <td>${getDayName(item.date)}</td>
//         <td>
//           <button class="edit-btn" data-index="${index}">Edit</button>
//           <button class="delete-btn" data-index="${index}">Delete</button>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });

//     // Attach events
//     document.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', handleEditItem);
//     });
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', handleDeleteItem);
//     });
//   }

//   async function handleDeleteItem(e) {
//     const index = e.target.dataset.index;

//     // We need the _id from the full shoppingHistory
//     // But note we filtered in updateDisplay, so let's refetch the full item by date
//     // Instead, let's just find the item in the full shoppingHistory that matches this day's index.
//     const itemsToday = shoppingHistory.filter(item => item.date === currentDate);
//     const item = itemsToday[index];

//     if (!item || !item._id) {
//       console.error("Item or item._id not found");
//       return;
//     }

//     const confirmDelete = confirm("Are you sure you want to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://localhost:5000/items/${item._id}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Remove it from local array
//       const fullIndex = shoppingHistory.findIndex(i => i._id === item._id);
//       if (fullIndex > -1) {
//         shoppingHistory.splice(fullIndex, 1);
//       }
//       updateDisplay();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   }

//   async function handleEditItem(e) {
//     const index = e.target.dataset.index;
//     const itemsToday = shoppingHistory.filter(item => item.date === currentDate);
//     const item = itemsToday[index];
//     if (!item) return;

//     const newDate = prompt("Enter new date (YYYY-MM-DD):", item.date) || item.date;
//     const newTime = prompt("Enter new time (HH:MM in 24-hour):", item.time) || item.time;

//     const updatedItem = { ...item, date: newDate, time: newTime };

//     try {
//       const response = await fetch(`http://localhost:5000/items/${item._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedItem),
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Update local item
//       const fullIndex = shoppingHistory.findIndex(i => i._id === item._id);
//       if (fullIndex > -1) {
//         shoppingHistory[fullIndex] = updatedItem;
//       }
//       updateDisplay();
//     } catch (error) {
//       console.error("Error updating item:", error);
//     }
//   }

//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     const itemName = document.getElementById('item-name').value.trim();
//     const itemPrice = parseFloat(document.getElementById('item-price').value);

//     if (!itemName || isNaN(itemPrice)) {
//       alert("Please enter a valid item name and price.");
//       return;
//     }

//     const now = new Date();
//     const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

//     const newItem = {
//       name: itemName,
//       price: itemPrice,
//       date: currentDate,
//       time
//     };

//     try {
//       const response = await fetch('http://localhost:5000/items', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newItem),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const addedItem = await response.json();
//       shoppingHistory.push(addedItem);
//       form.reset();
//       updateDisplay();
//     } catch (error) {
//       console.error("Error adding item:", error);
//       alert("Failed to add item. Check console for details.");
//     }
//   });

//   // Initial fetch
//   fetchItems();
// });







//-------------------------------------------------------------------------------
//--------------------------------------------------------------------------------



// document.addEventListener('DOMContentLoaded', () => {
//   const dailyLimit = 25000; // The daily spending limit
//   let currentDate = new Date().toISOString().split('T')[0]; // Today's date as YYYY-MM-DD
//   let shoppingHistory = [];

//   const dailyLimitEl = document.getElementById('daily-limit');
//   const dailyTotalEl = document.getElementById('daily-total');
//   const historyTable = document.getElementById('history-table');
//   const form = document.getElementById('shopping-form');
//   const dateSelector = document.getElementById('date-selector');

//   // Set the date selector to today's date initially
//   if (dateSelector) {
//     dateSelector.value = currentDate;
//     dateSelector.addEventListener('change', () => {
//       currentDate = dateSelector.value;
//       updateDisplay();
//     });
//   }

//   // Helper: Get day name from date string (YYYY-MM-DD)
//   function getDayName(dateString) {
//     const date = new Date(dateString);
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return days[date.getDay()];
//   }

//   // Helper: Format time as hh:mm AM/PM
//   function formatTime(input) {
//     let hours, minutes, amPm;

//     if (input instanceof Date) {
//       hours = input.getHours();
//       minutes = input.getMinutes();
//       amPm = hours >= 12 ? 'PM' : 'AM';
//       hours = hours % 12 || 12;
//       return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//     }

//     if (typeof input === 'string') {
//       if (input.includes('AM') || input.includes('PM')) {
//         // Already in 12-hour format
//         return input;
//       }

//       // Input is 24-hour format
//       const parts = input.split(':');
//       if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
//         hours = parseInt(parts[0], 10);
//         minutes = parseInt(parts[1], 10);
//         amPm = hours >= 12 ? 'PM' : 'AM';
//         hours = hours % 12 || 12;
//         return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
//       } else {
//         throw new Error(`Invalid time format: ${input}`);
//       }
//     }

//     throw new Error('Invalid input for formatTime');
//   }

//   // Fetch items from the backend
//   async function fetchItems() {
//     try {
//       const response = await fetch('http://localhost:5000/items');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       shoppingHistory = await response.json();
//       updateDisplay();
//     } catch (error) {
//       console.error("Could not fetch items:", error);
//     }
//   }

//   // Update the display: daily total, daily limit remaining, and history table
//   function updateDisplay() {
//     const itemsToday = shoppingHistory.filter(item => item.date === currentDate);
//     const dailyTotal = itemsToday.reduce((sum, i) => sum + i.price, 0);

//     dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//     dailyLimitEl.textContent = `$${(dailyLimit - dailyTotal).toLocaleString()}`;

//     renderHistory(itemsToday);
//   }

//   // Render today's items in the history table
//   function renderHistory(items) {
//     const tbody = historyTable.querySelector('tbody');
//     tbody.innerHTML = '';

//     items.forEach((item, index) => {
//       const row = document.createElement('tr');
//       const formattedTime = formatTime(item.time);

//       row.innerHTML = `
//         <td>${item.name}</td>
//         <td>$${item.price.toLocaleString()}</td>
//         <td>${item.date}</td>
//         <td>${formattedTime}</td>
//         <td>${getDayName(item.date)}</td>
//         <td>
//           <button class="edit-btn" data-index="${index}">Edit</button>
//           <button class="delete-btn" data-index="${index}">Delete</button>
//         </td>
//       `;

//       tbody.appendChild(row);
//     });

//     // Attach event listeners to Edit and Delete buttons
//     document.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', handleEditItem);
//     });
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', handleDeleteItem);
//     });
//   }

//   // Handle deleting an item
//   async function handleDeleteItem(e) {
//     const index = e.target.dataset.index;
//     const itemsToday = shoppingHistory.filter(item => item.date === currentDate);
//     const item = itemsToday[index];

//     if (!item || !item._id) {
//       console.error("Item or item._id not found");
//       return;
//     }

//     const confirmDelete = confirm("Are you sure you want to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://localhost:5000/items/${item._id}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Remove it from local array
//       const fullIndex = shoppingHistory.findIndex(i => i._id === item._id);
//       if (fullIndex > -1) {
//         shoppingHistory.splice(fullIndex, 1);
//       }
//       updateDisplay();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   }

//   // // Handle editing an item (date/time)
//   // async function handleEditItem(e) {
//   //   const index = e.target.dataset.index;
//   //   const itemsToday = shoppingHistory.filter(item => item.date === currentDate);
//   //   const item = itemsToday[index];
//   //   if (!item) return;

//   //   const newDate = prompt("Enter new date (YYYY-MM-DD):", item.date) || item.date;
//   //   const newTime = prompt("Enter new time (HH:MM in 24-hour format):", item.time) || item.time;
//   //   const updatedItem = { ...item, date: newDate, time: newTime };

//   //   try {
//   //     const response = await fetch(`http://localhost:5000/items/${item._id}`, {
//   //       method: 'PUT',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(updatedItem),
//   //     });
//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }

//   //     // Update local item
//   //     const fullIndex = shoppingHistory.findIndex(i => i._id === item._id);
//   //     if (fullIndex > -1) {
//   //       shoppingHistory[fullIndex] = updatedItem;
//   //     }
//   //     updateDisplay();
//   //   } catch (error) {
//   //     console.error("Error updating item:", error);
//   //   }
//   // }



//   async function handleEditItem(e) {
//     const index = e.target.dataset.index;
//     const item = shoppingHistory[index];
//     if (!item) return;

//     const row = e.target.parentElement.parentElement;

//     // Store the original edit button
//     const editBtn = e.target;

//     // Create input fields
//     const dateInput = document.createElement('input');
//     dateInput.type = 'date';
//     dateInput.value = item.date;
//     dateInput.className = 'edit-date-input';

//     const timeInput = document.createElement('input');
//     timeInput.type = 'time';
//     timeInput.className = 'edit-time-input';

//     // Convert the current item.time (AM/PM) to 24-hour format for the time input
//     const time24 = convertTo24Hour(item.time);
//     timeInput.value = time24;

//     const saveBtn = document.createElement('button');
//     saveBtn.textContent = 'Save';
//     saveBtn.className = 'save-btn';

//     const dateCell = row.children[2];
//     const timeCell = row.children[3];

//     // Clear current cells and insert inputs
//     dateCell.innerHTML = '';
//     timeCell.innerHTML = '';
//     dateCell.appendChild(dateInput);
//     timeCell.appendChild(timeInput);

//     // Replace the edit button with the save button
//     editBtn.replaceWith(saveBtn);

//     saveBtn.addEventListener('click', async () => {
//       const newDate = dateInput.value;
//       const newTime24 = timeInput.value; // This is 24-hour format from the input

//       if (newDate && newTime24) {
//         // Convert the 24-hour time back to AM/PM using formatTime
//         const newDateTime = new Date(`${newDate}T${newTime24}`);
//         const newTimeFormatted = formatTime(newDateTime); // returns AM/PM format

//         const updatedItem = {
//           ...item,
//           date: newDate,
//           time: newTimeFormatted,
//           day: getDayName(newDate)
//         };

//         try {
//           const response = await fetch(`http://localhost:5000/items/${item._id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updatedItem),
//           });

//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }

//           // Update locally
//           shoppingHistory[index] = updatedItem;

//           // Show the updated values in the cells
//           dateCell.textContent = newDate;
//           timeCell.textContent = updatedItem.time;

//           // Restore the edit button
//           saveBtn.replaceWith(editBtn);
//           editBtn.addEventListener('click', handleEditItem);

//           updateDisplay();
//         } catch (error) {
//           console.error("Error updating item:", error);
//           alert("Failed to update item. Check the console for details.");
//         }
//       }
//     });
//   }

//   // Helper: Convert AM/PM time to 24-hour format for the time input
//   function convertTo24Hour(timeStr) {
//     if (!timeStr) return '00:00';
//     // If already in HH:MM (24-hour) format without AM/PM, just return it
//     if (!timeStr.includes('AM') && !timeStr.includes('PM')) return timeStr;

//     let [time, modifier] = timeStr.split(' ');
//     let [hours, minutes] = time.split(':');
//     hours = parseInt(hours, 10);

//     if (modifier === 'PM' && hours < 12) hours += 12;
//     if (modifier === 'AM' && hours === 12) hours = 0;

//     return `${hours.toString().padStart(2, '0')}:${minutes}`;
//   }





//   // Convert AM/PM time to 24-hour
//   function convertTo24Hour(timeStr) {
//     if (timeStr.includes('AM') || timeStr.includes('PM')) {
//       let [time, modifier] = timeStr.split(' ');
//       let [hours, minutes] = time.split(':');
//       hours = parseInt(hours, 10);
//       if (modifier === 'PM' && hours < 12) hours += 12;
//       if (modifier === 'AM' && hours === 12) hours = 0;
//       return `${hours}:${minutes}`;
//     }
//     return timeStr;
//   }

//   // Convert 24-hour time to AM/PM
//   function formatTo12Hour(timeStr) {
//     let [hour, minute] = timeStr.split(':').map(Number);
//     const amPm = hour >= 12 ? 'PM' : 'AM';
//     hour = hour % 12 || 12;
//     return `${hour}:${minute.toString().padStart(2, '0')} ${amPm}`;
//   }


//   // Handle adding a new item
//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     const itemName = document.getElementById('item-name').value.trim();
//     const itemPrice = parseFloat(document.getElementById('item-price').value);

//     if (!itemName || isNaN(itemPrice)) {
//       alert("Please enter a valid item name and price.");
//       return;
//     }

//     // Check if adding this item would exceed the daily limit
//     const itemsToday = shoppingHistory.filter(item => item.date === currentDate);
//     const dailyTotal = itemsToday.reduce((sum, i) => sum + i.price, 0);
//     if (dailyTotal + itemPrice > dailyLimit) {
//       alert(`Adding this item would exceed the daily limit of $25,000. Current total: $${dailyTotal.toLocaleString()}.`);
//       return;
//     }

//     const now = new Date();
//     const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

//     const newItem = {
//       name: itemName,
//       price: itemPrice,
//       date: currentDate,
//       time
//     };

//     try {
//       const response = await fetch('http://localhost:5000/items', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newItem),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const addedItem = await response.json();
//       shoppingHistory.push(addedItem);
//       form.reset();
//       updateDisplay();
//     } catch (error) {
//       console.error("Error adding item:", error);
//       alert("Failed to add item. Check console for details.");
//     }
//   });

//   // Initial fetch of items
//   fetchItems();
// });










//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------






// document.addEventListener('DOMContentLoaded', () => {
//   const dailyLimit = 25000; // The five-day spending limit
//   const monthlyBudget = 150000; // The monthly budget
//   let monthlyBudgetRemaining = monthlyBudget;
//   let currentDate = new Date().toISOString().split('T')[0]; // Today's date as YYYY-MM-DD
//   let shoppingHistory = [];

//   // DOM Elements
//   const dailyLimitEl = document.getElementById('daily-limit');
//   const dailyTotalEl = document.getElementById('daily-total');
//   const monthlyBudgetEl = document.getElementById('monthly-budget');
//   const historyTable = document.getElementById('history-table');
//   const form = document.getElementById('shopping-form');
//   const dateSelector = document.getElementById('date-selector');

//   // Set the date selector to today's date initially
//   if (dateSelector) {
//     dateSelector.value = currentDate;
//     dateSelector.addEventListener('change', () => {
//       currentDate = dateSelector.value;
//       updateDisplay();
//     });
//   }

//   // Helper: Get the start of the current five-day cycle
//   function getFiveDayCycleStart(date) {
//     const startDate = new Date(date.getFullYear(), 0, 1); // 1st Jan of the year
//     const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
//     const cycleStartDay = Math.floor(daysSinceStart / 5) * 5;
//     startDate.setDate(startDate.getDate() + cycleStartDay);
//     return startDate.toISOString().split('T')[0];
//   }

//   // Helper: Get the end of the current five-day cycle
//   function getFiveDayCycleEnd(cycleStartDate) {
//     const endDate = new Date(cycleStartDate);
//     endDate.setDate(endDate.getDate() + 4); // Five-day period ends on the fourth day after start
//     return endDate.toISOString().split('T')[0];
//   }

//   // Helper: Get the first day of the current month
//   function getFirstOfMonth(date) {
//     return new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
//   }

//   // Update display: monthly budget, daily total, and five-day limit remaining
//   function updateDisplay() {
//     const today = new Date(currentDate);

//     // Monthly budget renewal
//     const firstOfMonth = getFirstOfMonth(today);
//     if (currentDate === firstOfMonth) {
//       monthlyBudgetRemaining = monthlyBudget;
//     }

//     // Five-day cycle logic
//     const cycleStartDate = getFiveDayCycleStart(today);
//     const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);

//     // Calculate total spending in the current five-day cycle
//     const cycleSpending = shoppingHistory
//       .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//       .reduce((sum, item) => sum + item.price, 0);

//     // Daily total spending (sum of all five-day cycle spending)
//     const dailyTotal = cycleSpending;

//     // Five-day limit remaining
//     const fiveDayLimitRemaining = dailyLimit - dailyTotal;

//     // Update the UI
//     if (monthlyBudgetEl) {
//       monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
//     }
//     if (dailyLimitEl) {
//       dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
//     }
//     if (dailyTotalEl) {
//       dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//     }

//     // Disable form if five-day limit is exceeded
//     if (fiveDayLimitRemaining <= 0) {
//       form.querySelector('button[type="submit"]').disabled = true;
//     } else {
//       form.querySelector('button[type="submit"]').disabled = false;
//     }

//     renderHistory(shoppingHistory.filter(item => item.date === currentDate));
//   }

//   // Render today's items in the history table
//   function renderHistory(items) {
//     const tbody = historyTable.querySelector('tbody');
//     tbody.innerHTML = '';

//     items.forEach((item) => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${item.name}</td>
//         <td>$${item.price.toLocaleString()}</td>
//         <td>${item.date}</td>
//         <td>${item.time}</td>
//         <td>${item.day}</td>
//         <td>
//           <button class="edit-btn" data-id="${item._id}">Edit</button>
//           <button class="delete-btn" data-id="${item._id}">Delete</button>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });

//     document.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', handleEditItem);
//     });
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', handleDeleteItem);
//     });
//   }

//   // Handle deleting an item
//   async function handleDeleteItem(e) {
//     const itemId = e.target.dataset.id;

//     if (!itemId) {
//       console.error("No item ID found for deletion.");
//       return;
//     }

//     const confirmDelete = confirm("Are you sure you want to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://localhost:5000/items/${itemId}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       shoppingHistory = shoppingHistory.filter(item => item._id !== itemId);
//       updateDisplay();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       alert("Failed to delete item. Check console for details.");
//     }
//   }

//   // Handle editing an item (inline editing)
//   async function handleEditItem(e) {
//     const itemId = e.target.dataset.id;

//     const itemIndex = shoppingHistory.findIndex(it => it._id === itemId);
//     if (itemIndex === -1) return;
//     const item = shoppingHistory[itemIndex];

//     const row = e.target.closest('tr');
//     if (!row) return;

//     const dateCell = row.children[2];
//     const timeCell = row.children[3];
//     const actionsCell = row.children[4];

//     const dateInput = document.createElement('input');
//     dateInput.type = 'date';
//     dateInput.value = item.date;

//     const timeInput = document.createElement('input');
//     timeInput.type = 'time';
//     timeInput.value = item.time;

//     dateCell.innerHTML = '';
//     timeCell.innerHTML = '';
//     dateCell.appendChild(dateInput);
//     timeCell.appendChild(timeInput);

//     const saveBtn = document.createElement('button');
//     saveBtn.textContent = 'Save';
//     actionsCell.innerHTML = '';
//     actionsCell.appendChild(saveBtn);

//     saveBtn.addEventListener('click', async () => {
//       const newDate = dateInput.value;
//       const newTime = timeInput.value;

//       if (!newDate || !newTime) {
//         alert("Please enter both date and time.");
//         return;
//       }

//       const updatedItem = { ...item, date: newDate, time: newTime };

//       try {
//         const response = await fetch(`http://localhost:5000/items/${itemId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(updatedItem),
//         });

//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//         shoppingHistory[itemIndex] = updatedItem;
//         updateDisplay();
//       } catch (error) {
//         console.error("Error updating item:", error);
//         alert("Failed to update item.");
//       }
//     });
//   }

//   // Handle adding a new item
//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     const itemName = document.getElementById('item-name').value.trim();
//     const itemPrice = parseFloat(document.getElementById('item-price').value);

//     if (!itemName || isNaN(itemPrice)) {
//       alert("Please enter a valid item name and price.");
//       return;
//     }

//     const cycleStartDate = getFiveDayCycleStart(new Date(currentDate));
//     const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);

//     const cycleSpending = shoppingHistory
//       .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//       .reduce((sum, item) => sum + item.price, 0);

//     if (cycleSpending + itemPrice > dailyLimit) {
//       alert("Five-day limit exceeded!");
//       return;
//     }

//     const now = new Date();
//     const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

//     const newItem = {
//       name: itemName,
//       price: itemPrice,
//       date: currentDate,
//       time
//     };

//     try {
//       const response = await fetch('http://localhost:5000/items', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newItem),
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//       const addedItem = await response.json();
//       shoppingHistory.push(addedItem);
//       form.reset();
//       updateDisplay();
//     } catch (error) {
//       console.error("Error adding item:", error);
//     }
//   });




//   // Fetch items from the backend
//   async function fetchItems() {
//     try {
//       const response = await fetch('http://localhost:5000/items'); // Adjust the URL to match your backend
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       shoppingHistory = await response.json(); // Store the fetched items in shoppingHistory
//       console.log("Fetched items:", shoppingHistory); // Debugging
//       updateDisplay(); // Update the UI with the fetched items
//     } catch (error) {
//       console.error("Could not fetch items:", error);
//     }
//   }


//   fetchItems();
// });





//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


// today 12/21

// document.addEventListener('DOMContentLoaded', () => {
//   const dailyLimit = 25000; // The five-day spending limit
//   const monthlyBudget = 150000; // The monthly budget
//   // let monthlyBudgetRemaining = monthlyBudget; // REMOVED: We'll calculate dynamically
//   let currentDate = new Date().toISOString().split('T')[0]; // Today's date as YYYY-MM-DD
//   let shoppingHistory = [];

//   // DOM Elements
//   const dailyLimitEl = document.getElementById('daily-limit');
//   const dailyTotalEl = document.getElementById('daily-total');
//   const monthlyBudgetEl = document.getElementById('monthly-budget');
//   const historyTable = document.getElementById('history-table');
//   const form = document.getElementById('shopping-form');
//   const dateSelector = document.getElementById('date-selector');

//   // Set the date selector to today's date initially
//   if (dateSelector) {
//     dateSelector.value = currentDate;
//     dateSelector.addEventListener('change', () => {
//       currentDate = dateSelector.value;
//       updateDisplay();
//     });
//   }

//   // Helper: Get the start of the current five-day cycle
//   function getFiveDayCycleStart(date) {
//     const startDate = new Date(date.getFullYear(), 0, 1); // 1st Jan of the year
//     const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
//     const cycleStartDay = Math.floor(daysSinceStart / 5) * 5;
//     startDate.setDate(startDate.getDate() + cycleStartDay);
//     return startDate.toISOString().split('T')[0];
//   }

//   // Helper: Get the end of the current five-day cycle
//   function getFiveDayCycleEnd(cycleStartDate) {
//     const endDate = new Date(cycleStartDate);
//     endDate.setDate(endDate.getDate() + 4);
//     return endDate.toISOString().split('T')[0];
//   }

//   // Helper: Get the first day of the current month
//   function getFirstOfMonth(date) {
//     return new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
//   }

//   // CHANGED: Helper to calculate how much has been spent in the current month
//   function getMonthlySpent(shoppingHistory, dateStr) {
//     const dateObj = new Date(dateStr);
//     const currentYear = dateObj.getFullYear();
//     const currentMonth = dateObj.getMonth();

//     return shoppingHistory
//       .filter(item => {
//         const itemDate = new Date(item.date);
//         return (
//           itemDate.getFullYear() === currentYear &&
//           itemDate.getMonth() === currentMonth
//         );
//       })
//       .reduce((sum, item) => sum + item.price, 0);
//   }

//   // Update display: monthly budget, daily total, and five-day limit remaining
//   function updateDisplay() {
//     const today = new Date(currentDate);

//     // CHANGED: Dynamically calculate monthlySpent for the current month
//     const monthlySpentThisMonth = getMonthlySpent(shoppingHistory, currentDate);
//     const monthlyBudgetRemaining = monthlyBudget - monthlySpentThisMonth;

//     // Five-day cycle logic
//     const cycleStartDate = getFiveDayCycleStart(today);
//     const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);

//     // Calculate total spending in the current five-day cycle
//     const cycleSpending = shoppingHistory
//       .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//       .reduce((sum, item) => sum + item.price, 0);

//     // dailyTotal is the sum of the five-day cycle spending
//     const dailyTotal = cycleSpending;

//     // Five-day limit remaining
//     const fiveDayLimitRemaining = dailyLimit - dailyTotal;

//     // Update the UI
//     if (monthlyBudgetEl) {
//       monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
//     }
//     if (dailyLimitEl) {
//       dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
//     }
//     if (dailyTotalEl) {
//       dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//     }

//     // Disable form if five-day limit is exceeded
//     if (fiveDayLimitRemaining <= 0) {
//       form.querySelector('button[type="submit"]').disabled = true;
//     } else {
//       form.querySelector('button[type="submit"]').disabled = false;
//     }

//     // Show only items that match the current date
//     renderHistory(shoppingHistory.filter(item => item.date === currentDate));
//   }

//   // Render today's items in the history table
//   function renderHistory(items) {
//     const tbody = historyTable.querySelector('tbody');
//     tbody.innerHTML = '';

//     items.forEach((item) => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${item.name}</td>
//         <td>$${item.price.toLocaleString()}</td>
//         <td>${item.date}</td>
//         <td>${item.time}</td>
//         <td>${item.day}</td>
//         <td>
//           <button class="edit-btn" data-id="${item._id}">Edit</button>
//           <button class="delete-btn" data-id="${item._id}">Delete</button>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });

//     document.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', handleEditItem);
//     });
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', handleDeleteItem);
//     });
//   }

//   // Handle deleting an item
//   async function handleDeleteItem(e) {
//     const itemId = e.target.dataset.id;

//     if (!itemId) {
//       console.error("No item ID found for deletion.");
//       return;
//     }

//     const confirmDelete = confirm("Are you sure you want to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://localhost:5000/items/${itemId}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       shoppingHistory = shoppingHistory.filter(item => item._id !== itemId);
//       updateDisplay();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       alert("Failed to delete item. Check console for details.");
//     }
//   }

//   // Handle editing an item (inline editing)
//   async function handleEditItem(e) {
//     const itemId = e.target.dataset.id;

//     const itemIndex = shoppingHistory.findIndex(it => it._id === itemId);
//     if (itemIndex === -1) return;
//     const item = shoppingHistory[itemIndex];

//     const row = e.target.closest('tr');
//     if (!row) return;

//     const dateCell = row.children[2];
//     const timeCell = row.children[3];
//     const actionsCell = row.children[4];

//     const dateInput = document.createElement('input');
//     dateInput.type = 'date';
//     dateInput.value = item.date;

//     const timeInput = document.createElement('input');
//     timeInput.type = 'time';
//     timeInput.value = item.time;

//     dateCell.innerHTML = '';
//     timeCell.innerHTML = '';
//     dateCell.appendChild(dateInput);
//     timeCell.appendChild(timeInput);

//     const saveBtn = document.createElement('button');
//     saveBtn.textContent = 'Save';
//     actionsCell.innerHTML = '';
//     actionsCell.appendChild(saveBtn);

//     saveBtn.addEventListener('click', async () => {
//       const newDate = dateInput.value;
//       const newTime = timeInput.value;

//       if (!newDate || !newTime) {
//         alert("Please enter both date and time.");
//         return;
//       }

//       const updatedItem = { ...item, date: newDate, time: newTime };

//       try {
//         const response = await fetch(`http://localhost:5000/items/${itemId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(updatedItem),
//         });

//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//         shoppingHistory[itemIndex] = updatedItem;
//         updateDisplay();
//       } catch (error) {
//         console.error("Error updating item:", error);
//         alert("Failed to update item.");
//       }
//     });
//   }

//   // Handle adding a new item
//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     const itemName = document.getElementById('item-name').value.trim();
//     const itemPrice = parseFloat(document.getElementById('item-price').value);

//     if (!itemName || isNaN(itemPrice)) {
//       alert("Please enter a valid item name and price.");
//       return;
//     }

//     const cycleStartDate = getFiveDayCycleStart(new Date(currentDate));
//     const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);

//     const cycleSpending = shoppingHistory
//       .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//       .reduce((sum, item) => sum + item.price, 0);

//     if (cycleSpending + itemPrice > dailyLimit) {
//       alert("Five-day limit exceeded!");
//       return;
//     }

//     const now = new Date();
//     const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

//     const newItem = {
//       name: itemName,
//       price: itemPrice,
//       date: currentDate,
//       time
//     };

//     try {
//       const response = await fetch('http://localhost:5000/items', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newItem),
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//       const addedItem = await response.json();
//       shoppingHistory.push(addedItem);
//       form.reset();
//       updateDisplay();
//     } catch (error) {
//       console.error("Error adding item:", error);
//     }
//   });

//   // Fetch items from the backend
//   async function fetchItems() {
//     try {
//       const response = await fetch('http://localhost:5000/items'); // Adjust the URL to match your backend
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       shoppingHistory = await response.json();
//       console.log("Fetched items:", shoppingHistory); // Debugging
//       updateDisplay(); // Update the UI with the fetched items
//     } catch (error) {
//       console.error("Could not fetch items:", error);
//     }
//   }

//   fetchItems();
// });






//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


// today 12/21 at 7:58AM



// document.addEventListener('DOMContentLoaded', () => {
//   const dailyLimit = 25000;        // The five-day spending limit
//   const monthlyBudget = 150000;    // The monthly budget
//   let currentDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
//   let shoppingHistory = [];

//   // DOM Elements
//   const dailyLimitEl = document.getElementById('daily-limit');
//   const dailyTotalEl = document.getElementById('daily-total');
//   const monthlyBudgetEl = document.getElementById('monthly-budget');
//   const historyTable = document.getElementById('history-table');
//   const form = document.getElementById('shopping-form');
//   const dateSelector = document.getElementById('date-selector');

//   // 1) On page load, set the date selector to today's date
//   if (dateSelector) {
//     dateSelector.value = currentDate;
//     dateSelector.addEventListener('change', () => {
//       currentDate = dateSelector.value;
//       updateDisplay();
//     });
//   }

//   // ----------------------------------------------------------------------------
//   //                              Helper Functions
//   // ----------------------------------------------------------------------------

//   // Convert a date string to the day name, e.g. "2024-12-01" -> "Sunday"
//   function getDayName(dateString) {
//     const dateObj = new Date(dateString);
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return days[dateObj.getDay()];
//   }

//   // Return the start of the current five-day cycle for a given Date
//   function getFiveDayCycleStart(date) {
//     // Start counting from Jan 1 of the same year
//     const startDate = new Date(date.getFullYear(), 0, 1);
//     const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
//     // Each cycle is 5 days; find how many 5-day blocks have elapsed
//     const cycleStartDay = Math.floor(daysSinceStart / 5) * 5;
//     startDate.setDate(startDate.getDate() + cycleStartDay);
//     return startDate.toISOString().split('T')[0];
//   }

//   // Return the end (inclusive) of the current five-day cycle
//   function getFiveDayCycleEnd(cycleStartDate) {
//     const endDate = new Date(cycleStartDate);
//     endDate.setDate(endDate.getDate() + 4); // 5-day block covers day 0..4
//     return endDate.toISOString().split('T')[0];
//   }

//   // Calculate how much has been spent in the current month
//   // so we can subtract it from the monthly budget
//   function getMonthlySpent(shoppingHistory, dateStr) {
//     const dateObj = new Date(dateStr);
//     const currentYear = dateObj.getFullYear();
//     const currentMonth = dateObj.getMonth(); // 0-based

//     return shoppingHistory
//       .filter(item => {
//         const itemDate = new Date(item.date);
//         return (
//           itemDate.getFullYear() === currentYear &&
//           itemDate.getMonth() === currentMonth
//         );
//       })
//       .reduce((sum, item) => sum + item.price, 0);
//   }

//   // ----------------------------------------------------------------------------
//   //                          Main Update Display Function
//   // ----------------------------------------------------------------------------

//   function updateDisplay() {
//     const today = new Date(currentDate);

//     // 1) Calculate monthly spending for the current month
//     const monthlySpentThisMonth = getMonthlySpent(shoppingHistory, currentDate);
//     const monthlyBudgetRemaining = monthlyBudget - monthlySpentThisMonth;

//     // 2) Five-day cycle
//     const cycleStartDate = getFiveDayCycleStart(today);
//     const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);

//     // Sum everything spent in this 5-day window
//     const cycleSpending = shoppingHistory
//       .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//       .reduce((sum, item) => sum + item.price, 0);

//     // 'dailyTotal' is effectively the 5-day total, as per your requirement
//     const dailyTotal = cycleSpending;

//     // Remaining for the 5-day cycle
//     const fiveDayLimitRemaining = dailyLimit - dailyTotal;

//     // Update the UI
//     if (monthlyBudgetEl) {
//       monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
//     }
//     if (dailyLimitEl) {
//       dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
//     }
//     if (dailyTotalEl) {
//       dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//     }

//     // Disable the Add Item form if we've exceeded the five-day limit
//     const submitBtn = form.querySelector('button[type="submit"]');
//     if (submitBtn) {
//       submitBtn.disabled = (fiveDayLimitRemaining <= 0);
//     }

//     // Show only items that match the current date in the table
//     renderHistory(shoppingHistory.filter(item => item.date === currentDate));
//   }

//   // ----------------------------------------------------------------------------
//   //                       Render Table Rows For Current Date
//   // ----------------------------------------------------------------------------

//   function renderHistory(items) {
//     const tbody = historyTable.querySelector('tbody');
//     tbody.innerHTML = '';

//     items.forEach(item => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${item.name}</td>
//         <td>$${item.price.toLocaleString()}</td>
//         <td>${item.date}</td>
//         <td>${item.time}</td>
//         <td>${item.day || 'No day provided'}</td>
//         <td>
//           <button class="edit-btn" data-id="${item._id}">Edit</button>
//           <button class="delete-btn" data-id="${item._id}">Delete</button>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });

//     // Attach Edit / Delete handlers
//     document.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', handleEditItem);
//     });
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', handleDeleteItem);
//     });
//   }

//   // ----------------------------------------------------------------------------
//   //                              Delete Handler
//   // ----------------------------------------------------------------------------

//   async function handleDeleteItem(e) {
//     const itemId = e.target.dataset.id;
//     if (!itemId) {
//       console.error("No item ID found for deletion.");
//       return;
//     }

//     const confirmDelete = confirm("Are you sure you want to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://localhost:5000/items/${itemId}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Remove from local array
//       shoppingHistory = shoppingHistory.filter(item => item._id !== itemId);
//       updateDisplay();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       alert("Failed to delete item. Check console for details.");
//     }
//   }

//   // ----------------------------------------------------------------------------
//   //                               Edit Handler
//   // ----------------------------------------------------------------------------

//   async function handleEditItem(e) {
//     const itemId = e.target.dataset.id;
//     const itemIndex = shoppingHistory.findIndex(it => it._id === itemId);
//     if (itemIndex === -1) return;

//     const item = shoppingHistory[itemIndex];
//     const row = e.target.closest('tr');
//     if (!row) return;

//     // We'll replace the date & time cells with input fields
//     const dateCell = row.children[2];
//     const timeCell = row.children[3];
//     const actionsCell = row.children[4];

//     // Create input fields
//     const dateInput = document.createElement('input');
//     dateInput.type = 'date';
//     dateInput.value = item.date;

//     const timeInput = document.createElement('input');
//     timeInput.type = 'time';
//     timeInput.value = item.time;

//     // Clear existing cells and place inputs
//     dateCell.innerHTML = '';
//     timeCell.innerHTML = '';
//     dateCell.appendChild(dateInput);
//     timeCell.appendChild(timeInput);

//     // Replace actions with a Save button
//     actionsCell.innerHTML = '';
//     const saveBtn = document.createElement('button');
//     saveBtn.textContent = 'Save';
//     actionsCell.appendChild(saveBtn);

//     // On Save
//     saveBtn.addEventListener('click', async () => {
//       const newDate = dateInput.value;
//       const newTime = timeInput.value;

//       if (!newDate || !newTime) {
//         alert("Please enter both date and time.");
//         return;
//       }

//       // Recalculate the day based on newDate
//       const updatedItem = {
//         ...item,
//         date: newDate,
//         time: newTime,
//         day: getDayName(newDate)
//       };

//       try {
//         const response = await fetch(`http://localhost:5000/items/${itemId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(updatedItem),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         // Update local array
//         shoppingHistory[itemIndex] = updatedItem;
//         updateDisplay();
//       } catch (error) {
//         console.error("Error updating item:", error);
//         alert("Failed to update item.");
//       }
//     });
//   }

//   // ----------------------------------------------------------------------------
//   //                             Add New Item
//   // ----------------------------------------------------------------------------

//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     const itemName = document.getElementById('item-name').value.trim();
//     const itemPrice = parseFloat(document.getElementById('item-price').value);

//     if (!itemName || isNaN(itemPrice)) {
//       alert("Please enter a valid item name and price.");
//       return;
//     }

//     // Check five-day cycle limit
//     const cycleStartDate = getFiveDayCycleStart(new Date(currentDate));
//     const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
//     const cycleSpending = shoppingHistory
//       .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//       .reduce((sum, item) => sum + item.price, 0);

//     if (cycleSpending + itemPrice > dailyLimit) {
//       alert("Five-day limit exceeded!");
//       return;
//     }

//     // Build new item
//     const now = new Date();
//     const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
//     const newItem = {
//       name: itemName,
//       price: itemPrice,
//       date: currentDate,
//       time,
//       day: getDayName(currentDate)  // <--- Store the day right away
//     };

//     try {
//       const response = await fetch('http://localhost:5000/items', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newItem),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const addedItem = await response.json();
//       shoppingHistory.push(addedItem);
//       form.reset();
//       updateDisplay();
//     } catch (error) {
//       console.error("Error adding item:", error);
//       alert("Failed to add item. Check console for details.");
//     }
//   });

//   // ----------------------------------------------------------------------------
//   //                         Fetch Items Initially
//   // ----------------------------------------------------------------------------

//   async function fetchItems() {
//     try {
//       const response = await fetch('http://localhost:5000/items');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       shoppingHistory = await response.json();
//       console.log("Fetched items:", shoppingHistory);
//       updateDisplay();
//     } catch (error) {
//       console.error("Could not fetch items:", error);
//     }
//   }

//   // Start
//   fetchItems();
// });







//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------





// today 12/21 at 8:13AM



// document.addEventListener('DOMContentLoaded', () => {
//   const dailyLimit = 25000;        // The five-day spending limit
//   const monthlyBudget = 150000;    // The monthly budget
//   let currentDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
//   let shoppingHistory = [];

//   // DOM Elements
//   const dailyLimitEl = document.getElementById('daily-limit');
//   const dailyTotalEl = document.getElementById('daily-total');
//   const monthlyBudgetEl = document.getElementById('monthly-budget');
//   const historyTable = document.getElementById('history-table');
//   const form = document.getElementById('shopping-form');
//   const dateSelector = document.getElementById('date-selector');

//   // ----------------------------------------------------------------------------
//   // 1) On page load, set the date selector to today's date
//   // ----------------------------------------------------------------------------
//   if (dateSelector) {
//     dateSelector.value = currentDate;
//     dateSelector.addEventListener('change', () => {
//       currentDate = dateSelector.value;
//       updateDisplay();
//     });
//   }

//   // ----------------------------------------------------------------------------
//   //                              Helper Functions
//   // ----------------------------------------------------------------------------

//   // Convert a date string to the day name, e.g. "2024-12-01" -> "Sunday"
//   function getDayName(dateString) {
//     const dateObj = new Date(dateString);
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return days[dateObj.getDay()];
//   }

//   // -- NEW HELPER (AM/PM conversion) -------------------------------------------
//   /**
//    * convertTo24Hour('10:05 AM') => '10:05'
//    * convertTo24Hour('9:40 PM')  => '21:40'
//    */
//   function convertTo24Hour(timeStr) {
//     // If it's already in HH:MM (24-hour) format, return as is
//     if (!timeStr.includes('AM') && !timeStr.includes('PM')) {
//       return timeStr;
//     }
//     let [time, modifier] = timeStr.split(' ');
//     let [hours, minutes] = time.split(':');
//     hours = parseInt(hours, 10);

//     if (modifier === 'PM' && hours < 12) hours += 12;
//     if (modifier === 'AM' && hours === 12) hours = 0;

//     return `${hours.toString().padStart(2, '0')}:${minutes}`;
//   }

//   /**
//    * formatTo12Hour('10:05') => '10:05 AM'
//    * formatTo12Hour('21:05') => '9:05 PM'
//    */
//   function formatTo12Hour(timeStr) {
//     if (!timeStr) return '12:00 AM'; // fallback
//     let [hour, minute] = timeStr.split(':').map(Number);
//     const amPm = hour >= 12 ? 'PM' : 'AM';
//     hour = hour % 12 || 12;
//     return `${hour}:${minute.toString().padStart(2, '0')} ${amPm}`;
//   }
//   // ----------------------------------------------------------------------------

//   // Return the start of the current five-day cycle for a given Date
//   function getFiveDayCycleStart(date) {
//     // Start counting from Jan 1 of the same year
//     const startDate = new Date(date.getFullYear(), 0, 1);
//     const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
//     const cycleStartDay = Math.floor(daysSinceStart / 5) * 5;
//     startDate.setDate(startDate.getDate() + cycleStartDay);
//     return startDate.toISOString().split('T')[0];
//   }

//   // Return the end (inclusive) of the current five-day cycle
//   function getFiveDayCycleEnd(cycleStartDate) {
//     const endDate = new Date(cycleStartDate);
//     endDate.setDate(endDate.getDate() + 4);
//     return endDate.toISOString().split('T')[0];
//   }

//   // Calculate how much has been spent in the current month
//   function getMonthlySpent(shoppingHistory, dateStr) {
//     const dateObj = new Date(dateStr);
//     const currentYear = dateObj.getFullYear();
//     const currentMonth = dateObj.getMonth();

//     return shoppingHistory
//       .filter(item => {
//         const itemDate = new Date(item.date);
//         return (
//           itemDate.getFullYear() === currentYear &&
//           itemDate.getMonth() === currentMonth
//         );
//       })
//       .reduce((sum, item) => sum + item.price, 0);
//   }

//   // ----------------------------------------------------------------------------
//   // 2) Main Update Display Function
//   // ----------------------------------------------------------------------------
//   function updateDisplay() {
//     const today = new Date(currentDate);

//     // (a) Calculate monthly spending for the current month
//     const monthlySpentThisMonth = getMonthlySpent(shoppingHistory, currentDate);
//     const monthlyBudgetRemaining = monthlyBudget - monthlySpentThisMonth;

//     // (b) Five-day cycle logic
//     const cycleStartDate = getFiveDayCycleStart(today);
//     const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);

//     // Sum everything spent in this 5-day window
//     const cycleSpending = shoppingHistory
//       .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//       .reduce((sum, item) => sum + item.price, 0);

//     // 'dailyTotal' is effectively the 5-day total
//     const dailyTotal = cycleSpending;
//     const fiveDayLimitRemaining = dailyLimit - dailyTotal;

//     // (c) Update the UI
//     if (monthlyBudgetEl) {
//       monthlyBudgetEl.textContent = `$${monthlyBudgetRemaining.toLocaleString()}`;
//     }
//     if (dailyLimitEl) {
//       dailyLimitEl.textContent = `$${fiveDayLimitRemaining.toLocaleString()}`;
//     }
//     if (dailyTotalEl) {
//       dailyTotalEl.textContent = `$${dailyTotal.toLocaleString()}`;
//     }

//     // (d) Disable the Add Item form if we've exceeded the five-day limit
//     const submitBtn = form.querySelector('button[type="submit"]');
//     if (submitBtn) {
//       submitBtn.disabled = (fiveDayLimitRemaining <= 0);
//     }

//     // (e) Show only items that match the current date
//     renderHistory(shoppingHistory.filter(item => item.date === currentDate));
//   }

//   // ----------------------------------------------------------------------------
//   // 3) Render Table Rows For Current Date
//   // ----------------------------------------------------------------------------
//   function renderHistory(items) {
//     const tbody = historyTable.querySelector('tbody');
//     tbody.innerHTML = '';

//     items.forEach(item => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${item.name}</td>
//         <td>$${item.price.toLocaleString()}</td>
//         <td>${item.date}</td>
//         <td>${item.time}</td>
//         <td>${item.day || 'No day provided'}</td>
//         <td>
//           <button class="edit-btn" data-id="${item._id}">Edit</button>
//           <button class="delete-btn" data-id="${item._id}">Delete</button>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });

//     // Attach Edit / Delete handlers
//     document.querySelectorAll('.edit-btn').forEach(btn => {
//       btn.addEventListener('click', handleEditItem);
//     });
//     document.querySelectorAll('.delete-btn').forEach(btn => {
//       btn.addEventListener('click', handleDeleteItem);
//     });
//   }

//   // ----------------------------------------------------------------------------
//   // 4) Delete Handler
//   // ----------------------------------------------------------------------------
//   async function handleDeleteItem(e) {
//     const itemId = e.target.dataset.id;
//     if (!itemId) {
//       console.error("No item ID found for deletion.");
//       return;
//     }

//     const confirmDelete = confirm("Are you sure you want to delete this item?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://localhost:5000/items/${itemId}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Remove from local array
//       shoppingHistory = shoppingHistory.filter(item => item._id !== itemId);
//       updateDisplay();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       alert("Failed to delete item. Check console for details.");
//     }
//   }

//   // ----------------------------------------------------------------------------
//   // 5) Edit Handler (Now with AM/PM conversion)
//   // ----------------------------------------------------------------------------
//   async function handleEditItem(e) {
//     const itemId = e.target.dataset.id;
//     const itemIndex = shoppingHistory.findIndex(it => it._id === itemId);
//     if (itemIndex === -1) return;

//     const item = shoppingHistory[itemIndex];
//     const row = e.target.closest('tr');
//     if (!row) return;

//     // We'll replace the date & time cells with input fields
//     const dateCell = row.children[2];
//     const timeCell = row.children[3];
//     const actionsCell = row.children[4];

//     // Create input fields
//     const dateInput = document.createElement('input');
//     dateInput.type = 'date';
//     dateInput.value = item.date;

//     // -- CHANGED: Convert item.time to 24-hour for the <input type="time">
//     const timeInput = document.createElement('input');
//     timeInput.type = 'time';
//     timeInput.value = convertTo24Hour(item.time);  // <--- Convert to HH:MM (24hr)

//     // Clear existing cells and place inputs
//     dateCell.innerHTML = '';
//     timeCell.innerHTML = '';
//     dateCell.appendChild(dateInput);
//     timeCell.appendChild(timeInput);

//     // Replace actions with a Save button
//     actionsCell.innerHTML = '';
//     const saveBtn = document.createElement('button');
//     saveBtn.textContent = 'Save';
//     actionsCell.appendChild(saveBtn);

//     // On Save
//     saveBtn.addEventListener('click', async () => {
//       const newDate = dateInput.value;
//       const newTime24 = timeInput.value; // e.g. "10:05"
//       if (!newDate || !newTime24) {
//         alert("Please enter both date and time.");
//         return;
//       }

//       // -- CHANGED: Convert back to AM/PM
//       const newTimeAMPM = formatTo12Hour(newTime24); // e.g. "10:05 AM"
//       const updatedItem = {
//         ...item,
//         date: newDate,
//         time: newTimeAMPM,           // <--- Store in AM/PM format
//         day: getDayName(newDate)
//       };

//       try {
//         const response = await fetch(`http://localhost:5000/items/${itemId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(updatedItem),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         // Update local array
//         shoppingHistory[itemIndex] = updatedItem;
//         updateDisplay();
//       } catch (error) {
//         console.error("Error updating item:", error);
//         alert("Failed to update item.");
//       }
//     });
//   }

//   // ----------------------------------------------------------------------------
//   // 6) Add New Item (Also in AM/PM format)
//   // ----------------------------------------------------------------------------
//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     const itemName = document.getElementById('item-name').value.trim();
//     const itemPrice = parseFloat(document.getElementById('item-price').value);

//     if (!itemName || isNaN(itemPrice)) {
//       alert("Please enter a valid item name and price.");
//       return;
//     }

//     // Check five-day cycle limit
//     const cycleStartDate = getFiveDayCycleStart(new Date(currentDate));
//     const cycleEndDate = getFiveDayCycleEnd(cycleStartDate);
//     const cycleSpending = shoppingHistory
//       .filter(item => item.date >= cycleStartDate && item.date <= cycleEndDate)
//       .reduce((sum, item) => sum + item.price, 0);

//     if (cycleSpending + itemPrice > dailyLimit) {
//       alert("Five-day limit exceeded!");
//       return;
//     }

//     // Build new item
//     const now = new Date();
//     // -- CHANGED: convert current time to AM/PM
//     const hours = now.getHours().toString().padStart(2, '0');
//     const minutes = now.getMinutes().toString().padStart(2, '0');
//     const time24 = `${hours}:${minutes}`;         // e.g. "08:05"
//     const timeAMPM = formatTo12Hour(time24);        // e.g. "8:05 AM"

//     const newItem = {
//       name: itemName,
//       price: itemPrice,
//       date: currentDate,
//       time: timeAMPM,               // <--- Store in AM/PM
//       day: getDayName(currentDate)
//     };

//     try {
//       const response = await fetch('http://localhost:5000/items', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newItem),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const addedItem = await response.json();
//       shoppingHistory.push(addedItem);
//       form.reset();
//       updateDisplay();
//     } catch (error) {
//       console.error("Error adding item:", error);
//       alert("Failed to add item. Check console for details.");
//     }
//   });

//   // ----------------------------------------------------------------------------
//   // 7) Fetch Items Initially
//   // ----------------------------------------------------------------------------
//   async function fetchItems() {
//     try {
//       const response = await fetch('http://localhost:5000/items');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       shoppingHistory = await response.json();
//       console.log("Fetched items:", shoppingHistory);
//       updateDisplay();
//     } catch (error) {
//       console.error("Could not fetch items:", error);
//     }
//   }

//   // Start
//   fetchItems();
// });


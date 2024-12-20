// Initialize budgets and history
const monthlyBudget = 150000;
const dailyLimit = 5000;

let day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
let currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
let dailySpent = 0;
let dailyTotal = 0;

const form = document.getElementById('shopping-form');
const historyTable = document.getElementById('history-table');
const monthlyBudgetEl = document.getElementById('monthly-budget');
const dailyLimitEl = document.getElementById('daily-limit');
const dailyTotalEl = document.getElementById('daily-total');

// Shopping history will be fetched from the database
let shoppingHistory = [];

// Helper function to get the day of the week
function getDayName(dateString) {
  const date = new Date(dateString);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

// Helper function to format time as hh:mm AM/PM
function formatTime(input) {
  let hours, minutes, amPm;

  if (input instanceof Date) {
    // Input is a Date object
    hours = input.getHours();
    minutes = input.getMinutes();
    amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 (midnight) or 12 (noon) to 12-hour format
    return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
  }

  if (typeof input === 'string') {
    if (input.includes('AM') || input.includes('PM')) {
      // Input is already in 12-hour format
      return input; // No conversion needed
    }

    // Input is in 24-hour format (HH:mm)
    const parts = input.split(':');
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
      amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convert to 12-hour format
      return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    } else {
      throw new Error(`Invalid time format: ${input}`);
    }
  }

  throw new Error('Invalid input for formatTime');
}

// Fetch shopping history from the backend
async function fetchItems() {
  try {
    const response = await fetch('http://localhost:5000/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    shoppingHistory = await response.json();
    updateDisplay();
  } catch (error) {
    console.error("Could not fetch items:", error);
  }
}

// Update budget and history display
function updateDisplay() {
  const spentToday = shoppingHistory
    .filter(item => item.date === currentDate)
    .reduce((total, item) => total + item.price, 0);
  dailySpent = spentToday;
  dailyTotal = spentToday;
  console.log(`this is for checking ${dailySpent}`)

  const remainingBudget = monthlyBudget - shoppingHistory.reduce((total, item) => total + item.price, 0);

  monthlyBudgetEl.textContent = `$${remainingBudget.toLocaleString()}`;
  dailyLimitEl.textContent = `$${(dailyLimit - dailySpent).toLocaleString()}`;
  dailyTotalEl.textContent = `$${(dailyTotal).toLocaleString()}`;

  renderHistory();
}

// Render shopping history
function renderHistory() {
  const tbody = historyTable.querySelector('tbody');
  tbody.innerHTML = '';

  shoppingHistory.forEach((item, index) => {
    let formattedTime;
    try {
      formattedTime = formatTime(item.time); // Format the time
    } catch (error) {
      console.error(`Error formatting time for item ${item.name}:`, error);
      formattedTime = 'Invalid Time'; // Fallback for display
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toLocaleString()}</td>
      <td>${item.date}</td>
      <td>${formattedTime}</td>
      <td>${getDayName(item.date)}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
  console.log('Shopping history:', shoppingHistory);

  // Attach event listeners to Edit and Delete buttons
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', handleEditDateTime);
  });
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', handleDeleteItem);
  });
}

// Handle deleting an item
async function handleDeleteItem(e) {
  const index = e.target.dataset.index;
  const itemId = shoppingHistory[index]._id;

  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (confirmDelete) {
    try {
      await fetch(`http://localhost:5000/items/${itemId}`, {
        method: 'DELETE'
      });
      shoppingHistory.splice(index, 1);
      updateDisplay();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
}

// Handle editing the date and time
async function handleEditDateTime(e) {
  const index = e.target.dataset.index;
  const item = shoppingHistory[index];
  const row = e.target.parentElement.parentElement;

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.value = item.date;
  dateInput.className = 'edit-date-input';

  const timeInput = document.createElement('input');
  timeInput.type = 'time';
  timeInput.value = item.time;
  timeInput.className = 'edit-time-input';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.className = 'save-btn';

  const dateCell = row.children[2];
  const timeCell = row.children[3];
  dateCell.innerHTML = '';
  timeCell.innerHTML = '';
  dateCell.appendChild(dateInput);
  timeCell.appendChild(timeInput);
  e.target.replaceWith(saveBtn);

  saveBtn.addEventListener('click', async () => {
    const newDate = dateInput.value;
    const newTime = timeInput.value;

    if (newDate && newTime) {
      const updatedItem = {
        ...item,
        date: newDate,
        time: formatTime(new Date(`${newDate}T${newTime}`)),
        day: getDayName(newDate)
      };

      try {
        await fetch(`http://localhost:5000/items/${item._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        });

        shoppingHistory[index] = updatedItem;
        dateCell.textContent = newDate;
        timeCell.textContent = updatedItem.time;
        saveBtn.replaceWith(e.target);
        e.target.addEventListener('click', handleEditDateTime);

        updateDisplay();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  });
}

// Add new item to history
form.addEventListener('submit', async e => {
  e.preventDefault();
  const itemName = document.getElementById('item-name').value;
  const itemPrice = parseFloat(document.getElementById('item-price').value);

  const now = new Date();
  const time = formatTime(now);
  // const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  if (dailySpent + itemPrice > dailyLimit) {
    const addToNextDay = confirm(
      "Daily limit exceeded! Would you like to add this item to the next day's budget?"
    );

    if (addToNextDay) {
      const nextDate = new Date(now);
      nextDate.setDate(now.getDate() + 1);
      const nextDay = nextDate.toISOString().split('T')[0];

      try {
        const newItem = {
          name: itemName,
          price: itemPrice,
          date: nextDay,
          time,
          day: getDayName(nextDay)
        };

        const response = await fetch('http://localhost:5000/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const addedItem = await response.json();
        shoppingHistory.push(addedItem);
        alert(`Item added to the next day's budget (Date: ${nextDay}, Day: ${getDayName(nextDay)})`);
        form.reset();
        updateDisplay();
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item. Please check the console for details.");
      }
      return;
    } else {
      return;
    }
  }

  try {
    const newItem = {
      name: itemName,
      price: itemPrice,
      date: currentDate,
      time,
      day: getDayName(currentDate)
    };

    const response = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const addedItem = await response.json();
    shoppingHistory.push(addedItem);
    form.reset();
    updateDisplay();
  } catch (error) {
    console.error("Error adding item:", error);
    alert("Failed to add item. Please check the console for details.");
  }
});

// Automatically handle date change
function handleDateChange() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  if (currentDate !== today) {
    currentDate = today;
    dailySpent = 0; // Reset daily spent
    updateDisplay();
  }
}

setInterval(handleDateChange, 60000);

fetchItems(); // Load data from the backend
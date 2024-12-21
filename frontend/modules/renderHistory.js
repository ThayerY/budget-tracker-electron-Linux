// renderHistory.js
import { shoppingHistory, currentDate } from './state.js';
import { historyTable } from './dom.js';


// Optional: We could place `renderHistory` in its own file or keep here
export function renderHistory() {
  // show only items matching currentDate
  const items = shoppingHistory.filter(item => item.date === currentDate);

  const tbody = historyTable.querySelector('tbody');
  tbody.innerHTML = '';

  items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toLocaleString()}</td>
      <td>${item.date}</td>
      <td>${item.time}</td>
      <td>${item.day || 'No day provided'}</td>
      <td>
        <button class="edit-btn" data-id="${item._id}">Edit</button>
        <button class="delete-btn" data-id="${item._id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Attach event listeners
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => import('./editHandler.js').then(m => m.handleEditItem(e)));
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => import('./deleteHandler.js').then(m => m.handleDeleteItem(e)));
  });
}

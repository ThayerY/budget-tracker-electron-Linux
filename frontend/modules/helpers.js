// modules/helpers.js
// -----------------------------------------------------------------------------
// Contains all the helper functions: date/time conversions, cycle calculations,
// monthly spending logic, etc. Each function is exported individually so that
// any module can import exactly what it needs.
// -----------------------------------------------------------------------------

// Convert a date string (YYYY-MM-DD) to a weekday name
export function getDayName(dateString) {
  const dateObj = new Date(dateString);
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

// Return the start of the current five-day cycle for a given Date
export function getFiveDayCycleStart(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
  const cycleStartDay = Math.floor(daysSinceStart / 5) * 5;
  startDate.setDate(startDate.getDate() + cycleStartDay);
  return startDate.toISOString().split('T')[0];
}

// Return the end of the current five-day cycle
export function getFiveDayCycleEnd(cycleStartDate) {
  const endDate = new Date(cycleStartDate);
  endDate.setDate(endDate.getDate() + 4);
  return endDate.toISOString().split('T')[0];
}

// Calculate how much has been spent in the current month
export function getMonthlySpent(shoppingHistory, dateStr) {
  const dateObj = new Date(dateStr);
  const currentYear = dateObj.getFullYear();
  const currentMonth = dateObj.getMonth();

  return shoppingHistory
    .filter(item => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === currentYear &&
        itemDate.getMonth() === currentMonth
      );
    })
    .reduce((sum, item) => sum + item.price, 0);
}

// helpers/timeConversion.js
// -----------------------------------------------------------------------------
// This file contains helper functions for converting times between 12-hour
// and 24-hour formats. We'll import this in routes or wherever needed.
// -----------------------------------------------------------------------------

/**
 * convertTo12HourFormat('10:05') => '10:05 AM'
 * convertTo12HourFormat('21:40') => '9:40 PM'
 */
export function convertTo12HourFormat(time) {
  if (!time) return time;

  // If it already has AM/PM, just return
  if (time.includes('AM') || time.includes('PM')) {
    return time;
  }

  const [hours, minutes] = time.split(':').map(Number);
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const convertedHours = hours % 12 || 12;
  return `${convertedHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
}

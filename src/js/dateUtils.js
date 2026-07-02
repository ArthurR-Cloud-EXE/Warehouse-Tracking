/**
 * DATE AND TIME UTILITIES
 * Helper functions for date/time operations
 */

/**
 * Convert time string to minutes
 * @param {string} timeStr - Time in HH:mm format
 * @returns {number|null} Minutes since midnight or null
 */
export function timeToMinutes(timeStr) {
  if (!timeStr) return null;
  const parts = timeStr.split(':');
  if (parts.length < 2) return null;
  const hrs = parseInt(parts[0], 10);
  const mins = parseInt(parts[1], 10);
  if (isNaN(hrs) || isNaN(mins)) return null;
  return hrs * 60 + mins;
}

/**
 * Get ISO date string from Date object
 * @param {Date} date - Date object
 * @returns {string} ISO date (YYYY-MM-DD)
 */
export function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse timestamp string
 * @param {string} tsStr - Timestamp string
 * @returns {Date} Parsed date
 */
export function parseTimestamp(tsStr) {
  if (!tsStr) return new Date(0);
  const currentYear = new Date().getFullYear();
  const parsed = Date.parse(`${tsStr} ${currentYear}`);
  return isNaN(parsed) ? new Date(0) : new Date(parsed);
}

/**
 * Format date and time for journey display
 * @param {Date} date - Date object
 * @returns {string} Formatted string like "Mon 15 Jan, 2.30pm"
 */
export function formatJourneyDate(date) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const w = weekdays[date.getDay()];
  const day = date.getDate();
  const m = months[date.getMonth()];
  
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  return `${w} ${day} ${m}, ${hours}.${minutes}${ampm}`;
}

/**
 * Check if time ranges overlap
 * @param {number} startA - Start time in minutes
 * @param {number} endA - End time in minutes
 * @param {number} startB - Start time in minutes
 * @param {number} endB - End time in minutes
 * @returns {boolean} Whether times overlap
 */
export function timesOverlap(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

/**
 * Get first day of month
 * @param {Date} date - Reference date
 * @returns {Date} First day of month
 */
export function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Get last day of month
 * @param {Date} date - Reference date
 * @returns {Date} Last day of month
 */
export function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Get days in month
 * @param {Date} date - Reference date
 * @returns {number} Number of days
 */
export function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

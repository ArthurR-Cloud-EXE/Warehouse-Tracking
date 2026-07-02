/**
 * CALENDAR MANAGER
 * Handle calendar navigation and rendering
 */

import { 
  isoDate, 
  getFirstDayOfMonth, 
  getLastDayOfMonth, 
  getDaysInMonth 
} from './dateUtils.js';

/**
 * Get all dates to render in calendar grid (includes padding from prev/next month)
 * @param {Date} date - Reference date for month
 * @returns {Array} Array of { date: Date, isCurrentMonth: boolean }
 */
export function getCalendarGridDates(date) {
  const firstDay = getFirstDayOfMonth(date);
  const lastDay = getLastDayOfMonth(date);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = getDaysInMonth(date);
  
  const dates = [];
  
  // Padding from previous month
  const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(date.getFullYear(), date.getMonth() - 1, prevMonthLastDay - i);
    dates.push({ date: prevDate, isCurrentMonth: false });
  }
  
  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push({ 
      date: new Date(date.getFullYear(), date.getMonth(), day), 
      isCurrentMonth: true 
    });
  }
  
  // Padding from next month
  const remainingDays = 42 - dates.length; // 6 weeks × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, day);
    dates.push({ date: nextDate, isCurrentMonth: false });
  }
  
  return dates;
}

/**
 * Get month and year for display
 * @param {Date} date - Reference date
 * @returns {Object} { month: string, year: number }
 */
export function getMonthYearLabel(date) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return {
    month: months[date.getMonth()],
    year: date.getFullYear()
  };
}

/**
 * Get array of years for year selector (current year ± 5 years)
 * @returns {Array} Array of year numbers
 */
export function getYearRange() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }
  return years;
}

/**
 * Get month numbers (0-11) for month selector
 * @returns {Array} Array of { num: number, label: string }
 */
export function getMonthOptions() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return months.map((label, num) => ({ num, label }));
}

/**
 * Get previous month date
 * @param {Date} date - Reference date
 * @returns {Date} Previous month date
 */
export function getPreviousMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

/**
 * Get next month date
 * @param {Date} date - Reference date
 * @returns {Date} Next month date
 */
export function getNextMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

/**
 * Check if date is today
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is today
 */
export function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

/**
 * Check if date is in past
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in past
 */
export function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Get weekday initials for calendar header
 * @returns {Array} Array of weekday initials
 */
export function getWeekdayInitials() {
  return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
}

/**
 * Get weekday names
 * @returns {Array} Array of weekday names
 */
export function getWeekdayNames() {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}

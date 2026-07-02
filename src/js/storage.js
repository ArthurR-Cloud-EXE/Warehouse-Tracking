/**
 * STORAGE MANAGER
 * Handles all localStorage operations for tasks and settings
 */

/**
 * Get all tasks from localStorage
 * @returns {Object} Tasks map with date keys
 */
export function getTasksMap() {
  return JSON.parse(localStorage.getItem('tasksMap') || '{}');
}

/**
 * Save tasks map to localStorage
 * @param {Object} tasksMap - Map of tasks by date
 */
export function saveTasksMap(tasksMap) {
  localStorage.setItem('tasksMap', JSON.stringify(tasksMap));
}

/**
 * Migrate E-Waste tasks to use proper tags
 */
export function migrateEWasteTasks() {
  const tasksMap = getTasksMap();
  let modified = false;
  
  for (const dateStr in tasksMap) {
    if (Array.isArray(tasksMap[dateStr])) {
      tasksMap[dateStr].forEach(item => {
        if (item && typeof item === 'object' && item.text && item.text.startsWith('E-Waste Processing:')) {
          if (!item.tags) item.tags = [];
          if (!item.tags.includes('E-Waste Processing')) {
            item.tags.push('E-Waste Processing');
            modified = true;
          }
          const genIdx = item.tags.indexOf('General Task');
          if (genIdx !== -1) {
            item.tags.splice(genIdx, 1);
            modified = true;
          }
        }
      });
    }
  }
  
  if (modified) {
    saveTasksMap(tasksMap);
  }
}

/**
 * Migrate tracking added timestamp
 */
export function migrateTrackingAddedAt() {
  const tasksMap = getTasksMap();
  let modified = false;
  
  for (const dateStr in tasksMap) {
    if (Array.isArray(tasksMap[dateStr])) {
      tasksMap[dateStr].forEach(task => {
        if (task && typeof task === 'object') {
          if (task.trackingNo && !task.trackingAddedAt) {
            const timeStr = task.startTime || '09:00';
            task.trackingAddedAt = formatDateTime(dateStr, timeStr);
            modified = true;
          }
        }
      });
    }
  }
  
  if (modified) {
    saveTasksMap(tasksMap);
  }
}

/**
 * Format date and time for storage
 * @param {string} dateStr - ISO date string
 * @param {string} timeStr - Time string (HH:mm)
 * @returns {string} Formatted datetime
 */
export function formatDateTime(dateStr, timeStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T' + (timeStr || '00:00') + ':00');
  return d.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Save theme preference
 * @param {string} theme - 'light' or 'dark'
 */
export function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

/**
 * Get saved theme preference
 * @returns {string|null} Saved theme or null
 */
export function getSavedTheme() {
  return localStorage.getItem('theme');
}

/**
 * Initialize all migrations on app start
 */
export function runAllMigrations() {
  migrateEWasteTasks();
  migrateTrackingAddedAt();
}

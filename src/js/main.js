/**
 * MAIN APPLICATION FILE
 * Orchestrates module initialization and app startup
 * 
 * This file shows how to use the modular system together
 */

// Import all modules
import { initializeTheme, toggleTheme } from './js/themeManager.js';
import { runAllMigrations, getTasksMap } from './js/storage.js';
import { isoDate } from './js/dateUtils.js';
import { getTasksForDate, addTask, updateTask, deleteTask } from './js/taskManager.js';
import { getCalendarGridDates, getMonthYearLabel } from './js/calendarManager.js';
import { showToast, debounce, showConfirmDialog } from './js/uiUtils.js';
import { getTrackingUrl, openTrackingExternally } from './js/trackingManager.js';
import { getAllTags, getTagColors } from './js/tagManager.js';

/**
 * Initialize application on startup
 */
export function initializeApp() {
  console.log('Initializing Warehouse Tracking System...');
  
  // Run data migrations first
  runAllMigrations();
  
  // Setup theme
  initializeTheme();
  
  // Setup event listeners
  setupEventListeners();
  
  // Initial render
  renderCurrentState();
  
  console.log('App initialized successfully');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      toggleTheme();
      showToast('Theme updated');
    });
  }
  
  // Calendar navigation
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  if (prevBtn) prevBtn.addEventListener('click', () => handlePreviousMonth());
  if (nextBtn) nextBtn.addEventListener('click', () => handleNextMonth());
  
  // Search with debounce
  const searchInput = document.getElementById('taskSearch');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      handleSearch(searchInput.value);
    }, 300));
  }
}

/**
 * Render current application state
 */
function renderCurrentState() {
  const today = isoDate(new Date());
  
  // Get tasks for today
  const tasks = getTasksForDate(today);
  
  // Update UI with tasks
  updateTasksList(tasks, today);
  
  // Update calendar display
  updateCalendarDisplay();
}

/**
 * Update tasks list in UI
 * @param {Array} tasks - Array of tasks
 * @param {string} dateStr - Current date
 */
function updateTasksList(tasks, dateStr) {
  const tasksList = document.getElementById('tasksList');
  if (!tasksList) return;
  
  tasksList.innerHTML = '';
  
  if (tasks.length === 0) {
    tasksList.innerHTML = '<div class="empty-state">No tasks for this day</div>';
    return;
  }
  
  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index, dateStr);
    tasksList.appendChild(taskElement);
  });
}

/**
 * Create task element for display
 * @param {Object} task - Task data
 * @param {number} index - Task index
 * @param {string} dateStr - Task date
 * @returns {HTMLElement} Task element
 */
function createTaskElement(task, index, dateStr) {
  const div = document.createElement('div');
  div.className = `task ${task.completed ? 'completed' : ''}`;
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    handleToggleTask(dateStr, index);
  });
  
  const textSpan = document.createElement('span');
  textSpan.textContent = task.text;
  
  div.appendChild(checkbox);
  div.appendChild(textSpan);
  
  // Add tags if present
  if (task.tags && task.tags.length > 0) {
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'task-tags';
    task.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'task-tag';
      tagElement.textContent = tag;
      tagsDiv.appendChild(tagElement);
    });
    div.appendChild(tagsDiv);
  }
  
  return div;
}

/**
 * Update calendar display
 */
function updateCalendarDisplay() {
  const currentDate = new Date();
  const gridDates = getCalendarGridDates(currentDate);
  const label = getMonthYearLabel(currentDate);
  
  // Update month/year label
  const monthLabel = document.getElementById('monthLabel');
  if (monthLabel) {
    monthLabel.textContent = `${label.month} ${label.year}`;
  }
  
  // Render calendar grid
  const calendarGrid = document.getElementById('calendar');
  if (calendarGrid) {
    renderCalendarGrid(gridDates);
  }
}

/**
 * Render calendar grid
 * @param {Array} gridDates - Grid of dates to render
 */
function renderCalendarGrid(gridDates) {
  const calendarGrid = document.getElementById('calendar');
  if (!calendarGrid) return;
  
  calendarGrid.innerHTML = '';
  
  gridDates.forEach(({ date, isCurrentMonth }) => {
    const dateStr = isoDate(date);
    const tasks = getTasksForDate(dateStr);
    const taskCount = tasks.length;
    
    const dayCell = document.createElement('div');
    dayCell.className = `calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'}`;
    if (taskCount > 0) dayCell.classList.add('has-tasks');
    
    dayCell.innerHTML = `
      <div class="day-number">${date.getDate()}</div>
      <div class="day-task-count">${taskCount > 0 ? `${taskCount} task${taskCount > 1 ? 's' : ''}` : ''}</div>
    `;
    
    dayCell.addEventListener('click', () => {
      handleSelectDate(dateStr);
    });
    
    calendarGrid.appendChild(dayCell);
  });
}

/**
 * Handle previous month click
 */
function handlePreviousMonth() {
  console.log('Navigate to previous month');
  showToast('Previous month');
}

/**
 * Handle next month click
 */
function handleNextMonth() {
  console.log('Navigate to next month');
  showToast('Next month');
}

/**
 * Handle date selection
 * @param {string} dateStr - Selected date
 */
function handleSelectDate(dateStr) {
  console.log('Selected date:', dateStr);
  const tasks = getTasksForDate(dateStr);
  updateTasksList(tasks, dateStr);
}

/**
 * Handle task toggle
 * @param {string} dateStr - Task date
 * @param {number} taskIndex - Task index
 */
function handleToggleTask(dateStr, taskIndex) {
  updateTask(dateStr, taskIndex, { 
    completed: !getTasksForDate(dateStr)[taskIndex].completed 
  });
  renderCurrentState();
  showToast('Task updated');
}

/**
 * Handle search
 * @param {string} query - Search query
 */
function handleSearch(query) {
  if (!query) {
    renderCurrentState();
    return;
  }
  
  console.log('Searching for:', query);
  showToast(`Searching for "${query}"`);
}

/**
 * Example: Add a new task programmatically
 */
export function addNewTaskExample() {
  const today = isoDate(new Date());
  
  const taskData = {
    text: 'Example task',
    startTime: '10:00',
    endTime: '11:00',
    courier: 'Australia Post',
    trackingNo: '1234567890',
    tags: ['General Task'],
    completed: false
  };
  
  addTask(today, taskData);
  renderCurrentState();
  showToast('Task added');
}

/**
 * Example: Delete a task programmatically
 */
export function deleteTaskExample(dateStr, index) {
  deleteTask(dateStr, index);
  renderCurrentState();
  showToast('Task deleted');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

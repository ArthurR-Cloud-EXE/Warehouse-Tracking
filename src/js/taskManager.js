/**
 * TASK MANAGEMENT
 * Handle CRUD operations for tasks
 */

import { getTasksMap, saveTasksMap } from './storage.js';
import { timeToMinutes } from './dateUtils.js';

/**
 * Get tasks for a specific date
 * @param {string} dateStr - ISO date string
 * @returns {Array} Array of tasks
 */
export function getTasksForDate(dateStr) {
  const map = getTasksMap();
  return map[dateStr] || [];
}

/**
 * Add a new task
 * @param {string} dateStr - ISO date string
 * @param {Object} taskData - Task object
 * @returns {Array} Updated tasks array
 */
export function addTask(dateStr, taskData) {
  const map = getTasksMap();
  if (!map[dateStr]) {
    map[dateStr] = [];
  }
  map[dateStr].push(taskData);
  saveTasksMap(map);
  return map[dateStr];
}

/**
 * Update a task
 * @param {string} dateStr - ISO date string
 * @param {number} taskIndex - Index of task to update
 * @param {Object} updates - Fields to update
 */
export function updateTask(dateStr, taskIndex, updates) {
  const map = getTasksMap();
  if (map[dateStr] && map[dateStr][taskIndex]) {
    map[dateStr][taskIndex] = { ...map[dateStr][taskIndex], ...updates };
    saveTasksMap(map);
  }
}

/**
 * Delete a task
 * @param {string} dateStr - ISO date string
 * @param {number} taskIndex - Index of task to delete
 */
export function deleteTask(dateStr, taskIndex) {
  const map = getTasksMap();
  if (map[dateStr]) {
    map[dateStr].splice(taskIndex, 1);
    if (map[dateStr].length === 0) {
      delete map[dateStr];
    }
    saveTasksMap(map);
  }
}

/**
 * Toggle task completion status
 * @param {string} dateStr - ISO date string
 * @param {number} taskIndex - Index of task
 */
export function toggleTaskCompletion(dateStr, taskIndex) {
  const map = getTasksMap();
  if (map[dateStr] && map[dateStr][taskIndex]) {
    map[dateStr][taskIndex].completed = !map[dateStr][taskIndex].completed;
    saveTasksMap(map);
  }
}

/**
 * Find tasks with clashing time slots
 * @param {Array} tasks - Array of tasks
 * @returns {Set} Set of task indices that have time clashes
 */
export function getClashingTaskIndices(tasks) {
  const clashingIndices = new Set();
  const timeTasks = [];

  tasks.forEach((task, index) => {
    if (task.isReport || !task.startTime) return;
    
    const start = timeToMinutes(task.startTime);
    if (start === null) return;
    
    const end = task.endTime ? timeToMinutes(task.endTime) : start + 60;
    if (end === null) return;

    timeTasks.push({ index, start, end });
  });

  // Check each pair for overlap
  for (let i = 0; i < timeTasks.length; i++) {
    for (let j = i + 1; j < timeTasks.length; j++) {
      const a = timeTasks[i];
      const b = timeTasks[j];
      if (a.start < b.end && b.start < a.end) {
        clashingIndices.add(a.index);
        clashingIndices.add(b.index);
      }
    }
  }
  
  return clashingIndices;
}

/**
 * Get urgent tasks for a date
 * @param {string} dateStr - ISO date string
 * @returns {number} Count of urgent tasks
 */
export function getUrgentTaskCount(dateStr) {
  const tasks = getTasksForDate(dateStr);
  return tasks.filter(t => t.tags && t.tags.includes('URGENT Task')).length;
}

/**
 * Get e-waste tasks for a date
 * @param {string} dateStr - ISO date string
 * @returns {number} Count of e-waste tasks
 */
export function getEWasteTaskCount(dateStr) {
  const tasks = getTasksForDate(dateStr);
  return tasks.filter(t => t.tags && (t.tags.includes('E-Waste') || t.tags.includes('E-Waste Processing'))).length;
}

/**
 * Get completed tasks for a date
 * @param {string} dateStr - ISO date string
 * @returns {number} Count of completed tasks
 */
export function getCompletedTaskCount(dateStr) {
  const tasks = getTasksForDate(dateStr);
  return tasks.filter(t => t.completed).length;
}

/**
 * Search tasks across all dates
 * @param {string} query - Search query
 * @returns {Array} Array of matching task objects with dates
 */
export function searchTasks(query) {
  const map = getTasksMap();
  const results = [];
  const lowerQuery = query.toLowerCase();
  
  for (const [dateStr, tasks] of Object.entries(map)) {
    tasks.forEach((task, index) => {
      if (
        task.text?.toLowerCase().includes(lowerQuery) ||
        task.trackingNo?.toLowerCase().includes(lowerQuery) ||
        task.note?.toLowerCase().includes(lowerQuery)
      ) {
        results.push({ dateStr, index, task });
      }
    });
  }
  
  return results;
}

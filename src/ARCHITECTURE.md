# Warehouse Tracking System - Modular Architecture

## Overview
The Warehouse Tracking System has been refactored into modular, feature-based JavaScript files and organized CSS structure. Each module handles a specific domain of functionality, making the code easier to maintain, test, and extend.

## Directory Structure

```
src/
├── js/                          # JavaScript modules
│   ├── constants.js            # All shared constants
│   ├── storage.js              # LocalStorage operations
│   ├── dateUtils.js            # Date/time utilities
│   ├── taskManager.js          # Task CRUD operations
│   ├── calendarManager.js      # Calendar navigation & grid
│   ├── themeManager.js         # Theme toggling logic
│   ├── trackingManager.js      # Courier tracking
│   ├── tagManager.js           # Task tags & styling
│   ├── uiUtils.js             # UI helpers & DOM utilities
│   └── main.js                # App initialization (to be created)
└── css/                         # CSS modules (to be created)
    ├── design-tokens.css       # Color, typography, spacing
    ├── components.css          # UI components
    ├── calendar.css            # Calendar specific
    ├── tasks.css              # Task list specific
    └── dark-theme.css         # Dark mode overrides
```

## Module Descriptions

### 📦 constants.js
**Purpose**: Centralized configuration and constants
**Exports**: 
- `ALL_TAGS` - Available task tags
- `TAG_COLORS` - Tag styling configuration
- `COURIERS` - Courier tracking URLs

**Usage**:
```javascript
import { ALL_TAGS, COURIERS } from './constants.js';
```

### 💾 storage.js
**Purpose**: All localStorage operations
**Key Functions**:
- `getTasksMap()` - Get all tasks
- `saveTasksMap(map)` - Save tasks
- `migrateEWasteTasks()` - Migration helper
- `getSavedTheme()` - Get theme preference
- `runAllMigrations()` - Run all data migrations

**Usage**:
```javascript
import { getTasksMap, saveTasksMap, runAllMigrations } from './storage.js';

// Get tasks
const tasks = getTasksMap();

// Run migrations on startup
runAllMigrations();
```

### 📅 dateUtils.js
**Purpose**: Date and time manipulation
**Key Functions**:
- `isoDate(date)` - Get ISO format date (YYYY-MM-DD)
- `timeToMinutes(timeStr)` - Convert time to minutes
- `formatJourneyDate(date)` - Format for tracking display
- `getFirstDayOfMonth(date)` - Get month start
- `getDaysInMonth(date)` - Days in month

**Usage**:
```javascript
import { isoDate, timeToMinutes, formatJourneyDate } from './dateUtils.js';

const today = isoDate(new Date());
const minutes = timeToMinutes('14:30');
```

### ✅ taskManager.js
**Purpose**: Task CRUD operations and queries
**Key Functions**:
- `getTasksForDate(dateStr)` - Get tasks for date
- `addTask(dateStr, taskData)` - Create task
- `updateTask(dateStr, taskIndex, updates)` - Update task
- `deleteTask(dateStr, taskIndex)` - Delete task
- `toggleTaskCompletion(dateStr, taskIndex)` - Toggle done
- `getClashingTaskIndices(tasks)` - Find time conflicts
- `getUrgentTaskCount(dateStr)` - Count urgent tasks
- `searchTasks(query)` - Search across all dates

**Usage**:
```javascript
import { getTasksForDate, addTask, updateTask } from './taskManager.js';

// Get tasks for date
const tasks = getTasksForDate('2024-12-25');

// Add new task
addTask('2024-12-25', {
  text: 'New task',
  tags: ['General Task'],
  completed: false
});

// Update existing task
updateTask('2024-12-25', 0, { completed: true });
```

### 📆 calendarManager.js
**Purpose**: Calendar navigation and grid generation
**Key Functions**:
- `getCalendarGridDates(date)` - Get all dates to render
- `getMonthYearLabel(date)` - Get display label
- `getPreviousMonth(date)` - Navigate backward
- `getNextMonth(date)` - Navigate forward
- `isToday(date)` - Check if today
- `isPastDate(date)` - Check if past

**Usage**:
```javascript
import { getCalendarGridDates, getPreviousMonth } from './calendarManager.js';

const currentDate = new Date();
const gridDates = getCalendarGridDates(currentDate);
const prevMonth = getPreviousMonth(currentDate);
```

### 🎨 themeManager.js
**Purpose**: Theme management (light/dark mode)
**Key Functions**:
- `initializeTheme()` - Setup on app start
- `applyTheme(theme)` - Apply light/dark theme
- `toggleTheme()` - Switch theme
- `getCurrentTheme()` - Get active theme
- `watchSystemThemeChanges()` - Follow OS preference

**Usage**:
```javascript
import { initializeTheme, toggleTheme, applyTheme } from './themeManager.js';

// Initialize on app start
initializeTheme();

// Toggle between light/dark
toggleTheme();

// Force specific theme
applyTheme('dark');
```

### 📍 trackingManager.js
**Purpose**: Courier tracking functionality
**Key Functions**:
- `getTrackingUrl(courierName, trackingNo)` - Get tracking link
- `getTrackingJourney(task, dateStr)` - Get journey events
- `openTrackingExternally(courier, trackingNo)` - Open in new window
- `copyTrackingToClipboard(trackingNo)` - Copy tracking number
- `formatTrackingLabel(courier, trackingNo)` - Format display

**Usage**:
```javascript
import { getTrackingUrl, openTrackingExternally } from './trackingManager.js';

const url = getTrackingUrl('Australia Post', '1234567890');
openTrackingExternally('Australia Post', '1234567890');
```

### 🏷️ tagManager.js
**Purpose**: Task tags and styling
**Key Functions**:
- `getAllTags()` - Get available tags
- `getTagColors(tag, isDarkMode)` - Get styling
- `generateTagBadge(tag)` - Create badge HTML
- `isUrgentTask(tags)` - Check if urgent
- `isEWasteTask(tags)` - Check if e-waste
- `filterTags(query)` - Search tags

**Usage**:
```javascript
import { getAllTags, generateTagBadge, isUrgentTask } from './tagManager.js';

const tags = getAllTags();
const badge = generateTagBadge('Sales Order');
const urgent = isUrgentTask(['URGENT Task', 'General Task']);
```

### 🎯 uiUtils.js
**Purpose**: UI helpers and DOM utilities
**Key Functions**:
- `showToast(message, duration)` - Show notification
- `showConfirmDialog(title, message)` - Show confirm dialog
- `createElement(tag, attributes, content)` - Create DOM element
- `addClass/removeClass/toggleClass()` - Manage classes
- `debounce(func, wait)` - Debounce calls
- `throttle(func, limit)` - Throttle calls

**Usage**:
```javascript
import { showToast, debounce, createElement } from './uiUtils.js';

showToast('Task saved!', 3000);

const handleSearch = debounce(() => {
  // Search logic
}, 300);

const div = createElement('div', 
  { class: 'container', 'data-id': '123' }, 
  'Content'
);
```

## Workflow Examples

### Adding a New Task
```javascript
import { addTask } from './taskManager.js';
import { isoDate } from './dateUtils.js';

const today = isoDate(new Date());
const taskData = {
  text: 'Pick up order',
  startTime: '10:00',
  endTime: '11:00',
  courier: 'Australia Post',
  trackingNo: '123456',
  tags: ['Sales Order', 'General Task'],
  completed: false
};

addTask(today, taskData);
```

### Getting Tasks for Display
```javascript
import { getTasksForDate } from './taskManager.js';
import { isoDate } from './dateUtils.js';
import { getTagColors } from './tagManager.js';

const date = isoDate(new Date());
const tasks = getTasksForDate(date);

tasks.forEach(task => {
  console.log(task.text);
  if (task.tags) {
    task.tags.forEach(tag => {
      const colors = getTagColors(tag);
      console.log(`${tag}: ${colors.bg}`);
    });
  }
});
```

### Searching Across All Dates
```javascript
import { searchTasks } from './taskManager.js';

const results = searchTasks('Australia Post');
results.forEach(result => {
  console.log(`Found on ${result.dateStr}: ${result.task.text}`);
});
```

## Migration from Original File

To integrate these modules into your HTML:

1. **Keep the HTML structure** as-is for now
2. **Extract and reference** each module from a `<script>` tag
3. **Example**:
```html
<script type="module">
import { initializeTheme } from './src/js/themeManager.js';
import { runAllMigrations } from './src/js/storage.js';

// Initialize app
runAllMigrations();
initializeTheme();
</script>
```

## Benefits of This Structure

✅ **Modularity** - Each feature is independent
✅ **Reusability** - Functions can be used across pages
✅ **Testing** - Easy to unit test each module
✅ **Maintainability** - Clear where to find code
✅ **Scalability** - Simple to add new features
✅ **Debugging** - Easier to isolate issues

## Next Steps

1. Create separate CSS module files (see css/ directory)
2. Extract HTML structure into components
3. Create main.js to orchestrate initialization
4. Split event handlers into separate files
5. Add unit tests for each module

## File Dependencies Map

```
main.js (orchestrator)
├── themeManager.js
│   └── storage.js
├── taskManager.js
│   ├── storage.js
│   └── dateUtils.js
├── calendarManager.js
│   └── dateUtils.js
├── trackingManager.js
│   ├── constants.js
│   └── dateUtils.js
├── tagManager.js
│   └── constants.js
└── uiUtils.js
```

Each module is designed to be independent while sharing common utilities. Import only what you need.

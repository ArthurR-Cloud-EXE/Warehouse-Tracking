# Quick Reference Guide

## How to Edit Features

This guide helps you quickly find and edit specific features.

## Feature Locations

### 🎨 **Theme / Colors / Styling**
- **File**: `src/js/themeManager.js`
- **Key Functions**: `applyTheme()`, `toggleTheme()`
- **To Edit**:
  - Change theme logic → edit `themeManager.js`
  - Add new colors → edit `src/css/design-tokens.css`
  - Modify dark mode → edit `src/css/dark-theme.css`

### ✅ **Tasks - Add/Edit/Delete**
- **File**: `src/js/taskManager.js`
- **Key Functions**: `addTask()`, `updateTask()`, `deleteTask()`
- **To Edit**:
  - Change task structure → edit `taskManager.js`
  - Update form → edit HTML task form section
  - Change task display → edit `main.js` `createTaskElement()`

### 📅 **Calendar - Navigation/Display**
- **File**: `src/js/calendarManager.js`
- **Key Functions**: `getCalendarGridDates()`, `getPreviousMonth()`, `getNextMonth()`
- **To Edit**:
  - Change calendar grid logic → edit `calendarManager.js`
  - Update calendar styling → edit `src/css/calendar.css`
  - Modify month/year labels → edit `calendarManager.js`

### 🏷️ **Tags & Badges**
- **File**: `src/js/tagManager.js`
- **Config**: `src/js/constants.js` (TAG_COLORS, ALL_TAGS)
- **To Edit**:
  - Add new tags → add to `ALL_TAGS` in `constants.js`
  - Change tag colors → edit `TAG_COLORS` in `constants.js`
  - Tag styling → edit `src/css/components.css`

### 📍 **Tracking & Couriers**
- **File**: `src/js/trackingManager.js`
- **Config**: `src/js/constants.js` (COURIERS)
- **To Edit**:
  - Add courier → add to `COURIERS` in `constants.js`
  - Change tracking URL → modify `COURIERS` object
  - Tracking display → edit `trackingManager.js`

### 💾 **Storage & Migrations**
- **File**: `src/js/storage.js`
- **To Edit**:
  - Change storage location → modify `localStorage.setItem()`
  - Add data migration → create new `migrate*()` function
  - Update saved data format → edit migration functions

### 📊 **Notifications/Toasts**
- **File**: `src/js/uiUtils.js`
- **Function**: `showToast()`
- **To Edit**:
  - Toast styling → edit `src/css/components.css`
  - Toast behavior → edit `showToast()` function

### 🔍 **Search Functionality**
- **File**: `src/js/taskManager.js`
- **Function**: `searchTasks()`
- **To Edit**:
  - Search logic → modify `searchTasks()` function
  - Search UI → edit `main.js` `handleSearch()`
  - Search styling → edit `src/css/components.css`

## Common Tasks

### Add a New Tag
```javascript
// In src/js/constants.js
export const ALL_TAGS = [
  // ... existing tags ...
  'My New Tag'  // ← Add here
];

export const TAG_COLORS = {
  // ... existing tags ...
  'My New Tag': { 
    bg: '#f0f0f0', 
    fg: '#333333',
    darkBg: 'rgba(100, 100, 100, 0.15)',
    darkFg: '#e0e0e0'
  }
};
```

### Add a New Courier
```javascript
// In src/js/constants.js
export const COURIERS = {
  // ... existing couriers ...
  'My Courier': {
    name: 'My Courier',
    url: (no) => `https://mycourier.com/track/${encodeURIComponent(no)}`
  }
};
```

### Change Task Storage Duration
```javascript
// In src/js/storage.js
export function saveTasksMap(tasksMap) {
  // Change storage key, retention logic, etc.
  localStorage.setItem('tasksMap', JSON.stringify(tasksMap));
}
```

### Modify Date/Time Format
```javascript
// In src/js/dateUtils.js
export function formatJourneyDate(date) {
  // Change format here
  return d.toLocaleString([], { /* options */ });
}
```

### Update UI After Changes
```javascript
// In src/js/main.js
renderCurrentState();  // Refresh everything
updateTasksList(tasks, dateStr);  // Refresh tasks only
updateCalendarDisplay();  // Refresh calendar only
```

## File Dependencies

```
taskManager.js
├─ storage.js
└─ dateUtils.js

calendarManager.js
├─ dateUtils.js

trackingManager.js
├─ constants.js
└─ dateUtils.js

tagManager.js
├─ constants.js

themeManager.js
├─ storage.js

main.js (uses all modules)
```

## Testing Changes

1. **Edit a file** (e.g., `constants.js`)
2. **Open browser** and check console for errors
3. **Test the feature** (e.g., try creating a task with new tag)
4. **Check storage** in DevTools → Application → localStorage

## Important Notes

- ⚠️ Always import statements at the top
- ⚠️ Keep function names consistent
- ⚠️ Test date operations across month boundaries
- ⚠️ Theme changes require page refresh in some cases
- ⚠️ Storage changes may need migration for existing data

## Debugging Tips

### Check what's stored
```javascript
// In browser console
localStorage.getItem('tasksMap') |> JSON.parse()
```

### Check current theme
```javascript
document.body.classList.contains('dark-mode')
```

### Log all tasks
```javascript
// In main.js
console.log(getTasksMap());
```

### Test date functions
```javascript
import { isoDate } from './dateUtils.js';
console.log(isoDate(new Date()));
```

## Performance Considerations

- Debounce/throttle rapid function calls (use `uiUtils.js` helpers)
- Avoid unnecessary DOM updates (batch changes)
- Consider data size when searching (optimize `searchTasks()`)
- Lazy load calendar data for large date ranges

---

**Need help?** Each module has detailed JSDoc comments. Import and read the source!

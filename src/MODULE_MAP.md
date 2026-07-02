# Module Dependency Map & Feature Guide

## 🗺️ Visual Module Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                     main.js                                  │
│         (Application Initialization & Orchestration)         │
└──────────────┬──────────────────────────────────────────────┘
               │ imports & orchestrates all modules
               │
        ┌──────┴──────────────────────────────────────┐
        │                                               │
        ▼                                               ▼
   ┌─────────────┐                          ┌──────────────────┐
   │ constants.js│                          │ storage.js       │
   ├─────────────┤                          ├──────────────────┤
   │ • ALL_TAGS  │                          │ • getTasksMap()  │
   │ • TAG_COLORS│                          │ • saveTasksMap() │
   │ • COURIERS  │                          │ • Migrations     │
   └─────────────┘                          └──────────────────┘
        │                                          │
        │ used by                                  │ used by
        ▼                                          ▼
   ┌──────────────────┐         ┌──────────────────────────┐
   │ tagManager.js    │         │ taskManager.js           │
   ├──────────────────┤         ├──────────────────────────┤
   │ • generateTag    │         │ • addTask()              │
   │ • getTagColors   │         │ • updateTask()           │
   │ • isUrgentTask   │         │ • deleteTask()           │
   │ • isEWasteTask   │         │ • searchTasks()          │
   └──────────────────┘         │ • getClashingTaskIndices │
        │                        └──────────────────────────┘
        │ used by                        │ used by
        │                                │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │ dateUtils.js (Foundation)       │
        ├─────────────────────────────────┤
        │ • isoDate()                     │
        │ • timeToMinutes()               │
        │ • formatJourneyDate()           │
        │ • getFirstDayOfMonth()          │
        │ • getDaysInMonth()              │
        └─────────────────────────────────┘
                     ▲
                     │ used by
                     │
        ┌────────────┴──────────────────┐
        │                               │
        ▼                               ▼
┌──────────────────────┐     ┌──────────────────────┐
│ calendarManager.js   │     │ trackingManager.js   │
├──────────────────────┤     ├──────────────────────┤
│ • getCalendarGrid   │      │ • getTrackingUrl()   │
│ • getNextMonth()    │      │ • getTrackingJourney │
│ • getPreviousMonth()│      │ • openTracking()     │
│ • isToday()         │      │ • copyTracking()     │
└──────────────────────┘     └──────────────────────┘
                │ used by            │ used by
                │                    │
                └────────┬───────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │ themeManager.js                │
        ├────────────────────────────────┤
        │ • initializeTheme()            │
        │ • applyTheme()                 │
        │ • toggleTheme()                │
        │ • watchSystemThemeChanges()    │
        └────────────────────────────────┘
                │ used by
                │
                ▼
        ┌────────────────────────────────┐
        │ uiUtils.js (UI Helpers)        │
        ├────────────────────────────────┤
        │ • showToast()                  │
        │ • createElement()              │
        │ • debounce()                   │
        │ • throttle()                   │
        │ • addClass/removeClass()       │
        └────────────────────────────────┘
```

## 🎯 Feature-to-Module Mapping

### Adding/Editing Tasks
```
User adds task
    ↓
main.js → taskManager.js → storage.js
             ↓
         dateUtils.js (for date handling)
             ↓
         tagManager.js (for tag validation)
```

### Displaying Calendar
```
Calendar rendered
    ↓
main.js → calendarManager.js → dateUtils.js
            ↓
        taskManager.js (get task counts)
```

### Tracking Package
```
View tracking info
    ↓
main.js → trackingManager.js → constants.js
            ↓
        Courier URL generated
        Open in browser
```

### Toggling Theme
```
User clicks theme button
    ↓
main.js → themeManager.js → storage.js
            ↓
        Update DOM classes
        Update button states
```

### Searching Tasks
```
User searches
    ↓
main.js → taskManager.js (searchTasks())
            ↓
        Filter all stored tasks
        Display results
```

## 📍 Finding Code by Feature

| Feature | Primary Module | Secondary Modules |
|---------|----------------|-------------------|
| Add Task | taskManager.js | storage.js, dateUtils.js |
| Edit Task | taskManager.js | storage.js, tagManager.js |
| Delete Task | taskManager.js | storage.js, uiUtils.js |
| Calendar View | calendarManager.js | dateUtils.js, taskManager.js |
| Month Navigation | calendarManager.js | main.js |
| Theme Toggle | themeManager.js | storage.js, uiUtils.js |
| Task Tags | tagManager.js | constants.js |
| Courier Tracking | trackingManager.js | constants.js |
| Data Persistence | storage.js | All modules |
| UI Notifications | uiUtils.js | main.js |
| Search | taskManager.js | main.js, dateUtils.js |
| Time Conflicts | taskManager.js | dateUtils.js |

## 🔌 Import Examples

### Just Theme Management
```javascript
import { initializeTheme, toggleTheme } from './src/js/themeManager.js';

initializeTheme();
document.getElementById('themeBtn').onclick = toggleTheme;
```

### Tasks Only
```javascript
import { 
  getTasksForDate, 
  addTask, 
  updateTask, 
  deleteTask 
} from './src/js/taskManager.js';

const tasks = getTasksForDate('2024-12-25');
addTask('2024-12-25', { text: 'New task' });
```

### Full Calendar App
```javascript
import { initializeTheme } from './src/js/themeManager.js';
import { getCalendarGridDates } from './src/js/calendarManager.js';
import { getTasksForDate } from './src/js/taskManager.js';
import { isoDate } from './src/js/dateUtils.js';

initializeTheme();
const dates = getCalendarGridDates(new Date());
// ... render calendar
```

## 🧩 Module Coupling Analysis

### High Coupling (Many Dependencies)
- **taskManager.js**: Depends on storage.js, dateUtils.js
- **main.js**: Depends on all modules (by design - orchestrator)

### Medium Coupling (Some Dependencies)
- **calendarManager.js**: Depends on dateUtils.js
- **trackingManager.js**: Depends on constants.js, dateUtils.js
- **themeManager.js**: Depends on storage.js

### Low Coupling (Few Dependencies)
- **dateUtils.js**: No external dependencies ✅
- **constants.js**: No external dependencies ✅
- **uiUtils.js**: No external dependencies ✅
- **tagManager.js**: Only depends on constants.js
- **storage.js**: No external dependencies ✅

### Implication
The low-coupling modules (dateUtils, constants, storage, uiUtils) are **safest to modify** - changes won't break other modules.

## 🔄 Data Flow Example: Adding a Task

```
1. User fills form
2. main.js handles submit event
   └─ Validates input (uiUtils)
   └─ Collects form data
   
3. Calls taskManager.addTask(dateStr, taskData)
   └─ Formats date using dateUtils
   └─ Validates tags using tagManager
   └─ Passes to storage.saveTasksMap()
   
4. storage.saveTasksMap() stores to localStorage

5. main.js calls renderCurrentState()
   └─ Gets tasks: taskManager.getTasksForDate()
   └─ Gets colors: tagManager.getTagColors()
   └─ Renders UI: creates elements
   
6. Shows confirmation: uiUtils.showToast()
```

## 📦 Recommended Module Import Order

When initializing the app:
1. **constants.js** (no dependencies)
2. **storage.js** (no dependencies)
3. **dateUtils.js** (no dependencies)
4. **uiUtils.js** (no dependencies)
5. **taskManager.js** (uses storage, dateUtils)
6. **calendarManager.js** (uses dateUtils)
7. **tagManager.js** (uses constants)
8. **trackingManager.js** (uses constants, dateUtils)
9. **themeManager.js** (uses storage)
10. **main.js** (uses everything)

This order ensures all dependencies are loaded first.

## 🚫 Circular Dependency Check

✅ **NO circular dependencies detected**
- Each module imports from its dependencies only
- No module imports from main.js
- No module imports from modules that haven't been defined yet

## 🎓 Learning Path

To understand the system:
1. **Start with foundations**: dateUtils.js, constants.js
2. **Learn storage**: storage.js
3. **Learn features**: taskManager.js, calendarManager.js
4. **Learn UI**: uiUtils.js, themeManager.js
5. **See it together**: main.js

## 💡 Pro Tips

1. **Dependencies flow one way** - Use imports confidently
2. **Test modules independently** - No need for full app
3. **Add new features** - Follow the module pattern
4. **Extend constants** - Add tags/couriers without touching code logic
5. **Reuse utilities** - dateUtils, uiUtils work standalone

---

**Navigation made easy!** Use this map when trying to find where code lives.

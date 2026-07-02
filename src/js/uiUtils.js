/**
 * UI UTILITIES
 * Helper functions for UI rendering and DOM operations
 */

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {number} duration - Duration in ms (default 3000)
 */
export function showToast(message, duration = 3000) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  // Remove after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 200);
  }, duration);
}

/**
 * Show confirmation dialog
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @returns {Promise<boolean>} True if confirmed
 */
export function showConfirmDialog(title, message) {
  return new Promise((resolve) => {
    const confirmed = confirm(`${title}\n\n${message}`);
    resolve(confirmed);
  });
}

/**
 * Create element with attributes
 * @param {string} tag - HTML tag
 * @param {Object} attributes - Element attributes
 * @param {string} content - Inner content
 * @returns {HTMLElement} Created element
 */
export function createElement(tag, attributes = {}, content = '') {
  const element = document.createElement(tag);
  
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'class') {
      element.className = value;
    } else if (key === 'style') {
      Object.assign(element.style, value);
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else if (key in element) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  }
  
  if (content) {
    element.innerHTML = content;
  }
  
  return element;
}

/**
 * Clear element contents
 * @param {HTMLElement} element - Element to clear
 */
export function clearElement(element) {
  if (element) {
    element.innerHTML = '';
  }
}

/**
 * Add class to element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name
 */
export function addClass(element, className) {
  if (element) {
    element.classList.add(className);
  }
}

/**
 * Remove class from element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name
 */
export function removeClass(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

/**
 * Toggle class on element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name
 * @param {boolean} force - Force add/remove
 */
export function toggleClass(element, className, force) {
  if (element) {
    element.classList.toggle(className, force);
  }
}

/**
 * Get input value with fallback
 * @param {string} elementId - Element ID
 * @param {*} defaultValue - Default value
 * @returns {*} Input value or default
 */
export function getInputValue(elementId, defaultValue = '') {
  const element = document.getElementById(elementId);
  return element ? element.value : defaultValue;
}

/**
 * Set input value
 * @param {string} elementId - Element ID
 * @param {*} value - Value to set
 */
export function setInputValue(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.value = value;
  }
}

/**
 * Show/hide element
 * @param {HTMLElement|string} element - Element or ID
 * @param {boolean} visible - Whether to show
 */
export function setElementVisibility(element, visible) {
  if (typeof element === 'string') {
    element = document.getElementById(element);
  }
  
  if (element) {
    if (visible) {
      element.style.display = '';
    } else {
      element.style.display = 'none';
    }
  }
}

/**
 * Focus element
 * @param {string|HTMLElement} element - Element or ID
 */
export function focusElement(element) {
  if (typeof element === 'string') {
    element = document.getElementById(element);
  }
  if (element && element.focus) {
    element.focus();
  }
}

/**
 * Scroll element into view
 * @param {HTMLElement|string} element - Element or ID
 */
export function scrollIntoView(element) {
  if (typeof element === 'string') {
    element = document.getElementById(element);
  }
  if (element && element.scrollIntoView) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

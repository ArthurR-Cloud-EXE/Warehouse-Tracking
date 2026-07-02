/**
 * TAG MANAGEMENT
 * Handle task tags and their styling
 */

import { ALL_TAGS, TAG_COLORS } from './constants.js';

/**
 * Get all available tags
 * @returns {Array} Array of tag names
 */
export function getAllTags() {
  return [...ALL_TAGS];
}

/**
 * Get color styling for a tag
 * @param {string} tag - Tag name
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {Object} Color styling { bg, fg, border }
 */
export function getTagColors(tag, isDarkMode = false) {
  const colors = TAG_COLORS[tag] || { bg: '#f1f5f9', fg: '#475569' };
  
  if (isDarkMode) {
    return {
      bg: colors.darkBg || colors.bg,
      fg: colors.darkFg || colors.fg,
      border: colors.border || 'none'
    };
  }
  
  return {
    bg: colors.bg,
    fg: colors.fg,
    border: colors.border || 'none'
  };
}

/**
 * Generate HTML for tag badge
 * @param {string} tag - Tag name
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {string} HTML for tag badge
 */
export function generateTagBadge(tag, isDarkMode = false) {
  const colors = getTagColors(tag, isDarkMode);
  const style = `
    background-color: ${colors.bg};
    color: ${colors.fg};
    border: ${colors.border};
  `;
  
  return `<span class="tag-badge" style="${style}">${tag}</span>`;
}

/**
 * Generate HTML for tag button (toggle mode)
 * @param {string} tag - Tag name
 * @param {boolean} isActive - Whether tag is selected
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {string} HTML for tag button
 */
export function generateTagButton(tag, isActive = false, isDarkMode = false) {
  const colors = getTagColors(tag, isDarkMode);
  const className = `tag-toggle-btn ${isActive ? 'active' : ''}`;
  
  return `
    <button type="button" class="${className}" data-tag="${tag}">
      ${tag}
    </button>
  `;
}

/**
 * Check if tag has special behavior (like showing Issue People input)
 * @param {string} tag - Tag name
 * @returns {Object} Special properties
 */
export function getTagSpecialProperties(tag) {
  const specialTags = {
    'Issue Raised': { showIssuePeople: true },
    'URGENT Task': { isUrgent: true },
    'E-Waste': { isEWaste: true },
    'E-Waste Processing': { isEWaste: true }
  };
  
  return specialTags[tag] || {};
}

/**
 * Validate if tag is valid
 * @param {string} tag - Tag to validate
 * @returns {boolean} True if tag is valid
 */
export function isValidTag(tag) {
  return ALL_TAGS.includes(tag);
}

/**
 * Filter tags based on query
 * @param {string} query - Search query
 * @returns {Array} Filtered tags
 */
export function filterTags(query) {
  const lowerQuery = query.toLowerCase();
  return ALL_TAGS.filter(tag => 
    tag.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get urgent tasks indicator
 * @param {Array} tags - Array of tags
 * @returns {boolean} True if urgent
 */
export function isUrgentTask(tags) {
  return tags && tags.includes('URGENT Task');
}

/**
 * Get e-waste indicator
 * @param {Array} tags - Array of tags
 * @returns {boolean} True if e-waste task
 */
export function isEWasteTask(tags) {
  return tags && (tags.includes('E-Waste') || tags.includes('E-Waste Processing'));
}

/**
 * Get issue indicator
 * @param {Array} tags - Array of tags
 * @returns {boolean} True if issue-related task
 */
export function isIssueTask(tags) {
  return tags && tags.includes('Issue Raised');
}

/**
 * Sort tags by priority
 * @param {Array} tags - Array of tags
 * @returns {Array} Sorted tags
 */
export function sortTagsByPriority(tags) {
  const priority = {
    'URGENT Task': 1,
    'Issue Raised': 2,
    'E-Waste Processing': 3,
    'E-Waste': 4
  };
  
  return [...tags].sort((a, b) => 
    (priority[a] || 999) - (priority[b] || 999)
  );
}

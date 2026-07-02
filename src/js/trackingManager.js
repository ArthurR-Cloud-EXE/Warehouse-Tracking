/**
 * TRACKING & COURIER MANAGEMENT
 * Handle tracking numbers and courier tracking journey
 */

import { COURIERS } from './constants.js';
import { formatJourneyDate, parseTimestamp } from './dateUtils.js';

/**
 * Get courier tracking URL
 * @param {string} courierName - Name of courier
 * @param {string} trackingNo - Tracking number
 * @returns {string|null} Tracking URL or null
 */
export function getTrackingUrl(courierName, trackingNo) {
  const courier = COURIERS[courierName || 'Star Track'];
  if (!courier) return null;
  return courier.url(trackingNo);
}

/**
 * Get tracking journey events (mock data structure)
 * @param {Object} task - Task object with tracking info
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @returns {Array} Array of journey events
 */
export function getTrackingJourney(task, dateStr) {
  const courier = (task.courier || 'Star Track').trim();
  const trackingNo = task.trackingNo;
  
  if (!trackingNo) return [];

  // Parse base date from task tracking added timestamp
  let baseDate = new Date(dateStr + 'T00:00:00');
  if (task.trackingAddedAt) {
    const parsed = parseTimestamp(task.trackingAddedAt);
    if (parsed && parsed.getTime() > 0) {
      baseDate = parsed;
    }
  }

  // Mock journey data structure - replace with actual API calls as needed
  const mockJourney = [
    {
      location: 'Origin Facility',
      status: 'Picked up',
      timestamp: new Date(baseDate.getTime() + 1000 * 60 * 30) // 30 mins after added
    },
    {
      location: 'In Transit',
      status: 'On the way',
      timestamp: new Date(baseDate.getTime() + 1000 * 60 * 60 * 4) // 4 hours later
    },
    {
      location: 'Delivery Location',
      status: 'Out for delivery',
      timestamp: new Date(baseDate.getTime() + 1000 * 60 * 60 * 24) // next day
    }
  ];

  return mockJourney;
}

/**
 * Format tracking journey for display
 * @param {Array} journey - Array of journey events
 * @returns {string} HTML for journey display
 */
export function formatTrackingJourney(journey) {
  if (!journey || journey.length === 0) {
    return '<div class="journey-empty">No tracking information available</div>';
  }

  return journey
    .map((event, idx) => `
      <div class="journey-event" data-index="${idx}">
        <div class="journey-event-dot"></div>
        <div class="journey-event-content">
          <div class="journey-event-location">${event.location}</div>
          <div class="journey-event-status">${event.status}</div>
          <div class="journey-event-time">${formatJourneyDate(event.timestamp)}</div>
        </div>
      </div>
    `)
    .join('');
}

/**
 * Generate tracking card HTML
 * @param {string} courier - Courier name
 * @param {string} trackingNo - Tracking number
 * @returns {string} HTML for tracking card
 */
export function generateTrackingCard(courier, trackingNo) {
  const url = getTrackingUrl(courier, trackingNo);
  if (!url) return '';

  const courierInfo = COURIERS[courier];
  const courierName = courierInfo?.name || courier;

  return `
    <div class="tracking-card">
      <div class="tracking-card-courier">${courierName}</div>
      <div class="tracking-card-number">${trackingNo}</div>
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="tracking-card-btn">
        Track Now
      </a>
    </div>
  `;
}

/**
 * Format tracking display label
 * @param {string} courier - Courier name
 * @param {string} trackingNo - Tracking number
 * @returns {string} Formatted label
 */
export function formatTrackingLabel(courier, trackingNo) {
  if (!courier || !trackingNo) return '';
  return `${courier}: ${trackingNo}`;
}

/**
 * Copy tracking number to clipboard
 * @param {string} trackingNo - Tracking number to copy
 * @returns {Promise} Clipboard operation
 */
export async function copyTrackingToClipboard(trackingNo) {
  try {
    await navigator.clipboard.writeText(trackingNo);
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Open tracking in external window/tab
 * @param {string} courier - Courier name
 * @param {string} trackingNo - Tracking number
 */
export function openTrackingExternally(courier, trackingNo) {
  const url = getTrackingUrl(courier, trackingNo);
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

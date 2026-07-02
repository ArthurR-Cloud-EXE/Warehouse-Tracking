/**
 * CONSTANTS AND CONFIGURATION
 * All shared constants, tag definitions, and courier data
 */

// All available tags for tasks
export const ALL_TAGS = [
  'Sales Order', 'Purchase Order', 'General Task', 'Store Refresh', 
  'New Store', 'Replacement', 'URGENT Task', 'Implemented', 
  'Issue Raised', 'E-Waste', 'E-Waste Processing', 'Training'
];

// Tag styling configuration
export const TAG_COLORS = {
  'Sales Order': { bg: '#e0f2fe', fg: '#0369a1', darkBg: 'rgba(14, 165, 233, 0.15)', darkFg: '#7dd3fc' },
  'Purchase Order': { bg: '#e0e7ff', fg: '#4338ca', darkBg: 'rgba(99, 102, 241, 0.15)', darkFg: '#a5b4fc' },
  'General Task': { bg: '#f1f5f9', fg: '#475569', darkBg: 'rgba(148, 163, 184, 0.15)', darkFg: '#cbd5e1' },
  'Store Refresh': { bg: '#dcfce7', fg: '#15803d', darkBg: 'rgba(34, 197, 94, 0.15)', darkFg: '#86efac' },
  'New Store': { bg: '#f3e8ff', fg: '#6b21a8', darkBg: 'rgba(168, 85, 247, 0.15)', darkFg: '#d8b4fe' },
  'Replacement': { bg: '#ccfbf1', fg: '#0f766e', darkBg: 'rgba(20, 184, 166, 0.15)', darkFg: '#99f6e4' },
  'URGENT Task': { bg: '#fee2e2', fg: '#b91c1c', darkBg: 'rgba(239, 68, 68, 0.2)', darkFg: '#fca5a5', border: '1px solid #ef4444' },
  'Implemented': { bg: '#ecfdf5', fg: '#047857', darkBg: 'rgba(16, 185, 129, 0.15)', darkFg: '#6ee7b7' },
  'Issue Raised': { bg: '#fef3c7', fg: '#b45309', darkBg: 'rgba(245, 158, 11, 0.15)', darkFg: '#fde047' },
  'E-Waste': { bg: '#fafaf9', fg: '#57534e', darkBg: 'rgba(120, 113, 108, 0.15)', darkFg: '#d6d3d1', border: '1px solid #d6d3d1' },
  'E-Waste Processing': { bg: '#ffedd5', fg: '#ea580c', darkBg: 'rgba(234, 88, 12, 0.15)', darkFg: '#ffedd5', border: '1px solid #ea580c' },
  'Training': { bg: '#fae8ff', fg: '#a21caf', darkBg: 'rgba(217, 70, 239, 0.15)', darkFg: '#f5d0fe', border: '1px solid #d946ef' }
};

// Courier configurations with tracking URLs
export const COURIERS = {
  'Star Track': {
    name: 'Star Track',
    url: (no) => `https://startrack.com.au/track/details/${encodeURIComponent(no)}`
  },
  'Australia Post': {
    name: 'Australia Post',
    url: (no) => `https://auspost.com.au/mypost/track/#/details/${encodeURIComponent(no)}`
  },
  'Toll': {
    name: 'Toll',
    url: (no) => `https://www.mytoll.com/track?consignmentNumber=${encodeURIComponent(no)}`
  },
  'TNT': {
    name: 'TNT',
    url: (no) => `https://www.tnt.com/express/en_au/site/shipping-tools/tracking.html?cons=${encodeURIComponent(no)}`
  },
  'DHL': {
    name: 'DHL',
    url: (no) => `https://www.dhl.com/au-en/home/tracking/tracking-express.html?submit=1&tracking-id=${encodeURIComponent(no)}`
  },
  'FedEx': {
    name: 'FedEx',
    url: (no) => `https://www.fedex.com/apps/fedextrack/?tracknumbers=${encodeURIComponent(no)}`
  },
  'CouriersPlease': {
    name: 'CouriersPlease',
    url: (no) => `https://www.couriersplease.com.au/Tools/Track/Tracking-Results?consignment=${encodeURIComponent(no)}`
  },
  'Aramex': {
    name: 'Aramex',
    url: (no) => `https://www.aramex.com.au/tools/track/?l=${encodeURIComponent(no)}`
  }
};

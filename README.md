# Warehouse-Tracking
Software that tracks and optimizes warehouse operations — managing inventory, receiving, order fulfillment, labor, and analytics — to reduce errors, cut costs, and speed up goods flow from receiving dock to customer delivery.

----------------------------------------------------------------------------------------------------------------------------------------

A warehouse management platform is software that controls and optimizes day-to-day operations inside a warehouse or distribution center. It handles:

Inventory tracking — real-time visibility of stock levels, locations, and movements
Receiving & putaway — logging inbound shipments and directing items to storage locations
Order fulfillment — picking, packing, and shipping outbound orders efficiently
Labor management — tracking worker productivity and task assignments
Reporting & analytics — insights on throughput, accuracy, and space utilization

The goal is to reduce errors, cut costs, and speed up the flow of goods from receiving dock to customer delivery.

----------------------------------------------------------------------------------------------------------------------------------------

## Current release — v0.1.1

The application ships as a single, self-contained HTML file. No build step, server, or installation is required.

- **`index.html`** — the current release build (equivalent to `warehouse_tracking_system-V-0.1.1.html`).
- Versioned snapshots (`warehouse_tracking_system-V-*.html`) are kept for history.

### Running it

Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). Data is stored locally in the browser (`localStorage`), and the UI supports light/dark themes.

> An internet connection is used on first load to fetch the Inter / JetBrains Mono web fonts and the Tabler icon set from their CDNs. The app remains usable without them — only the typography and icons fall back.

### What's in this release

- Calendar, Items, Serial numbers, Couriers, Movements, E-Waste, Stores, and Settings views
- Per-client store directory (Blooms The Chemist network) with on-device custom stores
- E-waste booking with a 2-week processing window
- Light/dark theming with OS-preference detection

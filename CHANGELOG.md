# Changelog

All notable changes to WarehouseOS (the warehouse tracking platform) are recorded
here. The app ships as a single self-contained file, `index.html`; versioned
snapshots are kept as `warehouse_tracking_system-V-*.html`.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [0.1.1] — 2026-07-01

The release-readiness cycle: turned the v0.1.1 build into a hostable,
self-contained, access-controlled product, and added two operations
(Calendar Activity, Stock Take) plus a full UI/responsive pass.

### Release & hosting
- Promoted `warehouse_tracking_system-V-0.1.1.html` to a canonical **`index.html`**
  release artifact, with a visible `v0.1.1` version stamp in the sidebar.
- Removed leftover placeholder demo data (the `CC — Store 1/2/3` sample stores)
  so the build ships with verified data only.
- **Cloudflare Pages hosting**: added `_headers` (baseline security headers +
  HTML revalidation) and `DEPLOY.md` with step-by-step Git-integration and
  Wrangler deploy instructions, custom-domain notes, and access-control guidance.
- **Bundled fonts + icons inline** (Inter, JetBrains Mono, Outfit, and a subset
  of the Tabler icon set) as base64. The UI now renders with **zero external
  requests** and works fully offline; no dependency on Google Fonts or jsDelivr.

### Authentication & access control
- **In-app login gate**: username/password screen that locks the app on load
  (session-based, with a sidebar Log out action).
- **Two-factor authentication (TOTP, RFC 6238)**: every account requires a
  6-digit authenticator code (Google Authenticator, Authy, 1Password, …) after
  the password. SHA-1/HMAC-SHA1/Base32/TOTP implemented inline (offline, no
  library) and verified against the RFC test vectors.
  - Setup shows a **scannable QR code** (qrcode-generator, inlined) plus a manual
    key; QR output verified by decoding it back to the exact `otpauth://` URI.
  - **Deterministic secrets** derived from the username, so a user's authenticator
    works on **every device** — fixes 2FA "resetting" on each new device/session.
- **Admin user-management page** (admins only): create users, assign Admin/User
  roles, reset passwords, view a user's 2FA key (QR), re-issue 2FA, and delete
  accounts. Guards keep at least one admin and block self-deletion. The sidebar
  shows the signed-in user.
- Login credentials set for the `t360group` seed admin (password stored only as
  a hash; not committed in plaintext).
- Documented **Cloudflare Access** as the real, enforced access layer (the in-app
  gate is a client-side deterrent).

### Operations
- **Calendar Activity**: every calendar tag (Sales Order, Purchase Order,
  General Task, Store Refresh, New Store, Replacement, URGENT Task, Implemented,
  Issue Raised, E-Waste, E-Waste Processing, Stock Take, Training) is surfaced as
  a category with a live count. Each opens a page listing the calendar tasks
  carrying that tag; overlapping tags (E-Waste, Stock Take) route to their
  dedicated pages, which pull the calendar entries directly.
- **Stock Take** operation:
  - New `Stock Take` calendar tag; scheduled stock takes are read from the
    calendar and linked to count sheets via "Start count".
  - **Count sheets**: build a list of items to count from inventory, each with a
    System (expected) quantity, a Counted input and live variance; progress bar,
    mark-complete, and an open-sheets nav badge.
  - **Bundles**: named groups of items; adding a bundle to a sheet expands it into
    its member items so kit components aren't missed.
  - Persisted in `localStorage`.

### UI & layout
- **Sidebar redesign**: each operation has its own colour (scalable
  `--op` custom-property system — tinted icon, coloured hover/active with a left
  accent bar), reorganised into labelled **Schedule / Inventory / Logistics**
  groups with more spacing. Works in light/dark and full/icon-collapsed.
- **Serial numbers** and **Couriers** are collapsible fields; the Couriers
  **Overdue** shortcut stays visible at all times.
- **Responsive**: all sections adapt to the window — wide tables scroll instead
  of squashing, the topbar wraps, form rows stack, stats step down, and the
  sidebar collapses to icons. Verified with no horizontal overflow down to phone
  widths.
- **Professional empty states** (icon, heading, guidance, and an add action) that
  distinguish an empty list from a search miss.
- **Browser/brand polish**: inline SVG favicon, `theme-color` for light/dark,
  meta description and mobile web-app tags; refined login card (gradient accent,
  centred logo, tagline).

### Data
- Cleared seeded demo entries (Items, Serials, Couriers, Movements, E-Waste) so
  the app starts empty to build up real data; reference data (Blooms store
  directory, company list, item categories) retained.

[0.1.1]: https://github.com/ArthurR-Cloud-EXE/Warehouse-Tracking

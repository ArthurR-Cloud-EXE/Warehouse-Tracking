# Deploying to Cloudflare Pages

WarehouseOS is a single, self-contained static page (`index.html`). All data is
kept in the browser's `localStorage`, so there is **no backend, database, build
step, or server** to run — Cloudflare Pages serves the file as-is and the app is
fully functional.

> Note: data is stored per-browser/per-device. Two people opening the site do
> not share data, and clearing browser storage clears the app's data.

## Option A — Connect the Git repo (recommended)

This auto-deploys every push and gives you preview URLs for branches/PRs.

1. Go to the Cloudflare dashboard → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**.
2. Authorize GitHub and pick the **Warehouse-Tracking** repository.
3. Configure the build:
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`  (the repo root, where `index.html` lives)
4. Click **Save and Deploy**. After ~30s you'll get a URL like
   `https://warehouse-tracking.pages.dev`.

Every later push to `main` redeploys production; pushes to other branches (and
PRs like #1) get their own preview URL automatically.

## Option B — Direct upload with Wrangler (no Git connection)

From a checkout of this repo:

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name warehouse-tracking
```

`.` uploads the repo root. Re-run the deploy command to publish updates.

## Custom domain (optional)

In the Pages project → **Custom domains** → **Set up a domain**, enter your
domain (e.g. `warehouse.example.com`). If the domain's DNS is already on
Cloudflare, the record is added for you; otherwise follow the CNAME
instructions shown. HTTPS is provisioned automatically.

## Notes

- The page fetches the Inter / JetBrains Mono web fonts and the Tabler icon set
  from public CDNs on first load. They are cached by the browser; if a CDN is
  unreachable the app still works with fallback fonts/icons.
- `_headers` in the repo root sets baseline security headers and tells the CDN
  to revalidate the HTML so new deploys show up without a hard refresh.
- The repo also contains versioned snapshots
  (`warehouse_tracking_system-V-*.html`). They deploy alongside `index.html` and
  are reachable at their own paths, e.g. `/warehouse_tracking_system-V-0.1.1.html`.

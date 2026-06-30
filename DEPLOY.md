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

- The fonts (Inter, JetBrains Mono, Outfit) and Tabler icons are bundled inline
  in `index.html`, so the page renders correctly with **no external requests**
  and works fully offline. (Tabler is subset to only the icons the app uses to
  keep the file size down.)
- `_headers` in the repo root sets baseline security headers and tells the CDN
  to revalidate the HTML so new deploys show up without a hard refresh.
- The repo also contains versioned snapshots
  (`warehouse_tracking_system-V-*.html`). They deploy alongside `index.html` and
  are reachable at their own paths, e.g. `/warehouse_tracking_system-V-0.1.1.html`.

## Restricting access

There are two layers, and they do very different things.

### 1. The in-app login screen (cosmetic)

`index.html` shows a username/password screen before the app UI. This is a
**convenience/branding lock, not real security** — the page and all its data are
client-side, so a determined visitor can bypass it (view source, disable
JavaScript, read `localStorage`). Treat it as a "please don't shoulder-surf"
deterrent only.

- **Seed admin:** username `t360group`; the password is set by the owner and is
  intentionally not stored in this repo (only its hash lives in `index.html`, in
  `DEFAULT_ADMIN`). This account is created automatically the first time the app
  runs on a device.
- **Managing users:** sign in as an admin and open the **Admin** page (sidebar →
  System → Admin). From there you can create users, assign **Admin** or **User**
  roles, reset passwords, and delete accounts. The app keeps at least one admin
  and won't let you delete your own account.
- **Where accounts live:** in this browser's `localStorage` (`whos-users`), so
  they **do not sync between devices or users** and reset if storage is cleared.
  This is a convenience layer, not shared access control — for that, use
  Cloudflare Access (below).
- **Change the seed password:** run `whosHash('new-password')` in the browser
  console and paste the result into `DEFAULT_ADMIN.passHash` near the bottom of
  `index.html`, then commit and redeploy. (Only affects devices with no accounts
  stored yet.)
- Sessions are kept in `sessionStorage`, so closing the browser tab logs out.
  The sidebar **Log out** entry ends the session immediately.

### 2. Cloudflare Access (real security — recommended)

To actually keep unauthenticated people away from the page and its data, put
**Cloudflare Access** (Zero Trust) in front of the deployment. It authenticates
visitors at Cloudflare's edge **before any HTML is served**, so the file never
reaches someone who isn't allowed in.

1. Cloudflare dashboard → **Zero Trust**. On first use you'll pick a team name
   (this is free for up to 50 users).
2. **Access** → **Applications** → **Add an application** → **Self-hosted**.
3. Set the **Application domain** to your site's hostname — your
   `*.pages.dev` URL or the custom domain you attached to the Pages project.
4. Add an **Access policy**, e.g. *Action: Allow* with an *Include* rule of
   **Emails** (list the people allowed) or **Emails ending in** `@yourcompany.com`.
5. Pick a login method under **Settings → Authentication**. The built-in
   **One-time PIN** (emailed code) works with no extra setup; you can also add
   Google, GitHub, Microsoft, etc.
6. **Save**. Visiting the site now redirects to a Cloudflare login first.

With Access in place, the in-app login becomes optional — you can keep it for
branding or remove it. Reference:
<https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-public-app/>

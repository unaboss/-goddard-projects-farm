# Build Plan — Goddard Projects Farm

---

## Phase 1 — Scaffold

**GOAL:** Empty Next.js 14 project runs with Tailwind CSS. "Hello world" visible in the browser at `http://localhost:3000`.

**FILES TO CREATE/EDIT:**

| Action | File | Notes |
|--------|------|-------|
| CREATE | `package.json` | Next.js 14+, React 18, Tailwind CSS 3, TypeScript |
| CREATE | `tsconfig.json` | Standard Next.js TS config |
| CREATE | `next.config.js` | Default Next.js config |
| CREATE | `tailwind.config.ts` | Tailwind config with content paths |
| CREATE | `postcss.config.js` | PostCSS with Tailwind + autoprefixer |
| CREATE | `src/app/layout.tsx` | Minimal RootLayout — `<html><body>{children}</body></html>` with no styling yet |
| CREATE | `src/app/page.tsx` | Single `<h1>Hello from Goddard Projects Farm</h1>` |
| CREATE | `src/app/globals.css` | Tailwind directives only (`@tailwind base; @tailwind components; @tailwind utilities;`) |
| CREATE | `.gitignore` | Standard Next.js ignores |

**DEPENDENCY:** None.

**CHECKPOINT:** Run `npm run dev`. Open `http://localhost:3000`. See "Hello from Goddard Projects Farm" rendered. No errors in terminal or console.

---

## Phase 2 — Design Foundation

**GOAL:** The site renders with the full **Limpopo Dusk** dark theme applied. Playfair Display on headings, DM Sans on body text, Deep Earth `#1A1410` background, Warm Cream `#F5F0E8` text, and all farm constants centralized in a utility module.

**FILES TO CREATE/EDIT:**

| Action | File | Notes |
|--------|------|-------|
| EDIT | `tailwind.config.ts` | Extend `theme.colors` with Limpopo Dusk palette. Add `fontFamily` with Playfair Display (serif) + DM Sans (sans-serif). |
| EDIT | `src/app/globals.css` | `@import` Google Fonts. `@layer base` to set `<html>` bg `deep-earth`, `<body>` text `warm-cream`, `antialiased`, full viewport min-height, smooth scroll. |
| EDIT | `src/app/layout.tsx` | Add metadata export (`title`, `description`, `openGraph`). Reference font CSS variables via `className` on `<body>`. |
| EDIT | `src/app/page.tsx` | Replace bare `<h1>` with a test panel: Playfair heading, DM Sans paragraph, gold accent element, green button preview. |
| CREATE | `src/lib/constants.ts` | Farm info object: `name`, `shortName`, `tagline`, `subTagline`, `establishedYear`, `whatsappNumber`, `location`, `email`. |

**DEPENDENCY:** Phase 1 (scaffold compiles and renders).

**CHECKPOINT:** `http://localhost:3000` renders with:
- `#1A1410` (Deep Earth) body background — entire page dark
- `#F5F0E8` (Warm Cream) body text
- Playfair Display visible on any heading element
- DM Sans visible on body/paragraph text
- Gold accent (`#C8A951`) and green (`#2D5A27`) visible as color swatches on the test page
- No console errors, Google Fonts load, Tailwind compiles without warnings

---

## Phase 3 — Database Foundation

**GOAL:** Prisma schema models all 8 entities, SQLite database file is live, and the Prisma client singleton is ready to import from any file in the project.

**FILES TO CREATE/EDIT:**

| Action | File | Notes |
|--------|------|-------|
| CREATE | `prisma/schema.prisma` | All 8 models, SQLite provider, enums, relations, unique constraints |
| CREATE | `src/lib/prisma.ts` | Singleton pattern — `globalThis.prisma` guard prevents hot-reload duplicate clients |
| EDIT | `.env` | Add `DATABASE_URL="file:./dev.db"` |
| EDIT | `package.json` | Add `prisma` scripts |

**DEPENDENCY:** Phase 1 (scaffold). Phase 2 (design) is independent.

**CHECKPOINT:**
- `npm run db:push` succeeds with zero errors — `dev.db` file appears in `prisma/`
- `npm run db:studio` opens Prisma Studio in browser showing all 8 tables
- `import { prisma } from '@/lib/prisma'` compiles anywhere in the project

---

## Phase 4 — Public Shell & Seed Data

**GOAL:** All public pages get a consistent shell: scroll‑aware navigation bar, site footer, and floating WhatsApp button. A seed script populates the database with realistic sample produce, livestock, a voting round, gallery photos, and an admin user.

**FILES TO CREATE/EDIT:**

| Action | File | Notes |
|--------|------|-------|
| CREATE | `src/components/layout/PublicLayout.tsx` | Server component wrapping `{children}` with NavBar, Footer, WhatsAppFloatingButton |
| CREATE | `src/components/layout/NavBar.tsx` | Client component. Scroll‑aware: hidden at top of homepage, slides in after 100px scroll → sticky. Active link highlighted in harvest‑gold. Three links: Produce, Livestock, Contact. |
| CREATE | `src/components/layout/Footer.tsx` | Server component. `bg-rich-soil`, muted text. Farm name, Contact link, location. |
| CREATE | `src/components/ui/WhatsAppFloatingButton.tsx` | Client component. Fixed bottom‑right, green circle, white WhatsApp SVG, pulse ring animation. |
| CREATE | `prisma/seed.ts` | TypeScript seed script. See data-pack for full content. |
| EDIT | `package.json` | Add `"db:seed": "npx tsx prisma/seed.ts"` script; add `tsx` to `devDependencies`. |
| EDIT | `src/app/layout.tsx` | Import `PublicLayout`, wrap `{children}`. |

**DEPENDENCY:** Phase 3 (database exists, Prisma client works).

**CHECKPOINT:**
- `npm run db:seed` → zero errors, all rows visible in `npx prisma studio`
- `npm run dev`:
  - Homepage `/`: NavBar hidden at top; scroll past ~100px → NavBar slides in, sticky; footer at bottom; WhatsApp button at bottom‑right with pulse ring
  - `/produce`, `/livestock`, `/contact`: NavBar visible from load, sticky, active link in gold
  - WhatsApp button click opens `wa.me/27641234567` in a new tab

---

## Phase 5 — Homepage Hero, Produce Grid & Livestock Grid

**GOAL:** Visitors see the full homepage with hero CTAs and gallery preview, plus browse produce and livestock as database-driven cards in responsive grids. All public pages now show real content from the database.

**FILES TO CREATE/EDIT:**

| Action | File | Notes |
|--------|------|-------|
| CREATE | `src/components/home/HeroSection.tsx` | Server component. Reads `FARM`. Two identical-sized CTAs: "Browse Livestock" → `/livestock`, "Our Produce" → `/produce`. Both `bg-forest-canopy`, `text-warm-cream`, `rounded-lg`, `px-8 py-4`. Background: solid `bg-deep-earth`. |
| CREATE | `src/components/home/GalleryPreview.tsx` | Server component. Queries 3 `GalleryPhoto` rows ordered by `displayOrder`. Responsive 3‑column grid. `<Image>` with overlay text "View Gallery →" linked to `/contact`. |
| CREATE | `src/components/produce/ProduceCard.tsx` | Client component. Props: `produce: ProduceItem`. Image, name, description (2‑line clamp), category pill, seasonality badge (green for in-season, muted for out-of-season). |
| CREATE | `src/components/produce/ProduceGrid.tsx` | Server component. Queries all `ProduceItem` rows ordered by `displayOrder`. Maps to ProduceCard in responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`). |
| CREATE | `src/components/livestock/LivestockCard.tsx` | Client component. Props: `livestock: LivestockItem`. Photo, name, price range (gold), availability badge (green=Available, gold=ComingSoon, muted=Sold). Hover scale effect. |
| CREATE | `src/components/livestock/LivestockGrid.tsx` | Server component. Queries all `LivestockItem` rows ordered by `displayOrder`. Maps to LivestockCard in responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`). |
| EDIT | `src/app/page.tsx` | Replace test panel. Import and render: `<HeroSection />` followed by `<GalleryPreview />`. |
| CREATE | `src/app/produce/page.tsx` | Server component. Page heading + `<ProduceGrid />`. |
| CREATE | `src/app/livestock/page.tsx` | Server component. Page heading + `<LivestockGrid />`. |

**DEPENDENCY:** Phase 4 (database seeded, shell active, PublicLayout wraps all pages).

**CHECKPOINT:**
- **Homepage `/`**: Hero shows tagline + sub‑tagline + two equal CTAs. Below: 3 gallery photos from seed. Clicking "View Gallery" → `/contact`.
- **`/produce`**: Grid of 6 cards. Butternut/Tomatoes/Chillies/Coriander show green "In Season" badge. Spinach/Maize show muted "Out of Season" badge.
- **`/livestock`**: Grid of 4 cards. Bull #3/Boer Goat green "Available". Nguni Cow gold "Coming Soon". Dorper Sheep muted "Sold". Price ranges in harvest‑gold.
- NavBar active link highlighted per page. Zero console errors. All data from database.

---

## Phase 6 — Contact Page, Voting Section & Newsletter

**GOAL:** Visitors can fill in and submit the contact form, view the community voting section with live vote counts, cast a multi‑select vote, and subscribe to the newsletter — all fully functional with server actions.

**FILES TO CREATE/EDIT:**

| Action | File | Notes |
|--------|------|-------|
| CREATE | `src/app/contact/page.tsx` | Server component. Three sections stacked vertically: ContactForm, VotingSection, NewsletterForm. Page heading in `font-heading`. |
| CREATE | `src/components/contact/ContactForm.tsx` | Client component (`'use client'`). Controlled form: name (required), email (required, validated), phone (optional), message (required). Calls `submitContact` server action. Shows success/error state inline. |
| CREATE | `src/components/contact/VotingSection.tsx` | Server component. Fetches active `VotingRound` with `VotingCrop`s (include `_count.votes` on each). Passes to `VotingBallot` client component. |
| CREATE | `src/components/contact/VotingBallot.tsx` | Client component. Props: `{ crops: VotingCropWithCount[] }`. Checkbox per crop, email input, submit button. Calls `submitVote` server action. Shows "already voted" / "thanks" / error states. |
| CREATE | `src/components/contact/NewsletterForm.tsx` | Client component. Email input + Subscribe button. Calls `subscribeEmail` server action. Shows success / already-subscribed / error states. |
| CREATE | `src/app/actions/contact.ts` | Server action: validates name/email/message, creates `ContactMessage` record. Returns `{ success: boolean; error?: string }`. |
| CREATE | `src/app/actions/voting.ts` | Server action: receives `{ email, votingRoundId, cropIds: string[] }`. Validates: email format, at least 1 crop, not already voted this round. Uses `prisma.$transaction` to insert all `Vote` rows atomically. Returns `{ success, error?, votesCast? }`. |
| CREATE | `src/app/actions/newsletter.ts` | Server action: receives email. Validates format. Upserts `Subscriber` (create Active or reactivate Unsubscribed). Returns `{ success, error?, isDuplicate? }`. |

**DEPENDENCY:** Phase 5 (NavBar Contact link and gallery CTAs point to `/contact`).

**CHECKPOINT:**
- **Contact form** — Fill all fields, submit. `ContactMessage` row appears in DB (verify via Prisma Studio). Green success message shown. Form resets. Submit with empty name → red validation error.
- **Voting section** — Three crop checkboxes with "0 votes" each visible. Check Cabbage + Sweet Potato, type `test@example.com`, submit. Two `Vote` rows in DB. Counts update to 1 each on next page load. Re-submit same email → "You've already voted this round." Submit with no crops checked → "Select at least one crop."
- **Newsletter** — Enter `farmer@example.com`, click Subscribe. `Subscriber` row created (status=Active). Green "Subscribed!" message. Re-enter same email → "You're already subscribed."

---

## Phase 7 — Admin Login & Read-Only Dashboard

**GOAL:** Admin logs in at `/admin/login` with plain-text password. Dashboard at `/admin` displays contact messages (read/unread), voting round stats with per-crop tallies, and subscriber counts — all read-only.

**FILES TO CREATE/EDIT:**

| Action | File | Notes |
|--------|------|-------|
| CREATE | `src/app/admin/login/page.tsx` | Server component. Centered login card on dark background with farm logo placeholder + descriptive text. Renders `<LoginForm />`. |
| CREATE | `src/components/admin/LoginForm.tsx` | Client component (`'use client'`). Email + password inputs + submit button. Calls `authenticateAdmin` server action. On success: sets `admin_token` cookie, redirects to `/admin`. Shows inline error for bad credentials. |
| CREATE | `src/app/admin/layout.tsx` | Minimal admin layout — NO PublicLayout (no NavBar, no Footer). Dark background (`bg-deep-earth`). Top bar with "Admin — Goddard Projects" title + `<LogoutButton />`. Body renders `{children}` below. |
| CREATE | `src/app/admin/page.tsx` | Server component (cookie-gated). Three-panel dashboard in a responsive grid. Reads cookie, validates via `getAdminFromCookies()`, then renders MessagesPanel + VotingPanel + SubscriberPanel. |
| CREATE | `src/components/admin/MessagesPanel.tsx` | Server component. Queries `ContactMessage` rows (ordered newest-first, all rows). Each row: name, email, date, first 120 chars of message, read/unread dot (clay dot = unread, green dot = read). Panel: `bg-rich-soil rounded-lg p-6`. |
| CREATE | `src/components/admin/VotingPanel.tsx` | Server component. Finds active `VotingRound` with `VotingCrop`s (each includes `_count.votes`). Shows round title, start/end dates, per-crop name + vote count, total votes. If no active round: "No active voting round." |
| CREATE | `src/components/admin/SubscriberPanel.tsx` | Server component. Queries `prisma.subscriber.count({ where: { status: 'Active' } })` and analog for Unsubscribed. Displays two stat cards with large numbers and labels. |
| CREATE | `src/components/admin/LogoutButton.tsx` | Client component (`'use client'`). Button that clears `admin_token` cookie and redirects to `/admin/login`. |
| CREATE | `src/app/actions/auth.ts` | Server action. Receives `{ email, password }`. Queries `AdminUser` by email. Compares plain-text password directly. On match: sets `admin_token` HTTP-only cookie (value: `admin.session` — simple string for MVP). Returns `{ success, error? }`. |
| CREATE | `src/lib/auth.ts` | Helper functions: `getAdminFromCookies()` — reads `admin_token` cookie from `next/headers`. `verifyAdmin()` — returns boolean. Both used by page.tsx and middleware. |
| CREATE | `src/middleware.ts` | Checks `admin_token` cookie on all `/admin` routes EXCEPT `/admin/login`. Redirects unauthenticated requests to `/admin/login`. Passes through all other routes unchanged. |
| EDIT | `prisma/seed.ts` | Update admin passwordHash to plain text `'farm2026'` (so login works with plain-text comparison). Or add a comment that the Builder should use this value. |

**DEPENDENCY:** Phase 6 (server actions pattern established, Prisma client familiar, `/admin` routes are new but unreachable until now).

**CHECKPOINT:**
- `GET /admin` → redirected to `/admin/login` (no cookie set).
- `/admin/login` renders centered login card with email + password fields.
- Login with `admin@goddardprojects.co.za` / `farm2026` → cookie set, redirected to `/admin`.
- `/admin` dashboard shows:
  - **Messages panel**: table of ContactMessages (empty after fresh seed, but panel structure visible with column headers: Name, Email, Date, Message, Status).
  - **Voting panel**: "What's Growing This Season?" with Cabbage (0 votes), Sweet Potato (0 votes), Groundnuts (0 votes), Total: 0.
  - **Subscriber panel**: two stat cards — "Active Subscribers: 0" and "Unsubscribed: 0".
- Click Logout → cookie cleared, redirected to `/admin/login`.
- Admin pages have NO public NavBar or Footer — just the minimal dark top bar.
- Visit `/produce` — public NavBar still works, completely unaffected by middleware.

---

## Phase 8 — Admin CRUD (Final Phase)

**GOAL:** The admin dashboard is now organized into six tabs. The admin can mark contact messages as read, manage voting rounds (create/close/reopen rounds, add/remove crops), perform full CRUD on produce and livestock, add/delete gallery photos, and export subscriber emails as CSV.

**FILES TO CREATE/EDIT:**

| Action | File | Notes |
|--------|------|-------|
| EDIT | `src/app/admin/page.tsx` | Replace three-panel grid with `<AdminDashboard />` client component that manages tabs |
| EDIT | `src/app/admin/layout.tsx` | No changes needed — top bar with logout stays |
| CREATE | `src/components/admin/AdminDashboard.tsx` | Client component (`'use client'`). Tab bar at top with 6 tabs: Messages, Voting, Produce, Livestock, Gallery, Subscribers. `useState` for `activeTab`. Renders the active panel below. |
| EDIT | `src/components/admin/MessagesPanel.tsx` | Add "Mark Read" button per row. Add expand/collapse to show full message. Calls `markMessageAsRead` server action. |
| EDIT | `src/components/admin/VotingPanel.tsx` | Add "New Round" button → inline form. "Close Round" / "Reopen Round" toggle per round. "+ Add Crop" inline. "✕" remove crop per crop. All calls go to `admin/voting.ts` server actions. |
| CREATE | `src/components/admin/ProduceManager.tsx` | Client component wrapping server‑fetched produce. Table with Edit/Delete per row. "Add New" button → inline form with all fields (name, description, category, seasonality, inSeason toggle, imageUrl, displayOrder). Edit reuses same form pre‑filled. Delete with confirm. |
| CREATE | `src/components/admin/LivestockManager.tsx` | Client component. Table + inline Add/Edit form. Fields: name, photoUrl, priceRange, availabilityStatus dropdown, displayOrder. Delete with confirm. |
| CREATE | `src/components/admin/GalleryManager.tsx` | Client component. Grid of current photos (thumbnail + alt + category). Each has delete ✕. "Add Photo" form: url, alt, category, displayOrder. |
| CREATE | `src/components/admin/SubscriberExport.tsx` | Client component. Shows Active + Unsubscribed counts. "Export CSV" button calls `exportSubscribers` server action → triggers browser download. |
| CREATE | `src/app/actions/admin/messages.ts` | Server action: `markMessageAsRead(messageId: string)` — sets `isRead = true`. Returns `{ success, error? }`. |
| CREATE | `src/app/actions/admin/voting.ts` | Server actions: `createVotingRound(data)`, `toggleVotingRound(id, isActive)`, `addCrop(roundId, name, photoUrl?)`, `removeCrop(cropId)`. Each returns `{ success, error? }`. |
| CREATE | `src/app/actions/admin/produce.ts` | Server actions: `createProduce(data)`, `updateProduce(id, data)`, `deleteProduce(id)`. Validates required fields. Returns `{ success, error? }`. |
| CREATE | `src/app/actions/admin/livestock.ts` | Server actions: `createLivestock(data)`, `updateLivestock(id, data)`, `deleteLivestock(id)`. Validates required fields. Returns `{ success, error? }`. |
| CREATE | `src/app/actions/admin/gallery.ts` | Server actions: `createPhoto(data)`, `deletePhoto(id)`. Returns `{ success, error? }`. |
| CREATE | `src/app/actions/admin/subscribers.ts` | Server action: `exportSubscribers()` — queries all Active subscribers, returns CSV string. |

**DEPENDENCY:** Phase 7 (admin is authenticated, dashboard shell and read-only panels exist, admin layout and middleware are in place).

**CHECKPOINT:**
- **Tab bar** visible at top of `/admin` with 6 tabs. Clicking each switches the visible panel. "Messages" is default active.
- **Messages tab**: Each row has a "Mark Read" button. Click → dot turns green, button disappears. Click a message row → expands to show full message text.
- **Voting tab**: Shows current round with per-crop bars (from Phase 7). "New Round" button opens inline form (title, description, crop names). Submit → new round in DB. "Close Round" → `isActive = false`, button changes to "Reopen Round". "+ Add Crop" adds an input row. "✕" removes a crop. All changes persist and reflect on public `/contact` voting section.
- **Produce tab**: Table of all produce items with Edit/Delete per row. "Add New Produce" opens form. Fill fields → new item appears in table AND on public `/produce`. Edit → updates. Delete → confirm dialog → removed from DB and grid.
- **Livestock tab**: Same as produce but with livestock fields (priceRange, availabilityStatus). Changes reflected on public `/livestock`.
- **Gallery tab**: Thumbnail grid of photos. Delete ✕ per photo. "Add Photo" form with URL/alt/category/order inputs. New photos appear on homepage gallery preview.
- **Subscribers tab**: Active + Unsubscribed counts. "Export CSV" button → browser downloads `.csv` file with email, status, subscribedAt columns.
- All actions are cookie‑gated. Unauthenticated requests to any server action redirect to `/admin/login`.

---


# Goddard Projects Farm — Website Architecture

## Overview

**Project:** Single-page responsive website for Goddard Projects Farm
**Audience:** Procurement managers at wholesalers and grocery stores
**Primary Goal:** Present the farm as a reliable B2B fresh produce & livestock supplier
**Secondary Goal:** Generate inbound inquiries via WhatsApp and contact form

---

## Brand Identity

### Farm Details
- **Name:** Goddard Projects Farm
- **Established:** 2007
- **Location:** Plot Manamane, Manamane Village, Thohoyandou, Limpopo, 0950
- **Coordinates:** -23.032375, 30.451792
- **Phone:** 082 040 6558 / +27 71 446 1512
- **Email:** info@rendeals4.co.za
- **BBBEE:** Level 1 (maximum procurement recognition)
- **Logo:** circular emblem design — file: assets/logo.jpg

### Core Philosophy
> "We believe there is no life without food. Healthy, clean food is the foundation of a healthy community."

### What The Farm Offers
| Category | Details | Price Range |
|----------|---------|-------------|
| Cattle | 32 head available | R7,500 – R13,500 per head |
| Sheep | 42 head available | R1,600 – R2,800 per head |
| Crops | Chillies, Butternuts, Tomatoes | Seasonal — contact for pricing |

### Land & History
The farm operates on land allocated by Chief Ravele of Dzwerani/Manamane. For over 19 years, Goddard Projects Farm has supplied fresh produce and livestock from the Thohoyandou region of Limpopo to wholesalers and grocery stores.

---

## Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Limpopo Soil (primary accent) | #8B5E3C | Buttons, section dividers, BBBEE badge |
| Sage Green (secondary accent) | #6B8E5A | Product cards, highlights |
| Warm Cream (background) | #FDF8F0 | Page background |
| Deep Charcoal (text) | #2D2D2D | Body text, headings |
| Off-White (card bg) | #FFFFFF | Cards, content blocks |
| WhatsApp Green | #25D366 | WhatsApp button only |
| Gold (BBBEE badge) | #C8963E | BBBEE badge border/accent |

### Typography
- **Font stack:** 'Inter', system-ui, -apple-system, sans-serif
- **Headings:** Bold, 700 weight
- **Body:** Regular, 400 weight
- **Base size:** 16px (1rem)
- **Line height:** 1.6 for body text
- Load from Google Fonts (Inter) with system font fallback

### Spacing & Layout
- **Max content width:** 1200px (centered)
- **Section padding:** 80px top/bottom on desktop, 48px on mobile
- **Card gaps:** 24px
- **Border radius:** 8px on cards, 4px on buttons

---

## Site Structure (Single Page, 6 Sections + Footer)

### Section 1: HERO
- **Background:** Full-width photo — tomatoes on bush with 40% dark overlay
- **Content:** Logo, farm name, BBBEE Level 1 badge, tagline, two CTAs
- **CTAs:** [View Our Products] → scrolls to Section 3, [Get In Touch] → scrolls to Section 6

### Section 2: ABOUT
- **Layout:** Two-column (text left, stats right) on desktop; stacked on mobile
- **Content:** Philosophy quote, farm history paragraph, three stat cards (2007, 32 cattle, 42 sheep)

### Section 3: PRODUCTS
- **Layout:** Three product cards — Cattle, Sheep, Crops
- **Each card:** Image top, title, price range, description
- **Note:** "Availability changes with the seasons. Contact us for current stock and pricing."

### Section 4: WHY CHOOSE US
- **Layout:** Four value cards in 2×2 grid
- **Cards:** BBBEE Level 1, Established 2007, Diversified Supply, Limpopo Based

### Section 5: GALLERY
- **Layout:** 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- **Images:** 8-12 optimized farm photos
- **Interaction:** Click to open lightbox; Escape to close; arrow key navigation

### Section 6: CONTACT
- **Layout:** Two-column (info left, form right), stacked on mobile
- **Content:** Address, phones, email, Google Maps embed, contact form
- **WhatsApp button:** Fixed bottom-right, links to wa.me/27820406558 with pre-filled message

### Section 7: FOOTER
- © 2025 Goddard Projects Farm | BBBEE Level 1 | Thohoyandou, Limpopo

---

## Technical Requirements

### File Structure
```
goddard-farm-site/
├── index.html              ← Single page, all sections
├── styles/
│   └── main.css            ← All styling
├── scripts/
│   └── main.js             ← Lightbox, smooth scroll, form handling
├── assets/
│   ├── logo.jpg            ← Farm logo
│   ├── hero-bg.jpg         ← Tomatoes photo (optimized)
│   ├── about-bg.jpg        ← Landscape/workers photo (optimized)
│   └── gallery/            ← 8-12 optimized gallery images
└── docs/
    ├── architecture.md     ← This file
    ├── task-list.md        ← Ordered task breakdown
    └── repo-map.md         ← Structural map, updated each iteration
```

### Technical Constraints
- **No frameworks.** Pure HTML, CSS, vanilla JavaScript. Zero build step.
- **No backend.** Contact form uses `mailto:` fallback initially.
- **Responsive.** Breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px).
- **Performance:** Images optimized (JPEG, max 200KB each), lazy-loaded below fold.
- **Accessibility:** Semantic HTML, alt text on all images, keyboard-navigable lightbox.
- **Browser support:** Modern browsers (Chrome, Firefox, Safari, Edge — last 2 versions).

---

## Data Flow

This section describes what happens when a user performs each key interaction — from click through to what they see next. It covers the five primary flows: voting, subscribing, contact form submission, admin CRUD, and WhatsApp click.

---

### 1. Voting Flow (Crop Voting System)

**What the user does:**
A visitor navigates to the Vote for Crops page. They see the current voting round — a season label like "Winter 2026," a list of viable crops with checkboxes, and an explanation of what the vote is for. The visitor checks the crops they'd like the farm to plant, then clicks the "Cast Your Vote" button.

**What happens behind the scenes:**
- First, the system checks whether an active voting round exists. If no active round is found, the user sees a "No active voting round" message instead of the voting form — nothing further happens.
- If a round is active, the system checks whether this user is a known newsletter subscriber. It does this by looking for a subscriber flag in local browser storage (set during a previous subscription) and, if available, by verifying the email against the Mailchimp audience list via the Mailchimp API.
- If the user is NOT a subscriber: a pop-up overlay appears asking for their email address. The user cannot proceed without entering an email.
- If the user IS a subscriber (verified via local flag or API match): the system checks whether this email address has already voted in the current round. If yes, it shows: "You've already voted in this round. Thank you!" and stops.
- If the subscriber hasn't voted yet: the selected crop IDs plus the voter's email are written to local storage as a new vote record, timestamped with the round ID. The vote count for each selected crop is incremented.
- On successful recording, the page shows a "Thank you — your response has been recorded" confirmation message, and the voting form is replaced with this confirmation.

**What the user sees:**
- Before voting: a list of crop checkboxes, a "Cast Your Vote" button.
- If not subscribed: a pop-up overlay with an email field and "Subscribe & Vote" button.
- After voting: a green confirmation banner replacing the form: "Thank you — your response has been recorded."
- If already voted: an amber notice: "You've already voted in this round."
- If no active round: an informational message with a newsletter signup prompt.

**Storage touched:**
- Reads: Mailchimp API (subscriber lookup), local votes database (check for existing vote by email + round ID).
- Writes: local votes database (new vote record: email, round ID, selected crop IDs, timestamp), Mailchimp API (if subscribing during vote — see Subscription Flow below).

---

### 2. Subscription Flow (Newsletter Signup)

**What the user does:**
A visitor subscribes to the newsletter in one of two ways: (a) by checking the "Add me to the newsletter list" box on the contact form and submitting, or (b) by entering their email in the voting pop-up and clicking "Subscribe & Vote."

**What happens behind the scenes:**
- The email address is validated locally for correct format (contains an @, has a domain).
- If the format is invalid, an inline error appears immediately: "Please enter a valid email address."
- If valid, the system attempts to add or update the subscriber in the Mailchimp audience via the Mailchimp API. It sends the email and any available merge fields (name if provided from contact form, source tag like "contact-form" or "voting-popup").
- If the Mailchimp API call succeeds: a subscriber flag is set in the user's browser local storage (so they won't be prompted again on the voting page), and the subscription is confirmed.
- If the Mailchimp API is unreachable or returns an error: the subscription is queued locally — the email is saved to a pending-subscriptions table with a "pending" status and a timestamp. The user is NOT shown an error. The system will retry the Mailchimp sync later (or the admin can trigger a manual sync from the admin panel). This is the graceful degradation rule: Mailchimp failures must never block the user's primary action.

**What the user sees:**
- From contact form: the form submits as normal. If they checked the newsletter box, a small green note appears alongside the success message: "You've been added to our newsletter."
- From voting pop-up: the pop-up closes, the vote is cast, and the voting confirmation appears with a subtle note: "You're now subscribed to our newsletter."
- In both cases: if Mailchimp is down, the user still sees the success message. They are never shown a Mailchimp error.

**Storage touched:**
- Reads: local pending-subscriptions table (to avoid duplicate queue entries).
- Writes: Mailchimp API (add/update subscriber), local pending-subscriptions table (if Mailchimp fails), browser local storage (subscriber flag).

---

### 3. Contact Form Flow

**What the user does:**
A visitor fills out the contact form: name (required), email (required), phone (optional), message (required). They optionally check the "Add me to the newsletter list" box. They click "Send Message."

**What happens behind the scenes:**
- All required fields are validated. If any required field is empty, or the email format is invalid, inline errors appear under each offending field, and the form does not submit.
- If validation passes: the form data (all fields plus a timestamp) is saved to the local messages database as a new record with status "unread."
- If the newsletter checkbox was ticked, the Subscription Flow (described above) is triggered in parallel.
- The form is then submitted via the browser's native `mailto:` action, which opens the user's default email client with the message body pre-filled. This ensures the farm receives the inquiry even without a backend.
- After submission, the form fields are cleared.

**What the user sees:**
- During filling: inline validation errors appear in real-time under each field as they type (e.g., "Please enter a valid email address").
- On successful submission: the form clears, and a green success message appears at the top of the form: "Your message has been sent. We'll get back to you soon."
- The user's email client may open (depends on their browser/OS configuration for mailto: links).

**Storage touched:**
- Writes: local messages database (new message record: name, email, phone, message, newsletter flag, timestamp, status = "unread").
- Writes (if newsletter checked): Mailchimp API and/or local pending-subscriptions table.

---

### 4. Admin CRUD Flow

**What the user does:**
The farm owner navigates to the admin login page, enters their username and password, and clicks "Log In." Once authenticated, they land on the admin dashboard where they can manage four things: Livestock, Produce, Voting Rounds, and Homepage settings.

**Login flow:**
- Credentials are compared against a stored username and hashed password. On match, a session token is created and stored in the browser. The admin is redirected to the dashboard.
- On mismatch, an error message appears: "Invalid username or password." The form remains, and no session is created.
- The admin session persists until they click "Log Out" or the session expires.

**Livestock management (Add / Edit / Remove):**
- Admin clicks "Livestock" in the sidebar. A table of all animals appears — each row shows thumbnail, name/ID, price range, and availability badge.
- Admin clicks "Add New Animal" → a form appears with fields: photo upload, name/ID, price range (min and max), availability toggle.
- On save: the photo is uploaded and optimized (resized, compressed to ≤200KB JPEG). A new animal record is written to the livestock database. The table refreshes.
- Admin clicks "Edit" on any row → the same form pre-filled with that animal's data. On save: the record is updated. On cancel: no change.
- Admin clicks "Remove" → a confirmation dialog appears: "Remove [Animal Name] from the catalog?" On confirm: the record is deleted. The photo file may be retained or cleaned up.
- Every change is immediately reflected in the public Livestock Catalog section.

**Produce management (Add / Edit / Remove / Hide):**
- Same pattern as Livestock, with additional fields: description, harvest months, typical pricing, minimum order quantity, seasonal badge status.
- Multiple photos per crop (uploaded as a set).
- "Hide" option: marks a crop as hidden rather than deleting it (for off-season crops that will return). Hidden crops don't appear on the public site but remain in the database.

**Voting round management:**
- Admin clicks "Voting Rounds" → sees a list of all rounds (past and current).
- Admin clicks "Create New Round" → form with: season label (text), list of viable crops (text entries with name + short description), deadline (date picker).
- On save: a new voting round is created. Any previous round is automatically closed (its active flag set to false).
- Admin clicks "View Results" on any round → sees a table: crop name and vote count, sorted by count descending. Results are read-only.

**Homepage management:**
- Admin clicks "Homepage" → form with: hero image upload/replace, tagline text field.
- On save: the hero image is replaced (old one may be backed up), tagline is updated. Changes reflect immediately.

**What the admin sees:**
- Dashboard landing: summary cards (total livestock, total crops, active voting round status, unread messages count).
- Each CRUD section: table view → form view → back to table with updated data.
- Confirmation toasts or inline messages for every save/delete action.

**Storage touched:**
- Reads: admin credentials (login), livestock records, produce records, voting rounds + results, messages, homepage settings.
- Writes: all of the above (create, update, delete operations).
- File system: photo uploads (read/write/delete image files).

---

### 5. WhatsApp Click Flow

**What the user does:**
The visitor clicks a WhatsApp button. There are three contexts where this happens:
- The **floating WhatsApp button** (fixed bottom-right, visible site-wide).
- A **livestock detail modal** — clicking "Interested? Message us on WhatsApp" for a specific animal.
- A **produce detail page** — clicking the WhatsApp button for a specific crop.

**What happens behind the scenes:**
- No server request is made. No local storage is read or written.
- The link target is a WhatsApp deep link URL: `https://wa.me/27820406558?text=...`
- The pre-filled message text varies by context:
  - Floating button (generic): *"Hi, I'm visiting your farm website and I'd like to get in touch."*
  - Livestock card: *"Hi, I'm interested in [Animal Name] — [Price Range]. Is it still available?"*
  - Produce page: *"Hi, I'm interested in ordering [Crop Name]."*
- The browser or operating system handles the URL — on mobile, this opens the WhatsApp app directly to the chat. On desktop, it opens WhatsApp Web in a new tab.
- If the animal is marked "Out of Stock," the livestock modal shows "Currently Unavailable" instead of the WhatsApp button, and no WhatsApp link is generated.

**What the user sees:**
- On mobile: the WhatsApp app opens with the pre-filled message in the chat input, ready to send.
- On desktop: a new browser tab opens with WhatsApp Web, showing the chat with the farm number and the pre-filled message.
- The farm website remains open in the original tab — the user can return to it.
- If WhatsApp is not installed (rare on mobile), the user's browser may prompt them to install it or show an error page (handled by the OS/browser, not the site).

**Storage touched:**
- None. This is a stateless navigation action — a URL redirect with no data persistence.

---

### Data Flow Summary Table

| Interaction | Trigger | API / External Calls | Local Storage Reads | Local Storage Writes | User Sees |
|---|---|---|---|---|---|
| Vote (not subscribed) | Click "Cast Your Vote" | Mailchimp (lookup subscriber) | Check existing vote | — | Email pop-up |
| Vote (subscribed, not voted) | Click "Subscribe & Vote" or "Cast Your Vote" | Mailchimp (add if new) | Check existing vote | New vote record, subscriber flag | Green confirmation |
| Vote (already voted) | Click "Cast Your Vote" | — | Check existing vote | — | "Already voted" notice |
| Subscribe via contact form | Submit form with checkbox | Mailchimp (add subscriber) | — | Pending sub (if Mailchimp fails), browser flag | Success message with sub note |
| Contact form submit | Click "Send Message" | — | — | New message record | Green success, form cleared |
| Admin login | Click "Log In" | — | Check credentials | Session token | Dashboard |
| Admin CRUD (any) | Save / Delete / Update | — | Read records | Write/update/delete records | Updated table or confirmation |
| WhatsApp click | Click WhatsApp button | — | — | — | WhatsApp app or Web with pre-filled message |

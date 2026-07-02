# Goddard Projects Farm — Architecture Document

## Tech Stack

| Layer | Technology | Why Chosen |
|-------|-----------|------------|
| Frontend | Next.js 14+ (App Router) | Server components, API routes, Server Actions — full-stack in one framework. Excellent SEO. Single `npm run dev` on Windows 11. |
| Styling | Tailwind CSS | Utility-first rapid responsive design. Dark theme customization. |
| Logic | Next.js Server Actions + API Routes | Handles forms, Mailchimp calls, admin auth, voting logic — all server-side. |
| Storage | Prisma ORM + SQLite (dev) | Relational data fits the produce/livestock/voting/subscriber model perfectly. SQLite is file-based — no Docker. Easy upgrade to PostgreSQL later via provider swap. |
| Build Tool | Next.js (built-in) | Bundled; deploy anywhere Node.js runs. |

---

## Color & Style — "Limpopo Dusk"

### Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Deep Earth | `#1A1410` | Page background — very dark warm brown-black |
| Surface / Cards | Rich Soil | `#261F1A` | Card backgrounds, slightly lifted from page |
| Primary Green | Forest Canopy | `#2D5A27` to `#3F7840` | Buttons, links, badges, CTAs |
| Accent Gold | Harvest Gold | `#C8A951` / `#D4AF37` | Highlights, active states, voting indicators, logo mark |
| Text Primary | Warm Cream | `#F5F0E8` | Body text on dark backgrounds |
| Text Muted | Dusty Clay | `#A89880` | Secondary text, captions, metadata |
| Border / Divider | Subtle Earth | `#3A3228` | Card borders, dividers |

### Typography

| Role | Font | Style |
|------|------|-------|
| Headings | Playfair Display (serif) | Elegant, warm, heritage feel |
| Body | DM Sans (sans-serif) | Clean, highly readable on dark backgrounds |

### Style Keywords

- **Purposeful whitespace** — every gap frames content. Photos bleed edge-to-edge. Cards float with room.
- **Photography-first** — farm photos do the heavy lifting. Dark UI recedes, lets images shine.
- **Gold used sparingly** — only for the "special" moments: buttons, vote highlights, logo, active nav.
- **Green does functional work** — badges, links, CTAs.
- **Subtle texture** — possible grain overlay on hero. Nothing heavy.
- **Purposeful asymmetry** — sections alternate rhythm as user scrolls.

### First Impression Goal

User opens the site → full-viewport farm photo, "From Our Soil to Your Table" in Playfair Display, gold logo mark. They feel: *"Wow, this is so beautiful."*

---

## Page Layouts

### 1. Home / Landing (`/`)

```
┌──────────────────────────────────────────────────────────────┐
│  (No nav bar — pure full-screen hero)                        │
│                                                              │
│                    ┌──────────────────┐                      │
│                    │   FULL-VIEWPORT  │                      │
│                    │   HERO PHOTO     │  ← Golden hour       │
│                    │   (farm/fields)  │    Limpopo farm      │
│                    │                  │                      │
│                    │ "From Our Soil   │                      │
│                    │  to Your Table"  │  ← Playfair Display  │
│                    │                  │    large, cream      │
│                    │ "farming made    │                      │
│                    │  better"         │  ← DM Sans, muted    │
│                    │                  │    gold, italic      │
│                    │ Goddard Projects │                      │
│                    │  since 2007      │  ← DM Sans, clay     │
│                    │                  │                      │
│                    │    [ LOGO ]      │  ← Borderless,       │
│                    │   centred, gold  │    wordless emblem   │
│                    │                  │                      │
│                    │ ─────────────────│                      │
│                    │  Brief farm      │                      │
│                    │  background      │  ← 2-3 sentences     │
│                    │  paragraph       │    DM Sans, cream    │
│                    └──────────────────┘                      │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  [NAV BAR APPEARS ON SCROLL — slides in from top]           │
│  [LOGO icon] Farm Name    Produce │ Livestock │ Contact      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   LIVESTOCK CAROUSEL (full-width row, horizontal scroll)    │
│   ┌──────────────────────────────────────────────────────┐   │
│   │  🐄 LIVESTOCK                          [View more →]│   │
│   │  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐           │   │
│   │  │Animal │ │Animal │ │Animal │ │Animal │ → peek    │   │
│   │  │ photo │ │ photo │ │ photo │ │ photo │           │   │
│   │  │ name  │ │ name  │ │ name  │ │ name  │           │   │
│   │  └───────┘ └───────┘ └───────┘ └───────┘           │   │
│   └──────────────────────────────────────────────────────┘   │
│                                                              │
│   PRODUCE CAROUSEL (full-width row, horizontal scroll)      │
│   ┌──────────────────────────────────────────────────────┐   │
│   │  🥬 PRODUCE                           [View more →] │   │
│   │  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐           │   │
│   │  │ Crop  │ │ Crop  │ │ Crop  │ │ Crop  │ → peek    │   │
│   │  │ photo │ │ photo │ │ photo │ │ photo │           │   │
│   │  │ name  │ │ name  │ │ name  │ │ name  │           │   │
│   │  └───────┘ └───────┘ └───────┘ └───────┘           │   │
│   └──────────────────────────────────────────────────────┘   │
│                                                              │
│   VOTING SECTION (inline with overlay trigger)               │
│   ┌──────────────────────────────────────────────────────┐   │
│   │  🌿 WHAT'S GROWING THIS SEASON?                      │   │
│   │  Description line about current planting round       │   │
│   │              [ VOTE NOW → ]  (gold button)           │   │
│   └──────────────────────────────────────────────────────┘   │
│                                                              │
│   ╔═══════════ ON CLICK: DARK OVERLAY + VOTING SHEET ═══╗  │
│   ║  (Background blurs, semi-transparent dark overlay)  ║  │
│   ║  ┌────────────────────────────────────┐             ║  │
│   ║  │  WHAT'S GROWING THIS SEASON?       │             ║  │
│   ║  │  ┌──────┐ ┌──────┐ ┌──────┐      │             ║  │
│   ║  │  │ Crop │ │ Crop │ │ Crop │      │             ║  │
│   ║  │  │  A   │ │  B   │ │  C   │      │             ║  │
│   ║  │  │[Vote]│ │[Vote]│ │[Vote]│      │             ║  │
│   ║  │  └──────┘ └──────┘ └──────┘      │             ║  │
│   ║  │  [Close ✕]          [Skip →]     │             ║  │
│   ║  └────────────────────────────────────┘             ║  │
│   ╚══════════════════════════════════════════════════════╝  │
│                                                              │
│   NEWSLETTER SIGNUP                                          │
│   ┌──────────────────────────────────────────────────────┐   │
│   │  📬 STAY CONNECTED                                   │   │
│   │  "Get harvest updates & vote in planting decisions"  │   │
│   │  [Email input]  [Subscribe — gold]                   │   │
│   └──────────────────────────────────────────────────────┘   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  [FOOTER]  Farm name  │  Contact  │  Location               │
│                                                              │
│                        ┌──────────┐                         │
│                        │  💬 📞   │  ← WhatsApp floating     │
│                        └──────────┘    fixed bottom-right    │
└──────────────────────────────────────────────────────────────┘
```

### 2. Produce Catalog (`/produce`)

```
┌──────────────────────────────────────────────────────────────┐
│  [NAV BAR]  LOGO Farm Name    Produce │ Livestock │ Contact  │
│            (Produce is active/underlined in gold)            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   PAGE HEADER                                                │
│   🥬 Our Produce                                            │
│   "Fresh from the soil, grown with care in the Limpopo sun."│
│                                                              │
│   🌿 In Season  (simple gold/green label)                    │
│                                                              │
│   PRODUCE GRID (4 cards per row desktop, responsive)        │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│   │  Crop    │ │  Crop    │ │  Crop    │ │  Crop    │      │
│   │  Photo   │ │  Photo   │ │  Photo   │ │  Photo   │      │
│   │  Name    │ │  Name    │ │  Name    │ │  Name    │      │
│   │  Desc... │ │  Desc... │ │  Desc... │ │  Desc... │      │
│   │ 🟢 Now  │ │ 🟢 Now  │ │ 🟡 Soon │ │ 🟡 Soon │      │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│   (more rows as needed)                                     │
│                                                              │
│   VOTING SECTION (inline — no overlay needed here)           │
│   🌿 WHAT'S GROWING THIS SEASON?                            │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│   │  Crop A  │  │  Crop B  │  │  Crop C  │                │
│   │  photo   │  │  photo   │  │  photo   │                │
│   │ [Vote]   │  │ [Vote]   │  │ [Vote]   │                │
│   │  40 votes│  │  27 votes│  │  33 votes│                │
│   └──────────┘  └──────────┘  └──────────┘                │
│   [Email field]  [Confirm Vote →]                          │
│                                                              │
│   FARM GALLERY                                               │
│   📷 Farm Gallery                                           │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐                      │
│   │  Photo  │ │  Photo  │ │  Photo  │                      │
│   │  1      │ │  2      │ │  3      │                      │
│   └─────────┘ └─────────┘ └─────────┘                      │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐                      │
│   │  Photo  │ │  Photo  │ │  Photo  │                      │
│   │  4      │ │  5      │ │  6      │                      │
│   └─────────┘ └─────────┘ └─────────┘                      │
│   (Masonry/even grid, lightbox on click)                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  [FOOTER]                          ┌──────────┐             │
│                                    │  💬 📞   │             │
│                                    └──────────┘             │
└──────────────────────────────────────────────────────────────┘
```

### 3. Livestock Catalog (`/livestock`)

```
┌──────────────────────────────────────────────────────────────┐
│  [NAV BAR]  LOGO Farm Name    Produce │ Livestock │ Contact  │
│            (Livestock is active/underlined in gold)          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   PAGE HEADER                                                │
│   🐄 Our Livestock                                          │
│   "Healthy animals, raised on open Limpopo land."           │
│                                                              │
│   LIVESTOCK GRID (4 cards per row desktop, responsive)      │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│   │  Animal  │ │  Animal  │ │  Animal  │ │  Animal  │      │
│   │  Photo   │ │  Photo   │ │  Photo   │ │  Photo   │      │
│   │  Name    │ │  Name    │ │  Name    │ │  Name    │      │
│   │  Breed   │ │  Breed   │ │  Breed   │ │  Breed   │      │
│   │  Desc... │ │  Desc... │ │  Desc... │ │  Desc... │      │
│   │ 🟢 Avail│ │ 🟢 Avail│ │ 🟡 Soon │ │ 🔴 Sold │      │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│   (more rows as needed)                                     │
│                                                              │
│   (No voting section — livestock-only page)                  │
│   (No gallery — gallery lives on Produce page)               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  [FOOTER]                          ┌──────────┐             │
│                                    │  💬 📞   │             │
│                                    └──────────┘             │
└──────────────────────────────────────────────────────────────┘
```

---

## Feature Walkthroughs

### Home Page

**The visitor opens the site.** No navigation, no chrome — just a breathtaking, full-viewport photograph of the Limpopo farm at golden hour. The image bleeds edge to edge. Overlaid on it, in elegant Playfair Display: *"From Our Soil to Your Table."* Below it, in a muted gold italic: *"farming made better."* Then, quieter still: *"Goddard Projects since 2007."* The wordless, borderless farm logo floats centered beneath — a gold emblem mark on the dark photo, like a wax seal. A brief two-to-three-sentence paragraph tells the farm's story.

**The visitor scrolls.** The navigation bar fades in from above — logo icon first, then farm name, then the three links. It sticks to the top from here on.

**Livestock carousel appears first** — full-width horizontal strip. *"🐄 Livestock"* header with *"View more →"* at the top-right. Animal cards scroll horizontally with a peek of the next card visible. Below it, the **Produce carousel** — same format, crop cards. The vertical stack gives each category room to breathe.

**Further down:** *"What's Growing This Season?"* A short description and a gold *Vote Now* button.

**The visitor clicks Vote Now.** The page background blurs behind a dark semi-transparent overlay. A voting sheet slides up — three crop candidates with photos, names, green Vote buttons. At the bottom: *Close ✕* and *Skip →*. If they haven't subscribed, clicking Vote reveals an email field: *"Enter your email to cast your vote."* Once entered, a gold checkmark animates on the chosen crop, others dim.

**Stay Connected** section: email field + gold Subscribe button. Footer is minimal.

**WhatsApp icon** floats fixed at bottom-right — green circle with pulse ring, always present.

### Produce Catalog

**The visitor arrives at Produce.** Nav bar present from start. *Produce* highlighted in gold. Clean header: *"Our Produce"* with one evocative line. *"🌿 In Season"* label sits above the grid.

**The grid:** Four cards per row on desktop. Each card is a generous crop photograph with name, one-line description in muted clay, and a seasonality badge — green *"In Season"*, gold *"Coming Soon"*. Hover lifts the card with a thin gold border. No filters, no search — just the produce speaking for itself.

**Voting section** is embedded inline — same three-candidate layout but with vote counts visible. Email field below the row. Submitting shows a gold checkmark, count ticks up.

**Farm gallery** follows — grid of farm photos. Click opens lightbox on dark overlay, arrow through. This grounds the produce in place and people.

### Livestock Catalog

**The visitor arrives at Livestock.** Nav bar present. *Livestock* highlighted in gold. Clean header: *"Our Livestock"* with a line about healthy animals on open land.

**The grid:** Four cards per row. Each card: animal photograph, name, breed in gold, short description, and a status badge — green *"Available"*, gold *"Coming Soon"*, muted *"Sold"*. Hover lifts, gold border. Clean and simple — the animals are the focus. No voting, no gallery — those live on Produce. No filters or search — the livestock speaks for itself.

### Contact / About

**The visitor arrives at Contact.** Nav bar marks *Contact* in gold. The page opens with *"About the Farm"* — warm, personal paragraphs telling the farm's origin. The first line is larger, in Playfair. Body in DM Sans with generous line spacing, left-aligned — reads like a letter.

**The visitor scrolls.** Two panels side by side: *"Get in Touch"* contact form (name, email, message, gold Send button) and *"Find Us"* with location and operating hours. Focus states bring a thin gold border. On submit: spinner resolves to gold checkmark and *"We'll be in touch."* Error: gentle shake and red-gold message.

**Google Maps embed** below the form panels — full-width, dark-themed, rounded card with subtle earth border. Grounds the farm in its physical place.

**WhatsApp icon** floats at bottom-right — alternative contact pathway.

### Admin Login

**The admin navigates to `/admin`.** Redirected to `/admin/login`. A dark, minimal page: gold farm logo emblem centered, *"Admin Access"* heading, two fields — username and password. No distractions. Submit checks credentials. Wrong: form shakes gently, red-gold message *"Incorrect password."* Correct: enter the dashboard.

### Admin Dashboard

**The dashboard opens.** Admin bar at top — gold *"Goddard Admin"* label, *Sign Out* on the right. Three stat cards at a glance: subscribers count, unread messages, active voting round status.

**The workspace is split** — vertical tabs on the left, content panel on the right.

- **🥬 Produce** — Table of all produce items with thumbnail, name, category, season badge, edit/delete buttons. *+ Add Produce* button opens an inline form. Edit pre-fills. Delete shows confirmation.

- **🐄 Livestock** — Same pattern. Full CRUD for animals.

- **🌿 Voting** — All rounds listed (past + present). Create a new round: title, description, add crops one by one. Warning if another round is active. Close a round to end voting. View results: crop names with vote counts and a small bar chart.

- **📬 Subscribers** — Table of emails with dates. *Export CSV* button downloads a Mailchimp-ready file.

- **✉️ Messages** — Contact form submissions. Table with name, email, date, read/unread gold dot. Click to expand and read full message, mark as read. No delete — permanent record.

**Sign Out** clears session, redirects to login.

---

## Component Tree

```
RootLayout (dark theme, fonts, metadata)
│
├── PUBLIC ROUTES
│   │
│   ├── HomePage (/)
│   │   ├── HeroSection
│   │   │   ├── HeroBackground (full-viewport photo, grain overlay)
│   │   │   ├── Tagline ("From Our Soil to Your Table" — Playfair)
│   │   │   ├── SubTagline ("farming made better" — italic gold)
│   │   │   ├── EstablishedDate ("Goddard Projects since 2007")
│   │   │   ├── LogoMark (wordless emblem, centered, gold)
│   │   │   └── FarmBackground (2-3 sentence paragraph)
│   │   │
│   │   ├── ScrollNavBar (hidden until scroll, then sticky)
│   │   │   ├── LogoIcon
│   │   │   ├── FarmName (Playfair)
│   │   │   └── NavLinks
│   │   │       ├── NavLink ("Produce" → /produce)
│   │   │       ├── NavLink ("Livestock" → /livestock)
│   │   │       └── NavLink ("Contact" → /contact)
│   │   │
│   │   ├── CarouselSection
│   │   │   ├── LivestockCarousel
│   │   │   │   ├── CarouselHeader ("🐄 Livestock" + "View more →")
│   │   │   │   └── CarouselTrack (horizontal scroll)
│   │   │   │       ├── AnimalCard (photo + name) × N
│   │   │   │       └── PeekCard (partial card at right edge)
│   │   │   └── ProduceCarousel
│   │   │       ├── CarouselHeader ("🥬 Produce" + "View more →")
│   │   │       └── CarouselTrack
│   │   │           ├── CropCard (photo + name) × N
│   │   │           └── PeekCard
│   │   │
│   │   ├── VotingTeaser
│   │   │   ├── SectionHeading ("🌿 What's Growing This Season?")
│   │   │   ├── Description
│   │   │   └── VoteNowButton (gold, triggers overlay)
│   │   │
│   │   ├── VotingOverlay (conditional — blurs background)
│   │   │   ├── VotingSheet
│   │   │   │   ├── RoundTitle
│   │   │   │   ├── VotingOptionCard (photo, name, Vote button) × 3
│   │   │   │   ├── EmailGate (conditional: "Enter your email to vote")
│   │   │   │   ├── CloseButton (✕)
│   │   │   │   └── SkipLink (→)
│   │   │   └── OverlayBackdrop (semi-transparent dark)
│   │   │
│   │   ├── NewsletterSignup
│   │   │   ├── Heading ("📬 Stay Connected")
│   │   │   ├── Description
│   │   │   ├── EmailInput
│   │   │   └── SubscribeButton (gold)
│   │   │
│   │   ├── Footer
│   │   │   ├── FarmName
│   │   │   ├── ContactLink
│   │   │   └── LocationText
│   │   │
│   │   └── WhatsAppFloatingButton (fixed bottom-right, green pulse)
│   │
│   ├── ProducePage (/produce)
│   │   ├── NavBar (always visible, "Produce" active)
│   │   ├── PageHeader ("🥬 Our Produce" + subtitle)
│   │   ├── SeasonLabel ("🌿 In Season")
│   │   ├── ProduceGrid
│   │   │   └── ProduceCard × N
│   │   │       ├── CropPhoto
│   │   │       ├── CropName (Playfair)
│   │   │       ├── CropDescription
│   │   │       └── SeasonBadge (🟢 Now / 🟡 Soon / 🔴 Ended)
│   │   │
│   │   ├── VotingSection (inline — no overlay)
│   │   │   ├── SectionHeading ("🌿 What's Growing This Season?")
│   │   │   ├── VotingOptionCard × N (with vote count visible)
│   │   │   ├── EmailInput
│   │   │   └── ConfirmVoteButton
│   │   │
│   │   ├── FarmGallery
│   │   │   ├── GalleryGrid
│   │   │   │   └── GalleryThumbnail × 6+
│   │   │   └── Lightbox (conditional)
│   │   │       ├── ExpandedPhoto
│   │   │       ├── PrevButton / NextButton
│   │   │       ├── CloseButton (✕)
│   │   │       └── LightboxBackdrop
│   │   │
│   │   ├── Footer
│   │   └── WhatsAppFloatingButton
│   │
│   ├── LivestockPage (/livestock)
│   │   ├── NavBar (always visible, "Livestock" active)
│   │   ├── PageHeader ("🐄 Our Livestock" + subtitle)
│   │   ├── LivestockGrid
│   │   │   └── LivestockCard × N
│   │   │       ├── AnimalPhoto
│   │   │       ├── AnimalName (Playfair)
│   │   │       ├── BreedName (gold)
│   │   │       ├── AnimalDescription
│   │   │       └── StatusBadge (🟢 Available / 🟡 Soon / 🔴 Sold)
│   │   ├── Footer
│   │   └── WhatsAppFloatingButton
│   │
│   └── ContactPage (/contact)
│       ├── NavBar (always visible, "Contact" active)
│       ├── AboutSection
│       │   ├── SectionHeading ("🏡 About the Farm")
│       │   └── FarmStory (paragraphs, warm/letter-like)
│       ├── ContactPanel (side by side)
│       │   ├── ContactForm
│       │   │   ├── NameInput
│       │   │   ├── EmailInput
│       │   │   ├── MessageTextarea
│       │   │   ├── SendButton (gold)
│       │   │   └── SuccessMessage ("We'll be in touch" + checkmark)
│       │   └── LocationInfo
│       │       ├── Address
│       │       └── OperatingHours
│       ├── GoogleMapEmbed (full-width, dark-themed, rounded card)
│       ├── Footer
│       └── WhatsAppFloatingButton
│
├── ADMIN ROUTES
│   │
│   ├── AdminLoginPage (/admin/login)
│   │   └── LoginForm
│   │       ├── LogoMark (wordless emblem, gold)
│   │       ├── Heading ("Admin Access")
│   │       ├── UsernameInput
│   │       ├── PasswordInput
│   │       ├── SignInButton (gold)
│   │       └── ErrorMessage (conditional, shake + red text)
│   │
│   └── AdminDashboard (/admin)
│       ├── AdminBar
│       │   ├── LogoIcon
│       │   ├── DashboardTitle ("Goddard Admin")
│       │   └── SignOutButton
│       │
│       ├── DashboardOverview
│       │   ├── StatCard ("Subscribers" + count)
│       │   ├── StatCard ("Messages" + unread count)
│       │   └── StatCard ("Active Round" + yes/no)
│       │
│       ├── AdminTabBar (vertical, left side)
│       │   ├── TabButton ("🥬 Produce")
│       │   ├── TabButton ("🐄 Livestock")
│       │   ├── TabButton ("🌿 Voting")
│       │   ├── TabButton ("📬 Subscribers")
│       │   └── TabButton ("✉️ Messages")
│       │
│       └── AdminTabContent (right side, dynamic)
│           ├── ProduceTab
│           │   ├── AddButton ("+ Add Produce")
│           │   ├── DataTable (thumbnail, name, category, season, edit/delete)
│           │   └── ProduceForm (modal/inline — name, desc, category, seasonality, image upload)
│           │
│           ├── LivestockTab
│           │   ├── AddButton ("+ Add Livestock")
│           │   ├── DataTable (thumbnail, name, breed, status, edit/delete)
│           │   └── LivestockForm (modal/inline)
│           │
│           ├── VotingTab
│           │   ├── VotingRoundsList (past + present)
│           │   ├── CreateRoundButton
│           │   ├── VotingRoundForm (title, description, add crops)
│           │   ├── CloseRoundButton
│           │   └── ResultsView (crop names + vote counts, small bar chart)
│           │
│           ├── SubscribersTab
│           │   ├── ExportCSVButton
│           │   └── DataTable (email, subscribed date)
│           │
│           └── MessagesTab
│               ├── DataTable (name, email, date, read/unread dot)
│               └── MessageExpanded (click to read full, mark as read)
```

### Reusable Components (Shared Across Pages)

| Component | Used On |
|-----------|---------|
| `NavBar` | All public pages (home variant: scroll-triggered) |
| `LogoIcon` | NavBar, AdminBar, HeroSection, LoginForm |
| `LogoMark` | HeroSection, LoginForm |
| `Footer` | All public pages |
| `WhatsAppFloatingButton` | All public pages |
| `PageHeader` | Produce, Livestock, Contact |
| `VotingOptionCard` | Home (overlay), Produce (inline) |
| `EmailGate` | Home (overlay), Produce (inline) |
| `DataTable` | All admin tabs |
| `StatCard` | DashboardOverview |

---

## Data Flow

### 1. Voting Flow (Home Overlay + Produce Inline)

```
USER CLICKS "VOTE NOW" (Home)
  │
  ├─→ VotingOverlay renders, Backdrop blurs background
  │   VotingSheet slides up with 3 crop options
  │
  └─→ USER CLICKS [Vote] on a crop card
        │
        ├─→ CHECK: Is voter email in session/cookie?
        │     │
        │     ├─ NO ──→ EmailGate appears inside sheet
        │     │         User types email, clicks confirm
        │     │           │
        │     │           ├─→ POST /api/subscribe → INSERT into subscribers
        │     │           ├─→ Mailchimp API call (async, fire-and-forget)
        │     │           └─→ Email stored in session cookie
        │     │
        │     └─ YES ──→ Proceed to vote
        │
        ├─→ POST /api/vote { optionId, email }
        │     │
        │     ├─→ VALIDATE: Has this email already voted in this round?
        │     │     │
        │     │     ├─ YES ──→ Return 409 "Already voted"
        │     │     │           UI: "You've already voted" + chosen crop highlighted
        │     │     │
        │     │     └─ NO ──→ INSERT into votes (option_id, subscriber_email)
        │     │                Return { success, optionId, newCount }
        │     │
        │     └─→ UI UPDATES:
        │           • Gold checkmark animates on chosen crop
        │           • Other cards dim to 50% opacity
        │           • Vote count ticks up (optimistic or from response)
        │           • Sheet auto-closes after 2 seconds (or user clicks ✕)

PRODUCE PAGE — same flow, but no overlay:
  • Voting section is inline on the page
  • Email field is always visible below the crop row
  • Clicking Vote without email → gentle shake on email field
  • Same API routes, same database writes
```

### 2. Newsletter Signup Flow

```
USER scrolls to "Stay Connected" section
  │
  └─→ Types email → Clicks [Subscribe]
        │
        ├─→ CLIENT validates: not empty, looks like email
        │     (If invalid: field border turns red-gold, small "Please enter a valid email")
        │
        ├─→ POST /api/subscribe { email }
        │     │
        │     ├─→ CHECK: email already exists in subscribers?
        │     │     │
        │     │     ├─ YES ──→ Return 200 "Already subscribed"
        │     │     │           UI: "You're already on the list! 🌿" (friendly, not error)
        │     │     │
        │     │     └─ NO ──→ INSERT into subscribers (email, created_at)
        │     │                │
        │     │                └─→ ASYNC: Mailchimp API — add/update member
        │     │                     (fire-and-forget; if it fails, subscriber still saved locally)
        │     │
        │     └─→ UI: Gold checkmark replaces button
        │           "You're in! We'll keep you posted."
```

### 3. Contact Form Flow

```
USER visits /contact
  │
  └─→ Fills Name, Email, Message → Clicks [Send Message]
        │
        ├─→ CLIENT validates all fields non-empty
        │
        ├─→ POST /api/contact { name, email, message }
        │     │
        │     └─→ INSERT into messages (name, email, message, is_read: false, created_at)
        │           │
        │           └─→ OPTIONAL: Send email notification to farm owner
        │                (configurable, not required for MVP)
        │
        └─→ UI: Button morphs to gold checkmark
              "We'll be in touch" appears below
              Form clears after 1.5 seconds
              
ERROR CASE:
  • Network failure → Button shakes, "Something went wrong. Please try again."
  • Server error → Same, logged server-side
```

### 4. Carousel Data Loading

```
USER scrolls to carousel section (Home)
  │
  ├─→ LivestockCarousel mounts
  │     └─→ GET /api/livestock?limit=6
  │           → Returns: [{ id, name, image_url, breed, status }]
  │           → Rendered as horizontal scroll cards
  │
  └─→ ProduceCarousel mounts
        └─→ GET /api/produce?limit=6
              → Returns: [{ id, name, image_url, seasonality }]
              → Rendered as horizontal scroll cards

"View more →" links → full page navigation (no additional fetch needed — page loads own data)
```

### 5. Gallery Lightbox Flow

```
USER clicks gallery thumbnail (Produce page)
  │
  ├─→ Lightbox opens: overlay + expanded photo
  │     Current index tracked in local state
  │
  ├─→ Click [Next →] / [← Prev] → index shifts, photo swaps
  │     (All images pre-loaded from page data — no extra fetch)
  │
  └─→ Click ✕ or backdrop → Lightbox closes, scroll position preserved
```

### 6. Admin Login Flow

```
USER navigates to /admin
  │
  ├─→ CHECK: Valid admin session cookie?
  │     ├─ YES ──→ Redirect to /admin (dashboard)
  │     └─ NO  ──→ Redirect to /admin/login
  │
  └─→ User enters username + password → Clicks [Sign In]
        │
        ├─→ POST /api/admin/login { username, password }
        │     │
        │     ├─→ LOOKUP admin_user by username
        │     ├─→ COMPARE password hash (bcrypt)
        │     │
        │     ├─ MISMATCH ──→ Return 401 "Invalid credentials"
        │     │                UI: Form shakes, red message
        │     │
        │     └─ MATCH ──→ Set secure HTTP-only session cookie
        │                    Return 200 { redirect: "/admin" }
        │                    UI: Redirect to dashboard
        │
        └─→ Sign Out:
              POST /api/admin/logout → Clear session cookie → Redirect to /admin/login
```

### 7. Admin CRUD Flows (Produce example — Livestock identical pattern)

```
PRODUCE TAB ACTIVE:
  │
  ├─→ ON MOUNT: GET /api/admin/produce
  │     → Returns all produce items [{ id, name, description, category, seasonality, image_url }]
  │     → Rendered in DataTable
  │
  ├─→ CREATE: Click [+ Add Produce]
  │     │
  │     ├─→ Form opens (inline below header or modal)
  │     ├─→ Fill: name, description, category, seasonality, image upload
  │     │
  │     └─→ Submit → POST /api/admin/produce { ...formData }
  │           │
  │           ├─→ Image: Upload to /api/admin/upload → Store file → Return URL
  │           ├─→ INSERT into produce_items
  │           └─→ UI: Table refreshes, new row fades in, form closes
  │
  ├─→ UPDATE: Click [Edit] on a row
  │     │
  │     ├─→ Form pre-fills with existing data
  │     └─→ Submit → PUT /api/admin/produce/:id { ...updatedFields }
  │           → UPDATE produce_items SET ... WHERE id = :id
  │           → UI: Row updates in place, form closes
  │
  └─→ DELETE: Click [Delete] on a row
        │
        ├─→ Confirmation dialog: "Delete [Crop Name]? This can't be undone."
        │     ├─ CANCEL → Close dialog
        │     └─ CONFIRM → DELETE /api/admin/produce/:id
        │                    → DELETE FROM produce_items WHERE id = :id
        │                    → UI: Row fades out and collapses, table re-adjusts
```

### 8. Voting Round Admin Flow

```
VOTING TAB ACTIVE:
  │
  ├─→ ON MOUNT: GET /api/admin/voting-rounds
  │     → Returns all rounds [{ id, title, is_active, created_at, _count: { votes } }]
  │
  ├─→ CREATE ROUND: Click [+ New Voting Round]
  │     │
  │     ├─→ Fill title, description
  │     ├─→ Add crops one by one: name, optional image, description
  │     ├─→ WARNING if another round is already active
  │     │
  │     └─→ Submit → POST /api/admin/voting-rounds
  │           { title, description, crops: [{ name, image_url, description }] }
  │           → INSERT voting_rounds + INSERT voting_options (transaction)
  │           → UI: New round appears in list
  │
  ├─→ VIEW RESULTS: Click on a round
  │     │
  │     └─→ GET /api/admin/voting-rounds/:id/results
  │           → Returns: [{ option_id, crop_name, vote_count }]
  │           → Rendered as simple bar chart + numbers
  │
  └─→ CLOSE ROUND: Click [Close Round]
        │
        ├─→ Confirmation: "Close this round? No more votes will be accepted."
        └─→ PUT /api/admin/voting-rounds/:id { is_active: false, closed_at: now }
              → Public voting UI shows "This round has ended"
```

### 9. Subscribers & Messages (Read-only Admin)

```
SUBSCRIBERS TAB:
  │
  ├─→ GET /api/admin/subscribers
  │     → Returns [{ id, email, created_at }]
  │
  └─→ Click [Export CSV]
        → GET /api/admin/subscribers?format=csv
        → Server generates CSV, browser downloads file
        → "subscribers-export-2026-03-17.csv"

MESSAGES TAB:
  │
  ├─→ GET /api/admin/messages
  │     → Returns [{ id, name, email, message, is_read, created_at }]
  │     → Unread messages: gold dot + bold row
  │
  ├─→ CLICK to expand message
  │     │
  │     └─→ PUT /api/admin/messages/:id { is_read: true }
  │           → Marks as read in database
  │           → Gold dot disappears, row unboldens
  │
  └─→ (No delete — messages are permanent record)
```

### 10. WhatsApp Floating Button

```
Fixed element, all public pages, bottom-right
  │
  └─→ Click → Opens WhatsApp deep link:
        https://wa.me/27XXXXXXXXX?text=Hi%20Goddard%20Projects...
        (Opens in new tab; if WhatsApp installed, opens app)
```

### Data Storage Map

| Data | Where | Read By | Written By |
|------|-------|---------|------------|
| Produce items | `produce_items` table | Home carousel, Produce page, Admin | Admin CRUD |
| Livestock items | `livestock_items` table | Home carousel, Livestock page, Admin | Admin CRUD |
| Voting rounds | `voting_rounds` table | Home overlay, Produce inline, Admin | Admin |
| Voting options (crops per round) | `voting_options` table | Voting UI | Admin |
| Votes cast | `votes` table (unique on email+round) | Voting UI (count), Admin (results) | Public (email-gated) |
| Subscribers | `subscribers` table | Admin, Mailchimp export | Signup form, Vote email gate |
| Contact messages | `messages` table | Admin | Contact form |
| Admin user | `admin_user` table | Login | Seed script (manual) |
| Gallery photos | File system / uploads folder | Produce page gallery | Admin via upload |
| Voter email (session) | HTTP cookie (encrypted) | Vote gate check | On email entry |
| Admin session | HTTP-only session cookie | Auth middleware | Login endpoint |

---

## Folder Structure

```
goddard-farm/
│
├── .env                          # Environment variables (Mailchimp key, admin password hash, etc.)
├── .env.example                  # Template without secrets
├── .gitignore
├── package.json
├── next.config.js
├── tailwind.config.ts            # Custom colors (Limpopo Dusk palette), fonts (Playfair + DM Sans)
├── tsconfig.json
│
├── prisma/
│   ├── schema.prisma             # All models: ProduceItem, LivestockItem, VotingRound, VotingOption,
│   │                              #   Vote, Subscriber, Message, GalleryPhoto, AdminUser
│   ├── migrations/               # Auto-generated migration files
│   └── seed.ts                   # Seed: admin user, sample produce, sample livestock
│
├── public/
│   ├── images/
│   │   ├── logo-wordless.svg     # Borderless emblem version
│   │   ├── logo-icon.svg         # Small icon for nav bars
│   │   ├── hero-farm.jpg         # Default hero image
│   │   ├── produce/              # Produce photos (uploaded by admin)
│   │   ├── livestock/            # Livestock photos (uploaded by admin)
│   │   └── gallery/              # Gallery photos (uploaded by admin)
│   └── favicon.ico
│
├── src/
│   │
│   ├── app/                      # Next.js App Router
│   │   │
│   │   ├── layout.tsx            # RootLayout: dark theme, Playfair+DM Sans fonts, metadata
│   │   ├── page.tsx              # HomePage → composes Hero, Carousels, VotingTeaser, Newsletter
│   │   ├── globals.css           # Tailwind directives + custom dark theme base styles
│   │   │
│   │   ├── produce/
│   │   │   └── page.tsx          # ProducePage → ProduceGrid + VotingSection + FarmGallery
│   │   │
│   │   ├── livestock/
│   │   │   └── page.tsx          # LivestockPage → LivestockGrid
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx          # ContactPage → AboutSection + ContactForm + GoogleMapEmbed
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx        # AdminLayout: checks auth, renders AdminBar + tab workspace shell
│   │   │   ├── page.tsx          # AdminDashboard → DashboardOverview + AdminTabBar + TabContent
│   │   │   └── login/
│   │   │       └── page.tsx      # AdminLoginPage → LoginForm
│   │   │
│   │   └── api/
│   │       ├── subscribe/
│   │       │   └── route.ts      # POST — create subscriber, fire Mailchimp
│   │       ├── vote/
│   │       │   └── route.ts      # POST — cast vote (validates email, checks duplicate)
│   │       ├── contact/
│   │       │   └── route.ts      # POST — save contact message
│   │       ├── livestock/
│   │       │   └── route.ts      # GET — return livestock for carousel (limit param)
│   │       ├── produce/
│   │       │   └── route.ts      # GET — return produce for carousel (limit param)
│   │       ├── admin/
│   │       │   ├── login/
│   │       │   │   └── route.ts  # POST — authenticate, set session cookie
│   │       │   ├── logout/
│   │       │   │   └── route.ts  # POST — clear session cookie
│   │       │   ├── produce/
│   │       │   │   └── route.ts  # GET, POST — list all, create
│   │       │   ├── produce/[id]/
│   │       │   │   └── route.ts  # PUT, DELETE — update, delete one
│   │       │   ├── livestock/
│   │       │   │   └── route.ts  # GET, POST — list all, create
│   │       │   ├── livestock/[id]/
│   │       │   │   └── route.ts  # PUT, DELETE — update, delete one
│   │       │   ├── voting-rounds/
│   │       │   │   └── route.ts  # GET, POST — list all, create
│   │       │   ├── voting-rounds/[id]/
│   │       │   │   └── route.ts  # PUT — close round
│   │       │   ├── voting-rounds/[id]/results/
│   │       │   │   └── route.ts  # GET — vote counts per option
│   │       │   ├── subscribers/
│   │       │   │   └── route.ts  # GET (JSON or CSV export)
│   │       │   ├── messages/
│   │       │   │   └── route.ts  # GET — list all messages
│   │       │   ├── messages/[id]/
│   │       │   │   └── route.ts  # PUT — mark as read
│   │       │   └── upload/
│   │       │       └── route.ts  # POST — upload image to public/images/
│   │       └── voting-rounds/
│   │           └── [id]/
│   │               └── route.ts  # GET — active round + options (public)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavBar.tsx            # Public nav — scroll-hidden variant on home, sticky elsewhere
│   │   │   ├── Footer.tsx
│   │   │   ├── AdminBar.tsx          # Admin top bar
│   │   │   └── WhatsAppFloatingButton.tsx  # Fixed bottom-right, green pulse
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # Full-viewport photo + taglines + logo + background
│   │   │   ├── CarouselSection.tsx   # Wraps two carousels
│   │   │   ├── LivestockCarousel.tsx
│   │   │   ├── ProduceCarousel.tsx
│   │   │   ├── CarouselHeader.tsx    # "🐄 Livestock" + "View more →"
│   │   │   └── VotingTeaser.tsx      # "What's Growing" + Vote Now button
│   │   │
│   │   ├── produce/
│   │   │   ├── PageHeader.tsx        # Reused: produce + livestock + contact
│   │   │   ├── SeasonLabel.tsx
│   │   │   ├── ProduceGrid.tsx
│   │   │   ├── ProduceCard.tsx
│   │   │   ├── FarmGallery.tsx
│   │   │   └── Lightbox.tsx
│   │   │
│   │   ├── livestock/
│   │   │   ├── LivestockGrid.tsx
│   │   │   └── LivestockCard.tsx
│   │   │
│   │   ├── contact/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── LocationInfo.tsx
│   │   │   └── GoogleMapEmbed.tsx
│   │   │
│   │   ├── voting/
│   │   │   ├── VotingSheet.tsx       # Shared: overlay (home) + inline (produce)
│   │   │   ├── VotingOptionCard.tsx  # Crop card with photo, name, vote button, count
│   │   │   ├── VotingOverlay.tsx     # Backdrop + blur wrapper (home only)
│   │   │   └── EmailGate.tsx         # Inline email prompt before voting
│   │   │
│   │   ├── newsletter/
│   │   │   └── NewsletterSignup.tsx  # Email field + subscribe button
│   │   │
│   │   ├── admin/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── AdminTabBar.tsx
│   │   │   ├── DashboardOverview.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── DataTable.tsx             # Reusable table (used by all admin tabs)
│   │   │   ├── ConfirmationDialog.tsx    # "Are you sure?" modal
│   │   │   ├── ProduceTab.tsx
│   │   │   ├── ProduceForm.tsx
│   │   │   ├── LivestockTab.tsx
│   │   │   ├── LivestockForm.tsx
│   │   │   ├── VotingTab.tsx
│   │   │   ├── VotingRoundForm.tsx
│   │   │   ├── ResultsView.tsx           # Simple bar chart + numbers
│   │   │   ├── SubscribersTab.tsx
│   │   │   ├── MessagesTab.tsx
│   │   │   └── MessageExpanded.tsx
│   │   │
│   │   └── ui/                           # Primitive building blocks
│   │       ├── Badge.tsx                 # SeasonBadge, StatusBadge
│   │       ├── Button.tsx                # Gold variant, Green variant, ghost
│   │       ├── Input.tsx                 # Text input with dark theme styling
│   │       ├── Textarea.tsx
│   │       ├── Spinner.tsx
│   │       ├── Checkmark.tsx             # Animated gold checkmark
│   │       └── Backdrop.tsx              # Dark semi-transparent overlay
│   │
│   ├── lib/
│   │   ├── prisma.ts                 # Prisma client singleton
│   │   ├── auth.ts                   # Admin auth helpers (hash, verify, session)
│   │   ├── mailchimp.ts              # Mailchimp API wrapper
│   │   └── utils.ts                  # cn() classname helper, formatters
│   │
│   ├── hooks/
│   │   ├── useCarousel.ts            # Horizontal scroll logic
│   │   ├── useVoting.ts              # Vote state, email check, submission
│   │   └── useLightbox.ts            # Gallery lightbox state
│   │
│   └── types/
│       └── index.ts                  # TypeScript interfaces (shared with specification.md)
│
└── docs/
    ├── idea.md
    ├── feature-data-map.md
    ├── specification.md
    └── architecture.md
```

### Folder Design Decisions

- **components/ui/** holds atomic building blocks — Button, Input, Badge, Spinner. These are the only exported primitives; all other components compose from them.
- **components/voting/** is shared between Home (overlay variant) and Produce (inline variant). Same `VotingOptionCard`, different wrappers.
- **lib/** is server-side utilities only. No client-side data fetching helpers — all data flows through Server Components or API routes.
- **hooks/** are thin — only three custom hooks needed. Most interactivity is handled by Server Actions.
- **api/admin/** routes are protected by a middleware that checks the admin session cookie. No route protection logic lives inside individual handlers.
- **public/images/** subdirectories (`produce/`, `livestock/`, `gallery/`) map to admin upload destinations.


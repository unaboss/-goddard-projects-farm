# Goddard Projects Farm — Dependency Tracking (DEPS.md)

> Auto-generated during Architecture v2 rebuild.  
> Last updated: 2026-06-15

---

## Global Dependencies

| File | Size | Purpose |
|---|---|---|
| `index.html` | 16 KB | Single-page site — all 6 sections, footer, WhatsApp button |
| `styles/main.css` | 13 KB | Design system, reset, all section styles, responsive breakpoints |
| `scripts/main.js` | 6 KB | Smooth scroll, gallery lightbox, contact form validation |
| `package.json` | — | npm metadata (sharp dev dependency for image compression) |

---

## Asset Manifest — Tracking

### `assets/images/`

| File | Size | Source (AA pics) | Used By |
|---|---|---|---|
| `logo.jpg` | 129 KB | `logo.jpg` (project root) | Section 1 (Hero) — `.hero-logo` img |
| `hero-bg.jpg` | 192 KB | `Tomatoes on bush(2).jpeg` | Section 1 (Hero) — `#hero` background via CSS |
| `about-bg.jpg` | 182 KB | `Man standing infront of wendy house(crops in background).jpeg` | Section 2 (About) — `#about` background via CSS |
| `favicon.ico` | 0.7 KB | Generated 32×32 from `logo.jpg` | Browser tab — `<link rel="icon">` in `<head>` |

### `assets/gallery/`

| File | Size | Source (AA pics) | Used By |
|---|---|---|---|
| `gallery-01.jpg` | 84 KB | `Spraying floor where cows live.jpeg` | Section 3 (Products) — Cattle card; Section 5 (Gallery) — item 1 |
| `gallery-02.jpg` | 99 KB | `spraying ground where cows live (2).jpeg` | Section 3 (Products) — Sheep card; Section 5 (Gallery) — item 2 |
| `gallery-03.jpg` | 83 KB | `Tomatoes on bush(2).jpeg` | Section 3 (Products) — Crops card; Section 5 (Gallery) — item 3 |
| `gallery-04.jpg` | 83 KB | `Tomatoes on bush(3).jpeg` | Section 5 (Gallery) — item 4 |
| `gallery-05.jpg` | 70 KB | `Men staanding on bush.jpeg` | Section 5 (Gallery) — item 5 |
| `gallery-06.jpg` | 75 KB | `Man standing infront of wendy house(crops in background).jpeg` | Section 5 (Gallery) — item 6 |
| `gallery-07.jpg` | 75 KB | `Man picking up leaves in front of jojo tank.jpeg` | Section 5 (Gallery) — item 7 |
| `gallery-08.jpg` | 110 KB | `IMG_0470.jpeg` | Section 5 (Gallery) — item 8 |

---

## Section-by-Section Cross-Reference

### Section 1 — Hero
- **HTML:** `<header id="hero">` → lines 21–43 of `index.html`
- **CSS:** `#hero`, `.hero-overlay`, `.hero-content`, `.hero-logo`, `.hero-title`, `.hero-bbbee`, `.bbb-badge`, `.hero-tagline`, `.hero-ctas`
- **Images:** `logo.jpg`, `hero-bg.jpg` (CSS background)
- **Verification:** Logo is rectangular (no `border-radius: 50%`), BBBEE gold badge visible, CTA buttons link to `#products` and `#contact`

### Section 2 — About
- **HTML:** `<section id="about">` → lines 50–85 of `index.html`
- **CSS:** `#about`, `.about-grid`, `.philosophy-quote`, `.about-stats`, `.stat-card`, `.stat-number`, `.stat-label`
- **Images:** `about-bg.jpg` (CSS background with `rgba(253, 248, 240, 0.88)` overlay)
- **Verification:** Quote has green left border, 3 stat cards, responsive grid

### Section 3 — Products
- **HTML:** `<section id="products">` → lines 90–149 of `index.html`
- **CSS:** `#products`, `.product-cards`, `.product-card`, `.product-card-img`, `.product-card-body`, `.product-price`, `.seasonality-note`
- **Images:** `gallery-01.jpg`, `gallery-02.jpg`, `gallery-03.jpg`
- **Verification:** 3 cards (Cattle, Sheep, Crops), prices in soil brown, `object-fit: cover` on images, seasonality note

### Section 4 — Why Choose Us
- **HTML:** `<section id="why-us">` → lines 155–181 of `index.html`
- **CSS:** `#why-us`, `.value-cards`, `.value-card`, `.value-icon`
- **Images:** none
- **Verification:** 4 value cards in 2×2 grid, green left border accent, stacks on mobile

### Section 5 — Gallery
- **HTML:** `<section id="gallery">` → lines 186–216 of `index.html`
- **CSS:** `#gallery`, `.gallery-grid`, `.gallery-item`, `.lightbox`, `.lightbox.open`, `.lightbox-img`, `.lightbox-close`, `.lightbox-nav`, `.lightbox-prev`, `.lightbox-next`
- **JS:** `initLightbox()` → builds lightbox DOM, click handlers, keyboard nav (Escape/Arrow keys), click-outside-to-close
- **Images:** `gallery-01.jpg` through `gallery-08.jpg`
- **Verification:** 8 images in 3-column grid, lightbox opens/closes, keyboard and click-outside work

### Section 6 — Contact & Footer
- **HTML:** `<section id="contact">` + `<footer id="footer">` + WhatsApp float → lines 221–316 of `index.html`
- **CSS:** `#contact`, `.contact-grid`, `.contact-info`, `.contact-form-wrapper`, `#contact-form`, `.form-field`, `.field-error`, `#footer`, `.whatsapp-float`
- **JS:** `initContactForm()` → showError/clearError, validates name/email/message; if invalid calls `e.preventDefault()`; if valid lets `mailto:` submit naturally. **No `e.preventDefault()` on valid, no success message.**
- **External:** Google Maps iframe, `mailto:info@rendeals4.co.za`, WhatsApp `wa.me/27820406558`
- **Verification:** Phone links are `tel:`, email is `mailto:`, form uses `action="mailto:"`, WhatsApp floating button at bottom-right

---

## External Dependencies

| Resource | Type | Used In |
|---|---|---|
| Google Fonts (Inter 400, 700) | CSS | `<head>` — all typography |
| Google Maps Embed | iframe | Section 6 — farm location map |
| WhatsApp Web | `wa.me` link | Floating button |

---

## Architecture Compliance Checklist

- [x] Logo is rectangular — `border-radius: 0`, `height: auto` (no clipping)
- [x] Contact form uses `mailto:` — no `preventDefault()` on valid submit
- [x] Every `<img>` has descriptive `alt` text
- [x] Favicon has `<link rel="icon">` in `<head>`
- [x] All images compressed to < 200 KB (JPEG quality 60–75)
- [x] Favicon generated as 32×32 from logo
- [x] BBBEE Level 1 badge visible in hero
- [x] WhatsApp floating button at `wa.me/27820406558`
- [x] Responsive: tablet (768–1024px) and mobile (< 768px) breakpoints
- [x] Smooth scroll on CTA buttons and anchor links
- [x] Gallery lightbox with keyboard navigation

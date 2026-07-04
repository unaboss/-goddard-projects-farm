# Goddard Projects Farm — Architecture v2 (Installation Guide)

## Overview
Single‑page responsive website for **Goddard Projects Farm** – a BBBEE Level 1 supplier of fresh produce and livestock to wholesalers and grocery stores since 2007.  
**Goal:** present the farm as a reliable B2B supplier and drive inquiries via WhatsApp.

---

## Dependency Map
```
Section 1 (Hero)          → depends on: hero-bg.jpg, logo.jpg
Section 2 (About)         → depends on: about-bg.jpg
Section 3 (Products)      → depends on: gallery-01,02,03 (images)
Section 4 (Why Us)        → no new assets
Section 5 (Gallery)       → 8 images in gallery/
Section 6 (Contact)       → no new assets (Google Maps iframe)
Global                    → styles/main.css, scripts/main.js, favicon
```
**Build order:** Global files first → Sections 1‑6 sequentially.

---

## Asset Manifest
All source images are in `C:\Users\USER\Documents\AA-study\AA pics\`.  
Copy them to the project as shown:

| Destination                                      | Source (from AA pics)       | Purpose                        |
|--------------------------------------------------|-----------------------------|--------------------------------|
| `assets/images/logo.jpg`                         | `logo.jpg` (project root)   | Farm logo                      |
| `assets/images/hero-bg.jpg`                      | `tomatoes on bush (2).jpeg` | Hero background                |
| `assets/images/about-bg.jpg`                     | `workers harvesting.jpeg`   | About section background       |
| `assets/images/favicon.ico`                      | generated from logo.jpg     | Browser tab favicon            |
| `assets/gallery/gallery-01.jpg`                  | `farm landscape.jpg`        | Gallery – landscape            |
| `assets/gallery/gallery-02.jpg`                  | `cattle grazing.jpg`        | Gallery – cattle               |
| `assets/gallery/gallery-03.jpg`                  | `fresh tomatoes.jpg`        | Gallery – tomatoes             |
| `assets/gallery/gallery-04.jpg`                  | `sheep herd.jpg`            | Gallery – sheep                |
| `assets/gallery/gallery-05.jpg`                  | `crop fields.jpg`           | Gallery – crops                |
| `assets/gallery/gallery-06.jpg`                  | `workers harvesting.jpg`    | Gallery – workers              |
| `assets/gallery/gallery-07.jpg`                  | `butternut harvest.jpg`     | Gallery – butternuts           |
| `assets/gallery/gallery-08.jpg`                  | `farm overview.jpg`         | Gallery – overview             |

The exact file names inside `AA pics` may differ; you can see them with `dir "C:\Users\USER\Documents\AA-study\AA pics"`.  
**Rule:** for each gallery image, use the **first** matching photo by looking at its content. If uncertain, ask in the terminal before copying.

---

## Section Install Guides

### Global Setup (must be done before any section)
1. Create folder structure:
   ```
   goddard-farm-site/
   ├── index.html
   ├── styles/
   │   └── main.css
   ├── scripts/
   │   └── main.js
   ├── assets/
   │   ├── images/
   │   │   ├── logo.jpg
   │   │   ├── hero-bg.jpg
   │   │   ├── about-bg.jpg
   │   │   └── favicon.ico
   │   └── gallery/
   │       └── (8 images)
   └── docs/
       └── (architecture files – never modify)
   ```
2. Copy all assets following the **Asset Manifest** above.  
   - For hero and about backgrounds, pick a **wide** photo that shows the farm or workers.  
   - Use any image resizing/compression needed to keep files < 200 KB each (JPEG, quality 75).  
   - Generate `favicon.ico` (32×32) from the logo.  
3. Create a `DEPS.md` file at the project root and log every file created/asset copied.

---

### Section 1 – Hero
**Files:** `index.html` (hero header), `styles/main.css` (.hero rules)  
**Dependencies:** `hero-bg.jpg`, `logo.jpg`  
**What to build in HTML:**
- `<header id="hero">` containing:
  - Background image via CSS (already configured).
  - Dark overlay div.
  - Logo image (`assets/images/logo.jpg`), farm name `<h1>`, BBBEE badge, tagline, two CTA buttons.  
- Both CTA buttons scroll smoothly to `#products` and `#contact` (behaviour added in Section 6 JS).  

**CSS:** (already exists in `main.css` under "SECTION 1: HERO") – verify it matches the design system; adjust only if the layout breaks on mobile.  

**Verification after build:**
- [ ] Logo visible, not clipped (remove `border-radius: 50%` if logo is rectangular; CSS already has it, but logo is rectangular – correct the CSS rule to remove border-radius on the logo or set it to 0).  
- [ ] BBBEE gold badge visible.  
- [ ] Buttons have correct hover styles.  
- [ ] Hero background image loads and covers full width.

---

### Section 2 – About
**Files:** `index.html` (about section), `styles/main.css` (.about rules)  
**Dependencies:** `about-bg.jpg`  
**Build instructions:**
- Add the `<section id="about">` with the two‑column grid (text left, stats right).  
- Philosophy quote: styled as `<blockquote>`.  
- Stat cards: three white boxes with numbers.  
- Background image on the section itself (CSS already has `background: url('../assets/images/about-bg.jpg')` with overlay).  

**Verification:**
- [ ] Quote styled correctly (italic, green left border).  
- [ ] Stats display horizontally on desktop, stack on mobile.  
- [ ] Background image appears subtly behind the cream overlay.

---

### Section 3 – Products
**Files:** `index.html`, `styles/main.css`  
**Dependencies:** `gallery-01.jpg`, `gallery-02.jpg`, `gallery-03.jpg` for the product cards (use these exact names).  
**Build:**
- Three `<article class="product-card">` elements: Cattle, Sheep, Crops.  
- Each card: image (`assets/gallery/gallery-01.jpg` etc.), title, price range, description.  
- Below cards: italic note about seasonality.  

**CSS:** the `.product-cards` grid already exists; verify `gallery-01` etc. are correctly referenced (the HTML in old version used gallery-01,02,03 – correct).  

**Verification:**
- [ ] Three cards side by side on desktop, stacked on mobile.  
- [ ] Images fit without distortion (use `object-fit: cover`).  
- [ ] Price range is colored soil brown.

---

### Section 4 – Why Choose Us
**Files:** `index.html`, `styles/main.css`  
**Dependencies:** none.  
**Build:**
- Four value cards in a 2×2 grid.  
- Each card: small colored circle (icon placeholder), heading, paragraph.  

**Verification:**
- [ ] Cards have a left border accent (green) as designed.  
- [ ] Layout stacks to single column on mobile.

---

### Section 5 – Gallery
**Files:** `index.html`, `styles/main.css`, `scripts/main.js` (lightbox)  
**Dependencies:** all 8 gallery images in `assets/gallery/`.  
**Build:**
- Grid of `<a class="gallery-item">` linking to each image.  
- Use `<img>` with lazy loading and descriptive alt text (based on actual image content – use the alt from the manifest: landscape, cattle, tomatoes, etc.).  
- Lightbox functionality: clicking opens full‑screen overlay with navigation arrows (if >1 image) and close button. Escape key closes, arrow keys navigate.  

**CSS:** `.gallery-grid`, `.lightbox` styles are already present; verify they work.  

**JS:** the lightbox code is already in `main.js`; ensure it reads the `href` of the gallery links.  

**Verification:**
- [ ] All 8 images display in a 3‑column grid (desktop).  
- [ ] Click any image → lightbox opens, shows larger version.  
- [ ] Keyboard navigation works.  
- [ ] Overlay closes on click‑outside, Escape, or X button.

---

### Section 6 – Contact & Footer
**Files:** `index.html`, `styles/main.css`, `scripts/main.js` (form validation)  
**Dependencies:** none (Google Maps iframe loads externally).  
**Build:**
- Contact info: address, phone numbers (as `tel:` links), email (`mailto:info@rendeals4.co.za`).  
- Google Maps embed iframe with correct coordinates.  
- Contact form: fields Name, Email, Message. `action="mailto:info@rendeals4.co.za" method="POST" enctype="text/plain"`.  
- **JavaScript validation ONLY** – do NOT prevent default submission. On invalid input, show errors; on valid, allow the form to submit normally (browser will open mailto:). No success message div; the form submission itself is the success.  
- Footer: "© 2025 Goddard Projects Farm | BBBEE Level 1 | Thohoyandou, Limpopo".  
- WhatsApp floating button: fixed, bottom‑right, links to wa.me/27820406558 with pre‑filled message.

**JS:** modify the existing `initContactForm()` to remove `e.preventDefault()` and the success message logic. Keep only showError/clearError and the validation check. If validation passes, let the form submit.  

**Verification:**
- [ ] All contacts display correctly, phone links are tappable.  
- [ ] Map loads.  
- [ ] Form validation shows errors for empty fields, invalid email.  
- [ ] On valid input, form submits (opens email client; you can test by checking that `mailto:` is triggered – a quick way is to look for the email client prompt).  
- [ ] WhatsApp button opens chat with pre‑filled message.  
- [ ] Footer text is centred, charcoal background.

---

### Final Steps: DEPS.md & Repo Map
After all sections are built and verified:
1. Update `DEPS.md` with a summary of all files created and their cross‑references.
2. Create `docs/repo-map.md` (simplified structure – just the file tree with a note of each section's main files).
3. Perform a full dependency check internally using your DEPS.md (you are the agent). Then commit.

---

**Handoff to Deep Code:**  
1. Read this entire `architecture-v2.md`.  
2. Follow the **Global Setup** to scaffold the project and copy assets.  
3. Build each section sequentially, exactly as described.  
4. After each section, update `DEPS.md`.  
5. After all sections, perform a self‑verification pass using DEPS.md.  
6. Commit the final result with the message: "Architecture v2 – complete rebuild with dependency tracking."

# Goddard Projects Farm — Task List

## Task Order
Tasks are ordered by dependency. Each task builds on the previous. Do NOT skip ahead.

---

## Task 1: Project Skeleton & HTML Structure

**Dependencies:** None (this is the foundation)

**What to build:**
- Create the full file structure as specified in architecture.md
- Write `index.html` with ALL 7 sections (Hero, About, Products, Why Choose Us, Gallery, Contact, Footer)
- Use semantic HTML5 tags: `<header>`, `<main>`, `<section>`, `<footer>`
- Include all placeholder content — real text from architecture.md, not lorem ipsum
- Link to `styles/main.css` and `scripts/main.js`
- Add Google Fonts link for Inter (400 and 700 weights)
- Add complete `<head>` with title, meta description, viewport meta tag

**Content to include (real, not placeholder):**
- Farm name: "Goddard Projects Farm"
- Tagline: "Fresh produce & livestock from Limpopo — supplying wholesalers and grocers since 2007"
- About text: The full philosophy quote and farm history from architecture.md
- Product details: Cattle (32 head, R7,500-R13,500), Sheep (42 head, R1,600-R2,800), Crops (Chillies, Butternuts, Tomatoes)
- Contact: full address, both phone numbers, email, coordinates
- Why Choose Us: all four value propositions

**Image placeholders:**
- Use `assets/logo.jpg` for logo
- Use `assets/hero-bg.jpg` for hero background
- Use `assets/about-bg.jpg` for about section
- Use `assets/gallery/gallery-01.jpg` through `gallery-08.jpg` for gallery
- Add descriptive alt text to every image

**Deliverable:** A single `index.html` file that contains the complete page structure. All text content is real. Images reference correct paths. CSS and JS files are linked but not yet created.

---

## Task 2: CSS Styling — Design System & Global Styles

**Dependencies:** Task 1 (HTML structure must exist)

**What to build:**
- Create `styles/main.css` with the complete design system
- CSS custom properties (variables) for all colors from the palette
- Typography: Inter font, heading sizes, body text, line heights
- Reset/normalize base styles
- Utility classes as needed
- All spacing and layout variables

**Colors to implement:**
```
--color-soil: #8B5E3C
--color-sage: #6B8E5A
--color-cream: #FDF8F0
--color-charcoal: #2D2D2D
--color-white: #FFFFFF
--color-whatsapp: #25D366
--color-gold: #C8963E
```

**Deliverable:** A complete `styles/main.css` with:
- CSS variables for all colors
- Typography system (headings h1-h3, body text, quote style)
- Responsive breakpoints (mobile <768px, tablet 768-1024px, desktop >1024px)
- Not yet: section-specific styles (those come in Task 3)

---

## Task 3: CSS Styling — All Sections

**Dependencies:** Task 2 (design system must exist)

**What to build:**
- Add section-specific styles to `styles/main.css`
- Implement EVERY section layout as described in architecture.md

**Section styles required:**

### Hero
- Full viewport height (100vh) on desktop, auto on mobile
- Background image with 40% dark overlay
- Logo sizing and positioning
- Farm name: large, bold, white text on overlay
- BBBEE badge: prominent, gold accent border
- Tagline: white, smaller
- Two CTA buttons: soil brown background, white text, hover state
- Responsive: stacked layout on mobile

### About
- Two-column grid on desktop, stacked on mobile
- Quote: italic, larger font, sage green color
- Stat cards: white background, subtle shadow, centered numbers
- Background image subtle behind text column

### Products
- Three cards in a row (desktop), stacked (mobile)
- Card: white background, image top, content below, subtle border
- Card image: fixed height, object-fit cover
- Title: bold, charcoal
- Price range: soil brown color, semibold
- Seasonality note: italic, smaller, muted

### Why Choose Us
- Four cards in 2×2 grid (desktop), stacked (mobile)
- Card: light cream background, subtle left border accent
- Icon placeholder circle (CSS-only) for each card
- Heading: bold, charcoal
- Body: smaller, readable

### Gallery
- 3-column CSS grid (desktop), 2-column (tablet), 1-column (mobile)
- Images: cover, consistent height, clickable
- Hover: subtle zoom or opacity effect

### Contact
- Two-column (desktop), stacked (mobile)
- Contact info: clear hierarchy, phone numbers prominent
- Google Maps iframe: full width, 300px height, border radius
- Form: clean inputs, consistent with design system
- Form inputs: full width, cream background, charcoal border, focus state

### Footer
- Dark background (charcoal), cream text
- Simple, centered, minimal

### WhatsApp Floating Button
- Fixed bottom-right, z-index above everything
- WhatsApp green circle with white icon
- Hover: slight scale up
- Mobile: smaller but still prominent

**Deliverable:** Section-specific styles added to `styles/main.css`. Every section in `index.html` now has complete visual styling. The page should look polished at all three breakpoints.

---

## Task 4: JavaScript — Interactions

**Dependencies:** Task 3 (all sections must be styled)

**What to build:**
- Create `scripts/main.js` with all interactive behavior

**Features to implement:**

### Smooth Scroll
- Intercept clicks on internal anchor links (#section-id)
- Smooth scroll to target section
- Offset for any fixed elements

### Gallery Lightbox
- Click any gallery image → open in fullscreen overlay
- Overlay: dark background, centered image, close button
- Close: click outside image, press Escape, or click X button
- Keyboard: left/right arrow keys to navigate between images
- Only show arrows if multiple images exist

### Contact Form
- Client-side validation: name required, email required + valid format, message required
- On validation pass: show success message temporarily
- On validation fail: highlight invalid fields
- Fallback: form has `mailto:` action if JS is disabled

### WhatsApp Button
- Already styled in CSS. JS just ensures the link works.
- Pre-filled message: "Hi, I'm interested in sourcing from Goddard Projects Farm."

### Optional: Navbar Scroll Highlight
- If time: add Intersection Observer to highlight current section in nav
- Not required for Phase 1

**Deliverable:** Complete `scripts/main.js`. All interactions work. Lightbox is keyboard-accessible. Form validation provides clear feedback.

---

## Task 5: Image Preparation & Final Polish

**Dependencies:** Tasks 1-4 (site should be functional)

**What to do:**
- Copy and rename the best 8-12 photos from `AA pics` folder into `assets/gallery/`
- Rename hero and about background images
- Ensure all image paths in `index.html` match actual file names
- Test the full site:
  - Open `index.html` in browser
  - Check all three breakpoints (resize browser)
  - Click through all interactions
  - Verify all images load
  - Verify smooth scroll works
  - Test lightbox with keyboard
  - Test contact form validation

**Deliverable:** A fully functional, visually complete website. All images load. All interactions work. Ready for review.

---

## Task 6: Repo Map & Testing Manual

**Dependencies:** Task 5 (site must be complete)

**What to produce:**
- Generate the repo map for the final project
- Write a testing manual for visual QA

**Repo Map format:**
```markdown
# Repo Map — Goddard Projects Farm
> Last updated: [date]

## Structure
(complete file tree with function descriptions)

## Import/Relationship Graph
(which files reference which)

## Changed This Iteration
(what was added/modified)
```

**Testing Manual format:**
- Visual checks for each section
- Interaction tests (lightbox, scroll, form)
- Responsive checks (mobile, tablet, desktop)
- Regression checks (all previous features still work)

**Deliverable:** `docs/repo-map.md` and `docs/testing-manual.md`

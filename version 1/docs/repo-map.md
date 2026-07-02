# Goddard Projects Farm — Repository Map

```
goddard-farm-site/
├── index.html                  # Single-page site (all 6 sections + footer + WhatsApp)
├── DEPS.md                     # Dependency tracking manifest
├── package.json                # npm metadata (sharp for image compression)
│
├── styles/
│   └── main.css                # Global styles + all section-specific CSS
│
├── scripts/
│   └── main.js                 # Smooth scroll, lightbox, contact form validation
│
├── assets/
│   ├── images/
│   │   ├── logo.jpg            # Farm logo (rectangular, 129 KB)
│   │   ├── hero-bg.jpg         # Hero background — tomatoes on bush (192 KB)
│   │   ├── about-bg.jpg        # About background — workers with crops (182 KB)
│   │   └── favicon.ico         # Browser favicon, 32×32 (0.7 KB)
│   └── gallery/
│       ├── gallery-01.jpg      # Cattle area (84 KB)
│       ├── gallery-02.jpg      # Cattle area 2 (99 KB)
│       ├── gallery-03.jpg      # Tomatoes on bush (83 KB)
│       ├── gallery-04.jpg      # Tomatoes on bush 2 (83 KB)
│       ├── gallery-05.jpg      # Workers on bush (70 KB)
│       ├── gallery-06.jpg      # Workers with crops (75 KB)
│       ├── gallery-07.jpg      # Worker picking leaves (75 KB)
│       └── gallery-08.jpg      # Farm overview (110 KB)
│
└── docs/
    ├── architecture.md         # Original architecture spec
    ├── architecture-v2.md      # V2 installation guide (this build)
    ├── task-list.md            # Task tracking from prior build
    └── repo-map.md             # This file
```

---

## Section → File Map

| Section | HTML (id) | CSS (.classes) | JS (functions) | Assets |
|---|---|---|---|---|
| 1 — Hero | `#hero` | `.hero-overlay`, `.hero-logo`, `.hero-title`, `.bbb-badge`, `.hero-tagline`, `.hero-ctas` | (smooth scroll) | `logo.jpg`, `hero-bg.jpg` |
| 2 — About | `#about` | `.about-grid`, `.philosophy-quote`, `.stat-card` | — | `about-bg.jpg` |
| 3 — Products | `#products` | `.product-cards`, `.product-card`, `.product-price`, `.seasonality-note` | — | `gallery-01–03.jpg` |
| 4 — Why Us | `#why-us` | `.value-cards`, `.value-card`, `.value-icon` | — | — |
| 5 — Gallery | `#gallery` | `.gallery-grid`, `.gallery-item`, `.lightbox.*` | `initLightbox()` | `gallery-01–08.jpg` |
| 6 — Contact | `#contact`, `#footer` | `.contact-grid`, `.form-field`, `.whatsapp-float` | `initContactForm()` | Google Maps iframe |

# Goddard Projects Farm — Showcase Website

## 1. Purpose

A website that showcases Goddard Projects Farm (Manamane, Thohoyandou, Limpopo) to potential clients. The site serves two distinct audiences: **commercial produce buyers** (wholesalers, restaurants, shops looking for reliable crop supply) and **small-scale livestock buyers** (households and restaurants purchasing individual animals). It builds credibility through the farm's story and BBBEE Level 1 credentials, displays what's available, gathers demand intelligence through a crop voting system, and drives all sales conversations to WhatsApp or a contact form. No e-commerce transactions happen on the site — it is a discovery and trust-building tool that converts visitors into WhatsApp conversations.

---

## 2. Features

### 2.1 Homepage

**User action:** A visitor lands on the site.

**App response:** 
- Displays a large, high-quality hero image of the farm.
- Shows a tagline establishing what the farm does (e.g., "Fresh produce and quality livestock from the heart of Limpopo").
- Presents two clear navigation pathways: **"Browse Livestock"** and **"Our Produce"**.
- Displays the BBBEE Level 1 badge prominently.
- Navigation bar with: Home, Livestock, Produce, Vote for Crops, Contact.

**Rules and specifics:**
- Hero image must be changeable by admin.
- The two main CTAs (Livestock / Produce) must be visually equal — neither audience is secondary.
- BBBEE badge must link to or display the certificate.

---

### 2.2 Livestock Catalog

**User action:** Visitor navigates to the Livestock section.

**App response:**
- Displays a grid of animal cards. Each card shows:
  - Photo of the animal
  - Price range (e.g., "R7,500 – R10,500")
  - Availability badge: **"Available"** or **"Out of Stock"**
- Clicking a card opens a modal/lightbox overlay (large photo, price range, availability badge, and a button: **"Interested? Message us on WhatsApp"**).
- The WhatsApp button opens WhatsApp with a pre-filled message: *"Hi, I'm interested in [Animal Name] — [Price Range]. Is it still available?"*

**Rules and specifics:**
- Actual stock numbers are never displayed on the site — only price ranges and availability status.
- Animals have: photo, name/ID, price range, and availability status (Available / Out of Stock). No breed, no age.
- Admin manages this catalog (add, edit, remove animals).
- If an animal is "Out of Stock," the WhatsApp button is hidden or replaced with "Currently Unavailable."

---

### 2.3 Produce Showcase

**User action:** Visitor navigates to the Produce section.

**App response:**
- Displays cards for each crop (chillies, butternuts, tomatoes, and up to 5–6 crops over time). Each card shows:
  - Photo
  - Crop name
  - Seasonal badge: **"In Season Now"** or **"Coming Soon"**
- Clicking a card navigates to a **dedicated page** for that crop, showing:
  - Multiple photos
  - Full description
  - Harvest season(s) — month ranges
  - Typical pricing (e.g., "RXX per kg")
  - Minimum order quantities (e.g., "Minimum 50kg for wholesale")
  - A WhatsApp button: *"Hi, I'm interested in ordering [Crop Name]."*

**Rules and specifics:**
- Maximum ~5–6 crops at any time.
- Admin can add new crops, edit existing ones, or hide off-season crops.
- Seasonal badge is set per crop by admin.
- The dedicated crop page must have a clear "Back to all produce" navigation.

---

### 2.4 Crop Voting System

**User action:** A visitor goes to the "Vote for Upcoming Crops" page and sees a prompt to vote on what the farm should plant next season.

**App response:**
- Displays the current voting round: season label (e.g., "Winter 2026"), a list of viable crops with brief descriptions, and an explanation: *"These crops are expected to thrive in the upcoming season based on weather patterns. Tell us what you'd buy."*
- Visitor attempts to vote (multiple selection — checkboxes). If they are **not a newsletter subscriber**, a pop-up appears:
  - *"Voting is open to our newsletter subscribers. Enter your email below to subscribe and cast your vote."*
  - Email input field + "Subscribe & Vote" button.
- If they are already subscribed (email match), or after they subscribe via the pop-up, their vote is recorded.
- After voting: displays a "Thank you — your response has been recorded" confirmation.
- No live results are shown to voters.

**Rules and specifics:**
- Subscribers can select **multiple crops** (checkboxes, not radio buttons).
- Subscriber verification: email address is checked against the Mailchimp subscriber list via API.
- One vote per email address per voting round.
- Admin creates voting rounds: season name, list of viable crops, voting deadline.
- Admin can view aggregated results (which crops got how many votes).
- If no active voting round exists, the page shows: "No active voting round. Check back soon or subscribe to our newsletter for updates."

---

### 2.5 Contact & Newsletter

**User action:** Visitor wants to get in touch or sign up for updates.

**App response:**
- A dedicated Contact page with a form:
  - Name (required)
  - Email (required)
  - Phone number (optional)
  - Message (required)
  - Checkbox: **"Add me to the newsletter list"** (unchecked by default)
  - Submit button.
- On submission: form is saved locally, and if the newsletter checkbox was ticked, the email is pushed to Mailchimp via API in the background.
- Success message: "Your message has been sent. We'll get back to you soon."
- If Mailchimp API is unreachable: the form still submits successfully. The newsletter signup is queued for later sync or handled manually. The user experience is not broken.

**Rules and specifics:**
- WhatsApp button/icon is available site-wide (e.g., floating WhatsApp button in corner).
- Newsletter (via Mailchimp) sends three types of updates: new stock available, harvest updates, price changes.
- Mailchimp API integration must fail gracefully — form submission must never depend on Mailchimp being available.
- Phone number field accepts South African format.

---

### 2.6 Admin Panel

**User action:** The farmer/admin logs in to manage the site.

**App response:**
- **Livestock management:** Add new animal (photo upload, name/ID, price range, availability), edit existing, remove.
- **Produce management:** Add new crop (photos, name, description, harvest months, pricing, minimum order quantity, seasonal status), edit existing, remove or hide.
- **Voting management:** Create a new voting round (season label, list of viable crops as text entries, deadline date). View results of current or past rounds.
- **Homepage management:** Change hero image, update tagline.

**Rules and specifics:**
- Single admin account — no multi-user roles needed at this stage.
- Login is username + password, protected behind authentication.
- Admin dashboard is not accessible to site visitors.
- Voting results are simple: crop name and vote count.

---

## 3. Constraints

### Must Do:
- Work on mobile and desktop (responsive design).
- Convert visitors to WhatsApp conversations.
- Never expose exact livestock numbers.
- Contact form must work even if Mailchimp API is down.
- Display BBBEE Level 1 credentials.
- Showcase crops and livestock with high-quality photos.

### Will Not Do (Yet):
- E-commerce / online payments / shopping cart.
- Live inventory tracking with exact quantities.
- Multi-user admin roles.
- Blog or news section.
- Multi-language support.
- Integration with farm management or accounting systems.

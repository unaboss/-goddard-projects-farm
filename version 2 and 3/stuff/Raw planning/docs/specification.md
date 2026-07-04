# Limpopo Farm Showcase — Technical Specification

## User Stories

1. As a **produce buyer**, I want to browse available crops with photos so that I can see what the farm offers.
2. As a **livestock buyer**, I want to browse animals by type so that I can find what I'm looking for quickly.
3. As a **visitor**, I want to vote on which crops the farm should plant next so that I can participate in the farm's decisions.
4. As a **farm admin**, I want to manage produce and livestock listings so that the catalog stays current.
5. As a **farm admin**, I want to create and manage voting rounds so that I can gather community input on planting decisions.
6. As a **farm admin**, I want to view and export subscriber emails so that I can use them in Mailchimp campaigns.
7. As a **farm admin**, I want to read contact form messages so that I can respond to inquiries.
8. As a **visitor**, I want to subscribe to the newsletter so that I can get harvest updates and vote.
9. As a **visitor**, I want to view farm photos in a gallery so that I can connect with the farm's story and people.

---

## Pages / Screens

| Route | Page | Purpose |
|---|---|---|
| `/` | Home / Landing | Full-viewport hero (no nav on load — nav slides in on scroll). Tagline, sub-tagline, established date, wordless logo, farm background. Stacked carousels (livestock top, produce bottom). Voting teaser with overlay. Newsletter signup. WhatsApp floating icon. |
| `/produce` | Produce Catalog | Page header. "In Season" label. Produce grid with crop cards (photo, name, description, seasonality badge). Inline voting section with vote counts. Farm photo gallery with lightbox. |
| `/livestock` | Livestock Catalog | Page header. Livestock grid with animal cards (photo, name, breed, description, status badge). |
| `/contact` | Contact / About | Farm story, contact form (name, email, message), location details, Google Maps embed. WhatsApp floating icon. |
| `/admin/login` | Admin Login | Single-user password authentication. |
| `/admin` | Admin Dashboard | Unified dashboard: produce CRUD, livestock CRUD, voting rounds, subscribers list, messages inbox. |

---

## Data Shapes

```typescript
// --- Produce ---
interface ProduceItem {
  id: string;
  name: string;
  description: string;
  category: string;           // e.g., "Vegetables", "Fruits", "Grains"
  seasonality: string;        // e.g., "Year-round", "Summer", "Winter"
  inSeason: boolean;
  imageUrl: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// --- Livestock ---
interface LivestockItem {
  id: string;
  name: string;
  breed: string;
  description: string;
  type: string;               // e.g., "Cattle", "Goats", "Poultry", "Sheep"
  status: string;             // e.g., "Available", "Coming Soon", "Sold"
  imageUrl: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// --- Voting Round ---
interface VotingRound {
  id: string;
  title: string;              // e.g., "What's Growing This Season?"
  description: string;
  isActive: boolean;
  startsAt: Date;
  endsAt: Date | null;
  crops: VotingCrop[];
  createdAt: Date;
}

interface VotingCrop {
  id: string;
  votingRoundId: string;
  name: string;
  imageUrl: string;
  description: string;
  voteCount: number;
}

// --- Vote ---
interface Vote {
  id: string;
  votingRoundId: string;
  votingCropId: string;
  subscriberEmail: string;
  createdAt: Date;
}

// --- Subscriber ---
interface Subscriber {
  id: string;
  email: string;
  subscribedAt: Date;
}

// --- Contact Message ---
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

// --- Gallery Photo ---
interface GalleryPhoto {
  id: string;
  imageUrl: string;
  caption: string;
  displayOrder: number;
  createdAt: Date;
}

// --- Admin User ---
interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
}
```

---

## Edge Cases & Error States

| Scenario | Behavior |
|---|---|
| **Visitor votes without subscribing** | Inline prompt: "Enter your email to cast your vote." Email field appears, then vote registers. |
| **Already voted in current round** | "You've already voted this round. Come back next season!" — gentle message, voting UI disabled. |
| **No active voting round** | Section shows "No voting round active right now. Subscribe to know when the next one opens!" |
| **Empty produce/livestock catalog** | Grid area shows "Nothing here yet — check back soon!" styled as a soft placeholder. |
| **Image fails to load** | Fallback placeholder with crop/animal icon silhouette on the dark surface. |
| **Contact form validation fail** | Inline red/gold error under each field. Form does not clear on failure. |
| **Contact form submit success** | Gold checkmark + "Message sent! We'll get back to you." — form clears. |
| **Admin invalid login** | Subtle shake animation on form + "Incorrect password." |
| **Admin deletes item** | Confirmation dialog: "Are you sure? This can't be undone." |
| **Admin creates voting round while one is active** | Warning: "Only one round can be active. Deactivate the current round first?" |
| **WhatsApp link** | Floating icon always visible. Uses `wa.me` link with farm number. |

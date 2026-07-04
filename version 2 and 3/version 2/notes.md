# Project Notes — Goddard Projects Farm

## Photo Review Status: PLACEHOLDER (needs review)

16 photos randomly assigned from the `AA pics/` folder for visual testing. ALL mappings must be reviewed.

### Current Mappings

| Slot | Source Photo |
|---|---|
| `produce/butternut.jpg` | IMG_0400.jpeg |
| `produce/tomatoes.jpg` | Tomatoes on bush(2).jpeg |
| `produce/chillies.jpg` | IMG_0410.jpeg |
| `produce/spinach.jpg` | IMG_0414.jpeg |
| `produce/maize.jpg` | IMG_0415.jpeg |
| `produce/coriander.jpg` | IMG_0418.jpeg |
| `livestock/bull.jpg` | IMG_0420.jpeg |
| `livestock/cow.jpg` | IMG_0424.jpeg |
| `livestock/goat.jpg` | IMG_0425.jpeg |
| `livestock/sheep.jpg` | IMG_0428.jpeg |
| `vote/cabbage.jpg` | IMG_0435.jpeg |
| `vote/sweetpotato.jpg` | IMG_0436.jpeg |
| `vote/groundnuts.jpg` | IMG_0440.jpeg |
| `gallery/field-sunset.jpg` | Man standing infront of wendy house(crops in background).jpeg |
| `gallery/farmer.jpg` | Man picking up leaves in front of jojo tank.jpeg |
| `gallery/goats.jpg` | Spraying floor where cows live.jpeg |

## Logo Status: PENDING

A borderless, textless logo still needs to be created. Placeholder emoji (`🌾`) is used throughout the admin login page and NavBar until the real logo is ready.

## Admin Login

Credentials pre-filled on the login form for convenience:
- Email: `admin@goddardprojects.co.za`
- Password: `farm2026`

## Build Progress

- [x] Phase 1: Scaffold — Next.js 14 + Tailwind + TS skeleton
- [x] Phase 2: Design Foundation — Limpopo Dusk theme, fonts, constants
- [x] Phase 3: Database Foundation — Prisma schema (8 models) + SQLite + client
- [x] Phase 4: Public Shell & Seed Data — NavBar, Footer, WhatsApp, seed
- [x] Phase 5: Homepage Hero, Produce Grid & Livestock Grid
- [x] Phase 6: Contact Page, Voting Section & Newsletter
- [x] Phase 7: Admin Login & Read-Only Dashboard
- [x] Phase 8: Admin CRUD — tabbed dashboard, full management
- [x] Phase 9 (bonus): Gallery page with lightbox + 27 photos

## Running the Project

```bash
cd "version 1"
npm run dev        # Start dev server
npm run db:push    # Sync Prisma schema to SQLite
npm run db:seed    # Seed sample data (destructive — wipes and reinserts)
npm run db:studio  # Open Prisma Studio to browse data
```

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Styling | Tailwind CSS 3 |
| Database | SQLite via Prisma 5 |
| Language | TypeScript 5 |
| Auth | Plain-text password + HTTP-only cookie |

## Credentials

- **Admin login**: `admin@goddardprojects.co.za` / `farm2026`
- **Admin URL**: `http://localhost:3000/admin/login`

## Project Size

- ~50 source files created
- 8 database models, 6 tabs in admin dashboard
- 5 public routes: `/`, `/produce`, `/livestock`, `/gallery`, `/contact`
- 27 gallery photos from AA pics (randomly mapped — review needed)

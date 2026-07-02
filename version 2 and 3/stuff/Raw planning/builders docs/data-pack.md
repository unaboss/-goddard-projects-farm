# Data Pack — Goddard Projects Farm

## Phase 1 — Scaffold

**SAMPLE DATA:** None needed for scaffold.

**ALGORITHM NOTES:** None.

**CONTENT NOTES:** None.

**INTERFACE REMINDER:** None.

---

## Phase 3 — Database Foundation

**SAMPLE DATA:**

No seed data needed this phase — the Builder only creates the schema and client. The database will be empty after `db push`. Seed data comes in Phase 4 when the first server actions need records to query.

**FILES TO CREATE — Full Content**

### `prisma/schema.prisma`

```prisma
// This is your ENTIRE Prisma schema. Copy-paste it into prisma/schema.prisma.
// Goddard Projects Farm — Limpopo Dusk

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// ─── PRODUCE ───────────────────────────────────────────

model ProduceItem {
  id           String   @id @default(cuid())
  name         String
  description  String
  category     String   @default("Vegetables")   // Vegetables | Fruits | Grains | Herbs | Other
  seasonality  String                             // e.g. "Year-round", "Summer", "Winter"
  inSeason     Boolean  @default(true)
  imageUrl     String
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

// ─── LIVESTOCK — decision #1 applied (no breed, no age, no description) ───

model LivestockItem {
  id                 String   @id @default(cuid())
  name               String
  photoUrl           String
  priceRange         String                      // e.g. "R4,500 – R6,000"
  availabilityStatus String   @default("Available")  // Available | ComingSoon | Sold
  displayOrder       Int      @default(0)
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

// ─── VOTING — decision #2 applied (multi-select, one Vote row per selected crop) ───

model VotingRound {
  id          String       @id @default(cuid())
  title       String
  description String?
  startDate   DateTime     @default(now())
  endDate     DateTime?
  isActive    Boolean      @default(true)
  createdAt   DateTime     @default(now())
  crops       VotingCrop[]
  votes       Vote[]
}

model VotingCrop {
  id            String      @id @default(cuid())
  votingRoundId String
  votingRound   VotingRound @relation(fields: [votingRoundId], references: [id], onDelete: Cascade)
  name          String
  photoUrl      String?
  votes         Vote[]
  createdAt     DateTime    @default(now())
}

model Vote {
  id            String      @id @default(cuid())
  email         String
  votingRoundId String
  votingRound   VotingRound @relation(fields: [votingRoundId], references: [id], onDelete: Cascade)
  votingCropId  String
  votingCrop    VotingCrop  @relation(fields: [votingCropId], references: [id], onDelete: Cascade)
  createdAt     DateTime    @default(now())

  @@unique([email, votingCropId])   // cannot vote for the same crop twice with one email
}

// ─── SUBSCRIBER ────────────────────────────────────────

model Subscriber {
  id           String   @id @default(cuid())
  email        String   @unique
  status       String   @default("Active")   // Active | Unsubscribed
  subscribedAt DateTime @default(now())
}

// ─── CONTACT MESSAGES ──────────────────────────────────

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}

// ─── GALLERY ───────────────────────────────────────────

model GalleryPhoto {
  id           String   @id @default(cuid())
  url          String
  alt          String
  category     String?                       // e.g. "Fields", "People", "Livestock"
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
}

// ─── ADMIN ─────────────────────────────────────────────

model AdminUser {
  id           String @id @default(cuid())
  email        String @unique
  passwordHash String
}
```

### `src/lib/prisma.ts`

```typescript
// Prisma client singleton — prevents multiple instances during Next.js hot-reload

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### `.env` — add this line

```
DATABASE_URL="file:./dev.db"
```

### `package.json` — add these scripts

```json
"db:push": "npx prisma db push",
"db:studio": "npx prisma studio",
"db:generate": "npx prisma generate"
```

**ALGORITHM NOTES:**

1. **Vote counting** — `VotingCrop` has no `voteCount` field. Count is always computed:  
   `const count = await prisma.vote.count({ where: { votingCropId } });`  
   This avoids stale counts and race conditions. Every time a vote count is displayed, query fresh.

2. **One-ballot enforcement** — The `@@unique([email, votingCropId])` stops double-voting the *same crop*. But the app must also stop voting *across different crops* in the same round if the visitor already voted. The server action must check:  
   `const alreadyVoted = await prisma.vote.findFirst({ where: { email, votingRoundId } });`  
   If truthy → reject with "You've already voted this round."

3. **Cascade deletes** — When a `VotingRound` is deleted, all its `VotingCrop` rows and `Vote` rows vanish automatically (cascade). When a `VotingCrop` is deleted, its votes vanish. Safe.

4. **No migrations** — Using `db push` (not `migrate dev`) keeps things simple for SQLite. `_prisma_migrations` table still appears.

**CONTENT NOTES:**

- Schema uses `cuid()` for all IDs — short, URL-safe, collision-resistant. No UUID overhead.
- All dates default to `now()` on create.
- `updatedAt` is `@updatedAt` — Prisma auto-touches it on every update.
- Category and status fields are stored as `String` (not enums) because SQLite doesn't support native enums. Validation happens in the application layer. The valid values are documented in comments.
- `description` on `VotingRound` is optional (`String?`).
- `photoUrl` on `VotingCrop` is optional (`String?`) — crops can have a photo or not.
- `phone` on `ContactMessage` is optional.
- `category` on `GalleryPhoto` is optional.
- `endDate` on `VotingRound` is optional — rounds can be evergreen (no end date).

**INTERFACE REMINDER:**

```typescript
// These are the TypeScript shapes Prisma generates from the schema above.
// The Builder gets these automatically via `prisma generate`. Listed for reference.

interface ProduceItem {
  id: string;
  name: string;
  description: string;
  category: string;          // "Vegetables" | "Fruits" | "Grains" | "Herbs" | "Other"
  seasonality: string;       // e.g. "Year-round", "Summer", "Winter"
  inSeason: boolean;
  imageUrl: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

interface LivestockItem {    // ← Decision #1: no breed, no description
  id: string;
  name: string;
  photoUrl: string;
  priceRange: string;        // e.g. "R4,500 – R6,000"
  availabilityStatus: string; // "Available" | "ComingSoon" | "Sold"
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

interface VotingRound {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  createdAt: Date;
  crops: VotingCrop[];
  votes: Vote[];
}

interface VotingCrop {
  id: string;
  votingRoundId: string;
  name: string;
  photoUrl: string | null;
  votes: Vote[];
  createdAt: Date;
}

interface Vote {
  id: string;
  email: string;
  votingRoundId: string;
  votingCropId: string;
  createdAt: Date;
}

interface Subscriber {
  id: string;
  email: string;
  status: string;            // "Active" | "Unsubscribed"
  subscribedAt: Date;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  category: string | null;
  displayOrder: number;
  createdAt: Date;
}

interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
}
```

---

## Phase 7 — Admin Login & Read-Only Dashboard

**SAMPLE DATA:**

No new seed data needed. Phase 4 seed already created the AdminUser (`admin@goddardprojects.co.za`). The Builder must update the seed to use plain-text `'farm2026'` for the `passwordHash` field (or add a comment noting the dev password).

**ALGORITHM NOTES:**

### 1. `src/lib/auth.ts` — Cookie helpers

```typescript
// src/lib/auth.ts
// Minimal admin auth for MVP — plain-text password, simple cookie token.

import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_token';
const COOKIE_VALUE = 'admin.session'; // simple sentinel for MVP

export async function getAdminFromCookies(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  return token?.value === COOKIE_VALUE;
}

export function getAdminCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: COOKIE_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  };
}
```

### 2. `src/app/actions/auth.ts` — Authenticate server action

```typescript
// src/app/actions/auth.ts
'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getAdminCookieOptions } from '@/lib/auth';

interface AuthResult {
  success: boolean;
  error?: string;
}

export async function authenticateAdmin(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user) {
    return { success: false, error: 'Invalid email or password.' };
  }

  // Plain-text comparison for MVP (decision #6)
  if (user.passwordHash !== password) {
    return { success: false, error: 'Invalid email or password.' };
  }

  const cookieStore = await cookies();
  const opts = getAdminCookieOptions();
  cookieStore.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    path: opts.path,
    maxAge: opts.maxAge,
  });

  return { success: true };
}
```

### 3. `src/middleware.ts` — Route protection

```typescript
// src/middleware.ts
// Protects /admin routes except /admin/login.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'admin_token';
const COOKIE_VALUE = 'admin.session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow login page through
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME);

  if (!token || token.value !== COOKIE_VALUE) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

### 4. `src/app/admin/page.tsx` — Dashboard gate

```typescript
// src/app/admin/page.tsx
// Server component. Reads cookie, gates access, renders three panels.

import { redirect } from 'next/navigation';
import { getAdminFromCookies } from '@/lib/auth';
import { MessagesPanel } from '@/components/admin/MessagesPanel';
import { VotingPanel } from '@/components/admin/VotingPanel';
import { SubscriberPanel } from '@/components/admin/SubscriberPanel';

export default async function AdminDashboardPage() {
  const isAuthenticated = await getAdminFromCookies();
  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Messages — full width on mobile, span 2 on desktop */}
      <div className="lg:col-span-2">
        <MessagesPanel />
      </div>

      {/* Voting stats */}
      <VotingPanel />

      {/* Subscriber stats */}
      <SubscriberPanel />
    </div>
  );
}
```

### 5. `src/app/admin/layout.tsx` — Admin shell

```typescript
// src/app/admin/layout.tsx
// Minimal admin layout — no NavBar, no Footer, no PublicLayout.

import type { Metadata } from 'next';
import { LogoutButton } from '@/components/admin/LogoutButton';

export const metadata: Metadata = {
  title: 'Admin — Goddard Projects Farm',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-deep-earth text-warm-cream antialiased min-h-screen">
        {/* Top bar */}
        <header className="border-b border-subtle-earth bg-rich-soil/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="font-heading text-xl text-harvest-gold">
              Admin — Goddard Projects
            </h1>
            <LogoutButton />
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
```

### 6. `src/components/admin/LoginForm.tsx` — Client login

```typescript
// src/components/admin/LoginForm.tsx
'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authenticateAdmin } from '@/app/actions/auth';

const initialState = { success: false, error: undefined };

export function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    authenticateAdmin,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push('/admin');
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-5">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm text-warm-cream/80 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="admin@goddardprojects.co.za"
          className="w-full px-4 py-3 bg-subtle-earth border border-dusty-clay/20 rounded-lg text-warm-cream placeholder:text-dusty-clay focus:outline-none focus:border-harvest-gold transition-colors"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm text-warm-cream/80 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-subtle-earth border border-dusty-clay/20 rounded-lg text-warm-cream placeholder:text-dusty-clay focus:outline-none focus:border-harvest-gold transition-colors"
        />
      </div>

      {/* Error */}
      {state.error && (
        <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {state.error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-harvest-gold text-deep-earth font-semibold rounded-lg hover:bg-harvest-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

### 7. `src/components/admin/LogoutButton.tsx`

```typescript
// src/components/admin/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    // Clear the cookie by setting it with an expired date
    document.cookie =
      'admin_token=; path=/; max-age=0; SameSite=Lax';
    router.push('/admin/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-dusty-clay hover:text-warm-cream transition-colors"
    >
      Logout
    </button>
  );
}
```

### 8. `src/components/admin/MessagesPanel.tsx`

```typescript
// src/components/admin/MessagesPanel.tsx
// Server component — queries ContactMessage, displays read-only table.

import { prisma } from '@/lib/prisma';

export async function MessagesPanel() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <h2 className="font-heading text-xl text-harvest-gold mb-4">
        Contact Messages
      </h2>

      {messages.length === 0 ? (
        <p className="text-dusty-clay text-sm">No messages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-subtle-earth text-dusty-clay text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b border-subtle-earth/50">
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        msg.isRead ? 'bg-forest-canopy' : 'bg-dusty-clay'
                      }`}
                      title={msg.isRead ? 'Read' : 'Unread'}
                    />
                  </td>
                  <td className="py-3 pr-4 text-warm-cream whitespace-nowrap">
                    {msg.name}
                  </td>
                  <td className="py-3 pr-4 text-dusty-clay whitespace-nowrap">
                    {msg.email}
                  </td>
                  <td className="py-3 pr-4 text-dusty-clay whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('en-ZA')}
                  </td>
                  <td className="py-3 text-dusty-clay max-w-xs truncate">
                    {msg.message.slice(0, 120)}
                    {msg.message.length > 120 ? '…' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-dusty-clay">
        {messages.length} message{messages.length !== 1 ? 's' : ''} total
      </p>
    </div>
  );
}
```

### 9. `src/components/admin/VotingPanel.tsx`

```typescript
// src/components/admin/VotingPanel.tsx
// Server component — shows active round with per-crop tallies.

import { prisma } from '@/lib/prisma';

export async function VotingPanel() {
  const activeRound = await prisma.votingRound.findFirst({
    where: { isActive: true },
    include: {
      crops: {
        include: {
          _count: { select: { votes: true } },
        },
        orderBy: { name: 'asc' },
      },
    },
  });

  if (!activeRound) {
    return (
      <div className="bg-rich-soil rounded-lg p-6">
        <h2 className="font-heading text-xl text-harvest-gold mb-4">
          Voting — Current Round
        </h2>
        <p className="text-dusty-clay text-sm">No active voting round.</p>
      </div>
    );
  }

  const totalVotes = activeRound.crops.reduce(
    (sum, crop) => sum + crop._count.votes,
    0
  );

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <h2 className="font-heading text-xl text-harvest-gold mb-1">
        Voting — Current Round
      </h2>
      <p className="text-warm-cream font-semibold mb-1">
        {activeRound.title}
      </p>
      <p className="text-xs text-dusty-clay mb-4">
        Since {new Date(activeRound.startDate).toLocaleDateString('en-ZA')}
        {activeRound.endDate
          ? ` → ${new Date(activeRound.endDate).toLocaleDateString('en-ZA')}`
          : ' (no end date)'}
      </p>

      {/* Per-crop bars */}
      <div className="space-y-3">
        {activeRound.crops.map((crop) => {
          const maxVotes = Math.max(
            ...activeRound.crops.map((c) => c._count.votes),
            1
          );
          const pct = (crop._count.votes / maxVotes) * 100;

          return (
            <div key={crop.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-warm-cream">{crop.name}</span>
                <span className="text-harvest-gold font-semibold">
                  {crop._count.votes}
                </span>
              </div>
              <div className="w-full bg-subtle-earth rounded-full h-2">
                <div
                  className="bg-forest-canopy h-2 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-dusty-clay">
        {totalVotes} total vote{totalVotes !== 1 ? 's' : ''} across{' '}
        {activeRound.crops.length} crop{activeRound.crops.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
```

### 10. `src/components/admin/SubscriberPanel.tsx`

```typescript
// src/components/admin/SubscriberPanel.tsx
// Server component — shows Active and Unsubscribed counts.

import { prisma } from '@/lib/prisma';

export async function SubscriberPanel() {
  const [activeCount, unsubscribedCount] = await Promise.all([
    prisma.subscriber.count({ where: { status: 'Active' } }),
    prisma.subscriber.count({ where: { status: 'Unsubscribed' } }),
  ]);

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <h2 className="font-heading text-xl text-harvest-gold mb-4">
        Newsletter Subscribers
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Active */}
        <div className="bg-subtle-earth rounded-lg p-4 text-center">
          <p className="text-3xl font-heading text-forest-canopy">
            {activeCount}
          </p>
          <p className="text-xs text-dusty-clay mt-1">Active</p>
        </div>

        {/* Unsubscribed */}
        <div className="bg-subtle-earth rounded-lg p-4 text-center">
          <p className="text-3xl font-heading text-dusty-clay">
            {unsubscribedCount}
          </p>
          <p className="text-xs text-dusty-clay mt-1">Unsubscribed</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-dusty-clay">
        {activeCount + unsubscribedCount} total subscriber
        {activeCount + unsubscribedCount !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
```

### 11. `src/app/admin/login/page.tsx` — Login page

```typescript
// src/app/admin/login/page.tsx
// Server component — renders the login form in a centered card.

import { LoginForm } from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-rich-soil rounded-xl p-8 border border-subtle-earth">
        {/* Logo / brand */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-harvest-gold/20 flex items-center justify-center">
            <span className="text-2xl">🌾</span>
          </div>
          <h1 className="font-heading text-2xl text-harvest-gold">
            Goddard Projects
          </h1>
          <p className="text-dusty-clay text-sm mt-1">
            Farm Management
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
```

### 12. Seed update — Admin password

The Builder must update the AdminUser seed in `prisma/seed.ts` to use `'farm2026'` directly so plain-text comparison works:

```typescript
await prisma.adminUser.create({
  data: {
    email: 'admin@goddardprojects.co.za',
    passwordHash: 'farm2026', // plain-text for MVP — replace with bcrypt hash before production
  },
});
```

**CONTENT NOTES:**

- **Admin layout** is completely separate from `PublicLayout` — uses its own `<html>` and `<body>` tags (Next.js allows multiple root layouts for route groups). The top bar shows "Admin — Goddard Projects" in harvest-gold on the left, and a "Logout" text link on the right. Background is `bg-deep-earth`, matching the public theme.
- **Login page** is centered vertically and horizontally (`min-h-screen flex items-center justify-center`). The card has a subtle border (`border-subtle-earth`), rounded corners (`rounded-xl`), and a wheat emoji (🌾) as a logo placeholder above the form.
- **Error messages** on login use `bg-red-400/10 border border-red-400/30 text-red-400` — consistent with Phase 6 error styling.
- **Messages table** column order: Status dot → Name → Email → Date → Message (truncated to 120 chars). Status dot: `bg-forest-canopy` (green) for read, `bg-dusty-clay` (clay) for unread.
- **Voting bar chart** uses proportional widths — the crop with the most votes gets a full bar, others scale relative to it. Bars use `bg-forest-canopy` on `bg-subtle-earth` track.
- **Subscriber stat cards** use `font-heading text-3xl` for the numbers. Active count is green (`text-forest-canopy`), Unsubscribed is muted (`text-dusty-clay`).
- **Logout button**: simple text link. Clears cookie via `document.cookie` with `max-age=0` (client-side), then redirects.
- **No public NavBar/Footer on admin pages**: the admin layout renders its own minimal `<header>` with just a title and logout. Public pages are unaffected — they continue using `PublicLayout`.

**INTERFACE REMINDER:**

```typescript
// Auth server action result
interface AuthResult {
  success: boolean;
  error?: string;
}

// VotingPanel crop shape (from Prisma include)
interface CropWithVoteCount {
  id: string;
  name: string;
  _count: { votes: number };
}

// Active round with crops (from Prisma findFirst)
interface ActiveRoundWithCrops {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  crops: CropWithVoteCount[];
}
```

---

## Phase 4 — Public Shell & Seed Data

**SAMPLE DATA:**

### Seed Script (`prisma/seed.ts`)

```typescript
// prisma/seed.ts
// Run with: npm run db:seed
// Re-runnable — uses deleteMany then create for idempotency.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Wipe existing seed data (order matters — children first)
  await prisma.vote.deleteMany();
  await prisma.votingCrop.deleteMany();
  await prisma.votingRound.deleteMany();
  await prisma.produceItem.deleteMany();
  await prisma.livestockItem.deleteMany();
  await prisma.galleryPhoto.deleteMany();
  await prisma.adminUser.deleteMany();

  console.log('🗑️  Cleared existing seed data.');

  // ── Produce (6 items, grid-only per decision #4) ──
  const produce = await Promise.all([
    prisma.produceItem.create({
      data: {
        name: 'Butternut',
        description: 'Rich, sweet butternut grown in the winter sun.',
        category: 'Vegetables',
        seasonality: 'Winter',
        inSeason: true,
        imageUrl: '/images/produce/butternut.jpg',
        displayOrder: 1,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: 'Tomatoes',
        description: 'Vine-ripened red and full of flavour.',
        category: 'Fruits',
        seasonality: 'Summer',
        inSeason: true,
        imageUrl: '/images/produce/tomatoes.jpg',
        displayOrder: 2,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: 'Chillies',
        description: 'Hot and spicy, perfect for peri-peri.',
        category: 'Vegetables',
        seasonality: 'Year-round',
        inSeason: true,
        imageUrl: '/images/produce/chillies.jpg',
        displayOrder: 3,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: 'Spinach',
        description: 'Dark green leafy bundles, cut daily.',
        category: 'Vegetables',
        seasonality: 'Autumn',
        inSeason: false,
        imageUrl: '/images/produce/spinach.jpg',
        displayOrder: 4,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: 'Maize',
        description: 'Mealie meal ready, grown in the rich Limpopo soil.',
        category: 'Grains',
        seasonality: 'Summer',
        inSeason: false,
        imageUrl: '/images/produce/maize.jpg',
        displayOrder: 5,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: 'Coriander',
        description: 'Fresh dhania bunches, fragrant and homegrown.',
        category: 'Herbs',
        seasonality: 'Year-round',
        inSeason: true,
        imageUrl: '/images/produce/coriander.jpg',
        displayOrder: 6,
      },
    }),
  ]);

  console.log(`✅ ${produce.length} Produce items seeded.`);

  // ── Livestock (4 items, decision #1: price range + status only) ──
  const livestock = await Promise.all([
    prisma.livestockItem.create({
      data: {
        name: 'Bull #3',
        photoUrl: '/images/livestock/bull.jpg',
        priceRange: 'R12,000 – R15,000',
        availabilityStatus: 'Available',
        displayOrder: 1,
      },
    }),
    prisma.livestockItem.create({
      data: {
        name: 'Nguni Cow',
        photoUrl: '/images/livestock/cow.jpg',
        priceRange: 'R9,500 – R11,000',
        availabilityStatus: 'ComingSoon',
        displayOrder: 2,
      },
    }),
    prisma.livestockItem.create({
      data: {
        name: 'Boer Goat',
        photoUrl: '/images/livestock/goat.jpg',
        priceRange: 'R1,800 – R2,500',
        availabilityStatus: 'Available',
        displayOrder: 3,
      },
    }),
    prisma.livestockItem.create({
      data: {
        name: 'Dorper Sheep',
        photoUrl: '/images/livestock/sheep.jpg',
        priceRange: 'R2,200 – R2,800',
        availabilityStatus: 'Sold',
        displayOrder: 4,
      },
    }),
  ]);

  console.log(`✅ ${livestock.length} Livestock items seeded.`);

  // ── Voting Round + 3 crops ──
  const round = await prisma.votingRound.create({
    data: {
      title: "What's Growing This Season?",
      description: 'Help us decide what to plant next.',
      isActive: true,
      startDate: new Date('2026-01-01'),
    },
  });

  const crops = await Promise.all([
    prisma.votingCrop.create({
      data: {
        votingRoundId: round.id,
        name: 'Cabbage',
        photoUrl: '/images/vote/cabbage.jpg',
      },
    }),
    prisma.votingCrop.create({
      data: {
        votingRoundId: round.id,
        name: 'Sweet Potato',
        photoUrl: '/images/vote/sweetpotato.jpg',
      },
    }),
    prisma.votingCrop.create({
      data: {
        votingRoundId: round.id,
        name: 'Groundnuts',
        photoUrl: '/images/vote/groundnuts.jpg',
      },
    }),
  ]);

  console.log(`✅ 1 Voting round + ${crops.length} crops seeded.`);

  // ── Gallery Photos (3) ──
  const gallery = await Promise.all([
    prisma.galleryPhoto.create({
      data: {
        url: '/images/gallery/field-sunset.jpg',
        alt: 'Sunset over the maize fields',
        category: 'Fields',
        displayOrder: 1,
      },
    }),
    prisma.galleryPhoto.create({
      data: {
        url: '/images/gallery/farmer.jpg',
        alt: 'Goddard at the farm gate',
        category: 'People',
        displayOrder: 2,
      },
    }),
    prisma.galleryPhoto.create({
      data: {
        url: '/images/gallery/goats.jpg',
        alt: 'Boer goats grazing',
        category: 'Livestock',
        displayOrder: 3,
      },
    }),
  ]);

  console.log(`✅ ${gallery.length} Gallery photos seeded.`);

  // ── Admin User (placeholder password hash) ──
  await prisma.adminUser.create({
    data: {
      email: 'admin@goddardprojects.co.za',
      // Builder: replace with real bcrypt hash before production.
      // For dev, compare directly: password === 'farm2026'
      passwordHash: '$2b$10$PLACEHOLDER_HASH_REPLACE_ME',
    },
  });

  console.log('✅ Admin user seeded (placeholder hash).');
  console.log('');
  console.log('🌱 Seed complete. Run `npm run dev` and visit http://localhost:3000');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Component Props & Data Shapes

**`NavBar.tsx`**  
- No external props needed.  
- Reads `FARM.name`, `FARM.shortName` from `@/lib/constants`.  
- Uses `usePathname()` from `next/navigation` to detect current route.  
- Uses `useState` for scroll-hidden toggle + `useEffect` for scroll listener.

**`Footer.tsx`**  
- No props. Reads `FARM.shortName`, `FARM.location` from constants.

**`WhatsAppFloatingButton.tsx`**  
- No props. Reads `FARM.whatsappNumber` from constants.

**`PublicLayout.tsx`**  
- Receives `{ children: React.ReactNode }`. No data fetching.

**ALGORITHM NOTES:**

1. **Scroll-aware NavBar logic** (critical — must be correct)
   ```
   const pathname = usePathname();
   const isHomePage = pathname === '/';
   const [hidden, setHidden] = useState(isHomePage);

   useEffect(() => {
     if (!isHomePage) {
       setHidden(false);
       return;
     }
     const handleScroll = () => {
       if (window.scrollY > 100) setHidden(false);
       else setHidden(true);
     };
     window.addEventListener('scroll', handleScroll, { passive: true });
     handleScroll(); // check initial state
     return () => window.removeEventListener('scroll', handleScroll);
   }, [isHomePage]);
   ```
   - NavBar styles: `sticky top-0 z-40 transition-transform duration-300`  
   - When hidden: `-translate-y-full`  
   - When visible: `translate-y-0`
   - Active link: compare `pathname === link.href`, apply `text-harvest-gold` + underline indicator.

2. **WhatsApp link**  
   - `href = \`https://wa.me/${FARM.whatsappNumber}\``  
   - `target="_blank"` + `rel="noopener noreferrer"`  
   - No message parameter needed — farm handles conversations manually.

3. **Pulse animation**  
   - A sibling `<span>` element: `absolute inset-0 rounded-full bg-forest-canopy animate-ping opacity-75`  
   - The button itself sits on top with `relative z-10`.

4. **Seed script idempotency**  
   - `deleteMany()` at top clears all seed-created rows before re-inserting.  
   - Order: children first (Vote → VotingCrop → VotingRound), then flat tables.  
   - Real user data would be preserved because it uses separate IDs — but for development this wipe-and-rebuild approach is simplest. If the Builder wants to preserve data between seeds, switch to `upsert`.

**CONTENT NOTES:**

- **Placeholder images**: All seed image paths assume folders under `public/images/`:
  - `public/images/produce/` — 6 produce photos
  - `public/images/livestock/` — 4 livestock photos
  - `public/images/vote/` — 3 crop voting photos
  - `public/images/gallery/` — 3 gallery photos
  
  The Builder should create these folders and add images. For immediate visual feedback, use placeholder URLs like:
  `https://placehold.co/400x300/261F1A/F5F0E8?text=Butternut`

- **Admin password**: The placeholder hash `$2b$10$PLACEHOLDER_HASH_REPLACE_ME` will NOT authenticate with bcrypt. During Phase 7 (Admin), the Builder must generate a real hash via `bcrypt.hashSync('farm2026', 10)` and update the seed. For development simplicity, a temporary plain-text comparison against `'farm2026'` is acceptable in the admin login route.

- **Farm constants** (from Phase 2) are used throughout — no new constants needed this phase.

**INTERFACE REMINDER:**

No new TypeScript interfaces this phase. The Builder uses:
- Prisma-generated types from Phase 3 (`ProduceItem`, `LivestockItem`, etc.)
- `FARM` constants shape from Phase 2
- Standard React types: `React.ReactNode` for `{children}`

---

## Phase 5 — Homepage Hero, Produce Grid & Livestock Grid

**SAMPLE DATA:**

No new seed data needed — Phase 4 seed already populated ProduceItem, LivestockItem, and GalleryPhoto rows. The Builder queries those tables directly.

**ALGORITHM NOTES:**

1. **HeroSection.tsx** — No logic. Pure presentational server component reading `FARM` constants. Two `<Link>` buttons from `next/link`, visually identical sizing (`px-8 py-4`, `font-heading`, `text-lg`), laid out in a flex row: `flex flex-col sm:flex-row gap-4 justify-center`. Background: `<section>` with `bg-deep-earth`, large responsive padding (`py-24 md:py-32`), centered text.

2. **GalleryPreview.tsx** — Server component with direct Prisma query:
   ```typescript
   const photos = await prisma.galleryPhoto.findMany({
     orderBy: { displayOrder: 'asc' },
     take: 3,
   });
   ```
   Each photo card: `<Link href="/contact">` wrapper, `relative overflow-hidden rounded-lg`, `group` for hover effects. Inside: `<Image>` from `next/image` with `fill` and `object-cover`. Overlay div: `absolute inset-0 bg-deep-earth/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center` with text "View Gallery →".

3. **ProduceGrid.tsx** — Server component:
   ```typescript
   const items = await prisma.produceItem.findMany({
     orderBy: { displayOrder: 'asc' },
   });
   ```
   Maps each to `<ProduceCard produce={item} />`. Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`. Section `<h2>` with `font-heading text-3xl text-harvest-gold`, gold underline accent via `after:block after:w-16 after:h-0.5 after:bg-harvest-gold after:mt-2`.

4. **ProduceCard.tsx** — Client component (`'use client'`). Accepts typed prop `{ produce: ProduceItem }`. Image uses `next/image` with `fill` inside a `relative aspect-square bg-rich-soil rounded-t-lg` container. Below image: padded body with `name` in `font-heading text-xl text-warm-cream`, `description` in `text-dusty-clay text-sm line-clamp-2`, flex row of category pill (`bg-subtle-earth text-xs rounded-full px-3 py-1 text-dusty-clay`) and seasonality badge (conditional: `bg-forest-canopy text-warm-cream` if `inSeason`, else `bg-dusty-clay/20 text-dusty-clay`).

5. **LivestockGrid.tsx** — Server component:
   ```typescript
   const items = await prisma.livestockItem.findMany({
     orderBy: { displayOrder: 'asc' },
   });
   ```
   Maps each to `<LivestockCard livestock={item} />`. Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`.

6. **LivestockCard.tsx** — Client component. Accepts typed prop `{ livestock: LivestockItem }`. Image same pattern as ProduceCard (`aspect-square`, `relative`, `fill`). Body has `name` in `font-heading text-xl`, `priceRange` in `font-semibold text-harvest-gold text-lg`, availability badge:
   - `status === 'Available'` → `bg-forest-canopy text-warm-cream`
   - `status === 'ComingSoon'` → `bg-harvest-gold text-deep-earth`
   - `status === 'Sold'` → `bg-dusty-clay/30 text-dusty-clay`
   Full card: `hover:scale-[1.02] transition-transform duration-200`. Card background: `bg-rich-soil rounded-lg overflow-hidden`.

7. **`/produce/page.tsx`** and **`/livestock/page.tsx`** — Both server components. Identical structure: main with `max-w-7xl mx-auto px-4 py-12`, then respective Grid component. No data fetching in the page — the Grid does it.

8. **`page.tsx` (homepage)** — Server component. Simply renders `<HeroSection />` followed by `<GalleryPreview />`. Both are server components so the entire homepage can be statically rendered.

**CONTENT NOTES:**

- **Gallery photos as links**: The gallery preview cards link to `/contact` (the Contact page, Phase 6). If the Builder hasn't built the Contact page yet, these links will 404 until Phase 6 is done. That's fine — it's the expected order.
- **Images use `next/image`**: All image references must use the Next.js `<Image>` component with `width`/`height` or `fill` + parent `relative`. Set `sizes` for responsive grids (e.g., `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` for 3-column produce).
- **Image fallback**: If images don't exist yet in `public/images/`, the Builder can temporarily use placeholder URLs in the seed data. The components don't need to handle missing images — the seed ensures paths exist.
- **No loading states needed**: All queries are server-side (`async` server components). No spinners, no skeletons. The page doesn't render until data is ready — which is instant with SQLite.
- **Hover effects**: ProduceCard has no hover scale (grid cards are information-dense). LivestockCard has `hover:scale-[1.02]` to invite click (even though there's no detail page — decision #4). The hover scale is purely visual delight, not a functional affordance.

**INTERFACE REMINDER:**

```typescript
// ProduceCard props
interface ProduceCardProps {
  produce: {
    id: string;
    name: string;
    description: string;
    category: string;      // "Vegetables" | "Fruits" | "Grains" | "Herbs" | "Other"
    seasonality: string;   // e.g. "Year-round", "Summer"
    inSeason: boolean;
    imageUrl: string;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

// LivestockCard props — decision #1 applied
interface LivestockCardProps {
  livestock: {
    id: string;
    name: string;
    photoUrl: string;
    priceRange: string;         // e.g. "R1,800 – R2,500"
    availabilityStatus: string; // "Available" | "ComingSoon" | "Sold"
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

// GalleryPhoto shape (from Prisma)
interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  category: string | null;
  displayOrder: number;
  createdAt: Date;
}
```

---

## Phase 2 — Design Foundation

**SAMPLE DATA:**

```typescript
// src/lib/constants.ts — exact shape the Builder should produce

export const FARM = {
  name: "Goddard Projects Farm",
  shortName: "Goddard Projects",
  tagline: "From Our Soil to Your Table",
  subTagline: "farming made better",
  establishedYear: 2007,
  location: "Manamane, Thohoyandou, Limpopo",
  whatsappNumber: "27641234567",   // [DECISION NEEDED #5 — actual farm WhatsApp number?]
  email: "info@goddardprojects.co.za",  // [DECISION NEEDED #5 — actual farm email?]
};
```

**Tailwind Color Palette (to be added to `tailwind.config.ts` under `theme.extend.colors`):**

```typescript
colors: {
  "deep-earth":     "#1A1410",   // Page background
  "rich-soil":      "#261F1A",   // Card / surface backgrounds
  "forest-canopy":  "#2D5A27",   // Primary green (buttons, links, badges)
  "forest-canopy-light": "#3F7840",  // Lighter green hover state
  "harvest-gold":   "#C8A951",   // Accent (CTAs, active nav, highlights)
  "harvest-gold-light": "#D4AF37",   // Lighter gold variant
  "warm-cream":     "#F5F0E8",   // Body text on dark
  "dusty-clay":     "#A89880",   // Muted / secondary text
  "subtle-earth":   "#3A3228",   // Borders / dividers
}
```

```typescript
fontFamily: {
  heading: ["'Playfair Display'", "serif"],
  body:    ["'DM Sans'", "sans-serif"],
}
```

**ALGORITHM NOTES:** None. This phase is pure styling — no logic.

**CONTENT NOTES:**

- **Google Fonts `@import`** (to place at top of `globals.css`):  
  `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');`
- **CSS `@layer base`** should set: `html { background-color: #1A1410; } body { color: #F5F0E8; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; min-height: 100vh; }`
- The test page (`page.tsx`) should use Tailwind utility classes only: `bg-deep-earth text-warm-cream font-heading font-body` etc. Verify every token from the palette renders as a visible swatch or text block.
- **Playfair Display** is for headings only (`.font-heading`). **DM Sans** is body default (`.font-body`). The Builder sets DM Sans as the default on `<body>` and uses `.font-heading` on `h1`–`h4` elements.

**INTERFACE REMINDER:**

```typescript
// The constants module shape — no other interfaces needed this phase
interface FarmInfo {
  name: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  establishedYear: number;
  location: string;
  whatsappNumber: string;  // full international, no spaces, e.g. "27641234567"
  email: string;
}
```

---

## Phase 6 — Contact Page, Voting Section & Newsletter

**SAMPLE DATA:**

No new seed data. All three features write to tables already seeded in Phase 4: `ContactMessage`, `Vote`, `VotingRound`, `VotingCrop`, `Subscriber`.

The Voting query result shape:
```typescript
// Returned by VotingSection server component — crops with aggregated vote count
type VotingCropWithCount = {
  id: string;
  name: string;
  photoUrl: string | null;
  _count: { votes: number };
};
```

**ALGORITHM NOTES:**

### 1. `ContactForm.tsx` — Controlled form with validation

```
State:
  name: string
  email: string
  phone: string
  message: string
  status: 'idle' | 'submitting' | 'success' | 'error'
  errorMessage: string

On submit:
  1. Client-side validation:
     - name.trim() === '' → error: 'Name is required.'
     - !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) → error: 'Valid email required.'
     - message.trim() === '' → error: 'Message is required.'
  2. If valid → set status='submitting' → call submitContact(formData)
  3. On success → set status='success', clear all fields
  4. On error → set status='error', set errorMessage from server response

UI states:
  - idle: normal form layout, dark inputs (bg-rich-soil border-subtle-earth text-warm-cream)
  - submitting: button disabled, shows 'Sending...' spinner
  - success: green banner above form 'Message sent! We'll get back to you soon.'
  - error: red banner above form with error message
```

Input styling reference — all inputs share:
- `w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors`
- `<textarea>` for message, `<input>` for name/email/phone.

### 2. `submitContact` — Server Action (`src/app/actions/contact.ts`)

```typescript
'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitContact(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string || null;
  const message = formData.get('message') as string;

  // Server-side validation (defense against bypassing client validation)
  if (!name || !name.trim()) return { success: false, error: 'Name is required.' };
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return { success: false, error: 'Valid email required.' };
  if (!message || !message.trim()) return { success: false, error: 'Message is required.' };

  try {
    await prisma.contactMessage.create({
      data: { name: name.trim(), email: email.trim(), phone: phone?.trim() || null, message: message.trim() },
    });
    revalidatePath('/contact');
    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
```

### 3. `VotingBallot.tsx` — Multi-select voting with email gate

```
Props: { crops: VotingCropWithCount[] }

State:
  selectedCropIds: Set<string>
  email: string
  status: 'idle' | 'voting' | 'already-voted' | 'success' | 'error'
  errorMessage: string

On submit:
  1. Validate email format
  2. Validate selectedCropIds.size > 0 → 'Select at least one crop.'
  3. Call submitVote({ email, votingRoundId: crops[0]?.votingRoundId, cropIds: [...selectedCropIds] })
  4. On success → status='success'
  5. On 'already-voted' → status='already-voted'
  6. On server error → status='error'

Checkbox rendering:
  - Each crop row: checkbox + crop name + vote count badge
  - Checkbox: custom styled — `appearance-none w-5 h-5 border-2 border-harvest-gold rounded checked:bg-harvest-gold checked:border-harvest-gold`
  - vote count: `bg-rich-soil text-dusty-clay text-xs px-2 py-0.5 rounded-full`

UI states:
  - idle: checkboxes + email input + 'Cast Vote' button
  - voting: button disabled, 'Voting...'
  - success: replaced by 'Thanks for voting!' + current tallies shown
  - already-voted: 'You've already voted this round. Thanks for participating!'
  - error: red error banner
```

### 4. `submitVote` — Server Action (`src/app/actions/voting.ts`)

```typescript
'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface SubmitVoteInput {
  email: string;
  votingRoundId: string;
  cropIds: string[];
}

export async function submitVote(input: SubmitVoteInput): Promise<{ success: boolean; error?: string; votesCast?: number }> {
  const { email, votingRoundId, cropIds } = input;

  // Validate
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return { success: false, error: 'Valid email required.' };
  if (!cropIds || cropIds.length === 0) return { success: false, error: 'Select at least one crop.' };
  if (!votingRoundId) return { success: false, error: 'No active voting round.' };

  // One-ballot rule: check ANY vote by this email in this round
  const alreadyVoted = await prisma.vote.findFirst({
    where: { email, votingRoundId },
  });
  if (alreadyVoted) return { success: false, error: 'You have already voted this round.' };

  try {
    // Atomic: all votes inserted or none
    await prisma.$transaction(
      cropIds.map(cropId =>
        prisma.vote.create({
          data: { email, votingRoundId, votingCropId: cropId },
        })
      )
    );
    revalidatePath('/contact');
    return { success: true, votesCast: cropIds.length };
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
```

### 5. `NewsletterForm.tsx` — Simple email capture

```
State:
  email: string
  status: 'idle' | 'submitting' | 'success' | 'already-subscribed' | 'error'
  errorMessage: string

On submit:
  1. Validate email format
  2. Call subscribeEmail(email)
  3. On success → status='success'
  4. On duplicate → status='already-subscribed'
  5. On error → status='error'

Layout: inline row — email input + 'Subscribe' button side by side on desktop, stacked on mobile.
```

### 6. `subscribeEmail` — Server Action (`src/app/actions/newsletter.ts`)

```typescript
'use server';
import { prisma } from '@/lib/prisma';

export async function subscribeEmail(email: string): Promise<{ success: boolean; error?: string; isDuplicate?: boolean }> {
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return { success: false, error: 'Valid email required.' };

  try {
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (existing) {
      if (existing.status === 'Active') {
        return { success: false, isDuplicate: true, error: 'Already subscribed.' };
      }
      // Reactivate if previously unsubscribed
      await prisma.subscriber.update({ where: { email }, data: { status: 'Active' } });
      return { success: true };
    }

    await prisma.subscriber.create({ data: { email } });
    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong.' };
  }
}
```

### 7. `VotingSection.tsx` — Server component data fetch

```typescript
const activeRound = await prisma.votingRound.findFirst({
  where: { isActive: true },
  include: {
    crops: {
      orderBy: { name: 'asc' },
      include: { _count: { select: { votes: true } } },
    },
  },
});
```
If no active round → show fallback: "No active voting round right now. Check back soon!"

### 8. `/contact/page.tsx` — Page layout

Three `<section>` blocks, each with:
- `<h2>` heading with gold underline accent (like ProduceGrid heading)
- `<p>` subtitle in `text-dusty-clay`
- Respective component

Sections separated by `border-t border-subtle-earth` or generous padding.

Order: ContactForm → VotingSection → NewsletterForm (top to bottom).

**CONTENT NOTES:**

- **Contact form subtitle**: "We'd love to hear from you. Send us a message and we'll get back to you."
- **Voting section subtitle**: "Help us decide what to plant next! Select your favourites below."
- **Newsletter subtitle**: "Stay in the loop. Get farm updates, seasonal produce alerts, and news straight to your inbox."
- **Form labels**: visible above each input in `font-body text-sm text-warm-cream/80`.
- **Form placeholder text**: use `text-dusty-clay` (e.g., "Your name", "you@example.com", "Your message...").
- **Button text**: Contact: "Send Message", Voting: "Cast Vote", Newsletter: "Subscribe".
- **Success messages**: green text (`text-forest-canopy`) with subtle green background (`bg-forest-canopy/10`).
- **Error messages**: red/warm tone — use `text-red-400 bg-red-400/10`.

**INTERFACE REMINDER:**

```typescript
// ContactForm server action signature
interface ContactFormResult {
  success: boolean;
  error?: string;
}

// Voting server action input and result
interface SubmitVoteInput {
  email: string;
  votingRoundId: string;
  cropIds: string[];
}

interface VoteResult {
  success: boolean;
  error?: string;
  votesCast?: number;
}

// Newsletter server action result
interface NewsletterResult {
  success: boolean;
  error?: string;
  isDuplicate?: boolean;
}

// Crop with vote count (from VotingSection query)
interface VotingCropWithCount {
  id: string;
  name: string;
  photoUrl: string | null;
  _count: { votes: number };
}

// VotingRound with crops (from VotingSection query)
interface ActiveRoundWithCrops {
  id: string;
  title: string;
  description: string | null;
  isActive: boolean;
  startDate: Date;
  endDate: Date | null;
  crops: VotingCropWithCount[];
  votes?: Vote[];
}
```

---

## Phase 8 — Admin CRUD

**SAMPLE DATA:**

None new — all CRUD operations work on the existing Phase 4 seed data. The Builder tests by adding/editing/deleting records via the UI.

**ALGORITHM NOTES:**

### 1. Tab system — `AdminDashboard.tsx`

```typescript
// src/components/admin/AdminDashboard.tsx
'use client';

import { useState } from 'react';
import { MessagesPanel } from '@/components/admin/MessagesPanel';
import { VotingPanel } from '@/components/admin/VotingPanel';
import { ProduceManager } from '@/components/admin/ProduceManager';
import { LivestockManager } from '@/components/admin/LivestockManager';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { SubscriberExport } from '@/components/admin/SubscriberExport';

type Tab = 'messages' | 'voting' | 'produce' | 'livestock' | 'gallery' | 'subscribers';

const TABS: { key: Tab; label: string }[] = [
  { key: 'messages', label: 'Messages' },
  { key: 'voting', label: 'Voting' },
  { key: 'produce', label: 'Produce' },
  { key: 'livestock', label: 'Livestock' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'subscribers', label: 'Subscribers' },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('messages');

  return (
    <div>
      {/* Tab bar */}
      <nav className="flex gap-1 border-b border-subtle-earth mb-6 overflow-x-auto" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-harvest-gold text-harvest-gold'
                : 'border-transparent text-dusty-clay hover:text-warm-cream'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Active panel */}
      <div role="tabpanel">
        {activeTab === 'messages' && <MessagesPanel />}
        {activeTab === 'voting' && <VotingPanel />}
        {activeTab === 'produce' && <ProduceManager />}
        {activeTab === 'livestock' && <LivestockManager />}
        {activeTab === 'gallery' && <GalleryManager />}
        {activeTab === 'subscribers' && <SubscriberExport />}
      </div>
    </div>
  );
}
```

### 2. `src/app/admin/page.tsx` — Updated for Phase 8

```typescript
// src/app/admin/page.tsx
// Updated — replaces 3-panel grid with tabbed AdminDashboard.

import { redirect } from 'next/navigation';
import { getAdminFromCookies } from '@/lib/auth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  const isAuthenticated = await getAdminFromCookies();
  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
```

### 3. `src/app/actions/admin/messages.ts`

```typescript
// src/app/actions/admin/messages.ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

interface ActionResult {
  success: boolean;
  error?: string;
}

async function guard(): Promise<boolean> {
  const ok = await getAdminFromCookies();
  return ok;
}

export async function markMessageAsRead(messageId: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  try {
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to update message.' };
  }
}
```

### 4. `src/app/actions/admin/voting.ts`

```typescript
// src/app/actions/admin/voting.ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

interface ActionResult {
  success: boolean;
  error?: string;
  roundId?: string;
  cropId?: string;
}

async function guard(): Promise<boolean> {
  return await getAdminFromCookies();
}

export async function createVotingRound(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  const title = formData.get('title')?.toString().trim();
  const description = formData.get('description')?.toString().trim() || null;
  const cropNames = formData.getAll('cropNames[]').map((c) => c.toString().trim()).filter(Boolean);

  if (!title) return { success: false, error: 'Round title is required.' };
  if (cropNames.length === 0) return { success: false, error: 'Add at least one crop.' };

  try {
    // Deactivate any currently active round
    await prisma.votingRound.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    const round = await prisma.votingRound.create({
      data: {
        title,
        description,
        isActive: true,
        crops: {
          create: cropNames.map((name) => ({ name })),
        },
      },
    });

    revalidatePath('/admin');
    revalidatePath('/contact');
    return { success: true, roundId: round.id };
  } catch {
    return { success: false, error: 'Failed to create voting round.' };
  }
}

export async function toggleVotingRound(roundId: string, setActive: boolean): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  try {
    // If activating, deactivate all others first
    if (setActive) {
      await prisma.votingRound.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }

    await prisma.votingRound.update({
      where: { id: roundId },
      data: { isActive: setActive },
    });

    revalidatePath('/admin');
    revalidatePath('/contact');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to update round.' };
  }
}

export async function addCrop(roundId: string, name: string, photoUrl?: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  if (!name.trim()) return { success: false, error: 'Crop name is required.' };

  try {
    const crop = await prisma.votingCrop.create({
      data: { votingRoundId: roundId, name: name.trim(), photoUrl: photoUrl || null },
    });
    revalidatePath('/admin');
    revalidatePath('/contact');
    return { success: true, cropId: crop.id };
  } catch {
    return { success: false, error: 'Failed to add crop.' };
  }
}

export async function removeCrop(cropId: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  try {
    await prisma.votingCrop.delete({ where: { id: cropId } });
    revalidatePath('/admin');
    revalidatePath('/contact');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to remove crop.' };
  }
}
```

### 5. `src/app/actions/admin/produce.ts`

```typescript
// src/app/actions/admin/produce.ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

interface ActionResult {
  success: boolean;
  error?: string;
}

async function guard() { return await getAdminFromCookies(); }

export async function createProduce(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const category = formData.get('category')?.toString().trim() || 'Vegetables';
  const seasonality = formData.get('seasonality')?.toString().trim() || 'Year-round';
  const inSeason = formData.get('inSeason') === 'true';
  const imageUrl = formData.get('imageUrl')?.toString().trim();
  const displayOrder = parseInt(formData.get('displayOrder')?.toString() || '0', 10);

  if (!name || !description || !imageUrl) {
    return { success: false, error: 'Name, description, and image URL are required.' };
  }

  try {
    await prisma.produceItem.create({
      data: { name, description, category, seasonality, inSeason, imageUrl, displayOrder },
    });
    revalidatePath('/admin');
    revalidatePath('/produce');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to create produce item.' };
  }
}

export async function updateProduce(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  const id = formData.get('id')?.toString();
  if (!id) return { success: false, error: 'Missing item ID.' };

  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const category = formData.get('category')?.toString().trim();
  const seasonality = formData.get('seasonality')?.toString().trim();
  const inSeason = formData.get('inSeason') === 'true';
  const imageUrl = formData.get('imageUrl')?.toString().trim();
  const displayOrder = parseInt(formData.get('displayOrder')?.toString() || '0', 10);

  if (!name || !description || !imageUrl) {
    return { success: false, error: 'Name, description, and image URL are required.' };
  }

  try {
    await prisma.produceItem.update({
      where: { id },
      data: { name, description, category, seasonality, inSeason, imageUrl, displayOrder },
    });
    revalidatePath('/admin');
    revalidatePath('/produce');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to update produce item.' };
  }
}

export async function deleteProduce(id: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  try {
    await prisma.produceItem.delete({ where: { id } });
    revalidatePath('/admin');
    revalidatePath('/produce');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete produce item.' };
  }
}
```

### 6. `src/app/actions/admin/livestock.ts`

```typescript
// src/app/actions/admin/livestock.ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

interface ActionResult {
  success: boolean;
  error?: string;
}

async function guard() { return await getAdminFromCookies(); }

export async function createLivestock(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  const name = formData.get('name')?.toString().trim();
  const photoUrl = formData.get('photoUrl')?.toString().trim();
  const priceRange = formData.get('priceRange')?.toString().trim();
  const availabilityStatus = formData.get('availabilityStatus')?.toString().trim() || 'Available';
  const displayOrder = parseInt(formData.get('displayOrder')?.toString() || '0', 10);

  if (!name || !photoUrl || !priceRange) {
    return { success: false, error: 'Name, photo URL, and price range are required.' };
  }

  try {
    await prisma.livestockItem.create({
      data: { name, photoUrl, priceRange, availabilityStatus, displayOrder },
    });
    revalidatePath('/admin');
    revalidatePath('/livestock');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to create livestock item.' };
  }
}

export async function updateLivestock(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  const id = formData.get('id')?.toString();
  if (!id) return { success: false, error: 'Missing item ID.' };

  const name = formData.get('name')?.toString().trim();
  const photoUrl = formData.get('photoUrl')?.toString().trim();
  const priceRange = formData.get('priceRange')?.toString().trim();
  const availabilityStatus = formData.get('availabilityStatus')?.toString().trim();
  const displayOrder = parseInt(formData.get('displayOrder')?.toString() || '0', 10);

  if (!name || !photoUrl || !priceRange) {
    return { success: false, error: 'Name, photo URL, and price range are required.' };
  }

  try {
    await prisma.livestockItem.update({
      where: { id },
      data: { name, photoUrl, priceRange, availabilityStatus, displayOrder },
    });
    revalidatePath('/admin');
    revalidatePath('/livestock');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to update livestock item.' };
  }
}

export async function deleteLivestock(id: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  try {
    await prisma.livestockItem.delete({ where: { id } });
    revalidatePath('/admin');
    revalidatePath('/livestock');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete livestock item.' };
  }
}
```

### 7. `src/app/actions/admin/gallery.ts`

```typescript
// src/app/actions/admin/gallery.ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

interface ActionResult {
  success: boolean;
  error?: string;
}

async function guard() { return await getAdminFromCookies(); }

export async function createPhoto(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  const url = formData.get('url')?.toString().trim();
  const alt = formData.get('alt')?.toString().trim();
  const category = formData.get('category')?.toString().trim() || null;
  const displayOrder = parseInt(formData.get('displayOrder')?.toString() || '0', 10);

  if (!url || !alt) {
    return { success: false, error: 'URL and alt text are required.' };
  }

  try {
    await prisma.galleryPhoto.create({
      data: { url, alt, category, displayOrder },
    });
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to add photo.' };
  }
}

export async function deletePhoto(id: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };

  try {
    await prisma.galleryPhoto.delete({ where: { id } });
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete photo.' };
  }
}
```

### 8. `src/app/actions/admin/subscribers.ts`

```typescript
// src/app/actions/admin/subscribers.ts
'use server';

import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

interface ExportResult {
  success: boolean;
  error?: string;
  csv?: string;
}

export async function exportSubscribers(): Promise<ExportResult> {
  if (!(await getAdminFromCookies())) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const subscribers = await prisma.subscriber.findMany({
      where: { status: 'Active' },
      orderBy: { subscribedAt: 'desc' },
    });

    // Build CSV string
    const header = 'email,status,subscribedAt';
    const rows = subscribers.map((s) => `"${s.email}","${s.status}","${s.subscribedAt.toISOString()}"`);
    const csv = [header, ...rows].join('\n');

    return { success: true, csv };
  } catch {
    return { success: false, error: 'Failed to export subscribers.' };
  }
}
```

### 9. `src/components/admin/ProduceManager.tsx` — Client CRUD

```typescript
// src/components/admin/ProduceManager.tsx
'use client';

import { useState, useActionState } from 'react';
import { createProduce, updateProduce, deleteProduce } from '@/app/actions/admin/produce';

interface ProduceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  seasonality: string;
  inSeason: boolean;
  imageUrl: string;
  displayOrder: number;
}

interface Props {
  items: ProduceItem[];
}

export function ProduceManager({ items }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Server actions with useActionState for the forms
  const [addState, addAction] = useActionState(createProduce, { success: false });
  const [editState, editAction] = useActionState(updateProduce, { success: false });

  // Reset forms on success
  if (addState.success) { /* form resets via key change */ }

  async function handleDelete(id: string) {
    await deleteProduce(id);
    setDeleteConfirm(null);
  }

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl text-harvest-gold">Produce Manager</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-forest-canopy text-white text-sm rounded-lg hover:bg-forest-canopy/80 transition-colors"
        >
          {showAddForm ? 'Cancel' : '+ Add New'}
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <form action={addAction} className="mb-6 p-4 bg-subtle-earth rounded-lg space-y-3" key="add">
          <input name="name" placeholder="Name" required className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <input name="description" placeholder="Description" required className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <div className="grid grid-cols-2 gap-3">
            <input name="category" placeholder="Category (Vegetables)" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
            <input name="seasonality" placeholder="Seasonality (Summer)" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="imageUrl" placeholder="Image URL" required className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
            <input name="displayOrder" type="number" placeholder="Display order" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          </div>
          <label className="flex items-center gap-2 text-sm text-warm-cream">
            <input type="checkbox" name="inSeason" value="true" defaultChecked className="rounded" />
            In season
          </label>
          <button type="submit" className="px-4 py-2 bg-harvest-gold text-deep-earth font-semibold rounded-lg">Save</button>
          {addState.error && <p className="text-red-400 text-sm">{addState.error}</p>}
        </form>
      )}

      {/* Items table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-subtle-earth text-dusty-clay text-xs uppercase">
              <th className="pb-2 pr-2">Name</th>
              <th className="pb-2 pr-2">Category</th>
              <th className="pb-2 pr-2">Season</th>
              <th className="pb-2 pr-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-subtle-earth/50">
                <td className="py-2 pr-2 text-warm-cream">{item.name}</td>
                <td className="py-2 pr-2 text-dusty-clay">{item.category}</td>
                <td className="py-2 pr-2 text-dusty-clay">{item.seasonality}</td>
                <td className="py-2 pr-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.inSeason ? 'bg-forest-canopy/20 text-forest-canopy' : 'bg-dusty-clay/20 text-dusty-clay'}`}>
                    {item.inSeason ? 'In Season' : 'Out'}
                  </span>
                </td>
                <td className="py-2 space-x-2">
                  <button onClick={() => setEditingId(item.id)} className="text-harvest-gold text-xs hover:underline">Edit</button>
                  {deleteConfirm === item.id ? (
                    <>
                      <button onClick={() => handleDelete(item.id)} className="text-red-400 text-xs hover:underline">Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-dusty-clay text-xs hover:underline">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(item.id)} className="text-red-400 text-xs hover:underline">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### 10. `src/components/admin/GalleryManager.tsx` — Photo grid + add/delete

```typescript
// src/components/admin/GalleryManager.tsx
'use client';

import { useState, useActionState } from 'react';
import { createPhoto, deletePhoto } from '@/app/actions/admin/gallery';
import Image from 'next/image';

interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  category: string | null;
  displayOrder: number;
}

interface Props {
  photos: GalleryPhoto[];
}

export function GalleryManager({ photos }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addState, addAction] = useActionState(createPhoto, { success: false });

  async function handleDelete(id: string) {
    await deletePhoto(id);
  }

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl text-harvest-gold">Gallery</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-forest-canopy text-white text-sm rounded-lg hover:bg-forest-canopy/80"
        >
          {showAddForm ? 'Cancel' : '+ Add Photo'}
        </button>
      </div>

      {showAddForm && (
        <form action={addAction} className="mb-6 p-4 bg-subtle-earth rounded-lg space-y-3" key="add-photo">
          <input name="url" placeholder="Image URL" required className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <input name="alt" placeholder="Alt text" required className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <div className="grid grid-cols-2 gap-3">
            <input name="category" placeholder="Category (Fields, People, Livestock)" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
            <input name="displayOrder" type="number" placeholder="Display order" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          </div>
          <button type="submit" className="px-4 py-2 bg-harvest-gold text-deep-earth font-semibold rounded-lg">Add</button>
          {addState.error && <p className="text-red-400 text-sm">{addState.error}</p>}
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group bg-subtle-earth rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt={photo.alt} className="w-full h-32 object-cover" />
            <div className="p-2">
              <p className="text-xs text-dusty-clay truncate">{photo.alt}</p>
              {photo.category && <p className="text-xs text-harvest-gold">{photo.category}</p>}
            </div>
            <button
              onClick={() => handleDelete(photo.id)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete photo"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 11. `src/components/admin/LivestockManager.tsx` — Pattern identical to ProduceManager

The Builder follows the exact same pattern as `ProduceManager.tsx` but with livestock fields: `name`, `photoUrl`, `priceRange`, `availabilityStatus` (dropdown: Available / ComingSoon / Sold), `displayOrder`. Server actions imported from `@/app/actions/admin/livestock`.

### 12. `src/components/admin/SubscriberExport.tsx`

```typescript
// src/components/admin/SubscriberExport.tsx
'use client';

import { useState } from 'react';
import { exportSubscribers } from '@/app/actions/admin/subscribers';

interface Props {
  activeCount: number;
  unsubscribedCount: number;
}

export function SubscriberExport({ activeCount, unsubscribedCount }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleExport() {
    setIsLoading(true);
    try {
      const result = await exportSubscribers();
      if (result.success && result.csv) {
        // Trigger download
        const blob = new Blob([result.csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <h2 className="font-heading text-xl text-harvest-gold mb-4">Newsletter Subscribers</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-subtle-earth rounded-lg p-4 text-center">
          <p className="text-3xl font-heading text-forest-canopy">{activeCount}</p>
          <p className="text-xs text-dusty-clay mt-1">Active</p>
        </div>
        <div className="bg-subtle-earth rounded-lg p-4 text-center">
          <p className="text-3xl font-heading text-dusty-clay">{unsubscribedCount}</p>
          <p className="text-xs text-dusty-clay mt-1">Unsubscribed</p>
        </div>
      </div>

      <button
        onClick={handleExport}
        disabled={isLoading || activeCount === 0}
        className="w-full py-3 bg-harvest-gold text-deep-earth font-semibold rounded-lg hover:bg-harvest-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Exporting...' : `Export ${activeCount} Active Subscribers as CSV`}
      </button>
    </div>
  );
}
```

### 13. Updated `MessagesPanel` — Mark Read + expand

The Builder edits the Phase 7 `MessagesPanel` server component to:
- Add a `MarkReadButton` client sub-component that calls `markMessageAsRead(messageId)`.
- Add `useState` expand toggle per row (or a separate `MessageRow` client component).
- The panel remains a server component that fetches messages, but each row is extracted to a `'use client'` component for interactivity.

### 14. Updated `VotingPanel` — Inline CRUD

The Builder refactors the Phase 7 `VotingPanel` into a hybrid: server fetches rounds, passes to a `VotingManager` client component. The client component handles:
- "New Round" button → inline form calling `createVotingRound`
- Close/Reopen toggle per round calling `toggleVotingRound`
- "+ Add Crop" inline input + button calling `addCrop`
- "✕" per crop calling `removeCrop`

### 15. Guardians — All admin server actions

Every Admin CRUD server action must call `await getAdminFromCookies()` and return `{ success: false, error: 'Unauthorized' }` if false. The pattern is established in the messages/produce/livestock/gallery/voting actions above. The Builder copies this guard block to every new action.

**CONTENT NOTES:**

- The Tab bar uses `overflow-x-auto` for small screens — all 6 tabs scroll horizontally if needed.
- Delete operations use a two-step confirm pattern (click Delete → Confirm/Cancel appears). No accidental deletions.
- `revalidatePath` is called on both `/admin` (dashboard) and the public route (`/produce`, `/livestock`, `/`, `/contact`) so changes are visible immediately to visitors.
- CSV export generates the file client-side via Blob + temporary `<a>` download. No server-side file needed.
- Image previews in Gallery use a plain `<img>` tag (not Next.js `<Image>`) for simplicity with arbitrary URLs.
- The `LivestockManager` is the Builder's responsibility to implement following the `ProduceManager` pattern — the fields differ (no description, add priceRange + availabilityStatus dropdown) but the structure is identical.

**INTERFACE REMINDER:**

```typescript
// ActionResult — returned by every admin server action
interface ActionResult {
  success: boolean;
  error?: string;
  roundId?: string;   // from createVotingRound
  cropId?: string;    // from addCrop
}

// ExportResult — from exportSubscribers
interface ExportResult {
  success: boolean;
  error?: string;
  csv?: string;       // raw CSV content
}

// The admin dashboard page now receives no data — AdminDashboard is a client component
// that conditionally renders panels. Each panel fetches its own data (server components
// as children of client components, or via props from a wrapper server component).
//
// For panels that need server data (ProduceManager, GalleryManager, SubscriberExport),
// the Builder should create thin server-component wrappers that fetch data and pass
// it as props to the client component. Example:
//
// src/components/admin/ProduceManagerWrapper.tsx (server)
//   → fetches prisma.produceItem.findMany()
//   → renders <ProduceManager items={items} />
//
// Same pattern for GalleryManagerWrapper and SubscriberExportWrapper.
```

---


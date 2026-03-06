# ⚿ Wonderlibrary

A premium dark literary web app for cataloguing, discovering, and living inside your book collection — built with a Dark Academia aesthetic and a fully interactive 3D bookshelf.

---

## What Is This?

**Wonderlibrary** is a personal library management app where readers can search millions of books via Open Library, build their private collection, track reading status, write personal notes, and rate every volume they've touched.

The experience is designed to feel like stepping into a gothic reading room: warm amber lighting, serif typography, animated 3D bookshelves, and an interface that treats books as objects worth revering.

---

## Features

📚 **Personal collection** — add any book from the Open Library catalogue to your private library, track status (`To Read`, `Reading`, `Read`), give star ratings, and write personal notes up to 500 characters

🔍 **Search millions of books** — search by title or author across the Open Library database (no API key required), with infinite scroll pagination

🏛️ **3D bookshelf** — an interactive Three.js bookshelf renders your actual collection with real cover textures, ambient lighting, and hover/click animations; click a book to bring it forward and open it

🎴 **Grid view** — responsive card grid with cover images, status badges, and star ratings; filterable by status and rating

🔎 **Collection search & filters** — search within your own library, filter by reading status and star rating simultaneously

👤 **Profiles with avatar picker** — choose from 10 illustrated avatars, set a display name, view reading stats

🔐 **Authentication** — email/password and Google OAuth via Supabase Auth, with protected routes and server-side session validation

🌗 **Dark Academia theme** — custom design system with Playfair Display serifs, warm amber/terracotta palette, Framer Motion page transitions, and a live 3D particle scene on the landing page

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, Server Components) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| 3D | React Three Fiber + Three.js + @react-three/drei |
| State | Zustand |
| Data fetching | TanStack Query v5 |
| Auth & Database | Supabase (PostgreSQL + Auth + RLS) |
| Book data | Open Library API (free, no key required) |
| Avatars | DiceBear API |
| Hosting | Vercel |

---

## Architecture

The project is a **Turborepo monorepo** with strict package boundaries:

```
/
├── apps/
│   └── web/                    → Next.js 14 application
│       ├── app/                → Routes (App Router)
│       │   ├── (app)/          → Authenticated routes
│       │   │   ├── collection/ → Personal library + 3D shelf
│       │   │   ├── book/[id]/  → Book detail + review
│       │   │   ├── search/     → Open Library search
│       │   │   └── profile/    → User profile + avatar
│       │   └── auth/           → Login, register, OAuth callback
│       ├── components/         → UI components
│       │   ├── book/           → BookCard, AddToCollectionButton, BookReview
│       │   ├── collection/     → CollectionGrid, CollectionFilters, CollectionSearch
│       │   ├── shelf/          → BookShelf3D, LandingScene3D (React Three Fiber)
│       │   ├── layout/         → Navbar, BottomNav, Footer
│       │   └── ui/             → SkeletonCard, StarRating, NoteEditor, Toast, EmptyState
│       ├── hooks/              → useCollection, useBookSearch, useBookDetail
│       ├── store/              → Zustand UI store (filters, view mode, search)
│       └── lib/                → Supabase clients, motion variants
├── packages/
│   ├── core/                   → Shared types, models, mappers (BookSummary, CollectionEntry)
│   ├── ui/                     → Shared design system primitives
│   └── api-client/             → Open Library API wrapper
```

**Key principles:**

- Server Components fetch data; Client Components handle interaction
- Supabase RLS enforces ownership at the database level; the app also adds explicit `user_id` filters on every query as defence in depth
- All external API calls are proxied through Next.js API Routes so server-only fetch options work correctly

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- A Supabase project

### Installation

```bash
git clone https://github.com/renanbotasse/wonderlibrary
cd wonderlibrary
pnpm install
```

### Environment variables

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Open Library works without any API key.

### Supabase setup

Run the following SQL in your Supabase SQL editor:

```sql
-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamptz
);

alter table profiles enable row level security;
create policy "Users manage own profile"
  on profiles for all using (auth.uid() = id);

-- Collection table
create table collection (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  google_book_id text not null,
  title text not null,
  author text,
  cover_url text,
  status text not null default 'to_read',
  rating int,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table collection enable row level security;
create policy "Users manage own collection"
  on collection for all using (auth.uid() = user_id);
```

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — animated 3D particle scene, feature highlights |
| `/search` | Search Open Library by title or author, paginated results |
| `/book/[id]` | Book detail — description, metadata, add to collection, rating and notes |
| `/collection` | Personal library — grid or 3D shelf, filters by status and rating, search |
| `/profile` | User profile — avatar picker, name, reading stats, sign out |
| `/auth/login` | Sign in with email/password or Google |
| `/auth/register` | Create account |

---

## Security

- **RLS enforced** at database level — users can only read and write their own data
- **Explicit `user_id` filters** on every Supabase query as defence in depth
- **Open redirect protection** on OAuth callback — `next` parameter validated against a whitelist
- **Secrets never committed** — `.env.local` is in `.gitignore` (verified against git history)
- **No `dangerouslySetInnerHTML`** anywhere in the codebase
- **Image domain whitelist** in `next.config.mjs`

---

## Roadmap

### V2 — Social
- [ ] Public reading profiles
- [ ] Book recommendations based on collection
- [ ] Reading goals and yearly challenges

### V3 — Intelligence
- [ ] AI-generated book summaries and reading insights
- [ ] "Books like this" recommendations
- [ ] Reading statistics and heatmaps

---

## Author

Built by **Renan Botasse**

- [GitHub](https://github.com/renanbotasse)
- [LinkedIn](https://www.linkedin.com/in/renanbotasse/)
- [HackerNoon](https://hackernoon.com/u/renanb)

---

## License

MIT

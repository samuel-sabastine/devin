# Haven — dynamic real estate website

Full-stack real estate listings site: server-rendered search with filtering, listing detail pages with photo gallery and map, and a contact-agent form that persists inquiries.

## Stack

- Next.js 15 (App Router, Server Components, Server Actions) + TypeScript
- PostgreSQL + Prisma ORM
- Tailwind CSS v4
- Leaflet + OpenStreetMap tiles (no API key required)
- Zod for search-param and form validation

## Getting started

```bash
npm install
cp .env.example .env          # point DATABASE_URL at your Postgres instance
npx prisma migrate dev        # create the schema
npm run db:seed               # 3 agents, 18 listings with photos
npm run dev                   # http://localhost:3000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run db:migrate` | Create and apply a migration |
| `npm run db:seed` | Reseed demo data |
| `npm run db:reset` | Drop, re-migrate and reseed |

## Structure

```
prisma/schema.prisma      Agent, Listing, ListingImage, Inquiry models
prisma/seed.ts            Demo data
src/lib/filters.ts        Zod search-param parsing -> Prisma where/orderBy
src/lib/queries.ts        Data access (search, featured, cities, detail)
src/app/listings          Search results page and detail page
src/app/actions/inquiry.ts  Server action for contact-agent submissions
src/components/map        Leaflet map, client-only via dynamic import
```

Filters live entirely in the URL (`/listings?city=Austin&type=CONDO&minPrice=500000&sort=price_asc`), so every search is shareable, bookmarkable and server-rendered.

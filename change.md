2025-08-11 - Frontend scaffold and basic UI shell
- Setup Next.js (App Router) TypeScript app in `web` with Tailwind v4.
- Installed FullCalendar and added `src/components/Timeline.tsx` with client wrapper `TimelineClient`.
- Integrated a simple UI kit (button, card) and top navigation `TopNav`.
- Wired `TopNav` in `src/app/layout.tsx` and embedded `Timeline` on the home page.
- Replaced default Next.js landing with Tou doux hero + quick start form and timeline embed; updated site metadata.
- Moved Desired task count after 5‑phase roadmap and added right-side AI chat panel.
- Added QuickStart with 100-char minimum goal; moved timeline to dedicated /timeline route with modern container; TopNav opens it in a new window.
- Added routes `plan` and `notes`; wired a placeholder planner flow using zustand and a simple generator; Plan page can generate and list placeholder tasks.
- Added `settings` page with API key field persisted to localStorage via zustand; added Settings to top nav.
- Verified production build (`npm run build`) succeeds.

Key files:
- `web/src/app/layout.tsx`
- `web/src/app/page.tsx`
- `web/src/components/Timeline.tsx`
- `web/src/components/TimelineClient.tsx`
- `web/src/components/TopNav.tsx`
- `web/src/components/ui/button.tsx`
- `web/src/components/ui/card.tsx`
- `web/src/lib/utils.ts`

2025-08-11 - OpenRouter integration (AI plan generation)
- Added OpenRouter client and server integration that generates tasks when an API key is supplied.
- API key is read from request header `x-user-api-key` (preferred) or `OPENROUTER_API_KEY` env. Client sends the key from Settings.
- Quick Start now calls `/api/plan/generate` with inputs; falls back to placeholder if AI fails.

Key files:
- `web/src/lib/openrouter.ts`
- `web/src/app/api/plan/generate/route.ts`
- `web/src/components/QuickStart.tsx`

Env/config:
- Optional: `OPENROUTER_API_KEY` for server-side default.
- Optional: `OPENROUTER_MODEL` (defaults to `openrouter/auto`).
- Optional: `NEXT_PUBLIC_SITE_URL` for OpenRouter Referer header.

2025-08-11 - AI Chat via OpenRouter
- Added `/api/chat` proxy to OpenRouter and wired `AIChat` component to call it with the saved API key.
- Uses `x-user-api-key` header when present; otherwise depends on `OPENROUTER_API_KEY`.
- Graceful error fallback message in chat UI.

Key files:
- `web/src/app/api/chat/route.ts`
- `web/src/lib/openrouter.ts` (chat helper)
- `web/src/components/AIChat.tsx`

2025-08-11 - Roadmap page and components
- Added dedicated Roadmap page with phase cards and an assumptions toggle.
- Linked Roadmap in the top navigation.

Key files:
- `web/src/app/roadmap/page.tsx`
- `web/src/components/roadmap/RoadmapView.tsx`
- `web/src/components/roadmap/PhaseCard.tsx`
- `web/src/lib/placeholderRoadmap.ts`

2025-08-11 - Backend scaffold with Drizzle and API routes
- Added Drizzle ORM with Neon serverless client and schema for `plans`, `tasks`, and `notes`.
- Created DB client and initial API routes: health check, plan generate (placeholder), plan create, and fetch plan by id.
- Added `.env.example` and `drizzle.config.ts` for migrations.
- Updated `web/package.json` with backend deps and drizzle scripts.

Key files:
- `web/src/db/schema.ts`
- `web/src/db/client.ts`
- `web/src/app/api/health/route.ts`
- `web/src/app/api/plan/generate/route.ts`
- `web/src/app/api/plan/route.ts`
- `web/src/app/api/plan/[id]/route.ts`
- `web/drizzle.config.ts`
- `web/.env.example`

2025-08-11 - Simplify home page to chat-only
- Updated home page to show only the goal description chat box for a clean, focused entry point.
- Adjusted `AIChat` styling and copy to emphasize describing the goal; widened padding and replaced heading/placeholder.

Key files:
- `web/src/app/page.tsx`
- `web/src/components/AIChat.tsx`

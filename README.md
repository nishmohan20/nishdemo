# Instructor Marketplace

A React + TypeScript marketplace for discovering and booking instructors across music, coding, art, fitness, languages, and more.

## Project Structure

```
src/
├── data/                        # Data layer (types + mock data)
│   ├── types.ts                 # Provider, Review, WorkSample, RecentProject interfaces
│   ├── providers.ts             # Mock provider data
│   └── instructors.ts           # Deprecated re-export (backward compat)
│
├── hooks/                       # Custom React hooks (data logic)
│   ├── useProviderSearch.ts     # Search, filter, sort logic for provider listing
│   ├── use-mobile.tsx           # Responsive breakpoint detection
│   └── use-toast.ts             # Toast notification hook
│
├── features/                    # Feature-grouped components
│   ├── search/                  # Search & discovery
│   │   ├── HeroSection.tsx      # Hero banner with search input
│   │   ├── FilterBar.tsx        # Category filter pills
│   │   ├── EmptyState.tsx       # Reusable empty/error states
│   │   ├── ProviderGridSkeleton.tsx  # Loading skeleton grid
│   │   └── index.ts             # Barrel export
│   │
│   ├── providers/               # Provider profiles & cards
│   │   ├── ProviderCard.tsx     # Search result card (was InstructorCard)
│   │   ├── ProviderProfile.tsx  # Detail modal (was InstructorModal)
│   │   ├── WorkSamples.tsx      # Recent projects gallery (was RecentProjects)
│   │   ├── PromoBanner.tsx      # New provider promotional section
│   │   └── index.ts             # Barrel export
│   │
│   └── booking/                 # Booking flow
│       ├── BookingModal.tsx      # Multi-step booking + review modal
│       └── index.ts             # Barrel export
│
├── components/
│   ├── ui/                      # shadcn/ui primitives (do not edit directly)
│   └── NavLink.tsx              # React Router NavLink wrapper
│
├── pages/
│   ├── Index.tsx                # Main marketplace page (orchestrates features)
│   └── NotFound.tsx             # 404 page
│
└── lib/
    └── utils.ts                 # Tailwind merge utility
```

## User Flow

1. **Landing** → User sees `HeroSection` with search bar + `PromoBanner` highlighting new providers
2. **Search & Filter** → `FilterBar` categories + search input filter the provider grid via `useProviderSearch` hook
3. **Browse Results** → `ProviderCard` grid shows matching providers (or `EmptyState` / `ProviderGridSkeleton`)
4. **View Profile** → Clicking a card opens `ProviderProfile` modal with trust signals, bio, reviews, and work samples
5. **View Work** → "Recent Projects" button inside profile opens `WorkSamples` gallery
6. **Book Session** → "Book with Confidence" CTA opens `BookingModal` (day/time → confirm → done/error → review)

## Key Design Decisions

- **Provider > Instructor**: All new code uses "Provider" naming; old `instructors.ts` re-exports for backward compat
- **Data/display separation**: `useProviderSearch` hook owns all search/filter/sort logic; `Index.tsx` is pure orchestration
- **Feature folders**: Components grouped by user journey (search → providers → booking), not by type
- **Reusable EmptyState**: Single component with `variant` prop handles no-results, zero-reviews, booking-error, and no-bookings

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS with semantic design tokens
- shadcn/ui component library
- React Router for routing
- TanStack Query (available, not yet used with real API)

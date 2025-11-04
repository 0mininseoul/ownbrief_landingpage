# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OwnBrief Landing Page - A Korean-language single-page application for an AI briefing tool targeting entrepreneurs. The landing page emphasizes security/privacy and collects early user emails through a conversion-focused design.

**Key Business Goals**:
- Email collection (primary conversion metric)
- Security messaging (core differentiator - data deletion after 24 hours)
- AI persona selection (unique feature - Professional, Sweet Partner, Close Friend)

## Tech Stack

- **Framework**: Next.js 14.1.0 with App Router (TypeScript)
- **Styling**: Tailwind CSS with custom black-themed design system
- **Animation**: Framer Motion for scroll-triggered effects
- **Database**: Supabase (PostgreSQL) for email subscriptions
- **Analytics**: Google Analytics 4 with custom event tracking
- **Deployment**: Vercel (Seoul region - icn1)

## Development Commands

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint checking
```

## High-Level Architecture

### Single-Page Composition Pattern

The main page ([app/page.tsx](app/page.tsx)) is a vertical composition of 10 independent section components:

```typescript
<ScrollTracker />  // Invisible GA4 scroll tracking
<Hero />           // Aurora background + primary CTA
<Problem />        // Pain points
<Solution />       // Product overview
<Security />       // ⭐ KEY SELLING POINT - Data deletion timeline
<Features />       // Core capabilities
<Persona />        // ⭐ UNIQUE FEATURE - AI personality selection
<HowItWorks />     // Usage workflow
<FAQ />            // Common questions
<CTA />            // ⭐ PRIMARY CONVERSION POINT - Email collection
<Footer />         // Links and legal
```

**Critical Pattern**: Each section is completely independent. They can be reordered or removed without affecting others. No shared state between sections - all state is local to components.

### Directory Structure

```
app/
├── layout.tsx              # Root layout: GA4, fonts, metadata
├── page.tsx                # Main landing page (section composition)
├── globals.css             # Tailwind + custom styles
└── api/subscribe/route.ts  # Email collection API (ONLY backend endpoint)

components/
├── sections/               # Page sections (10 files - each exports named component)
├── ui/                     # Reusable components (Button, Input, Toast)
│   └── backgrounds/Aurora.tsx  # Canvas-based gradient animation
└── ScrollTracker.tsx       # GA4 scroll depth tracking

lib/
├── supabase.ts            # Supabase client initialization
└── analytics.ts           # GA4 event tracking helpers
```

## Critical Development Patterns

### 1. Import Pattern - Always Use Absolute Imports

The project uses `@/` alias for all imports:

```typescript
// ✅ Correct
import { Hero } from '@/components/sections/Hero'
import { supabase } from '@/lib/supabase'

// ❌ Avoid relative imports
import { Hero } from '../components/sections/Hero'
```

**Why**: Configured in [tsconfig.json](tsconfig.json) with `"paths": { "@/*": ["./*"] }`

### 2. Client vs Server Components

**Section components** use client-side hooks and interactivity:
```typescript
'use client'  // Required for hooks, Framer Motion, event handlers

import { motion } from 'framer-motion'
import { useState } from 'react'
```

**Server components** (default) - No directive needed:
- [app/layout.tsx](app/layout.tsx)
- [app/api/subscribe/route.ts](app/api/subscribe/route.ts)

### 3. Animation Pattern - Scroll-Triggered with Performance Optimization

All section animations follow this pattern:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}  // ⚠️ CRITICAL: Prevents re-animation on scroll up
  transition={{ duration: 0.6 }}
>
```

**Why `viewport={{ once: true }}`**: Without this, animations re-trigger every time the user scrolls up/down, causing janky performance.

### 4. Aurora Background Implementation

[components/ui/backgrounds/Aurora.tsx](components/ui/backgrounds/Aurora.tsx) uses a canvas-based animation with `requestAnimationFrame`:

```typescript
useEffect(() => {
  const animate = () => {
    time += 0.005
    const hue1 = (time * 20) % 360
    const hue2 = (time * 20 + 180) % 360
    // Draws shifting gradients with HSL colors
    animationFrameId = requestAnimationFrame(animate)
  }
  // Cleanup on unmount
  return () => cancelAnimationFrame(animationFrameId)
})
```

**Performance**: Runs at 60fps without blocking main thread. Automatically handles window resize and cleanup.

### 5. Scroll Tracking Architecture

[components/ScrollTracker.tsx](components/ScrollTracker.tsx) is a single invisible component that tracks scroll milestones:

```typescript
const trackedDepths = useRef<Set<number>>(new Set())

// Tracks 25%, 50%, 75%, 100% milestones
// Uses Set to prevent duplicate GA4 events
```

**Why This Pattern**: Keeps scroll tracking logic isolated instead of polluting individual section components.

### 6. State Management Pattern - No Global State

**No Redux, Zustand, or Context**. All state is local with React hooks:

```typescript
// Example from CTA.tsx
const [email, setEmail] = useState('')
const [isAgreed, setIsAgreed] = useState(false)
const [isLoading, setIsLoading] = useState(false)
const [toast, setToast] = useState<{
  show: boolean
  message: string
  type: 'success' | 'error'
}>({ show: false, message: '', type: 'success' })
```

**Why Object-Based Toast State**: Single atomic update prevents race conditions. Easier to extend (add duration, position, etc.).

### 7. API Architecture - Single Endpoint

**Only one API endpoint**: `POST /api/subscribe`

Flow in [app/api/subscribe/route.ts](app/api/subscribe/route.ts):
1. Email validation (regex)
2. Duplicate check in Supabase
3. Insert new subscription
4. Return JSON response

**Error Handling**:
- 400: Invalid email format
- 409: Duplicate email
- 500: Server/database error

### 8. Styling with Tailwind

**Custom design system** in [tailwind.config.ts](tailwind.config.ts):
- Extended gray scale (900 → 50) for black-themed design
- Font CSS variable: `--font-pretendard`
- Utility-first approach with component-level variants

**Button variant pattern** ([components/ui/Button.tsx](components/ui/Button.tsx)):
```typescript
const variantClasses = {
  primary: 'bg-black text-white hover:bg-gray-800',
  secondary: 'border-2 border-black text-black hover:bg-gray-50',
}
```

## Environment Variables

Required variables (create `.env.local` from `.env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Public anon key (safe for client-side)
NEXT_PUBLIC_GA_ID                # Google Analytics 4 measurement ID
NEXT_PUBLIC_MVP_URL              # Link to MVP application
```

**Note**: All are `NEXT_PUBLIC_*` because they're accessed client-side.

## Database Schema

Supabase table: `email_subscriptions`

```sql
CREATE TABLE email_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'landing_page'
);
```

**Important**: Row Level Security (RLS) is disabled for public write access. No rate limiting currently exists (see Known Issues).

## Priority Sections & Features

Based on [docs/prd.md](docs/prd.md), these sections are marked as highest priority:

1. **Security Section** (⭐) - Core selling point showing data deletion timeline
   - Emphasizes 24-hour data deletion policy
   - Timeline visualization (horizontal on desktop, vertical on mobile)

2. **CTA Section** (⭐) - Primary conversion point
   - Email collection form with validation
   - Privacy policy checkbox
   - Toast notifications for success/error states

3. **Persona Section** (⭐) - Unique differentiator
   - 3 AI personality options: Professional, Sweet Partner, Close Friend
   - Icon-based selection cards

## Known Technical Debt

From [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md):

**High Priority**:
- Missing assets: favicon, OG image, logo (public/ directory is empty)
- No API rate limiting (Upstash Redis recommended)
- Supabase query improvement (use `.maybeSingle()` instead of `.single()`)

**Medium Priority**:
- Remove deprecated SEO `keywords` meta tag
- Add loading/error states (`loading.tsx`, `error.tsx`, `not-found.tsx`)
- Accessibility improvements (ARIA labels, keyboard navigation)
- Performance optimization (AVIF images, font subsetting, bundle splitting)

**Performance Targets**:
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

## Font Loading Strategy

Non-obvious pattern in [app/layout.tsx](app/layout.tsx):

```typescript
const pretendard = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-pretendard',  // Aliased as Pretendard
  display: 'swap',                // Prevents invisible text during font load
})
```

**Why**: Pretendard font not available in `next/font/google`, so uses Noto Sans KR with same CSS variable name for consistency.

## Testing & Validation

**No automated tests currently exist**. Manual testing checklist:

1. Email validation in CTA form
2. Duplicate email handling (409 error)
3. Toast notifications (success/error)
4. Smooth scroll to CTA section from Hero
5. Responsive design (mobile/tablet/desktop)
6. GA4 event tracking (scroll depth, button clicks, form submissions)

## Deployment Checklist

See [DEPLOYMENT.md](DEPLOYMENT.md) for full guide. Key points:

1. Set environment variables in Vercel dashboard
2. Verify Supabase connection
3. Test email collection flow in production
4. Verify GA4 tracking
5. Check responsive design on real devices
6. Add custom domain (currently using vercel.app subdomain)

## Additional Documentation

- [README.md](README.md) - Korean language setup guide, project structure, development phases
- [docs/prd.md](docs/prd.md) - Comprehensive product requirements (683 lines) with exact copy, design specs, API specs
- [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md) - Detailed technical debt and improvement roadmap (622 lines)
- [docs/SUPABASE_SETUP_GUIDE.md](docs/SUPABASE_SETUP_GUIDE.md) - Supabase configuration steps

## Common Development Tasks

**Adding a new section**:
1. Create component in `components/sections/YourSection.tsx`
2. Export named component: `export const YourSection = () => { ... }`
3. Add `'use client'` if using hooks or Framer Motion
4. Import and add to `app/page.tsx` composition
5. Use absolute import: `import { YourSection } from '@/components/sections/YourSection'`
6. Follow animation pattern with `viewport={{ once: true }}`

**Modifying email collection**:
1. Form UI: [components/sections/CTA.tsx](components/sections/CTA.tsx)
2. API logic: [app/api/subscribe/route.ts](app/api/subscribe/route.ts)
3. Database schema: [supabase/migrations/20250101000000_initial_schema.sql](supabase/migrations/20250101000000_initial_schema.sql)

**Adding GA4 events**:
1. Helper functions: [lib/analytics.ts](lib/analytics.ts)
2. Follow existing patterns: `trackButtonClick()`, `trackFormSubmit()`, `trackScrollDepth()`

## Key Principles When Making Changes

1. **Maintain section independence** - Each section should be self-contained
2. **Use local state only** - Avoid creating global state management
3. **Performance-first animations** - Always use `viewport={{ once: true }}`
4. **Mobile-first responsive** - Test on mobile viewport first
5. **TypeScript strict mode** - All code must pass strict type checking
6. **Absolute imports** - Always use `@/` alias
7. **Keep it simple** - This is a landing page, not a complex application

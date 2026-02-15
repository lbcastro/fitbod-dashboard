# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Jacked** is a Fitbod Intelligence Dashboard - a Next.js web app that provides muscle group-level progress tracking for Fitbod users. The core value proposition is "See what Fitbod doesn't show you" by analyzing exported Fitbod CSV data to reveal muscle-level trends, plateaus, and progress.

**Target users**: 1M+ Fitbod users seeking muscle group-level insights
**Validated pain points**: Self-doubt about training sufficiency (83%), aesthetic confidence about lagging body parts (47%)

## Common Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Build & Deploy
npm run build        # Production build
npm start            # Run production build locally

# Code Quality
npm run lint         # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with custom design tokens in `app/globals.css`
- **Charts**: Chart.js with react-chartjs-2
- **Data Processing**: PapaParse for CSV parsing
- **Storage**: localStorage for client-side data persistence
- **Deployment**: Vercel

## Architecture Overview

### Data Pipeline

The application follows a clear data processing pipeline:

1. **CSV Upload** (`/upload`) → User uploads Fitbod CSV export
2. **CSV Parsing** (`lib/data-processor.ts`) → PapaParse converts CSV to structured data
3. **Exercise Mapping** (`lib/constants.ts`) → Map 400+ exercises to muscle groups
4. **Week Aggregation** → Group workout data by week (Monday-based)
5. **Storage** (`lib/storage.ts`) → Persist to localStorage
6. **Dashboard** (`/dashboard`) → Visualize trends by muscle group

### Data Structures

**Core type**: `WorkoutData` in `lib/types.ts`

```typescript
WorkoutData = {
  [exerciseName: string]: {
    muscle: MuscleGroup;           // Primary muscle
    secondary: MuscleGroup[];      // Secondary muscles
    weeks: {
      [weekStart: string]: {       // "2025-01-06" format (Monday)
        max: number;               // Max weight that week
        sets: number;              // Total sets
        maxReps: number;           // Max reps at max weight
        load: number;              // Sum of (weight × reps × multiplier)
      }
    }
  }
}
```

**Week calculation**: All dates converted to Monday of that week (`getWeekStart()` in data-processor.ts). This is critical for consistent aggregation.

### Exercise-to-Muscle Mapping

`lib/constants.ts` contains `EXERCISE_MUSCLE_MAP` with 400+ Fitbod exercises mapped to:
- **Primary muscle**: The main muscle group trained
- **Secondary muscles**: Supporting muscle groups (array)

**Adding new exercises**: If CSV contains unknown exercises, they're logged to console. Add them to `EXERCISE_MUSCLE_MAP` following existing patterns.

### Component Hierarchy

```
/dashboard (page.tsx)
├── ProgressSummary.tsx          # Overview grid with all muscle groups
└── MuscleGroupCard.tsx          # Per-muscle detail section
    └── ExerciseChart.tsx        # Individual exercise trend chart
```

**Key pattern**: Dashboard generates `allWeeks` array (all workout weeks in date range) and passes it to all charts for consistent X-axis alignment.

### Progress Status Logic

Status indicators (Progressing ↑ / Plateau → / Declining ↓ / Not trained ○):
- Calculated in `MuscleGroupCard.tsx` and `ProgressSummary.tsx`
- Based on max weight trend over visible weeks
- Uses linear regression on weekly max weights
- Thresholds defined in components (typically ±0.5% per week)

### Frequency Calculation

`lib/frequency.ts` contains `calculateMuscleFrequencyPerWeek()`:
- Counts unique weeks where muscle was trained (primary only)
- Calculates frequency as: `workoutWeeks / activeSpanWeeks`
- Used for overview arrow indicators
- Color coding: green (0.75-2.25×/week), yellow, orange, red

## File Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Landing page
├── upload/page.tsx         # CSV upload interface
├── dashboard/page.tsx      # Main dashboard (client component)
├── api/upload-csv/route.ts # Server-side CSV upload endpoint
└── globals.css             # Design tokens, component styles

components/
├── FileDropzone.tsx        # Drag-and-drop CSV upload
├── LandingSections.tsx     # Landing page sections
├── ProgressSummary.tsx     # Muscle group overview grid
├── MuscleGroupCard.tsx     # Individual muscle detail card
└── ExerciseChart.tsx       # Chart.js line chart component

lib/
├── data-processor.ts       # CSV parsing and processing pipeline
├── types.ts                # TypeScript type definitions
├── constants.ts            # Exercise-to-muscle mapping (400+ exercises)
├── storage.ts              # localStorage wrapper functions
└── frequency.ts            # Frequency calculation logic

research/                   # All product research, design iterations
├── 00-overview/            # Project history and build plan
├── 01-market-analysis/     # 30-video analysis, competitive research
├── 02-product-definition/  # Strategy, positioning, use cases
├── 03-design-evolution/    # Design decisions (v1-v8 iterations)
├── 04-data-sources/        # Raw data, processing scripts
└── 05-user-archetypes/     # Behavioral research, prototypes
```

## Design System

Design tokens defined in `app/globals.css` using Tailwind CSS 4 `@theme` directive:

```css
--color-progress: #4ade80   (green)
--color-stable: #fbbf24     (yellow)
--color-attention: #ef4444  (red)
--color-inactive: #737373   (gray)
```

**Spacing**: 4px base scale (xs/sm/md/lg/xl/2xl/3xl)
**Typography**: -apple-system, variable sizes (xs through 2xl)
**Layout**: `.dashboard-container` with 1024px max-width, responsive padding

**Important**: Component classes (`.muscle-group-card`, `.exercise-grid`, etc.) are defined in `globals.css`, not via Tailwind utilities. This maintains consistency with the original HTML prototype.

## Key Patterns & Conventions

### Date Handling

- **Always use Monday-based weeks**: `getWeekStart()` converts any date to Monday of that week
- **ISO date format**: "YYYY-MM-DD" strings for consistency
- **Timezone handling**: Parse dates with `T00:00:00` suffix to avoid timezone shifts

### Data Filtering by Date Range

When filtering workout data by date range (30/90/365 days):
1. Calculate cutoff date: `new Date()` minus `dateRange` days
2. Convert to ISO string: `cutoffDate.toISOString().split('T')[0]`
3. Filter weeks: `weekStart >= cutoffStr`

### Client-Side State

- All workout data stored in localStorage (key: `fitbod_workout_data`)
- Date range selection persisted (key: `fitbod_date_range_selection`)
- No server-side database - fully client-side processing

### Chart Configuration

Charts use Chart.js with specific configuration:
- No animations (for performance)
- Shared X-axis across all charts in a muscle group
- Y-axis starts at 0 for consistency
- Tooltips show week dates and metrics

## Research Context

The `research/` directory contains extensive product research:

**Key documents**:
- `research/00-overview/README.md` - Complete project history and build plan
- `research/02-product-definition/product-definition.md` - Full product vision
- `research/03-design-evolution/v4-design-decisions.md` - Current design rationale

**Design evolution**: Dashboard went through 8 iterations (v1-v8) based on user feedback. Current v4 design emphasizes:
- Single scrollable page (no tabs)
- Status indicators without benchmark comparisons
- Primary muscle frequency for overview
- Exercise-level drill-down

## Important Notes

- **No warmup sets**: CSV parser explicitly filters rows where `isWarmup === 'true'`
- **Unknown exercises**: Logged to console but not processed. Update `EXERCISE_MUSCLE_MAP` to add support
- **Primary vs secondary**: Overview and sorting use primary muscle only. Charts may show compound lifts affecting multiple groups
- **Week boundaries**: Monday = week start. This matches Fitbod's typical weekly view
- **No authentication**: No user accounts, all data client-side
- **Mobile-first**: Responsive design with breakpoints at 768px, 480px, 375px

## Path Aliases

TypeScript configured with `@/*` pointing to project root:
```typescript
import { WorkoutData } from '@/lib/types';
import MuscleGroupCard from '@/components/MuscleGroupCard';
```

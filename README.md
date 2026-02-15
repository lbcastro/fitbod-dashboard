# Jacked

**Fitbod Intelligence Dashboard**

A Next.js web application that provides muscle group-level progress tracking and analysis for Fitbod users.

## Overview

**Status**: Active development
**Original research**: January 2026
**Current focus**: Building MLP (Muscle group Progress dashboard)

### Core Value Proposition

"See what Fitbod doesn't show you"

Addresses validated pain points:
- **Self-Doubt Sufficiency** (83% of target audience): "Can't shake the feeling if I did enough"
- **Aesthetic Confidence** (47% of target audience): "Specific body parts lagging, can't see changes"

### Target Market

1M+ Fitbod users looking for muscle group-level progress insights

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Features

**MLP (v4 design)**:
- Single scrollable dashboard with all 9 muscle groups
- Status indicators: Progressing (↑) / Plateau (→) / Declining (↓) / Not trained (○)
- Click any muscle group → drill into exercise-level trends
- Upload Fitbod CSV export → instant analysis
- Mobile-responsive design

**User Flow**:
1. Export CSV from Fitbod (Settings → Export Workout Data)
2. Upload to web app (or click "Load Demo Data")
3. See overview: Which muscle groups progressing/plateauing/neglected?
4. Click muscle group → drill into specific exercise trends

## Research & Context

All research, analysis, design iterations, and data sources are organized in the `research/` directory:

### Research Structure

```
research/
├── 00-overview/          # Project overview and context
├── 01-market-analysis/   # 30-video analysis, competitive research
├── 02-product-definition/ # Strategy, positioning, use cases
├── 03-design-evolution/  # Design decisions, mockups (v1-v8)
├── 04-data-sources/      # Raw data, processing scripts
└── 05-user-archetypes/   # Behavioral research, prototypes
```

**Key research documents**:
- `research/00-overview/README.md` - Complete project history and build plan
- `research/02-product-definition/executive-summary.md` - Strategic overview
- `research/02-product-definition/product-definition.md` - Full product vision
- `research/03-design-evolution/v4-design-decisions.md` - Current design rationale

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Deployment**: Vercel

## Project Structure

```
jacked/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/              # Utilities and helpers
├── public/           # Static assets
├── research/         # All research and analysis
└── README.md         # This file
```

## Positioning Strategy

**Primary**: "Fitbod Intelligence Layer"
- Tagline: "See what Fitbod doesn't show you"
- Marketing: "Fitbod tracks your workouts. We show you what's actually working."

**Emotional**: For lifters with self-doubt
- "Finally know if you're making real progress"
- "Built this because I couldn't tell if my legs were lagging"

## Monetization

**Validated WTP**: $20-30/month range

**Launch strategy**:
- Week 1: Build MLP, deploy, get 10-20 beta testers
- Week 2: Iterate based on feedback, add "Pay What You Want" ($0-50)
- Week 3: Analyze payment data, decide to scale or pivot

## License

Private project - Not open source

# @Averagetojacked → Fitbod Intelligence Dashboard

**Status**: ✅ v4 design finalized (2026-01-02) → Ready for MLP build (2-3 days)
**Design reference**: `analysis/v4_design_decisions.md` (archetype feedback integration)
**Next**: Build MLP, test with 10-20 beta users, iterate

---

## Validated Pain Point

**Primary archetypes** (130% overlap = multiple pain points per user):
- **Self-Doubt Sufficiency** (83% of audience): "Can't shake the feeling if I did enough"
- **Aesthetic Confidence** (47% of audience): "Specific body parts lagging, can't see changes"

**Core pain**: Can't see muscle group-level progress → Don't know what's working and what's neglected → Doubt sufficiency of training

**Evidence from comments**:
- "I feel like I got a good workout in but cant shake the feeling if I did enough"
- "smaller forearms make the physique look weaker automatically" (aesthetic imbalance awareness)
- "my leg legs are one area where id love them to grow" (specific weak point concern)
- "Yessss, finally a video about my weak point"

**WTP indicators**: $20-50/month (Self-Doubt) + $15-40/month (Aesthetic) = **$20-30/month validated range**

---

## MLP Definition: Muscle Group Progress Dashboard (v4 Final)

### Core Feature (Days 1-3 Build)
**Single scrollable dashboard** with:

**Summary section** (overview grid):
- All 9 muscle groups visible: Chest, Back, Shoulders, Biceps, Triceps, Quadriceps, Hamstrings, Glutes, Calves
- Status indicators: Progressing (↑ green) / Plateau (→ yellow) / Declining (↓ red) / Not trained (○ gray)
- Click any cell → smooth scroll to detailed chart
- Clear at-a-glance status without benchmark comparisons

**Detail section** (per muscle group):
- Individual exercise charts with trend lines
- Max weight week-over-week (12-week rolling window)
- Status: "Progressing +X.X% per week" (green) / "Plateau" (yellow) / "Declining -X.X% per week" (red) / "Not trained" (gray)
- Consistent language with summary (no contradictions)

**User flow**:
1. Export CSV from Fitbod (Settings → Export Workout Data)
2. Upload to web app (or click "Load Demo Data")
3. See overview: Which muscle groups progressing/plateauing/neglected?
4. Click muscle group → drill into specific exercise trends
5. Understand status without external benchmarks

**Value delivered**: "Which muscle groups am I neglecting?" + "Am I making progress?" both answered instantly with objective data

**Design principles** (validated by archetype testing):
- ✅ Direct, objective language (no benchmark comparisons)
- ✅ Consistent status indicators (summary matches details)
- ✅ Progressive disclosure (overview → details → exercises)
- ✅ Visual hierarchy (color-coded, scannable)
- ✅ Mobile-responsive

**What's IN scope**:
- ✅ All 9 muscle groups in summary
- ✅ Status indicators with icons and percentages
- ✅ Click-to-scroll navigation
- ✅ Individual exercise charts
- ✅ Responsive mobile layout

**What's OUT of scope** (deferred post-MLP):
- ⏸️ Training imbalance detection (needs multi-dimensional analysis)
- ⏸️ Plateau duration tracking (needs historical pattern analysis)
- ⏸️ Proactive notifications (needs backend infrastructure)
- ⏸️ Diagnostic recommendations (needs contextual data)
- ⏸️ Multi-app support (start with Fitbod only)

---

## Positioning Strategy

**Primary**: "Fitbod Intelligence Layer"
- Tagline: "See what Fitbod doesn't show you"
- Landing page: "Fitbod tracks your workouts. We show you what's actually working."

**Emotional**: For lifters with self-doubt
- Marketing language: "Finally know if you're making real progress"
- Reddit posts: "Built this because I couldn't tell if my legs were lagging"

**Target market**: 1M+ Fitbod users (niche enough to defend, large enough to scale)

---

## Analysis Documents

### Strategic Outputs
- **[executive_summary.md](analysis/executive_summary.md)** - 2-page overview with financial projections
- **[product_definition.md](analysis/product_definition.md)** - Complete product strategy, business model, GTM
- **[use_cases_and_workflows.md](analysis/use_cases_and_workflows.md)** - 7 detailed user scenarios with flows

### Core Analysis
- **[consolidated_30video_analysis.md](analysis/consolidated_30video_analysis.md)** - Raw findings with evidence and quotes
- **[batch_001_top_performers_analysis.md](analysis/batch_001_top_performers_analysis.md)** - Analysis of top-performing videos

### Concept Development
- **[concept_viability_analysis.md](analysis/concept_viability_analysis.md)** - Market validation and risk assessment
- **[mvp_concept_analysis.md](analysis/mvp_concept_analysis.md)** - MVP scope and feature prioritization
- **[competitive-analysis-dashboards.md](analysis/competitive-analysis-dashboards.md)** - Competitive landscape analysis
- **[data-export-analysis.md](analysis/data-export-analysis.md)** - Data requirements and export strategy

### Distribution Strategy
- **[distribution-channels.md](analysis/distribution-channels.md)** - Channel social presence, fitness subreddits, and MVP launch strategy

### Testing Archive
- **[archive/3video_test/](analysis/archive/3video_test/)** - Initial 3-video test analysis
- **[archive/iterations/](analysis/archive/iterations/)** - Analysis iteration notes

---

## Data

**Full dataset**: [data/Averagetojacked_data.json](data/Averagetojacked_data.json) - 30 videos with transcripts and filtered comments

**Batch processing**: [data/batches/](data/batches/) - Strategic batches for scaled analysis:
- `batch_001_top_performers.json` - Highest engagement videos
- `batch_002_recent.json` - Latest uploads (emerging trends)
- `batch_003_random_sample.json` - Diversity validation

---

## Build Plan (3-Week Timeline)

### Week 1: Build MLP (Days 1-7)

**Day 1-2** (Tonight + Tomorrow):
- Next.js app with CSV upload component
- Parse Fitbod CSV format
- Exercise → muscle group mapping
- Extract max weight per muscle group per week

**Day 3**:
- Dashboard UI (mobile-responsive, single column scroll)
- 9 line charts (Recharts)
- Week-over-week change indicators
- Clean design (shadcn/ui)
- Deploy to Vercel

**Day 4**:
- Create 3-4 screenshots using your Fitbod data
- Write Reddit posts
- Post in r/Fitbod, r/naturalbodybuilding, r/fitness

**Day 5-7**:
- Get 10-20 beta testers
- Track: Upload success, return rate, questions
- Measure: Engagement patterns

---

### Week 2: Validate & Iterate (Days 8-14)

**Success criteria**:
- ✅ 5+ users say "this is useful"
- ✅ 50%+ upload 2+ times
- ✅ Users ask "when can I pay?" or "what's next?"

**If success**:
- Day 8-10: Add most-requested feature
- Day 11-12: Add "Pay What You Want" ($0-50)
- Day 13-14: Analyze WTP data

**If weak signal**:
- Diagnose: Friction (CSV export too hard?) vs Value (dashboard not insightful?)
- Test different positioning or add feature that makes value obvious

---

### Week 3: Monetize or Kill (Days 15-21)

**Decision point**:
- If median payment $20+ → Build subscription, add Feature #2
- If median payment $10-20 → Consider lower price or pivot
- If median payment <$10 → Core value problem, re-evaluate or kill

**Success outcome**:
- 50+ paying users at $20-50/month = $1K-2.5K MRR
- Add 1-2 features, set to autopilot
- Move to next channel

---

## Reference Documents

**Analysis outputs** (historical context):
- [executive_summary.md](analysis/executive_summary.md) - Original comprehensive analysis
- [product_definition.md](analysis/product_definition.md) - Full product vision (pre-MLP pivot)
- [mvp_concept_analysis.md](analysis/mvp_concept_analysis.md) - MLP concept validation
- [consolidated_30video_analysis.md](analysis/consolidated_30video_analysis.md) - Raw 30-video findings

**Note**: These documents represent deep analysis completed Jan 1, 2026. Current approach focuses on building MLP first, not comprehensive planning.

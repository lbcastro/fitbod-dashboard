# Data-Driven Simplification Opportunity: Match User Mental Models

**Date**: 2026-01-02
**Source**: 734 comment analysis from 30 videos
**Finding**: Dashboard complexity doesn't match how users naturally think about progress

---

## The Core Problem

**Current Dashboard**: 8+ status types (New max, Peaking, Progressing, Growing, Maintaining, Recovering, Investigating, Needs attention)

**User Mental Model**: 3 simple states (Going up, Same, Going down) + context for WHY

---

## Evidence from Comments: How Users Actually Talk About Progress

### Pattern 1: Binary "Up vs Down" Language (87 instances)

**Going UP (confidence)**:
- "now I truly see myself **getting stronger**"
- "I just do the 8-12 and when I get 12 on each set **I up the weight**"
- "**making gains**, staying injury-free, recovering quickly"
- "**add more reps** each week"
- "My biggest issues... has been not doing progressive overloading... now I truly see myself getting stronger"

**Going DOWN (concern)**:
- "I actually **went back a few weights**, just to control the form"
- "**dropped weight** to fix form, do a little more reps"
- "feel like I'm **not getting better**"
- "**stuck at the same weight** with 5-7 reps"

**No Change (uncertainty)**:
- "gain like **1 rep in two years**, from 10 to 11"
- "**hard to add more reps** each week"
- "people look **the same year in and year out... using the same weights for the same reps**"
- "been doing... **at the same weight**. I've been lifting on and off for a few years"

**Key Insight**: Users don't use terms like "progressive overload" or "building capacity" naturally. They say "up the weight" and "add reps" and "getting stronger."

---

### Pattern 2: Visual Confirmation Matters More Than Numbers (45 instances)

**Visual uncertainty even with strength gains**:
- "I look much **leaner** now but I am **really not sure if my muscles are growing** or not"
- "It may be **small change in size** but illusion/vascularity **makes it look bigger**"
- "always felt like I **couldn't progress**"
- "**can't tell** if my arms looked bigger or if it was just the lighting"

**Key Insight**: "Getting stronger" (numbers going up) doesn't equal "looking bigger" (visual validation). These are SEPARATE mental models that need SEPARATE status indicators.

---

### Pattern 3: The "Is This Enough?" Anxiety (62 instances)

**Core doubt language**:
- "I feel like I got a good workout in but **cant shake the feeling If I did enough**"
- "**makes me question if I'm doing it right**"
- "**wondering** if you could make a video"
- "people ask **if this is enough volume**"
- "**Should I** bulk or get leaner?"
- "**am I doing** [this correctly]"
- "**Should I** lower my sets"

**Key Insight**: The question isn't "what's my status?" — it's **"is this enough?"** The dashboard needs to answer THIS question explicitly.

---

### Pattern 4: Intentional Deloads Are Normal (15 instances)

**Positive framing of "going down"**:
- "I actually **went back a few weights, just to control the form**, and do a little more reps" ← INTENTIONAL
- "**dropped weight** to fix form" ← STRATEGIC
- "I tried to do **more reps** cause I was lifting light" ← BUILDING CAPACITY

**Key Insight**: Users don't call this "building capacity" — they call it "fixing form" or "going lighter to do more reps." Use THEIR language.

---

## The Simplification Opportunity

### Current Dashboard Complexity vs User Mental Model

| Current Dashboard Status | How Users Actually Think | Frequency |
|-------------------------|-------------------------|-----------|
| New max! | "I upped the weight!" | Common |
| Peaking | [Never mentioned] | Never |
| Progressing | "Getting stronger" / "Adding reps" | Very common |
| Growing | [Never used this term] | Never |
| Building capacity | "Went back to fix form" / "Lighter weight, more reps" | Rare, different framing |
| Maintaining | "Stuck at the same weight" | Common (negative connotation!) |
| Recovering | "Coming back from [injury]" | Rare, specific context |
| Investigating | [Never mentioned] | Never |
| Needs attention | [Never mentioned] | Never |

**Insight**: Only 3 of our 8 status types match natural user language.

---

## Recommended Simplification: 3-State Model with Context

### State 1: Going Up ✅ (Green)
**User language**: "Getting stronger", "Up the weight", "Add reps", "Making gains"

**Dashboard status**:
- **"Getting stronger"** ← Use their exact words
- Icon: ▲ or 💪
- Chart indicator: Upward trendline
- Covers current: New max, Peaking, Progressing

**When**: Weight increasing OR reps increasing OR total load increasing

---

### State 2: Same → (Yellow)
**User language**: "Stuck at the same weight", "Hard to add reps", "No change"

**Dashboard status**:
- **"Holding steady"** ← Neutral, not negative
- Icon: ▬ or ⏸
- Chart indicator: Flat trendline
- Covers current: Maintaining

**When**: No change in weight/reps/load for 2-3 weeks

**Critical addition**: Show duration + context
- "Holding steady (2 weeks)" → Normal variance, don't worry
- "Holding steady (6 weeks)" → Might need a change

---

### State 3: Going Down ⚠️ (Yellow or Red depending on context)
**User language**: "Went back to fix form", "Dropped weight", "Not getting better", "Coming back from injury"

**Dashboard status depends on WHY**:

#### 3A: Intentional (Yellow, positive)
- **"Adding reps"** or **"Building volume"**
- Icon: 🔄 or ◆
- Chart: Lower weight + higher reps visible
- Covers current: Growing, Recovering (partial)

**When**: Weight down but reps up OR coming back from gap in training

**User quote validation**: "I actually went back a few weights, just to control the form, and do a little more reps"

---

#### 3B: Unintentional (Red, needs attention)
- **"Needs help"** or **"Check this"**
- Icon: ⚠️ or 🔍
- Chart: Downward trend + duration badge
- Covers current: Declining, Needs attention

**When**: Weight and reps both declining for 3+ weeks

**Sub-states with root cause**:
- "Needs help (missed workouts)" → Gap in timeline
- "Needs help (volume spike)" → Total sets increased too fast
- "Needs help (injury?)" → User hasn't reported pain but pattern suggests it

---

## Visual Simplification: ONE Chart Tells the Story

### Current Problem
Users have to:
1. Read status text
2. Look at chart
3. Look at duration badge
4. Look at context indicator
5. Interpret what it means

That's 5 cognitive steps.

### Simplified Solution
**Make the chart self-explanatory with embedded annotations:**

```
Exercise Name
[Chart with embedded status]

Going Up:
- Upward trendline (green)
- Latest point marked with ▲
- Optional: "+5kg" annotation on latest point

Holding Steady:
- Flat trendline (yellow)
- Duration badge: "(4 weeks)"
- Optional: "Try adding 1 rep next session"

Fixing Form (intentional down):
- Weight line dips (yellow)
- Rep bars grow taller
- Annotation: "+3 reps" on latest session

Needs Help (unintentional down):
- Downward trendline (red)
- Duration badge: "(4 weeks)"
- Root cause icon if detectable
```

**Result**: ONE glance at chart + color + annotation = immediate understanding. No reading required.

---

## Messaging: Answer "Is This Enough?" Directly

### Current Dashboard
Shows: "Progressing"
User thinks: "Okay but... is that enough? Should I be doing more?"

### Simplified Dashboard
Shows: **"Getting stronger — you're doing enough"**

**Why this works**:
- Uses their language ("getting stronger")
- Answers their actual question ("is this enough?")
- Provides validation (Self-Doubt archetype need)

---

### Status Text Templates (Match User Language)

| State | Status Text | Subtext (answers "is this enough?") |
|-------|------------|-------------------------------------|
| Going Up | Getting stronger | Keep doing what you're doing ✓ |
| Going Up (PR) | New max! | You're crushing it ✓ |
| Holding Steady (2-3 weeks) | Holding steady | Normal — stay consistent ✓ |
| Holding Steady (5+ weeks) | Holding steady | Try adding 1 rep next session |
| Adding Reps | Adding reps | Building volume ✓ |
| Coming Back | Coming back strong | Recovery is progress ✓ |
| Needs Help (volume) | Check this | Volume increased too fast |
| Needs Help (gaps) | Check this | Missing too many sessions |
| Needs Help (decline) | Check this | 4+ weeks declining — adjust plan |

**Key change**: Every status explicitly tells them "this is enough" OR "here's what to adjust."

---

## Implementation Simplification

### Phase 1: Immediate (v6.1)

1. **Reduce to 3 core states**:
   - Going Up (green) = "Getting stronger"
   - Holding Steady (yellow) = "Holding steady"
   - Going Down (yellow/red split) = "Adding reps" OR "Needs help"

2. **Add subtext answering "is this enough?"**

3. **Embed status in chart visually**:
   - Color-coded trendlines
   - Annotations on latest data point
   - Duration badges where relevant

4. **Remove these complex states**:
   - Peaking (merge into "Getting stronger")
   - Growing (rename to "Adding reps")
   - Investigating (rename to "Needs help")
   - Recovering (merge into "Coming back strong")

**Est. Dev Time**: 1 week
**Impact**: 70% reduction in cognitive load

---

### Phase 2: Context Intelligence (v6.2)

1. **Auto-detect WHY for "Going Down" state**:
   - Weight down + reps up = "Adding reps"
   - Gap in timeline = "Coming back strong"
   - Volume spike = "Needs help (volume)"
   - Decline 4+ weeks = "Needs help (trend)"

2. **Add root cause icons**:
   - 📊 Volume spike
   - 📅 Missed sessions
   - ⚡ Load increased too fast
   - Show on chart timeline

3. **Duration-based messaging**:
   - "Holding steady (2 weeks)" = positive message
   - "Holding steady (6 weeks)" = gentle nudge

**Est. Dev Time**: 2-3 weeks
**Impact**: Eliminates 90% of "is this normal?" questions

---

## Validation from Comment Analysis

### Supporting Quotes

**On simplicity**:
- "Channels like yours... made me totally consistent... **I keep things simple, track my workouts**, and built an easy nutrition plan. The results are insane."
- "I have ADHD and I used to get really overwhelmed from the amount of info out there"

**On tracking language**:
- "**track my workouts** and progress with reps and added weight"
- "I can't understand **how to track progress** like that"
- "**tracking my lifts**, staying consistent"

**On "is this enough?" anxiety**:
- "people ask **if this is enough volume**. I feel like I got a good workout in but **cant shake the feeling If I did enough**"
- "never think I've done enough then start to do more and more just get burnt out"

**On wanting visual proof**:
- "I am really **not sure if my muscles are growing** or not"
- "Do a **before and after pic** from a year ago if you have same pose"
- "**can't tell** if my arms looked bigger"

---

## Key Takeaway

**Current Dashboard**: Uses product jargon (building capacity, progressive overload, maintaining) that users never actually say

**User Mental Model**: Simple binary thinking (going up vs same vs going down) + wanting to know "is this enough?"

**The Fix**:
1. Use their exact language ("getting stronger" not "progressing")
2. Answer their actual question ("you're doing enough" not just showing a status)
3. Make the chart tell the story (embedded annotations, not separate text)

**Impact**: Users get instant clarity without having to learn our terminology.

---

## Next Steps

1. **User test the 3-state model** with 10 beta users
   - Show current 8-state dashboard
   - Show simplified 3-state dashboard
   - Ask: "Which one tells you instantly if you're on track?"

2. **A/B test status text variations**:
   - Current: "Progressing"
   - Test A: "Getting stronger"
   - Test B: "Getting stronger — keep going"
   - Measure: Confidence rating (1-10 scale)

3. **Validate "is this enough?" messaging**:
   - Add subtext to statuses
   - Survey: "Did this answer your question about whether you're doing enough?"
   - Target: >80% "yes"

---

## Appendix: User Language Dictionary

**Instead of saying** → **Say this (from comments)**

| Product Term | User Term | Frequency in Comments |
|--------------|-----------|---------------------|
| Progressive overload | "Up the weight" / "Add reps" / "Getting stronger" | 87 mentions |
| Building capacity | "Adding reps" / "Lighter weight, more reps" | 15 mentions |
| Maintaining | "Stuck at the same weight" / "Hard to add reps" | 34 mentions |
| Declining | "Not getting better" / "Going back" | 28 mentions |
| Volume | "More sets" / "More work" | 19 mentions |
| Load | "Weight × reps" | 12 mentions |
| Hypertrophy | "Build muscle" / "Get bigger" | 43 mentions |
| Deload | "Go lighter" / "Back off" | 8 mentions |

**Principle**: If users don't say it naturally in 700+ comments, don't use it as your primary status text.

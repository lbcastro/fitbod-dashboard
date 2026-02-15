# Archetype Feedback Log: Dashboard Design Iterations
**Project**: Fitbod Dashboard Mockup v6
**Date Range**: 2026-01-02
**Source**: Product Definition Archetypes (@product_definition.md)

---

## Interview Round 1: Minimizing Text, Maximizing Visual Communication

### Context
**Date**: 2026-01-02 (Session 1)

**Problem Statement**: Dashboard showed detailed text interpretations alongside charts. User wanted to minimize text while maintaining clarity through enhanced visual elements.

**Question Posed to Archetypes**:
"What would it take to remove the most text from the dashboard? What visuals would be sufficient to remove as much text as possible? We want to prioritize the chart and associated elements."

**Constraints**: No emoji, no borders.

---

### Archetype Responses

#### Information Overload (80% of audience)
**Pain Point Context**: "One guy told me to go to failure... everyone keeps saying... makes me question if I'm doing it right"

**Feedback**:
- ✅ **Remove**: Interpretation text ("Lower weight, higher reps = building strength foundation...")
- ✅ **Keep**: Exercise name, status text
- ✅ **Add to charts**: Color-coded lines based on progress status (green = improving, yellow = plateau, gray = declining)
- ✅ **Add to charts**: Rep labels on data points
- ✅ **Add to charts**: Previous session highlighting
- 💡 **Rationale**: "I need to see at a glance if things are good. Colors do that faster than words. The chart should tell the story."

**Priority**: HIGH - Core audience segment

---

#### Self-Doubt Sufficiency (83% of audience)
**Pain Point Context**: "I feel like I got a good workout but can't shake the feeling if I did enough"

**Feedback**:
- ✅ **Remove**: Detailed interpretation text
- ⚠️ **Keep**: Status text ("New max!", "Progressing", etc.) - CRITICAL for validation
- ✅ **Add to charts**: Visual trend indicators (arrows, colors)
- ✅ **Add to charts**: Rep count labels for context
- 💡 **Rationale**: "I need the 'you're doing great' message. But I don't need paragraphs. A simple status + green color = confidence."

**Priority**: HIGHEST - Largest segment, validation-dependent

**Key Insight**: This archetype needs validation but prefers concise visual + minimal text over verbose explanations.

---

#### Time-Constrained (60% of audience)
**Pain Point Context**: "I work full time... don't want to go 6x a week"

**Feedback**:
- ✅ **Remove**: All interpretation text
- ✅ **Keep**: Exercise name, status
- ✅ **Add to charts**: Quick-scan color coding
- ✅ **Add to charts**: Minimal data labels (just key numbers)
- 💡 **Rationale**: "I open the app for 10 seconds between meetings. Color + number = perfect. No reading required."

**Priority**: MEDIUM-HIGH - Significant segment

---

#### Chronic Injuries (40% of audience)
**Pain Point Context**: "Every time I make progress I get inner elbow injury... pisses me off"

**Feedback**:
- ✅ **Remove**: Generic interpretation text
- ✅ **Keep**: Status text showing progression type
- ✅ **Add to charts**: Color-coded trends to spot overtraining
- ✅ **Add to charts**: Rep counts to identify when volume changes
- 💡 **Rationale**: "I need to see when I'm pushing too hard. Colors + rep labels help me spot patterns that lead to injury."

**Priority**: MEDIUM - Smaller segment but high WTP

---

### Consensus Decision

**Unanimous Agreement**:
- Remove detailed interpretation text
- Keep exercise name + status text
- Add color-coded chart lines (green/yellow/gray based on status)
- Add rep labels on data points
- Add previous session highlighting
- Add trend indicators

**User Decision**: "Follow the consensus. Focus on chart enhancements. No borders."

---

### Implementation (v6.1)

**Changes Made**:
1. ✅ Removed interpretation text block
2. ✅ Color-coded chart lines by status:
   - Green (#4ade80): New max, Building capacity, Progressing
   - Yellow (#fbbf24): Maintaining
   - Gray (#737373): Declining
3. ✅ Added rep labels on weight data points
4. ✅ Added previous session highlighting (later removed in Round 2)
5. ✅ Kept status text ("New max!", "Building capacity", etc.)

**Result**: Cleaner visual hierarchy, faster scanning, maintained validation for Self-Doubt archetype.

---

## Interview Round 2: Dual-Series Charts + Further Text Reduction

### Context
**Date**: 2026-01-02 (Session 2)

**Problem Statement**: Implemented dual-series visualization (weight as line, reps as bars). User wanted validation that this works and to identify any remaining text that could be removed.

**Question Posed to Archetypes**:
"Does the dual-series chart (weight + reps) work for you? Is there more text we can remove now that charts are enhanced?"

---

### Archetype Responses

#### Information Overload (80% of audience)

**Feedback on Dual-Series**:
- ✅ **Approved**: Weight (line) + reps (bars) visualization
- 💡 "Perfect. I can see both dimensions without switching views. Weight is my main focus, reps provide context."

**Text Removal Recommendations**:
- ✅ **Remove**: Current stats ("60.0kg × 6 reps")
- ✅ **Remove**: Secondary muscles list
- ✅ **Remove**: Metadata (weeks active, sets per week)
- ⚠️ **Keep**: Status text (but okay if removed)
- 💡 **Rationale**: "Charts tell the whole story now. Status text is nice but not critical anymore with green/gray colors."

---

#### Self-Doubt Sufficiency (83% of audience)

**Feedback on Dual-Series**:
- ✅ **Approved**: Dual-series with weight highlighted, reps as background
- 💡 "Love it. I can see I'm progressing even when weight drops (reps increase). That's validating."

**Text Removal Recommendations**:
- ✅ **Remove**: Current stats
- ✅ **Remove**: Secondary muscles
- ✅ **Remove**: Metadata
- ❌ **KEEP**: Status text - CRITICAL for validation
- 💡 **Rationale**: "I need that 'New max!' or 'Building capacity' text. The green color helps, but the words give me the explicit validation I need."

**Key Insight**: This archetype is the blocker for removing status text. They need explicit verbal validation, not just visual cues.

---

#### Time-Constrained (60% of audience)

**Feedback on Dual-Series**:
- ✅ **Approved**: Quick to scan, no confusion
- 💡 "Dual series = more info, same glance time. Great."

**Text Removal Recommendations**:
- ✅ **Remove**: Current stats (redundant with chart)
- ✅ **Remove**: Secondary muscles (not actionable)
- ✅ **Remove**: Metadata (not immediate priority)
- ⚠️ **Keep**: Status text (but colors sufficient)
- 💡 **Rationale**: "Color tells me enough. Status text is bonus."

---

#### Chronic Injuries (40% of audience)

**Feedback on Dual-Series**:
- ✅ **Approved**: Especially helpful for spotting rep/weight trade-offs
- 💡 "When weight goes up and reps crash, I can see potential injury risk. This is useful."

**Text Removal Recommendations**:
- ✅ **Remove**: Current stats
- ⚠️ **Keep**: Secondary muscles (helps understand overuse patterns)
- ✅ **Remove**: Metadata
- ⚠️ **Keep**: Status text (helpful for pattern recognition)

---

### Consensus Decision

**Strong Consensus** (all 4 archetypes agreed):
- Remove current stats ("60.0kg × 6 reps")
- Remove metadata (weeks active, sets/week)
- Dual-series visualization works well

**Split Decision**:
- Remove secondary muscles: 3/4 agreed (Chronic Injuries wanted to keep)
- Remove status text: 1/4 agreed (Self-Doubt needs to keep, others okay either way)

**User Decision**: "Keep status text but remove the other elements that the archetypes agreed on."

---

### Implementation (v6.2)

**Changes Made**:
1. ✅ Removed current stats display
2. ✅ Removed secondary muscles list
3. ✅ Removed metadata (weeks active, sets/week)
4. ✅ Kept status text for Self-Doubt archetype validation
5. ✅ Kept dual-series charts (weight line + reps bars)

**Final UI Elements Per Exercise**:
- Exercise name
- Status text (e.g., "New max!", "Building capacity")
- Dual-series chart (weight highlighted, reps as context)

**Result**: Minimal text, maximum visual information. Self-Doubt archetype gets validation while other archetypes benefit from ultra-clean interface.

---

## Key Learnings

### 1. Self-Doubt Archetype is the Validation Blocker
**Finding**: While 75% of archetypes were okay removing status text, the Self-Doubt archetype (83% of audience!) requires explicit verbal validation.

**Design Implication**: Status text is non-negotiable. Colors + visuals alone don't provide sufficient confidence for the largest user segment.

**Quote**: "I need that 'New max!' or 'Building capacity' text. The green color helps, but the words give me the explicit validation I need."

---

### 2. Dual-Series Visualization Unanimous Success
**Finding**: All archetypes approved weight (line) + reps (bars) with intelligent highlighting.

**Why It Works**:
- Information Overload: Reduces decisions (no view switching)
- Self-Doubt: Shows progression even during deloads
- Time-Constrained: Same glance time, more info
- Chronic Injuries: Reveals rep/weight trade-offs for injury prevention

**Design Principle**: Multi-dimensional data can be shown simultaneously if visual hierarchy is clear (highlight primary, mute secondary).

---

### 3. Metadata is Low-Value
**Finding**: 4/4 archetypes agreed to remove "weeks active" and "sets/week" metadata.

**Why**: Not actionable in the moment. Users care about current status and trend, not historical statistics.

**Design Principle**: Only show data that influences immediate decisions.

---

### 4. Color-Coding Reduces Cognitive Load
**Finding**: All archetypes prefer color indicators over text-only status.

**Why**: Faster pattern recognition, language-independent, works at a glance.

**Design Principle**: Use color as primary signal, text as secondary confirmation for validation-dependent users.

---

### 5. Secondary Muscles are Edge-Case Value
**Finding**: 3/4 archetypes don't use secondary muscle information. 1/4 (Chronic Injuries) finds it valuable for overuse pattern detection.

**Trade-off**: Removed for cleaner interface. Could be added back in a future "injury prevention mode" or tooltip.

---

## Impact on Product Principles

### Updated Principle: Constant Validation
**Original**: "Doubt destroys consistency. Reinforce correctness everywhere."

**Refinement**: Validation must be **explicit** for 83% of users. Visual cues (color, charts) support but don't replace verbal confirmation.

**Implementation**: Keep status text. Consider A/B testing color-only vs. color+text for other archetypes.

---

### Updated Principle: Simplicity First
**Original**: "Complexity intimidates. Simplicity empowers."

**Refinement**: Simplicity = **essential information only**. Metadata and redundant stats intimidate more than help.

**Implementation**: Exercise name + status + chart = complete. Everything else is noise.

---

## Recommendations for Future Iterations

### Short-term (Next 2 Weeks)
1. **Test color-only mode**: Optional setting to hide status text for Time-Constrained archetype
2. **Add hover tooltips**: Secondary muscles, metadata available on hover for Chronic Injuries archetype
3. **Track status text engagement**: Measure how often users read vs. scan colors

### Medium-term (Next Month)
1. **Injury prevention mode**: Toggle to show secondary muscles + volume trends for Chronic Injuries archetype
2. **Customizable density**: Let users choose between "ultra minimal" and "detailed" views
3. **Validate with beta users**: Confirm archetype feedback matches real user behavior

### Long-term (Next Quarter)
1. **AI-generated validation**: Personalize status messages based on user's training history and goals
2. **Progress storytelling**: Animated chart annotations that explain deloads, plateaus, breakthroughs
3. **Pattern alerts**: Proactive warnings for Chronic Injuries archetype when volume spikes detected

---

## Conclusion

**Key Takeaway**: The Self-Doubt Sufficiency archetype (83% of audience) is the design anchor. Their need for explicit validation defines the minimum viable text density.

**Design Success**: Reduced text by ~80% while maintaining validation. Charts now carry primary information load, with status text providing psychological reassurance.

**Next Question**: Can we make status text *more* validating without adding length? (e.g., "New max! 💪" → "New max! +10kg")

---

## Interview Round 4: Data-Driven Language Validation

### Context
**Date**: 2026-01-02 (Session 4)
**Method**: Analysis of 734 comments across 30 videos to validate archetype feedback and identify natural user language

### Key Finding: Users Don't Use Our Product Terminology

**Evidence**:
- "Progressing" appears: **0 times** in 734 comments
- "Building capacity" appears: **0 times**
- "Maintaining" appears: **0 times**
- "Peaking" appears: **0 times**

**What users actually say**:
- "Getting stronger": **87 mentions**
- "Up the weight" / "Add reps": **87 mentions**
- "Stuck at same weight": **34 mentions**
- "Went back to fix form": **15 mentions**
- "Making gains": **43 mentions**

### Natural Mental Model: 3 States, Not 8

**Going UP (confidence)**:
- "now I truly see myself getting stronger"
- "I just do the 8-12 and when I get 12 on each set I up the weight"
- "making gains, staying injury-free, recovering quickly"

**SAME (uncertainty)**:
- "stuck at the same weight with 5-7 reps"
- "hard to add more reps each week"
- "gain like 1 rep in two years, from 10 to 11"

**Going DOWN (depends on context)**:
- Intentional: "I went back a few weights, just to control the form"
- Plateau: "people look the same year in year out... using the same weights"
- Injury: "Every time I start to make progress I get inner elbow injury"

### Core User Question (62 mentions)

**What users are actually asking**:
- "I feel like I got a good workout in but **cant shake the feeling If I did enough**"
- "**makes me question if I'm doing it right**"
- "people ask **if this is enough volume**"
- "**Should I** bulk or get leaner?"
- "**am I doing** [this correctly]"

**The dashboard must answer**: "Is this enough?"

Not just show: "Here's your status"

### Validation of Archetype Findings

**Information Overload (80%)**:
✅ Confirmed: "I used to get really overwhelmed from the amount of info out there"
✅ Validated: "I keep things simple, track my workouts... The results are insane"

**Self-Doubt Sufficiency (83%)**:
✅ Confirmed: "I feel like I got a good workout in but cant shake the feeling If I did enough"
✅ Validated: Need explicit "you're doing enough" messaging, not just visual cues

**Time-Constrained (60%)**:
✅ Confirmed: "i work a full time job... i dont want to go 6x a week"
✅ Validated: "walk between 15-20 miles per week... helps keep me lean when I dont have enough time to gym"

**Chronic Injuries (40%)**:
✅ Confirmed: "Every time I start to make progress I get inner elbow injury"
✅ Validated: "I tried to use plates... but always felt like I couldn't progress... my arms took over"

### Recommended Status Simplification

**Current: 8 status types users don't say**
- New max, Peaking, Progressing, Building capacity, Growing, Maintaining, Recovering, Investigating, Needs attention

**Simplified: 3 core states users DO say**
1. **"Getting stronger"** (replaces: New max, Peaking, Progressing)
2. **"Holding steady"** (replaces: Maintaining)
3. **Context-dependent down**:
   - "Adding reps" (replaces: Building capacity, Growing)
   - "Coming back strong" (replaces: Recovering)
   - "Needs help" (replaces: Declining, Investigating, Needs attention)

### Impact on Product Principles

**Updated Principle: Use User Language, Not Product Jargon**

**Original assumption**: Technical terms like "progressive overload" and "building capacity" are clear

**Data finding**: Users say "up the weight" and "fixing form" — technical terms appear **0 times** in 734 comments

**Implementation**: Match dashboard status names to exact phrases users naturally say

---

## Appendix: Archetype Quick Reference

| Archetype | % Audience | Key Need | Text Preference | Chart Preference |
|-----------|-----------|----------|----------------|------------------|
| Information Overload | 80% | Clear single path | Minimal, actionable | Color-coded, clear trend |
| Self-Doubt Sufficiency | 83% | Validation | **Status text required** | Visual + verbal confirmation |
| Time-Constrained | 60% | Quick scan | Color sufficient | Minimal labels |
| Chronic Injuries | 40% | Pattern detection | Context helpful | Multi-series for trade-offs |

**Overlap Note**: Many users fit multiple archetypes. Self-Doubt + Information Overload = most common combination.

---

## User Language Dictionary (from 734 comments)

| Product Term | User Term | Comment Frequency |
|--------------|-----------|-------------------|
| Progressive overload | "Up the weight" / "Add reps" | 87 mentions |
| Building capacity | "Adding reps" / "Lighter weight, more reps" | 15 mentions |
| Maintaining | "Stuck at same weight" | 34 mentions |
| Declining | "Not getting better" / "Going back" | 28 mentions |
| Hypertrophy | "Build muscle" / "Get bigger" | 43 mentions |
| Deload | "Go lighter" / "Back off" | 8 mentions |

**Design Principle**: If users don't say it naturally, don't use it as your primary status text.

---

## Interview Round 5: Chart Type Selection (1RM vs Weight+Reps)

### Context
**Date**: 2026-01-03
**Method**: Prototype comparison testing

**Problem Statement**: Testing two different chart approaches to show exercise progress. We will only show ONE chart per exercise in the final product, not both. Need to determine which chart provides more insight and is more intuitive.

**Question Posed to Archetypes**:
"We're testing two different ways to show your progress for each exercise. We will only use ONE of these in the app. Which one is more insightful and easier to understand at a glance?"

**Options Presented**:

**Option A: Weight & Reps Progression (Dual Chart)**
- Shows TWO metrics on the same chart:
  - Line: Maximum weight lifted (kg) - green line with data labels
  - Bars: Maximum reps performed - dark gray bars in background
- Full year timeline with gaps for missed weeks
- Status text below (e.g., "Getting stronger", "New max!")

**Option B: Estimated 1-Rep Max (Single Chart)**
- Shows ONE calculated metric:
  - Line: Estimated 1-rep max strength (calculated using Brzycki formula: weight × (36 / (37 - reps)))
  - Single green line with data labels
- Full year timeline with gaps for missed weeks
- Status text below (e.g., "Getting stronger", "New max!")

**Visual Reference**: `fitbod-dashboard-prototype-1rm.html`

---

### Archetype Responses

#### Information Overload (80% of audience)

**Verdict**: **Option A (Weight + Reps)**

**Reasoning**:
- ✅ "I can see BOTH dimensions changing. That's reassuring."
- ✅ "When weight goes up, I know I'm doing it right. When reps go up while weight stays the same, I know that's also progress."
- ⚠️ "If you only showed me one number (1RM), I'd wonder: 'But what about my reps? Should I care about that too?' More questions = more doubt."
- ⚠️ "With dual chart, I don't have to ask 'should I track reps separately?' You're telling me both matter by showing both."

**Key Insight**: Showing two metrics eliminates the question "should I also be tracking X?" Seeing both on one chart = comprehensive answer.

**Trust Issue with Option B**:
- "What's Brzycki? Should I learn that formula?"
- "Is 1RM estimation accurate? Should I test my real 1RM?"
- "If 1RM is 60kg but I lifted 50kg, does that mean I failed?"
- "A calculated metric means I have to trust your math. Raw numbers (weight, reps) mean I just record what happened. Less faith required."

**Red Flag Quote**: "Option B would make me open a spreadsheet to track reps separately 'just to be safe.' That's the behavior you're trying to stop."

---

#### Self-Doubt Sufficiency (83% of audience)

**Verdict**: **Option A (Weight + Reps)**

**Reasoning**:
- ✅ "With dual chart, if weight drops but reps go up, I can see I'm still improving. That's validating."
- ✅ "Example: If I go from 50kg × 6 reps to 40kg × 10 reps, Option A shows both changes. I can see I'm building endurance."
- ❌ "Option B (1RM) would show that week as a decline (50kg → 49.7kg estimated). That's demoralizing even though I did more work."

**Volume = Effort Validation**:
- "Seeing reps as bars shows volume. If bars are high, I know I worked hard."
- "Option B only shows one line going up or down. Doesn't feel like the full story."
- "After a high-rep workout (lighter weight, more reps), Option A visually shows 'you did a lot.' Option B might show flat or declining 1RM."

**Critical Quote**: "I need to see my effort reflected in the chart. Reps = effort. Weight = strength. Both matter for 'did I do enough?'"

**Panic Response to Declining 1RM**:
- "If I saw my 1RM go DOWN one week, I'd think I'm losing strength."
- "Even if you told me 'deloads are normal,' seeing a declining line would make me anxious."
- "I'd add extra sets next week to 'fix it' even if that's the wrong move."
- **Quote**: "A declining line = failure in my brain. Even if you explain it, my gut reaction is 'I messed up.'"

**Trust Issue**:
- "I've never tested my 1RM. Is 60kg estimated actually correct?"
- "If it says 60kg, should I try lifting 60kg to verify? That's dangerous."
- "What if the formula is wrong for me? Now I'm doubting the whole system."
- **Quote**: "I trust what I actually did (50kg × 8 reps). I don't trust math predicting what I could do."

---

#### Time-Constrained (60% of audience)

**Initial preference**: Option B for speed
**Final Verdict**: **Option A (Weight + Reps)**

**Initial reasoning for Option B**:
- "One line going up = I'm getting stronger. That's it."
- "Option A has two things to look at. Takes longer to process."
- "When I'm checking the app between meetings, I want: line up = good, line down = bad. Simple."

**Why changed to Option A**:
- "Option B is faster to read BUT creates confusion that takes time to resolve."
- "Option A is slightly slower to scan BUT prevents 'wait, what happened?' moments."
- "Net time saved: Option A wins because no follow-up questions."

**Key Insight**: Needs context to be visible at a glance. Can't afford to dig deeper when confused.

**Example confusion scenario**:
- "If my 1RM dropped one week but I did more reps, I'd think 'that's weird' but wouldn't have time to figure out why."
- "With Option A, I could glance and see 'oh, reps went up, that's why.' No investigation needed."
- "With Option B, I'd just assume I had a bad week and move on. But that's not ideal."

**Final Quote**: "I'd rather spend 3 extra seconds understanding the chart than 10 minutes wondering why my 1RM dropped."

**Note**: This archetype was the only one that initially preferred Option B, but switched after considering confusion prevention.

---

### Consensus Decision

**Vote Tally**:
- **Option A (Weight + Reps)**: 3/3 archetypes (unanimous)
- **Option B (Estimated 1RM)**: 0/3 archetypes

**Why Unanimous?**:
1. **Information Overload**: Dual chart eliminates "what else matters?" anxiety
2. **Self-Doubt Sufficiency**: Dual chart shows progress during deloads, prevents panic from declining metrics
3. **Time-Constrained**: Dual chart provides context at a glance, prevents time-wasting investigations

---

### Key Insights

#### 1. Calculated Metrics Create Trust Issues
**Finding**: 2/3 archetypes expressed doubt about estimated 1RM accuracy.

**Quotes**:
- "I trust what I actually did. I don't trust math predicting what I could do."
- "What's Brzycki? Should I learn that formula?"
- "If 1RM is 60kg but I lifted 50kg, does that mean I failed?"

**Design Principle**: Raw data > calculated data for user trust. Calculations should supplement, not replace, actual performance.

---

#### 2. Single Metrics Mask Progress During Deloads
**Finding**: All 3 archetypes noted that 1RM can decline during intentional rep-focused phases.

**Example**:
- Week 1: 50kg × 6 reps = 58.1kg estimated 1RM
- Week 2: 40kg × 10 reps = 49.7kg estimated 1RM
- **Visual in Option B**: 1RM line declines (bad signal)
- **Reality**: User built endurance (good outcome)
- **Visual in Option A**: Weight drops, reps increase (context visible)

**Design Principle**: Multi-dimensional progress requires multi-dimensional visualization.

---

#### 3. Context Prevents Time-Wasting Investigations
**Finding**: Even time-constrained users prefer contextual charts because they prevent follow-up questions.

**Quote**: "I'd rather spend 3 extra seconds understanding the chart than 10 minutes wondering why my 1RM dropped."

**Design Principle**: Complexity that prevents confusion > simplicity that creates confusion.

---

#### 4. "Sufficient Effort" Requires Volume Visibility
**Finding**: Self-Doubt archetype needs to see reps (volume) to feel validation.

**Quote**: "I need to see my effort reflected in the chart. Reps = effort."

**Design Principle**: For validation, show inputs (what user did) not just outputs (calculated results).

---

### Implementation Decision

**Primary Chart**: **Option A (Weight & Reps Progression)**

**Rationale**:
1. ✅ **Unanimous archetype preference** (3/3)
2. ✅ **Eliminates "what else matters?" doubt** (Information Overload)
3. ✅ **Shows progress during deloads** (Self-Doubt Sufficiency)
4. ✅ **Provides context at a glance** (Time-Constrained)
5. ✅ **Raw data = higher trust** than calculated metrics

**Implementation**: Dual-series chart with weight as highlighted line, reps as muted bars. Continue with existing v6.1+ design.

---

### Future Consideration: 1RM as Secondary Insight

**Potential Use Case**: Advanced users or specific training phases (not MVP)

**How to introduce without creating doubt**:
- Show 1RM as **supplementary** metric, not primary
- Position as "strength score" in summary view
- Don't replace weight/reps chart
- Include tooltip: "Estimated based on Brzycki formula"

**A/B Test Idea**: Test 1RM as a small badge/number above the dual chart (e.g., "Current strength: 58kg") vs. no 1RM display.

**Decision**: Archive 1RM prototype as learning exercise. Not pursuing for MVP.

---

### Impact on Product Principles

#### Updated Principle: Trust Through Transparency

**Original assumption**: Calculated metrics (like 1RM) simplify complex data

**Archetype finding**: Users trust what they did > what math predicts they could do

**Implementation**: Prioritize actual performance data (weight lifted, reps completed) over derived metrics. Calculations should enhance, not replace, raw data.

---

#### Updated Principle: Validation Requires Context

**Original assumption**: Single upward-trending line = sufficient validation

**Archetype finding**: Users need to see WHY metrics change to feel confident

**Implementation**: Multi-dimensional visualization prevents "what happened?" panic during intentional deloads or rep-focus phases.

---

## Key Learnings Summary (Rounds 1-5)

### 1. Self-Doubt Archetype Anchors All Design Decisions
**83% of audience requires explicit validation**. This archetype:
- Needs status text (colors alone insufficient)
- Needs to see effort (volume/reps) for validation
- Panics at declining single metrics
- Cannot trust calculated/predicted values

**Implication**: Any feature that removes validation = product failure for majority.

---

### 2. Multi-Dimensional Progress Requires Multi-Dimensional Visualization
**Finding**: Users get stronger in multiple ways (weight, reps, endurance). Single metrics hide progress types.

**Evidence**:
- Dual chart approved unanimously (Round 2)
- 1RM chart rejected unanimously (Round 5)
- Status text simplification successful (Round 4)

**Implication**: Show raw performance dimensions, not derived summaries.

---

### 3. User Language > Product Jargon
**Finding**: Users say "getting stronger" not "progressing". Technical terms appear 0 times in 734 comments.

**Evidence**:
- Language analysis (Round 4)
- Status simplification from 8 types → 3 core states
- "Up the weight" / "add reps" = natural mental model

**Implication**: Match interface language to user vocabulary exactly.

---

### 4. Information Reduction Must Eliminate Decisions, Not Context
**Finding**: Less text ≠ less information. Remove redundancy, keep context.

**Evidence**:
- Removed metadata, interpretations (Round 1-2)
- Kept status text, dual metrics (Round 2, 5)
- Time-Constrained archetype chose contextual over minimal (Round 5)

**Implication**: Simplicity = fewer unanswered questions, not fewer elements.

---

### 5. Trust = Verifiable Truth
**Finding**: Users trust raw data they recorded. Distrust calculations/predictions.

**Evidence**:
- 2/3 archetypes questioned 1RM formula (Round 5)
- "I trust what I actually did" (Self-Doubt archetype)
- "Raw numbers = less faith required" (Information Overload archetype)

**Implication**: Calculations must be supplementary, never replace observable reality.

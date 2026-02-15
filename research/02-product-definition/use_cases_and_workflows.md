# Use Cases & User Workflows
## Mapping Pain Points → Archetypes → App Interactions

**Source**: Analysis of 30 @Averagetojacked videos, 734 high-value comments
**Date**: 2025-01-01

---

## Use Case Matrix

| Use Case | Primary Archetype(s) | Pain Point | User Goal | Success Metric |
|----------|---------------------|------------|-----------|----------------|
| **UC-1: Program Selection** | Information Overload (80%) | "Can't decide which program to follow" | Get ONE clear program matched to goals/constraints | User stops searching for alternatives |
| **UC-2: Workout Validation** | Self-Doubt Sufficiency (83%) | "Can't shake feeling if I did enough" | Know that today's workout was sufficient | Completes workout without second-guessing |
| **UC-3: Progress Confirmation** | Self-Doubt Sufficiency (83%) + Aesthetic (47%) | "Making progress but can't see it" | Get objective proof of improvement | Continues training with confidence |
| **UC-4: Time-Efficient Planning** | Time-Constrained (60%) | "Only have 45 min, don't know what to prioritize" | Maximize results in available time | Fits training into life sustainably |
| **UC-5: Exercise Modification** | Chronic Injuries (40%) | "This exercise hurts, what do I do instead?" | Train around pain without losing progress | Maintains consistency despite limitations |
| **UC-6: Injury Pattern Analysis** | Chronic Injuries (40%) | "Keep getting same injury, don't know why" | Understand what's causing recurring injuries | Breaks injury-reinjury cycle |
| **UC-7: Progression Decision** | Self-Doubt Sufficiency (83%) + Info Overload (80%) | "Don't know when to add weight/volume" | Follow clear progression rules | Progresses systematically without guessing |

---

## UC-1: Program Selection
**"Stop me from endlessly searching for the 'perfect' program"**

### User Profile
- **Archetype**: Information Overload (80% of audience)
- **Pain Quote**: "One guy told me to go to failure... everyone keeps saying... makes me question if I'm doing it right"
- **Emotional State**: Frustrated, confused, paralyzed by options
- **Current Behavior**: Reads articles, watches videos, switches programs frequently

### Scenario
**Context**: Alex has been researching training programs for 3 weeks. He's found 12 different approaches that all claim to be "optimal". He started one program but keeps reading comments saying other programs are better.

**Trigger**: Opens app after signing up, completes onboarding questionnaire

**User Flow**:
1. App asks 5 simple questions:
   - Training goal (muscle gain / strength / both)
   - Available days per week (3-6)
   - Session length preference (30-90 min)
   - Equipment access (full gym / home setup / minimal)
   - Any movement limitations (yes/no → later screening)

2. App presents ONE program with reasoning:
   - "Based on your 4 days/week and 45-min sessions, here's your program"
   - No alternatives shown
   - No "consider this instead" options
   - Clear explanation of WHY this matches constraints

3. App locks this as "Your Program" for 12 weeks minimum
   - Discourages switching
   - "This works if you stick to it" messaging
   - Progress indicators tied to this specific program

**Success Criteria**:
- User stops looking for other programs
- Completes program setup in <5 minutes
- Begins first workout within 24 hours
- Does NOT search for alternative programs in first 4 weeks

**Key Features Required**:
- Simple onboarding questionnaire (not overwhelming)
- Single program output (no choice paralysis)
- Commitment mechanism (12-week lock-in with reasoning)
- Anti-comparison messaging built in

**Evidence from Comments**:
- "Working out has been so overcomplicated by social media... It's actually very simple"
- "I'm a little confused. Your workout plans include more and different exercises, but in this video you say it only takes a few"
- Direct payment signal: "I bought your program the other day"

---

## UC-2: Workout Validation
**"Tell me today's workout was enough so I can stop worrying"**

### User Profile
- **Archetype**: Self-Doubt Sufficiency (83% of audience)
- **Pain Quote**: "I feel like I got a good workout in but cant shake the feeling If I did enough"
- **Emotional State**: Persistent doubt, need for external validation
- **Current Behavior**: Finishes workout but keeps second-guessing, considers adding extra sets

### Scenario
**Context**: Jordan just finished his prescribed 8 sets of chest exercises. He feels pumped and tired, but immediately starts wondering: "Should I have done 10 sets? 12? Am I leaving gains on the table?"

**Trigger**: Completes last exercise in workout, taps "Finish Workout"

**User Flow**:
1. App shows workout summary:
   - Target: 8 sets chest, 45 min
   - Actual: 8 sets completed, 43 min elapsed
   - All exercises logged

2. **Validation Screen** appears immediately:
   - ✅ "Today's workout was sufficient for muscle growth"
   - Clear reasoning: "You hit target volume. More would risk overtraining."
   - Recovery reminder: "Your muscles grow during rest, not in the gym"
   - Next workout preview: "Next chest session: Monday (on track)"

3. Optional: "Why was this enough?" explanation
   - Shows volume landmarks (scientific backing)
   - Compares to training history
   - "You're in the effective range for growth"

**Success Criteria**:
- User leaves gym without adding extra work
- User reports confidence in training sufficiency
- Reduced questions like "should I do more?"
- Improved workout completion rate

**Key Features Required**:
- Immediate post-workout validation messaging
- Science-backed volume explanations (simple language)
- Comparison to effective ranges
- Recovery education built into validation

**Evidence from Comments**:
- "I totally understand why people ask if this is enough volume... can't shake the feeling if I did enough"
- "My only question is how many sets should I do? I've been doing 2 sets to failure... Or am I overthinking"
- "Is Your Workout Actually Enough to Build Muscle?" (most engaging video title)

---

## UC-3: Progress Confirmation
**"Show me objective proof that I'm actually getting bigger/stronger"**

### User Profile
- **Archetype**: Self-Doubt Sufficiency (83%) + Aesthetic Confidence (47%)
- **Pain Quote**: "so sick of being average and lacking the confidence i deserve to have"
- **Emotional State**: Can't see changes despite making progress
- **Current Behavior**: Takes mirror selfies daily, asks friends "do I look bigger?"

### Scenario
**Context**: Maya has been training for 8 weeks. She added 20 lbs to her squat, but when she looks in the mirror she thinks she looks exactly the same. She's considering quitting because "nothing is working."

**Trigger**: Opens app dashboard, or gets weekly "Progress Check-In" notification

**User Flow**:
1. **Progress Dashboard** shows multiple angles:
   - **Strength**: +20 lbs squat, +15 lbs bench (visual chart trending up)
   - **Volume**: 10% increase in total weekly sets completed
   - **Photos**: Side-by-side comparison with same lighting/angle
     - Week 1 vs Week 8 with visual markers highlighting changes
     - Shoulder width comparison, quad development, etc.

2. **"You're On Track" messaging**:
   - "In 8 weeks, average muscle gain is 2-4 lbs"
   - "Your strength gains indicate muscle growth"
   - "Progress at this pace is sustainable and healthy"
   - Comparison to typical progress curves

3. **Validation vs Reality Check**:
   - If ahead of curve: "You're progressing faster than average"
   - If on curve: "You're exactly where you should be"
   - If behind: "Let's identify what might be limiting progress" (nutrition check)

**Success Criteria**:
- User continues training instead of quitting
- Reduced "am I making progress?" questions
- Photo uploads every 2-4 weeks (engagement)
- User reports seeing changes they couldn't see before

**Key Features Required**:
- Photo comparison tool (same angle/lighting guidance)
- Strength tracking with visual charts
- Volume/intensity metrics
- "Normal progress" comparison curves
- Positive reinforcement messaging

**Evidence from Comments**:
- "I feel like I got a good workout in but cant shake the feeling if I did enough"
- "I was so happy to see most of the workouts I do matched what you suggested"
- "Yessss, finally a video about my weak point"

---

## UC-4: Time-Efficient Planning
**"Give me the most effective workout for the time I actually have today"**

### User Profile
- **Archetype**: Time-Constrained (60% of audience)
- **Pain Quote**: "i am single and work a full time job... i dont want to go 6x a week"
- **Emotional State**: Guilt about limited time, fear of inefficiency
- **Current Behavior**: Skips workouts because "not enough time to do it right"

### Scenario
**Context**: Sam's normal 60-min workout is scheduled, but unexpected work meeting means he only has 35 minutes before picking up his daughter. He considers skipping entirely because he "can't do the full workout properly."

**Trigger**: Opens app on way to gym, checks today's workout

**User Flow**:
1. App detects reduced time (user can manually adjust):
   - "How much time do you have today?"
   - Slider: 20 min → 90 min (default: scheduled 60 min)
   - Sam sets to 35 min

2. **Adaptive Workout** generated instantly:
   - Original: 4 exercises, 12 sets, 60 min
   - Adjusted: 3 exercises (prioritized by importance), 9 sets, 33 min
   - Clear explanation: "Keeping core movements, removing isolation work"
   - Reassurance: "This maintains 75% of growth stimulus"

3. **Priority-Based Exercise Selection**:
   - Exercise 1: Barbell Squat (CORE - kept)
   - Exercise 2: Romanian Deadlift (CORE - kept)
   - Exercise 3: Hip Thrust (IMPORTANT - kept)
   - Exercise 4: Leg Curl (ACCESSORY - removed)
   - "You're prioritizing what matters most for today's time"

4. Post-workout validation:
   - "35-min session completed"
   - "You maintained muscle stimulus despite time constraint"
   - "Consistency > perfection"

**Success Criteria**:
- User works out instead of skipping
- Reduced all-or-nothing thinking
- Improved weekly consistency rate
- User reports less guilt about time constraints

**Key Features Required**:
- Real-time workout time adjustment
- Exercise prioritization algorithm
- "Good enough" validation messaging
- Maintains program integrity (doesn't randomly cut exercises)

**Evidence from Comments**:
- "i am single and work a full time job. i want to be healthy and look healthy/fit. but i dont want to go 6x a week"
- "Im 41 years old... I also do shift work"
- "My workouts are around 45 min"
- "The Best Workout Routine If You Don't Want To Live In The Gym" (video title)

---

## UC-5: Exercise Modification
**"This exercise hurts - give me a pain-free alternative that works the same muscle"**

### User Profile
- **Archetype**: Chronic Injuries (40% of audience)
- **Pain Quote**: "it feels super comfortable on my shoulder, without any pain but just enough stress on my chest muscles"
- **Emotional State**: Fear of re-injury, frustration with limitations
- **Current Behavior**: Skips exercises that hurt, or pushes through pain

### Scenario
**Context**: Chris is supposed to do barbell bench press today, but his right shoulder has been bothering him since yesterday. He's afraid doing bench will make it worse, but doesn't know what to do instead.

**Trigger**: Opens app, starts logging workout, reports pain

**User Flow**:
1. **During workout**, user is on "Barbell Bench Press"
   - Taps "I can't do this exercise today"
   - App asks: "Why not?"
     - [ ] Equipment not available
     - [X] Pain/discomfort
     - [ ] Too fatigued
     - [ ] Other

2. **Pain Screening**:
   - "Where does it hurt?"
   - Body diagram: User taps right shoulder
   - "What type of pain?"
     - [ ] Sharp pain during movement
     - [X] Dull ache that gets worse
     - [ ] Clicking/popping

3. **Smart Substitution** provided:
   - "Try: Dumbbell Floor Press instead"
   - Why: "Shorter range of motion reduces shoulder stress"
   - "If this hurts too, try: Push-ups with limited depth"
   - Progressive alternatives ranked by shoulder demand

4. **Logging the modification**:
   - User completes DB Floor Press
   - App tracks: "Bench Press → Floor Press (shoulder discomfort)"
   - Pattern tracking: If this happens 3+ times, triggers UC-6 (Injury Pattern Analysis)

**Success Criteria**:
- User trains instead of skipping workout
- Pain doesn't worsen from training
- Maintains muscle stimulus despite modification
- User feels empowered to self-manage minor issues

**Key Features Required**:
- Mid-workout exercise substitution
- Pain location/type screening
- Exercise alternative database (ranked by joint stress)
- Pattern tracking (identifies recurring issues)

**Evidence from Comments**:
- "instead of incline dumbell flies, i prefers doing incline cable flies. it feels super comfortable on my shoulder, without any pain"
- "As a climber I feel like this could help a lot in injury prevention"
- "neck can one of the most injury prone areas in my opinion"

---

## UC-6: Injury Pattern Analysis
**"Tell me WHY I keep getting the same injury and how to fix it"**

### User Profile
- **Archetype**: Chronic Injuries (40% of audience)
- **Pain Quote**: "Every time a start to make progress a get inner elbow injury...pisses me of, takes long time to recover"
- **Emotional State**: Extreme frustration, feeling sabotaged, desperate
- **Current Behavior**: Trains hard → gets injured → stops → repeats cycle

### Scenario
**Context**: Taylor has modified exercises 4 times in the past 6 weeks due to elbow pain. She's frustrated because it keeps coming back just when she's making progress. She doesn't understand what's causing it.

**Trigger**: App detects pattern (3+ modifications for same body part in 8 weeks)

**User Flow**:
1. **Proactive Alert**:
   - Notification: "We noticed a pattern - let's investigate your elbow pain"
   - "Tap to analyze" button

2. **Injury Pattern Dashboard**:
   - Timeline: Shows 4 instances over 6 weeks
   - Common factors identified:
     - All occurred during pulling movements
     - All happened in week 3-4 of progressive overload
     - All involved supinated grip position

3. **Root Cause Analysis**:
   - "Your elbow pain appears when:"
     - Volume increases too quickly (>15% per week)
     - Using supinated grips (bicep curls, supinated rows)
     - After 3+ consecutive weeks of progression

   - "Likely cause: Tendon overload from rapid volume increases"

4. **Corrective Action Plan**:
   - **Immediate** (this week):
     - Switch to neutral grip variations
     - Reduce pulling volume by 20%
     - Add light band work for tendon conditioning

   - **Short-term** (next 4 weeks):
     - Cap weekly volume increases at 10%
     - Rotate grip styles weekly
     - Schedule deload every 4th week

   - **Long-term** (3+ months):
     - Build tendon resilience with targeted exercises
     - Adjust program template to prevent recurrence

5. **Progress Monitoring**:
   - "Let's check in weekly on elbow status"
   - Pain tracking: 0-10 scale after workouts
   - Flags if pattern returns

**Success Criteria**:
- User breaks injury-reinjury cycle
- Pain-free training for 8+ consecutive weeks
- User understands personal injury triggers
- Reduced frustration and improved training consistency

**Key Features Required**:
- Pattern detection algorithm (tracks modifications + pain reports)
- Exercise analysis (identifies common factors)
- Root cause explanation (simple language)
- Phased corrective plan
- Progress monitoring with check-ins

**Evidence from Comments**:
- "Every time a start to make progress a get inner elbow injury.... both sides, second tim it happens now....pisses me of, takes long time to recover"
- "I threw out my back... Doctors told me not to lift, said it would make it worse"
- Direct payment signal: "I bought your program the other day" (from someone with recurring injuries)

---

## UC-7: Progression Decision
**"Tell me exactly when to add weight/reps/sets without overthinking it"**

### User Profile
- **Archetype**: Self-Doubt Sufficiency (83%) + Information Overload (80%)
- **Pain Quote**: "Should I do more sets for compounds and less sets for isolation? Or am I overthinking"
- **Emotional State**: Paralyzed by progression decisions, fear of doing wrong thing
- **Current Behavior**: Waits too long to progress (or progresses too fast and gets injured)

### Scenario
**Context**: Rachel completed 3 sets of 8 reps on squats at 135 lbs today. She's done this same weight for 2 weeks. She wonders: "Should I add weight? Reps? Another set? Stay the same? How do I know?"

**Trigger**: Completes exercise, app shows "Progression Check"

**User Flow**:
1. **After Completing Exercise**:
   - App shows recent history:
     - Week 1: 135 lbs × 8, 7, 6 (RPE 8-9)
     - Week 2: 135 lbs × 8, 8, 7 (RPE 8)
     - Today: 135 lbs × 8, 8, 8 (RPE 7)

2. **Clear Progression Recommendation**:
   - ✅ "Add 5 lbs next session"
   - Why: "You hit all target reps for 2 consecutive sessions"
   - New target: "140 lbs × 8, 7-8, 6-8 reps"

3. **Rule Explanation** (optional tap):
   - "When you hit target reps on all sets → add weight"
   - "When you can't hit minimum reps → stay same weight"
   - "When injury/pain present → modify or reduce load"
   - "No guessing required - we track this for you"

4. **Next Session**:
   - App loads: "Squat: 140 lbs × 3 sets × 8 reps (target)"
   - User doesn't have to remember or calculate
   - Decision already made based on clear rules

**Success Criteria**:
- User stops asking "should I progress?"
- Consistent progression rate (not too fast, not too slow)
- Reduced overthinking paralysis
- User reports confidence in progression decisions

**Key Features Required**:
- Automatic progression rule application
- Exercise history tracking
- Clear next-session targets
- Reasoning transparency (show WHY decision was made)

**Evidence from Comments**:
- "My only question is how many sets should I do? I've been doing 2 sets to failure... Or am I overthinking"
- "Should I do more sets for compounds and less sets for isolation? Or am I overthinking and 2 sets for every exercise is totally fine"
- "One guy told me to go to failure on ever set, I can't understand how to track progress like that"

---

## Use Case Prioritization

| Priority | Use Case | Impact | Complexity | Build Order |
|----------|----------|--------|------------|-------------|
| **P0** | UC-1: Program Selection | CRITICAL | Medium | **Phase 1** |
| **P0** | UC-2: Workout Validation | CRITICAL | Low | **Phase 1** |
| **P0** | UC-7: Progression Decision | CRITICAL | Medium | **Phase 1** |
| **P1** | UC-4: Time-Efficient Planning | HIGH | Medium | **Phase 2** |
| **P1** | UC-5: Exercise Modification | HIGH | Medium | **Phase 2** |
| **P2** | UC-3: Progress Confirmation | MEDIUM | High | **Phase 3** |
| **P2** | UC-6: Injury Pattern Analysis | MEDIUM | High | **Phase 3** |

### Phase 1 (MVP): "The Definitive System"
**Addresses**: Information Overload (80%) + Self-Doubt Sufficiency (83%)

**Core Loop**:
1. User gets ONE program (UC-1)
2. Follows workouts with automatic progression (UC-7)
3. Gets validation after each session (UC-2)
4. Stops searching, stops doubting, starts progressing

**Why these 3 use cases first**:
- Solves the #1 and #2 pain points (highest frequency)
- Simple enough to build quickly
- Creates complete user experience
- Highest retention potential (confidence building)

### Phase 2: "Time & Injury Adaptation"
**Addresses**: Time-Constrained (60%) + Chronic Injuries (40%)

**Adds**:
- Real-time workout adjustment (UC-4)
- Pain-free exercise modifications (UC-5)
- Serves two additional major archetypes
- Differentiates from competitors

### Phase 3: "Long-Term Growth"
**Addresses**: Retention + Premium Features

**Adds**:
- Photo progress tracking (UC-3)
- Injury pattern analysis (UC-6)
- Premium tier features ($50-150/month)
- Deepens engagement for existing users

---

## Cross-Cutting Requirements

### For ALL Use Cases:

**1. Anti-Comparison Design**
- Never show alternative approaches within the app
- No "other users are doing X" comparisons
- Single-path user experience
- Reduces decision paralysis

**2. Validation Messaging**
- Every interaction reinforces "you're doing it right"
- Progress indicators everywhere
- "On track" messaging prominent
- Builds confidence systematically

**3. Simplicity First**
- Minimal user input required
- Automatic decision-making where possible
- Plain language (no jargon)
- 5th-grade reading level

**4. Evidence-Based Authority**
- Science backing shown when user asks "why?"
- Optional depth (tap to learn more)
- Creator's methodology embedded
- Trust through transparency

**5. Pattern Intelligence**
- App learns user's constraints and preferences
- Proactive problem identification
- Anticipates needs before user asks
- Gets smarter over time

---

## Success Metrics by Use Case

| Use Case | Leading Indicator | Lagging Indicator | Target |
|----------|------------------|-------------------|--------|
| UC-1 | Program selection completion rate | User stops searching for alternatives | >90% completion |
| UC-2 | Post-workout validation engagement | Reduced "is this enough?" support questions | <5% questions |
| UC-3 | Photo upload frequency | User continues training past 8 weeks | >60% retention |
| UC-4 | Modified workouts completed | Increased weekly workout consistency | +20% consistency |
| UC-5 | Exercise substitution usage | Training continues despite minor pain | <10% skipped sessions |
| UC-6 | Pattern analysis engagement | Injury recurrence rate reduction | -50% recurrence |
| UC-7 | Progression acceptance rate | Consistent strength/volume increases | >80% acceptance |

---

## Key Insights

1. **Use cases cluster around CONFIDENCE** - Nearly every interaction reinforces "you're doing it right"

2. **Automation removes decision paralysis** - User makes <5 decisions per week (program, time available, pain y/n)

3. **Pattern intelligence is differentiator** - App gets smarter about user's needs over time (injury triggers, time constraints, progression pace)

4. **Validation > Flexibility** - Counter-intuitive: limiting choices increases satisfaction

5. **Pain points are interconnected** - Solving information overload also helps self-doubt; solving self-doubt helps adherence

---

## Next Steps

1. **User Story Writing** - Convert each use case into detailed user stories for development
2. **Wireframe Critical Paths** - Sketch key screens for P0 use cases (UC-1, UC-2, UC-7)
3. **Data Model Design** - Define data structure to support pattern intelligence
4. **Validation Testing** - Landing page with use case descriptions to test resonance

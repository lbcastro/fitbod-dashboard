'use client';

import { useState, useEffect } from 'react';
import ExerciseChart from './ExerciseChart';
import ProgressSummary from './ProgressSummary';
import { WorkoutData, MuscleGroup } from '@/lib/types';

// Import status calculation logic for consistency
type Status = 'progress' | 'stable' | 'attention' | 'inactive';

// Simplified week data for calculations
interface SimpleWeekData {
  max: number;
  maxReps: number;
}

// Calculate linear regression slope for exercise performance over time
function calculateTrendSlope(weeks: Record<string, SimpleWeekData>, dateRange: number): { slope: number; workoutCount: number } {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  const filteredWeeks = Object.entries(weeks)
    .filter(([weekStart]) => weekStart >= cutoffStr)
    .sort(([a], [b]) => a.localeCompare(b));

  // Minimum 3 workouts required for trend calculation
  if (filteredWeeks.length < 3) {
    return { slope: 0, workoutCount: filteredWeeks.length };
  }

  // Convert dates to numeric values (days since first workout)
  const firstDate = new Date(filteredWeeks[0][0]);
  const lastDate = new Date(filteredWeeks[filteredWeeks.length - 1][0]);
  const totalDays = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
  const midpoint = totalDays / 2;

  const dataPoints = filteredWeeks.map(([weekStart, data]) => {
    const date = new Date(weekStart);
    const daysSinceStart = (date.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);

    // Use max weight as primary metric
    const weight = data.max;

    // Recency weight: 2x for workouts in the second half of the period
    const recencyWeight = daysSinceStart >= midpoint ? 2 : 1;

    return { x: daysSinceStart, y: weight, weight: recencyWeight };
  });

  // Weighted linear regression: y = mx + b
  const sumW = dataPoints.reduce((sum, p) => sum + p.weight, 0);
  const sumWX = dataPoints.reduce((sum, p) => sum + p.weight * p.x, 0);
  const sumWY = dataPoints.reduce((sum, p) => sum + p.weight * p.y, 0);
  const sumWXY = dataPoints.reduce((sum, p) => sum + p.weight * p.x * p.y, 0);
  const sumWX2 = dataPoints.reduce((sum, p) => sum + p.weight * p.x * p.x, 0);

  // Weighted slope formula: m = (sumW*sumWXY - sumWX*sumWY) / (sumW*sumWX2 - sumWX^2)
  const numerator = sumW * sumWXY - sumWX * sumWY;
  const denominator = sumW * sumWX2 - sumWX * sumWX;

  if (denominator === 0) {
    return { slope: 0, workoutCount: filteredWeeks.length };
  }

  const slope = numerator / denominator;
  const workoutCount = filteredWeeks.length;

  return { slope, workoutCount };
}

function calculateMuscleStatus(
  workoutData: WorkoutData,
  muscle: MuscleGroup,
  dateRange: number
): { status: Status; color: string; message: string } {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  // Find exercises for this muscle group WITH data in the date range
  const exercises = Object.entries(workoutData).filter(([, data]) => {
    const isPrimary = data.muscle === muscle;
    const hasData = Object.keys(data.weeks).some(weekStart => weekStart >= cutoffStr);
    return isPrimary && hasData;
  });

  if (exercises.length === 0) {
    return { status: 'inactive', color: '#737373', message: 'No recent activity' };
  }

  let weightedSlopeSum = 0;
  let totalWorkouts = 0;

  // Calculate frequency-weighted average slope across all exercises
  exercises.forEach(([, data]) => {
    const { slope, workoutCount } = calculateTrendSlope(data.weeks, dateRange);
    weightedSlopeSum += slope * workoutCount;
    totalWorkouts += workoutCount;
  });

  if (totalWorkouts === 0) {
    return { status: 'inactive', color: '#737373', message: 'No recent activity' };
  }

  // Average slope weighted by workout frequency
  const avgSlope = weightedSlopeSum / totalWorkouts;

  // Thresholds for slope interpretation (kg per day)
  const significantProgress = 0.1;   // ~0.7kg per week
  const significantDecline = -0.1;   // ~-0.7kg per week

  // Apply status logic
  if (avgSlope >= significantProgress) {
    return { status: 'progress', color: '#4ade80', message: 'Trending stronger' };
  } else if (avgSlope <= significantDecline) {
    return { status: 'attention', color: '#ef4444', message: 'Needs attention' };
  } else if (avgSlope > 0) {
    return { status: 'progress', color: '#4ade80', message: 'Slight upward trend' };
  } else if (avgSlope < 0) {
    return { status: 'stable', color: '#fbbf24', message: 'Slight downward trend' };
  } else {
    return { status: 'stable', color: '#fbbf24', message: 'Maintaining strength' };
  }
}

// Three message variations - randomly selected on each page load
const heroMessages = [
  {
    headline: 'Stop guessing. Start knowing.',
    subheadline: 'See exactly which muscle groups are getting stronger and which need attention. One dashboard. No more "did I do enough?" Just clear proof you\'re on track.'
  },
  {
    headline: 'One dashboard. Every muscle group. Zero guesswork.',
    subheadline: 'Track your max weight week-over-week for all 9 muscle groups in one place. Finally know what\'s working without comparing programs or second-guessing your routine.'
  },
  {
    headline: 'Minimal workouts. Maximum confidence.',
    subheadline: 'Know you\'re hitting every muscle group effectively without living in the gym. Track what matters most: are you getting stronger week-over-week, or leaving gains on the table?'
  }
];

// Generate realistic demo data with gaps (12 weeks back)
const getWeekDates = (count: number) => {
  const dates = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - (i * 7));
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const allWeeks = getWeekDates(12);

// Chest Exercise 1: Incline Bench Press - progressing (with gaps showing inconsistent training, then consistency)
const inclineBenchWeeks = {
  [allWeeks[0]]: { max: 52.5, maxReps: 8, sets: 3, load: 1260 },
  [allWeeks[1]]: { max: 55, maxReps: 7, sets: 3, load: 1155 },
  // Gap - no training weeks 2-4
  [allWeeks[5]]: { max: 55, maxReps: 8, sets: 3, load: 1320 },
  [allWeeks[6]]: { max: 57.5, maxReps: 6, sets: 3, load: 1035 },
  // Consistent period starts
  [allWeeks[7]]: { max: 57.5, maxReps: 7, sets: 3, load: 1207.5 },
  [allWeeks[8]]: { max: 60, maxReps: 6, sets: 3, load: 1080 },
  [allWeeks[9]]: { max: 60, maxReps: 7, sets: 3, load: 1260 },
  [allWeeks[10]]: { max: 62.5, maxReps: 6, sets: 3, load: 1125 },
  [allWeeks[11]]: { max: 62.5, maxReps: 7, sets: 3, load: 1312.5 }
};

// Chest Exercise 2: Dumbbell Fly - stable/slight decline (showing value of tracking)
const dumbbellFlyWeeks = {
  [allWeeks[0]]: { max: 14, maxReps: 12, sets: 3, load: 504 },
  // Gap
  [allWeeks[5]]: { max: 14, maxReps: 12, sets: 3, load: 504 },
  [allWeeks[6]]: { max: 14, maxReps: 11, sets: 3, load: 462 },
  [allWeeks[7]]: { max: 14, maxReps: 10, sets: 3, load: 420 },
  [allWeeks[8]]: { max: 12, maxReps: 12, sets: 3, load: 432 },
  [allWeeks[9]]: { max: 12, maxReps: 11, sets: 3, load: 396 },
  [allWeeks[10]]: { max: 12, maxReps: 10, sets: 3, load: 360 },
  [allWeeks[11]]: { max: 12, maxReps: 10, sets: 3, load: 360 }
};

// Biceps: Barbell Curl - declining (inconsistent, then decline)
const barbellCurlWeeks = {
  [allWeeks[0]]: { max: 25, maxReps: 8, sets: 3, load: 600 },
  [allWeeks[1]]: { max: 25, maxReps: 9, sets: 3, load: 675 },
  [allWeeks[2]]: { max: 27.5, maxReps: 6, sets: 3, load: 495 },
  // Gap
  [allWeeks[6]]: { max: 25, maxReps: 7, sets: 3, load: 525 },
  [allWeeks[7]]: { max: 25, maxReps: 8, sets: 3, load: 600 },
  [allWeeks[8]]: { max: 22.5, maxReps: 8, sets: 3, load: 540 },
  [allWeeks[9]]: { max: 22.5, maxReps: 9, sets: 3, load: 607.5 },
  [allWeeks[10]]: { max: 20, maxReps: 10, sets: 3, load: 600 },
  [allWeeks[11]]: { max: 20, maxReps: 10, sets: 3, load: 600 }
};

// Chest Exercise 3: Chest Dip - strong progress (bodyweight)
const chestDipWeeks = {
  [allWeeks[7]]: { max: 0, maxReps: 8, sets: 3, load: 1920 },
  [allWeeks[8]]: { max: 0, maxReps: 10, sets: 3, load: 2400 },
  [allWeeks[9]]: { max: 0, maxReps: 11, sets: 3, load: 2640 },
  [allWeeks[10]]: { max: 0, maxReps: 12, sets: 3, load: 2880 },
  [allWeeks[11]]: { max: 0, maxReps: 13, sets: 3, load: 3120 }
};

// Quadriceps Exercise 1: Leg Extension - declining (needs attention)
const legExtensionWeeks = {
  [allWeeks[1]]: { max: 90, maxReps: 10, sets: 3, load: 2700 },
  [allWeeks[2]]: { max: 90, maxReps: 11, sets: 3, load: 2970 },
  // Gap
  [allWeeks[5]]: { max: 85, maxReps: 10, sets: 3, load: 2550 },
  [allWeeks[6]]: { max: 85, maxReps: 9, sets: 3, load: 2295 },
  // Gap
  [allWeeks[8]]: { max: 82.5, maxReps: 10, sets: 3, load: 2475 },
  [allWeeks[9]]: { max: 80, maxReps: 11, sets: 3, load: 2640 },
  [allWeeks[10]]: { max: 80, maxReps: 10, sets: 3, load: 2400 },
  [allWeeks[11]]: { max: 77.5, maxReps: 10, sets: 3, load: 2325 }
};

// Quadriceps Exercise 2: Leg Press - stable
const legPressWeeks = {
  [allWeeks[5]]: { max: 140, maxReps: 12, sets: 3, load: 5040 },
  [allWeeks[6]]: { max: 140, maxReps: 13, sets: 3, load: 5460 },
  [allWeeks[8]]: { max: 140, maxReps: 12, sets: 3, load: 5040 },
  [allWeeks[9]]: { max: 145, maxReps: 10, sets: 3, load: 4350 },
  [allWeeks[10]]: { max: 140, maxReps: 12, sets: 3, load: 5040 },
  [allWeeks[11]]: { max: 145, maxReps: 11, sets: 3, load: 4785 }
};

// Create demo workout data for ProgressSummary component
const demoWorkoutData: WorkoutData = {
  'Barbell Incline Bench Press': {
    muscle: 'Chest',
    secondary: [],
    weeks: inclineBenchWeeks
  },
  'Dumbbell Incline Fly': {
    muscle: 'Chest',
    secondary: [],
    weeks: dumbbellFlyWeeks
  },
  'Barbell Curl': {
    muscle: 'Biceps',
    secondary: [],
    weeks: barbellCurlWeeks
  },
  'Leg Extension': {
    muscle: 'Quadriceps',
    secondary: [],
    weeks: legExtensionWeeks
  },
  'Leg Press': {
    muscle: 'Quadriceps',
    secondary: [],
    weeks: legPressWeeks
  },
  // Add stable muscle groups
  'Bent Over Barbell Row': {
    muscle: 'Back',
    secondary: [],
    weeks: {
      [allWeeks[7]]: { max: 50, maxReps: 10, sets: 3, load: 1500 },
      [allWeeks[8]]: { max: 50, maxReps: 11, sets: 3, load: 1650 },
      [allWeeks[9]]: { max: 52.5, maxReps: 10, sets: 3, load: 1575 },
      [allWeeks[10]]: { max: 52.5, maxReps: 10, sets: 3, load: 1575 },
      [allWeeks[11]]: { max: 52.5, maxReps: 11, sets: 3, load: 1732.5 }
    }
  },
  'Barbell Shoulder Press': {
    muscle: 'Shoulders',
    secondary: [],
    weeks: {
      [allWeeks[7]]: { max: 25, maxReps: 8, sets: 3, load: 600 },
      [allWeeks[8]]: { max: 27.5, maxReps: 6, sets: 3, load: 495 },
      [allWeeks[9]]: { max: 27.5, maxReps: 7, sets: 3, load: 577.5 },
      [allWeeks[10]]: { max: 30, maxReps: 5, sets: 3, load: 450 },
      [allWeeks[11]]: { max: 30, maxReps: 6, sets: 3, load: 540 }
    }
  },
  'Dip': {
    muscle: 'Triceps',
    secondary: [],
    weeks: {
      [allWeeks[8]]: { max: 0, maxReps: 12, sets: 3, load: 2880 },
      [allWeeks[9]]: { max: 0, maxReps: 13, sets: 3, load: 3120 },
      [allWeeks[10]]: { max: 0, maxReps: 13, sets: 3, load: 3120 },
      [allWeeks[11]]: { max: 0, maxReps: 14, sets: 3, load: 3360 }
    }
  },
  'Romanian Deadlift': {
    muscle: 'Hamstrings',
    secondary: [],
    weeks: {
      [allWeeks[8]]: { max: 60, maxReps: 10, sets: 3, load: 1800 },
      [allWeeks[9]]: { max: 60, maxReps: 11, sets: 3, load: 1980 },
      [allWeeks[10]]: { max: 62.5, maxReps: 10, sets: 3, load: 1875 },
      [allWeeks[11]]: { max: 62.5, maxReps: 10, sets: 3, load: 1875 }
    }
  },
  'Hip Thrust': {
    muscle: 'Glutes',
    secondary: [],
    weeks: {
      [allWeeks[9]]: { max: 80, maxReps: 12, sets: 3, load: 2880 },
      [allWeeks[10]]: { max: 82.5, maxReps: 11, sets: 3, load: 2722.5 },
      [allWeeks[11]]: { max: 82.5, maxReps: 12, sets: 3, load: 2970 }
    }
  },
  'Chest Dip': {
    muscle: 'Chest',
    secondary: [],
    weeks: chestDipWeeks
  }
};

export default function LandingSections() {
  // Select random message on mount (client-side only)
  const [selectedMessage, setSelectedMessage] = useState(heroMessages[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroMessages.length);
    setSelectedMessage(heroMessages[randomIndex]);
  }, []);

  // Calculate muscle group statuses for consistency
  const chestStatus = calculateMuscleStatus(demoWorkoutData, 'Chest', 84);
  const quadsStatus = calculateMuscleStatus(demoWorkoutData, 'Quadriceps', 84);

  return (
    <div className="landing-sections">
      {/* Scroll hint */}
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-xl) 0',
        color: '#525252',
        fontSize: 'var(--text-sm)'
      }}>
        Scroll to learn more ↓
      </div>

      {/* Section 1: Hero - Value proposition */}
      <section className="landing-section" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(3rem, 10vh, 6rem) var(--space-xl)',
        textAlign: 'center'
      }}>
        {/* Headline - Large, bold, high impact */}
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)',
          maxWidth: '900px',
          letterSpacing: '-0.02em'
        }}>
          {selectedMessage.headline}
        </h2>

        {/* Subheadline - Clear, readable, supportive */}
        <p style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
          color: '#d4d4d4',
          maxWidth: '700px',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          {selectedMessage.subheadline}
        </p>
      </section>

      {/* Section 2: Progress summary grid */}
      <section className="landing-section" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--space-3xl) var(--space-lg)'
      }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <h3 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 'var(--space-2xl)',
            textAlign: 'center'
          }}>
            See everything at a glance
          </h3>

          <ProgressSummary
            workoutData={demoWorkoutData}
            dateRange={84}
            hideInactive={false}
          />

          <p style={{
            fontSize: 'var(--text-sm)',
            color: '#737373',
            textAlign: 'center',
            marginTop: 'var(--space-xl)'
          }}>
            Instantly see which muscles are progressing, stable, or need attention
          </p>
        </div>
      </section>

      {/* Section 3: Detailed charts */}
      <section className="landing-section" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--space-3xl) var(--space-lg)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <h3 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 'var(--space-2xl)',
            textAlign: 'center'
          }}>
            Drill into the details
          </h3>

          {/* Chest muscle group - mostly positive with one issue caught */}
          <div className="muscle-group-card">
            <div className="muscle-group-header">
              <h3 className="muscle-group-name">Chest</h3>
              <span className="muscle-group-summary">3 exercises • 18 workouts</span>
            </div>

            <div className="muscle-group-benchmark" style={{ color: chestStatus.color }}>
              {chestStatus.message}
            </div>

            <div className="exercises-list">
              {/* Exercise 1: Incline Bench Press - progressing */}
              <div className="exercise-grid">
                <div className="exercise-info">
                  <span className="exercise-name">Barbell Incline Bench Press</span>
                  <span className="exercise-status" style={{ color: '#4ade80' }}>
                    Adding max reps
                  </span>
                </div>
                <div className="exercise-chart">
                  <ExerciseChart
                    exerciseName="Barbell Incline Bench Press"
                    weeks={inclineBenchWeeks}
                    dateRange={84}
                    allWeeks={allWeeks}
                    status="Adding max reps"
                  />
                </div>
              </div>

              {/* Exercise 2: Dumbbell Fly - declining (caught early!) */}
              <div className="exercise-grid">
                <div className="exercise-info">
                  <span className="exercise-name">Dumbbell Incline Fly</span>
                  <span className="exercise-status" style={{ color: '#ef4444' }}>
                    Declining max weight
                  </span>
                </div>
                <div className="exercise-chart">
                  <ExerciseChart
                    exerciseName="Dumbbell Incline Fly"
                    weeks={dumbbellFlyWeeks}
                    dateRange={84}
                    allWeeks={allWeeks}
                    status="Declining max weight"
                  />
                </div>
              </div>

              {/* Exercise 3: Chest Dip - progressing */}
              <div className="exercise-grid">
                <div className="exercise-info">
                  <span className="exercise-name">Chest Dip</span>
                  <span className="exercise-status" style={{ color: '#4ade80' }}>
                    Adding max reps
                  </span>
                </div>
                <div className="exercise-chart">
                  <ExerciseChart
                    exerciseName="Chest Dip"
                    weeks={chestDipWeeks}
                    dateRange={84}
                    allWeeks={allWeeks}
                    status="Adding max reps"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quadriceps muscle group - mixed signals need attention */}
          <div className="muscle-group-card">
            <div className="muscle-group-header">
              <h3 className="muscle-group-name">Quadriceps</h3>
              <span className="muscle-group-summary">2 exercises • 14 workouts</span>
            </div>

            <div className="muscle-group-benchmark" style={{ color: quadsStatus.color }}>
              {quadsStatus.message}
            </div>

            <div className="exercises-list">
              {/* Exercise 1: Leg Extension - declining */}
              <div className="exercise-grid">
                <div className="exercise-info">
                  <span className="exercise-name">Leg Extension</span>
                  <span className="exercise-status" style={{ color: '#ef4444' }}>
                    Declining max weight
                  </span>
                </div>
                <div className="exercise-chart">
                  <ExerciseChart
                    exerciseName="Leg Extension"
                    weeks={legExtensionWeeks}
                    dateRange={84}
                    allWeeks={allWeeks}
                    status="Declining max weight"
                  />
                </div>
              </div>

              {/* Exercise 2: Leg Press - stable */}
              <div className="exercise-grid">
                <div className="exercise-info">
                  <span className="exercise-name">Leg Press</span>
                  <span className="exercise-status" style={{ color: '#fbbf24' }}>
                    Stable performance
                  </span>
                </div>
                <div className="exercise-chart">
                  <ExerciseChart
                    exerciseName="Leg Press"
                    weeks={legPressWeeks}
                    dateRange={84}
                    allWeeks={allWeeks}
                    status="Stable performance"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fade gradient overlay - suggests more content below */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'clamp(150px, 25vh, 300px)',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.9) 80%, #000000 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
      </section>

      {/* Section 4: Upload process */}
      <section className="landing-section" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--space-3xl) var(--space-lg)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '500px' }}>
          <h3 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 'var(--space-xl)'
          }}>
            Simple to use
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xl)',
            textAlign: 'left'
          }}>
            <div>
              <div style={{
                fontSize: 'var(--text-lg)',
                color: '#4ade80',
                fontWeight: 600,
                marginBottom: 'var(--space-sm)'
              }}>
                1. Export from Fitbod
              </div>
              <div style={{
                fontSize: 'var(--text-base)',
                color: '#a3a3a3',
                lineHeight: 1.6
              }}>
                Log → Settings → Export Workout Data
              </div>
            </div>

            <div>
              <div style={{
                fontSize: 'var(--text-lg)',
                color: '#4ade80',
                fontWeight: 600,
                marginBottom: 'var(--space-sm)'
              }}>
                2. Upload to Jacked
              </div>
              <div style={{
                fontSize: 'var(--text-base)',
                color: '#a3a3a3',
                lineHeight: 1.6
              }}>
                Drop your CSV file above and see your progress instantly
              </div>
            </div>

            <div>
              <div style={{
                fontSize: 'var(--text-lg)',
                color: '#4ade80',
                fontWeight: 600,
                marginBottom: 'var(--space-sm)'
              }}>
                3. Know what's working
              </div>
              <div style={{
                fontSize: 'var(--text-base)',
                color: '#a3a3a3',
                lineHeight: 1.6
              }}>
                No more guessing if you're leaving muscles behind
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 'var(--space-3xl)',
            padding: 'var(--space-lg)',
            background: 'rgba(74, 222, 128, 0.05)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: 'var(--radius-md)'
          }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontSize: 'var(--text-base)',
                color: '#4ade80',
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              Get started ↑
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

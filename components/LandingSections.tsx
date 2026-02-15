'use client';

import { useState, useEffect } from 'react';
import ExerciseChart from './ExerciseChart';
import ProgressSummary from './ProgressSummary';
import FAQ from './FAQ';
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
    headline: 'Training hard but not seeing results? Here\'s why.',
    subheadline: 'Most people train chest 2x/week but never see it grow because they\'re not actually getting stronger. Upload your Fitbod data in 30 seconds and see which muscle groups are progressing - and which ones have been stuck for months.'
  },
  {
    headline: 'You\'ve tried switching programs. Nothing works.',
    subheadline: 'Because you can\'t see which muscles are actually responding. Jacked shows you in 30 seconds which muscle groups are progressing, stuck, or declining. Know what to fix.'
  },
  {
    headline: 'Stop wondering why nothing\'s changing. See exactly which muscles aren\'t growing.',
    subheadline: 'Upload your Fitbod export. See week-over-week trends for each muscle group. Know immediately which muscles are responding to your training and which need different exercises, more frequency, or heavier weight.'
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

      {/* Section 1.5: Fitbod Complement - Not Replacement */}
      <section className="landing-section" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--space-3xl) var(--space-lg)'
      }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <h3 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 'var(--space-sm)',
            textAlign: 'center'
          }}>
            Fitbod tracks exercises. Jacked shows which muscles are growing.
          </h3>

          <p style={{
            fontSize: 'var(--text-base)',
            color: '#a3a3a3',
            textAlign: 'center',
            marginBottom: 'var(--space-3xl)',
            maxWidth: '600px',
            margin: '0 auto var(--space-3xl)'
          }}>
            Keep using Fitbod for your workouts. Use Jacked to see the bigger picture.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            {/* Fitbod Column */}
            <div style={{
              padding: 'var(--space-xl)',
              background: 'rgba(115, 115, 115, 0.05)',
              border: '1px solid rgba(115, 115, 115, 0.2)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: '#a3a3a3',
                marginBottom: 'var(--space-lg)'
              }}>
                What Fitbod shows
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)'
              }}>
                <li style={{ color: '#d4d4d4', fontSize: 'var(--text-base)' }}>
                  ✓ Individual exercise logs
                </li>
                <li style={{ color: '#d4d4d4', fontSize: 'var(--text-base)' }}>
                  ✓ Daily workout summaries
                </li>
                <li style={{ color: '#d4d4d4', fontSize: 'var(--text-base)' }}>
                  ✓ Personal records per exercise
                </li>
                <li style={{ color: '#737373', fontSize: 'var(--text-base)' }}>
                  ✗ Muscle group trends
                </li>
                <li style={{ color: '#737373', fontSize: 'var(--text-base)' }}>
                  ✗ Lagging body part detection
                </li>
                <li style={{ color: '#737373', fontSize: 'var(--text-base)' }}>
                  ✗ Cross-exercise muscle analysis
                </li>
              </ul>
            </div>

            {/* Jacked Column */}
            <div style={{
              padding: 'var(--space-xl)',
              background: 'rgba(74, 222, 128, 0.05)',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: '#4ade80',
                marginBottom: 'var(--space-lg)'
              }}>
                What Jacked shows
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)'
              }}>
                <li style={{ color: '#4ade80', fontSize: 'var(--text-base)' }}>
                  ✓ All muscle groups at once
                </li>
                <li style={{ color: '#4ade80', fontSize: 'var(--text-base)' }}>
                  ✓ Week-over-week strength trends
                </li>
                <li style={{ color: '#4ade80', fontSize: 'var(--text-base)' }}>
                  ✓ Progressing vs declining indicators
                </li>
                <li style={{ color: '#4ade80', fontSize: 'var(--text-base)' }}>
                  ✓ Training frequency per muscle
                </li>
                <li style={{ color: '#4ade80', fontSize: 'var(--text-base)' }}>
                  ✓ Lagging body part identification
                </li>
                <li style={{ color: '#4ade80', fontSize: 'var(--text-base)' }}>
                  ✓ Muscle-level progress proof
                </li>
              </ul>
            </div>
          </div>

          <div style={{
            marginTop: 'var(--space-2xl)',
            padding: 'var(--space-lg)',
            background: 'rgba(74, 222, 128, 0.05)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: 'var(--text-base)',
              color: '#d4d4d4',
              margin: 0
            }}>
              Keep using Fitbod for workouts. Use Jacked to see if they're working.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2.5: Failed Alternatives - Empathy */}
      <section className="landing-section" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--space-3xl) var(--space-lg)'
      }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <h3 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 'var(--space-sm)',
            textAlign: 'center'
          }}>
            You've tried everything. This is different.
          </h3>

          <p style={{
            fontSize: 'var(--text-base)',
            color: '#a3a3a3',
            textAlign: 'center',
            marginBottom: 'var(--space-3xl)',
            maxWidth: '600px',
            margin: '0 auto var(--space-3xl)'
          }}>
            Switching programs, manual tracking, hoping for the best - none of them show you which muscles are actually responding.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            {/* Column 1: What You've Tried */}
            <div style={{
              padding: 'var(--space-xl)',
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: '#ef4444',
                marginBottom: 'var(--space-lg)'
              }}>
                What you've tried
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)'
              }}>
                <li style={{ color: '#d4d4d4', fontSize: 'var(--text-base)' }}>
                  ✗ Switched programs (didn't know what to change)
                </li>
                <li style={{ color: '#d4d4d4', fontSize: 'var(--text-base)' }}>
                  ✗ Tracked PRs manually (too complex, missed patterns)
                </li>
                <li style={{ color: '#d4d4d4', fontSize: 'var(--text-base)' }}>
                  ✗ Hoped for the best (anxiety, no results)
                </li>
              </ul>
            </div>

            {/* Column 2: The Problem */}
            <div style={{
              padding: 'var(--space-xl)',
              background: 'rgba(251, 191, 36, 0.05)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: '#fbbf24',
                marginBottom: 'var(--space-lg)'
              }}>
                The problem
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)'
              }}>
                <li style={{ color: '#d4d4d4', fontSize: 'var(--text-base)' }}>
                  You can't see which MUSCLES are progressing
                </li>
                <li style={{ color: '#d4d4d4', fontSize: 'var(--text-base)' }}>
                  Exercise PRs ≠ muscle group progress
                </li>
                <li style={{ color: '#d4d4d4', fontSize: 'var(--text-base)' }}>
                  Takes months to realize something isn't working
                </li>
              </ul>
            </div>

            {/* Column 3: What Jacked Does */}
            <div style={{
              padding: 'var(--space-xl)',
              background: 'rgba(74, 222, 128, 0.05)',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: '#4ade80',
                marginBottom: 'var(--space-lg)'
              }}>
                What Jacked does
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)'
              }}>
                <li style={{ color: '#4ade80', fontSize: 'var(--text-base)' }}>
                  ✓ Shows all muscle groups in 30 seconds
                </li>
                <li style={{ color: '#4ade80', fontSize: 'var(--text-base)' }}>
                  ✓ Week-over-week trends you can trust
                </li>
                <li style={{ color: '#4ade80', fontSize: 'var(--text-base)' }}>
                  ✓ Know what to fix before wasting more months
                </li>
              </ul>
            </div>
          </div>

          <div style={{
            marginTop: 'var(--space-2xl)',
            padding: 'var(--space-lg)',
            background: 'rgba(74, 222, 128, 0.05)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: 'var(--text-base)',
              color: '#d4d4d4',
              margin: 0
            }}>
              Your data. Simple math. Immediate action. That's why it works.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3.5: Trust/Transparency - How It Works */}
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
            marginBottom: 'var(--space-sm)',
            textAlign: 'center'
          }}>
            Your data. Simple math. Insights you can verify.
          </h3>

          <p style={{
            fontSize: 'var(--text-base)',
            color: '#a3a3a3',
            textAlign: 'center',
            marginBottom: 'var(--space-3xl)',
            maxWidth: '600px',
            margin: '0 auto var(--space-3xl)'
          }}>
            No black box algorithms. Just straightforward trend analysis on your actual workout history.
          </p>

          <div style={{
            padding: 'var(--space-2xl)',
            background: 'rgba(74, 222, 128, 0.05)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-2xl)'
          }}>
            <h4 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              color: '#4ade80',
              marginBottom: 'var(--space-lg)',
              textAlign: 'center'
            }}>
              How Jacked calculates progress
            </h4>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-lg)',
              color: '#d4d4d4',
              fontSize: 'var(--text-base)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                padding: 'var(--space-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <span style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: '#4ade80',
                  minWidth: '40px'
                }}>
                  1
                </span>
                <div>
                  <strong style={{ color: '#ffffff' }}>Week 1:</strong> You bench 60kg for 8 reps
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                padding: 'var(--space-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <span style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: '#4ade80',
                  minWidth: '40px'
                }}>
                  2
                </span>
                <div>
                  <strong style={{ color: '#ffffff' }}>Week 4:</strong> You bench 62.5kg for 8 reps
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                padding: 'var(--space-md)',
                background: 'rgba(74, 222, 128, 0.1)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(74, 222, 128, 0.3)'
              }}>
                <span style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: '#4ade80',
                  minWidth: '40px'
                }}>
                  ✓
                </span>
                <div>
                  <strong style={{ color: '#4ade80' }}>Result:</strong> Chest is progressing (+4% max weight)
                </div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-lg)'
          }}>
            <div style={{
              padding: 'var(--space-lg)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: 'var(--space-sm)'
              }}>
                100% your data
              </div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: '#a3a3a3',
                lineHeight: 1.6
              }}>
                Not generic advice. Every insight is based on YOUR actual workout history from Fitbod.
              </div>
            </div>

            <div style={{
              padding: 'var(--space-lg)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: 'var(--space-sm)'
              }}>
                Transparent calculations
              </div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: '#a3a3a3',
                lineHeight: 1.6
              }}>
                Click any muscle group to see the exact exercises and weights used. Verify the math yourself.
              </div>
            </div>

            <div style={{
              padding: 'var(--space-lg)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: 'var(--space-sm)'
              }}>
                Immediate action
              </div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: '#a3a3a3',
                lineHeight: 1.6
              }}>
                See what's not working, adjust your training immediately. No waiting months to realize a problem.
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section 4: FAQ */}
      <section className="landing-section" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--space-3xl) var(--space-lg)'
      }}>
        <FAQ />
      </section>


      {/* Section 5: Upload process */}
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

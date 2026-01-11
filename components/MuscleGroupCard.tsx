'use client';

import dynamic from 'next/dynamic';
import { WorkoutData, MuscleGroup } from '@/lib/types';

// Dynamic import to prevent SSR issues with Chart.js
const ExerciseChart = dynamic(() => import('./ExerciseChart'), {
  ssr: false,
  loading: () => (
    <div className="h-20 flex items-center justify-center text-gray-500 text-sm">
      Loading chart...
    </div>
  ),
});

interface MuscleGroupCardProps {
  muscle: MuscleGroup;
  workoutData: WorkoutData;
  dateRange: number;
  hideInactive: boolean;
  allWeeks: string[];
}

function calculateExerciseStatus(weeks: Record<string, any>, dateRange: number): string {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  const filteredWeeks = Object.entries(weeks)
    .filter(([weekStart]) => weekStart >= cutoffStr)
    .sort(([a], [b]) => a.localeCompare(b));

  if (filteredWeeks.length < 2) return 'Stable performance';

  // Compare last 2 weeks
  const lastTwo = filteredWeeks.slice(-2);
  const [, prevWeek] = lastTwo[0];
  const [, lastWeek] = lastTwo[1];

  const weightChange = lastWeek.max - prevWeek.max;
  const repsChange = lastWeek.maxReps - prevWeek.maxReps;

  if (weightChange > 0) return 'Adding max weight';
  if (repsChange > 0) return 'Adding max reps';
  if (weightChange < 0) return 'Declining max weight';
  if (weightChange === 0 && repsChange < 0) return 'Declining max reps';
  return 'Stable performance';
}

// Calculate linear regression slope for exercise performance over time
function calculateTrendSlope(weeks: Record<string, any>, dateRange: number): { slope: number; workoutCount: number } {
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

  return { slope, workoutCount: filteredWeeks.length };
}

function calculateMuscleGroupBenchmark(exercises: [string, any][], dateRange: number): { text: string; color: string } {
  if (exercises.length === 0) {
    return { text: 'No recent activity', color: '#737373' };
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
    return { text: 'No recent activity', color: '#737373' };
  }

  // Average slope weighted by workout frequency
  const avgSlope = weightedSlopeSum / totalWorkouts;

  // Thresholds for slope interpretation (kg per day)
  // Positive slope = improving, negative = declining
  const significantProgress = 0.1;   // ~0.7kg per week
  const significantDecline = -0.1;   // ~-0.7kg per week

  if (avgSlope >= significantProgress) {
    return { text: 'Trending stronger', color: '#4ade80' };
  } else if (avgSlope <= significantDecline) {
    return { text: 'Trending weaker', color: '#ef4444' };
  } else if (avgSlope > 0) {
    return { text: 'Slight upward trend', color: '#4ade80' };
  } else if (avgSlope < 0) {
    return { text: 'Slight downward trend', color: '#fbbf24' };
  } else {
    return { text: 'Maintaining strength', color: '#fbbf24' };
  }
}

export default function MuscleGroupCard({ muscle, workoutData, dateRange, hideInactive, allWeeks }: MuscleGroupCardProps) {
  // Filter exercises for this muscle group (primary or secondary)
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  const allExercises = Object.entries(workoutData)
    .filter(([, data]) => {
      // Only show exercises where this muscle is primary
      const isPrimary = data.muscle === muscle;

      // Check if there's data in the date range
      const hasData = Object.keys(data.weeks).some(weekStart => weekStart >= cutoffStr);

      return isPrimary && hasData;
    })
    .sort(([, dataA], [, dataB]) => {
      // Count weeks in date range for each exercise
      const freqA = Object.keys(dataA.weeks).filter(w => w >= cutoffStr).length;
      const freqB = Object.keys(dataB.weeks).filter(w => w >= cutoffStr).length;

      // Sort by frequency descending
      if (freqB !== freqA) return freqB - freqA;

      // Tiebreaker: most recent workout first
      const lastA = Object.keys(dataA.weeks).filter(w => w >= cutoffStr).sort().pop() || '';
      const lastB = Object.keys(dataB.weeks).filter(w => w >= cutoffStr).sort().pop() || '';
      return lastB.localeCompare(lastA);
    });

  // Filter inactive exercises if hideInactive is true
  // Hide exercises not performed in the last month
  const exercises = hideInactive
    ? allExercises.filter(([, data]) => {
        // Hide exercises not performed in the last month
        const inactiveThreshold = 30; // days
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() - inactiveThreshold);
        const thresholdStr = thresholdDate.toISOString().split('T')[0];

        // Get most recent workout date within the overall date range
        const lastWorkout = Object.keys(data.weeks)
          .filter(w => w >= cutoffStr)
          .sort()
          .pop();

        // Keep if performed within threshold
        return lastWorkout && lastWorkout >= thresholdStr;
      })
    : allExercises;

  // Empty state: no exercises logged for this muscle group in date range
  if (allExercises.length === 0) {
    return (
      <div
        id={`muscle-${muscle.toLowerCase().replace(/\s+/g, '-')}`}
        className="muscle-group-card"
      >
        <h3
          className="font-medium uppercase tracking-wider"
          style={{ fontSize: 'var(--text-md)', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '8px' }}
        >
          {muscle}
        </h3>
        <p style={{ color: '#737373', fontSize: 'var(--text-sm)' }}>
          No exercises logged
        </p>
      </div>
    );
  }

  // Empty state: hideInactive filter removed all exercises
  if (exercises.length === 0 && hideInactive) {
    const threshold = 30;
    return (
      <div
        id={`muscle-${muscle.toLowerCase().replace(/\s+/g, '-')}`}
        className="muscle-group-card"
      >
        <div className="muscle-group-header">
          <h3
            className="font-medium uppercase tracking-wider"
            style={{ fontSize: 'var(--text-md)', color: '#ffffff', letterSpacing: '0.05em' }}
          >
            {muscle}
          </h3>
          <span className="muscle-group-summary">
            {allExercises.length} exercises
          </span>
        </div>
        <p style={{ color: '#737373', fontSize: 'var(--text-sm)' }}>
          No recent activity (last {threshold} days)
        </p>
      </div>
    );
  }

  // Calculate total workouts for summary (count unique workout sessions)
  const workoutDates = new Set<string>();
  allExercises.forEach(([, exerciseData]) => {
    Object.keys(exerciseData.weeks)
      .filter(weekStart => weekStart >= cutoffStr)
      .forEach(weekStart => workoutDates.add(weekStart));
  });
  const totalWorkouts = workoutDates.size;

  // Calculate benchmark for the muscle group
  const benchmark = calculateMuscleGroupBenchmark(allExercises, dateRange);

  return (
    <div
      id={`muscle-${muscle.toLowerCase().replace(/\s+/g, '-')}`}
      className="muscle-group-card"
    >
      <div className="muscle-group-header">
        <h3 className="muscle-group-name">
          {muscle}
        </h3>
        <span className="muscle-group-summary">
          {allExercises.length} exercises • {totalWorkouts} workouts
        </span>
      </div>

      <div
        className="muscle-group-benchmark"
        style={{
          fontSize: 'var(--text-sm)',
          color: benchmark.color,
          fontWeight: '400',
          marginBottom: 'var(--space-lg)',
        }}
      >
        {benchmark.text}
      </div>

      <div className="exercises-list">
        {exercises.map(([exerciseName, exerciseData]) => {
          const status = calculateExerciseStatus(exerciseData.weeks, dateRange);

          // Determine status color
          let statusColor = '#4ade80'; // progress (green)
          if (status.includes('Declining')) statusColor = '#ef4444'; // attention (red)
          else if (status.includes('Stable')) statusColor = '#fbbf24'; // stable (yellow)

          return (
            <div key={exerciseName} className="exercise-grid">
              <div className="exercise-info">
                <span className="exercise-name">{exerciseName}</span>
                <span className="exercise-status" style={{ color: statusColor }}>
                  {status}
                </span>
              </div>
              <div className="exercise-chart">
                <ExerciseChart
                  exerciseName={exerciseName}
                  weeks={exerciseData.weeks}
                  dateRange={dateRange}
                  allWeeks={allWeeks}
                  status={status}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

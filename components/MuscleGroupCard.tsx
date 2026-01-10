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
  if (weightChange < 0 || repsChange < 0) return 'Declining performance';
  return 'Stable performance';
}

function calculateMuscleGroupBenchmark(exercises: [string, any][], dateRange: number): { text: string; color: string } {
  if (exercises.length === 0) {
    return { text: 'No recent activity', color: '#737373' };
  }

  let progressCount = 0;
  let decliningCount = 0;

  exercises.forEach(([, data]) => {
    const status = calculateExerciseStatus(data.weeks, dateRange);
    if (status.includes('Adding')) progressCount++;
    if (status.includes('Declining')) decliningCount++;
  });

  const progressRatio = progressCount / exercises.length;
  const decliningRatio = decliningCount / exercises.length;

  if (progressRatio >= 0.5) {
    return { text: 'Making steady progress', color: '#4ade80' };
  } else if (decliningRatio >= 0.3) {
    return { text: 'Needs attention', color: '#ef4444' };
  } else if (progressRatio > 0) {
    return { text: 'Breaking PRs consistently', color: '#4ade80' };
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
        style={{
          marginBottom: 'var(--space-3xl)',
        }}
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
        style={{
          marginBottom: 'var(--space-3xl)',
        }}
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
      style={{
        marginBottom: 'var(--space-3xl)',
      }}
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

'use client';

import { WorkoutData, MUSCLE_GROUPS, MuscleGroup } from '@/lib/types';

interface ProgressSummaryProps {
  workoutData: WorkoutData;
  dateRange: number;
  hideInactive: boolean;
}

type Status = 'progress' | 'stable' | 'attention' | 'inactive';

interface MuscleStatus {
  muscle: MuscleGroup;
  status: Status;
}

// Get workout-to-workout comparisons for an exercise
function getWorkoutComparisons(weeks: Record<string, { max: number; maxReps: number }>, dateRange: number): { progress: number; decline: number; stable: number } {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  const filteredWeeks = Object.entries(weeks)
    .filter(([weekStart]) => weekStart >= cutoffStr)
    .sort(([a], [b]) => a.localeCompare(b));

  if (filteredWeeks.length < 2) {
    return { progress: 0, decline: 0, stable: 0 };
  }

  let progress = 0;
  let decline = 0;
  let stable = 0;

  // Compare each consecutive workout pair
  for (let i = 1; i < filteredWeeks.length; i++) {
    const [, prevWeek] = filteredWeeks[i - 1];
    const [, currWeek] = filteredWeeks[i];

    const weightChange = currWeek.max - prevWeek.max;
    const repsChange = currWeek.maxReps - prevWeek.maxReps;

    if (weightChange > 0 || (weightChange === 0 && repsChange > 0)) {
      progress++;
    } else if (weightChange < 0 || (weightChange === 0 && repsChange < 0)) {
      decline++;
    } else {
      stable++;
    }
  }

  return { progress, decline, stable };
}

function calculateMuscleStatus(
  workoutData: WorkoutData,
  muscle: MuscleGroup,
  dateRange: number,
  hideInactive: boolean
): MuscleStatus {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  // Find exercises for this muscle group WITH data in the date range
  // This matches MuscleGroupCard's filtering logic
  const exercises = Object.entries(workoutData).filter(([, data]) => {
    const isPrimary = data.muscle === muscle;
    const hasData = Object.keys(data.weeks).some(weekStart => weekStart >= cutoffStr);
    return isPrimary && hasData;
  });

  if (exercises.length === 0) {
    return { muscle, status: 'inactive' };
  }

  // When hideInactive is true, check for recent activity (last 30 days)
  // This matches the threshold used in MuscleGroupCard
  if (hideInactive) {
    const recentThreshold = 30; // days - same as MuscleGroupCard
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - recentThreshold);
    const recentStr = recentDate.toISOString().split('T')[0];

    const hasRecentActivity = exercises.some(([, data]) =>
      Object.keys(data.weeks).some(weekStart => weekStart >= recentStr)
    );

    if (!hasRecentActivity) {
      return { muscle, status: 'inactive' };
    }
  }

  let totalProgress = 0;
  let totalDecline = 0;
  let totalStable = 0;

  // Aggregate all workout-to-workout comparisons across all exercises
  exercises.forEach(([, data]) => {
    const comparisons = getWorkoutComparisons(data.weeks, dateRange);
    totalProgress += comparisons.progress;
    totalDecline += comparisons.decline;
    totalStable += comparisons.stable;
  });

  const totalComparisons = totalProgress + totalDecline + totalStable;

  if (totalComparisons === 0) {
    return { muscle, status: 'inactive' };
  }

  const progressRatio = totalProgress / totalComparisons;
  const decliningRatio = totalDecline / totalComparisons;

  // Apply same thresholds as MuscleGroupCard benchmark
  let status: Status;
  if (progressRatio >= 0.5) {
    status = 'progress';  // ↑ (Making steady progress)
  } else if (decliningRatio >= 0.3) {
    status = 'attention';  // ↓ (Needs attention)
  } else if (progressRatio > 0) {
    status = 'progress';  // ↑ (Breaking PRs consistently)
  } else {
    status = 'stable';  // → (Maintaining strength)
  }

  return { muscle, status };
}

const statusIcons: Record<Status, string> = {
  progress: '↑',
  stable: '→',
  attention: '↓',
  inactive: '○',
};

const statusColors: Record<Status, string> = {
  progress: '#4ade80',
  stable: '#fbbf24',
  attention: '#ef4444',
  inactive: '#737373',
};

export default function ProgressSummary({ workoutData, dateRange, hideInactive }: ProgressSummaryProps) {
  const muscleStatuses = MUSCLE_GROUPS.map((muscle) =>
    calculateMuscleStatus(workoutData, muscle, dateRange, hideInactive)
  );

  const handleMuscleClick = (muscle: MuscleGroup) => {
    const id = `muscle-${muscle.toLowerCase().replace(/\s+/g, '-')}`;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="rounded-lg"
      style={{
        background: 'rgba(74, 222, 128, 0.05)',
        border: '1px solid rgba(74, 222, 128, 0.2)',
        padding: 'var(--space-xl)',
        marginBottom: 'var(--space-3xl)',
      }}
    >
      <div
        className="border-b"
        style={{
          marginBottom: 'var(--space-lg)',
          paddingBottom: 'var(--space-sm)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2
          className="font-medium uppercase tracking-wider"
          style={{
            fontSize: 'var(--text-sm)',
            color: '#737373'
          }}
        >
          Muscle group overview
        </h2>
      </div>

      <div
        className="grid progress-summary-content"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'var(--space-md)',
          marginTop: 'var(--space-lg)',
        }}
      >
        {muscleStatuses.map(({ muscle, status }) => (
          <div
            key={muscle}
            onClick={() => handleMuscleClick(muscle)}
            className="flex items-center border-b transition-all hover:bg-white/10 cursor-pointer progress-item"
            style={{
              gap: 'var(--space-sm)',
              paddingTop: 'var(--space-sm)',
              paddingBottom: 'var(--space-sm)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              minHeight: '44px',
              opacity: status === 'inactive' ? 0.4 : 1,
            }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0 progress-item-icon"
              style={{
                width: '24px',
                fontSize: '1.25rem',
                color: statusColors[status],
              }}
            >
              {statusIcons[status]}
            </div>
            <span
              className="flex-1 font-medium uppercase tracking-wider progress-item-muscle"
              style={{
                fontSize: 'var(--text-sm)',
                color: '#ffffff',
                letterSpacing: '0.05em',
              }}
            >
              {muscle}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { WorkoutData, MUSCLE_GROUPS, MuscleGroup } from '@/lib/types';
import {
  calculateMuscleFrequencyPerWeek,
  formatFrequencyPerWeek,
  getFrequencyStepColor,
} from '@/lib/frequency';

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

interface MuscleOverviewItem extends MuscleStatus {
  frequencyPerWeek: number;
}

// Calculate linear regression slope for exercise performance over time
function calculateTrendSlope(weeks: Record<string, { max: number; maxReps: number }>, dateRange: number): { slope: number; workoutCount: number } {
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

  let weightedSlopeSum = 0;
  let totalWorkouts = 0;

  // Calculate frequency-weighted average slope across all exercises
  exercises.forEach(([, data]) => {
    const { slope, workoutCount } = calculateTrendSlope(data.weeks, dateRange);
    weightedSlopeSum += slope * workoutCount;
    totalWorkouts += workoutCount;
  });

  if (totalWorkouts === 0) {
    return { muscle, status: 'inactive' };
  }

  // Average slope weighted by workout frequency
  const avgSlope = weightedSlopeSum / totalWorkouts;

  // Thresholds for slope interpretation (kg per day)
  const significantProgress = 0.1;   // ~0.7kg per week
  const significantDecline = -0.1;   // ~-0.7kg per week

  // Apply same thresholds as MuscleGroupCard benchmark
  let status: Status;
  if (avgSlope >= significantProgress) {
    status = 'progress';  // ↑ (Trending stronger)
  } else if (avgSlope <= significantDecline) {
    status = 'attention';  // ↓ (Trending weaker)
  } else if (avgSlope > 0) {
    status = 'progress';  // ↑ (Slight upward trend)
  } else if (avgSlope < 0) {
    status = 'stable';  // → (Slight downward trend)
  } else {
    status = 'stable';  // → (Maintaining strength)
  }

  return { muscle, status };
}

function capStableIndicatorColor(color: string, status: Status): string {
  if (status !== 'stable') {
    return color;
  }

  // Stable/right arrow should never render as green.
  if (color.toLowerCase() === '#4ade80') {
    return '#facc15';
  }

  return color;
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

const highlightDurationMs = 3000;

export default function ProgressSummary({ workoutData, dateRange, hideInactive }: ProgressSummaryProps) {
  const muscleOverview = useMemo<MuscleOverviewItem[]>(
    () =>
      MUSCLE_GROUPS.filter((m) => m !== 'Cardio').map((muscle) => ({
        muscle,
        status: calculateMuscleStatus(workoutData, muscle, dateRange, hideInactive).status,
        frequencyPerWeek: calculateMuscleFrequencyPerWeek(workoutData, muscle, dateRange),
      })),
    [workoutData, dateRange, hideInactive]
  );
  const [changeHighlights, setChangeHighlights] = useState<Record<string, { color: string; id: number }>>({});
  const prevStatusesRef = useRef<Record<string, Status>>({});
  const highlightTimeoutsRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const nextStatuses = muscleOverview.reduce<Record<string, Status>>((acc, { muscle, status }) => {
      acc[muscle] = status;
      return acc;
    }, {});

    const updates: Record<string, { color: string; id: number }> = {};

    muscleOverview.forEach(({ muscle, status }) => {
      const prevStatus = prevStatusesRef.current[muscle];
      if (prevStatus && prevStatus !== status) {
        const color = statusColors[prevStatus];
        const id = Date.now();
        updates[muscle] = { color, id };

        if (highlightTimeoutsRef.current[muscle]) {
          clearTimeout(highlightTimeoutsRef.current[muscle]);
        }

        highlightTimeoutsRef.current[muscle] = setTimeout(() => {
          setChangeHighlights((current) => {
            if (!current[muscle]) return current;
            const next = { ...current };
            delete next[muscle];
            return next;
          });
        }, highlightDurationMs);
      }
    });

    if (Object.keys(updates).length > 0) {
      setChangeHighlights((current) => ({ ...current, ...updates }));
    }

    prevStatusesRef.current = nextStatuses;
  }, [muscleOverview]);

  useEffect(() => {
    return () => {
      Object.values(highlightTimeoutsRef.current).forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

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
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 'var(--space-md)',
          marginTop: 'var(--space-lg)',
        }}
      >
        {muscleOverview.map(({ muscle, status, frequencyPerWeek }) => {
          const frequencyLabel = formatFrequencyPerWeek(frequencyPerWeek, 1);
          const rawFrequencyIndicatorColor = getFrequencyStepColor(frequencyPerWeek);
          const frequencyIndicatorColor = capStableIndicatorColor(rawFrequencyIndicatorColor, status);

          return (
            <div
              key={muscle}
              onClick={() => handleMuscleClick(muscle)}
              className="flex items-center transition-all hover:bg-white/10 cursor-pointer progress-item"
              style={{
                gap: 'var(--space-sm)',
                padding: 'var(--space-sm)',
                minHeight: '44px',
                opacity: status === 'inactive' ? 0.4 : 1,
              }}
            >
              <div
                key={`${muscle}-${changeHighlights[muscle]?.id ?? 'base'}`}
                className={`flex items-center justify-center flex-shrink-0 progress-item-icon${
                  changeHighlights[muscle] ? ' progress-item-icon-highlight' : ''
                }`}
                style={{
                  width: '24px',
                  height: '24px',
                  fontSize: '1.25rem',
                  lineHeight: 1,
                  background: 'transparent',
                  color: frequencyIndicatorColor,
                  ['--highlight-color' as string]: changeHighlights[muscle]?.color,
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
                  lineHeight: 1,
                }}
                title={`${frequencyLabel} workouts/week`}
                aria-label={`${muscle}: ${frequencyLabel} workouts per week`}
              >
                {muscle}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

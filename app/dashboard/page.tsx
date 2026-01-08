'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { loadWorkoutData, clearWorkoutData } from '@/lib/storage';
import { WorkoutData, MUSCLE_GROUPS } from '@/lib/types';
import ProgressSummary from '@/components/ProgressSummary';
import MuscleGroupCard from '@/components/MuscleGroupCard';

export default function DashboardPage() {
  const router = useRouter();
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [dateRange, setDateRange] = useState(365); // Default: last year
  const [hideInactive, setHideInactive] = useState(true);

  useEffect(() => {
    const stored = loadWorkoutData();
    if (!stored) {
      router.push('/upload');
      return;
    }
    setWorkoutData(stored.data);
  }, [router]);

  // Calculate date range for footer
  const dateRangeText = useMemo(() => {
    if (!workoutData) return '';
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - dateRange);
    const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${formatDate(startDate)} → ${formatDate(endDate)}`;
  }, [dateRange, workoutData]);

  // Get date range label for section title
  const dateRangeLabel = useMemo(() => {
    if (dateRange === 30) return 'Last month';
    if (dateRange === 90) return 'Last 3 months';
    return 'Last year';
  }, [dateRange]);

  // Generate all weeks in the date range for shared X axis
  const allWeeks = useMemo(() => {
    if (!workoutData) return [];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - dateRange);

    // Get all unique week dates from workout data
    const allWeekDates = new Set<string>();
    Object.values(workoutData).forEach(exerciseData => {
      Object.keys(exerciseData.weeks).forEach(weekStart => {
        const weekDate = new Date(weekStart + 'T00:00:00');
        if (weekDate >= cutoffDate) {
          allWeekDates.add(weekStart);
        }
      });
    });

    // Sort and return
    return Array.from(allWeekDates).sort((a, b) => a.localeCompare(b));
  }, [workoutData, dateRange]);

  // Sort muscle groups by workout frequency (descending) - primary muscles only
  const sortedMuscleGroups = useMemo(() => {
    if (!workoutData) return MUSCLE_GROUPS;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - dateRange);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];

    const muscleWorkoutCounts = MUSCLE_GROUPS.map((muscle) => {
      const workoutDates = new Set<string>();

      Object.entries(workoutData)
        .filter(([, data]) => data.muscle === muscle) // Primary only
        .forEach(([, exerciseData]) => {
          Object.keys(exerciseData.weeks)
            .filter(weekStart => weekStart >= cutoffStr)
            .forEach(weekStart => workoutDates.add(weekStart));
        });

      return {
        muscle,
        workoutCount: workoutDates.size,
      };
    });

    return muscleWorkoutCounts
      .sort((a, b) => {
        // Primary: descending by workout count
        if (b.workoutCount !== a.workoutCount) {
          return b.workoutCount - a.workoutCount;
        }
        // Secondary: alphabetical for stable ordering
        return a.muscle.localeCompare(b.muscle);
      })
      .map(({ muscle }) => muscle);
  }, [workoutData, dateRange]);

  if (!workoutData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="dashboard-container">
        {/* Header */}
        <header style={{ marginBottom: '48px', paddingBottom: '24px' }}>
          <h1 className="text-4xl font-extrabold tracking-[0.15em] uppercase relative inline-block pb-2" style={{ marginBottom: '12px' }}>
            Jacked
            <span className="absolute bottom-0 left-0 w-10 h-[3px] bg-[#4ade80] rounded"></span>
          </h1>
          <div className="text-[#a3a3a3] text-base">Feeling stronger?</div>
        </header>

        {/* Date Range Selector */}
        <div className="date-range-selector">
          <span className="date-range-label">Time period:</span>
          <div className="date-range-buttons">
            {[
              { days: 30, label: 'Last month' },
              { days: 90, label: 'Last 3 months' },
              { days: 365, label: 'Last year' }
            ].map(({ days, label }) => (
              <button
                key={days}
                onClick={() => setDateRange(days)}
                className={`date-range-btn ${dateRange === days ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="filter-toggle">
            <input
              type="checkbox"
              id="hide-inactive"
              checked={hideInactive}
              onChange={(e) => setHideInactive(e.target.checked)}
            />
            <label htmlFor="hide-inactive">Hide inactive exercises</label>
          </div>
        </div>

        {/* Progress Summary */}
        <ProgressSummary workoutData={workoutData} dateRange={dateRange} hideInactive={hideInactive} />

        {/* Section Title */}
        <h2 className="text-xs font-medium text-[#737373] uppercase tracking-[0.08em]" style={{ marginBottom: '24px' }}>
          Muscle Group Balance — {dateRangeLabel}
        </h2>

        {/* Muscle Group Details */}
        <div id="muscle-groups-container">
          {sortedMuscleGroups.map((muscle) => (
            <MuscleGroupCard
              key={muscle}
              muscle={muscle}
              workoutData={workoutData}
              dateRange={dateRange}
              hideInactive={hideInactive}
              allWeeks={allWeeks}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-[#1a1a1a] text-center text-xs text-[#737373]">
          {dateRangeText}
        </footer>
      </div>
    </div>
  );
}

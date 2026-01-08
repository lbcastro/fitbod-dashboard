'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="text-[#a3a3a3] text-base">Feeling stronger?</div>
            <Link
              href="/upload"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#737373',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#a3a3a3'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#737373'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </Link>
          </div>
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

        {/* Date Range */}
        <div className="text-xs text-[#737373]" style={{ marginBottom: '24px' }}>
          {dateRangeText}
        </div>

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
      </div>
    </div>
  );
}

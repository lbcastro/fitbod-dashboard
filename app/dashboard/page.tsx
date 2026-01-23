'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadWorkoutData, loadDateRangeSelection, saveDateRangeSelection } from '@/lib/storage';
import { WorkoutData, MUSCLE_GROUPS, WorkoutDateRange } from '@/lib/types';
import ProgressSummary from '@/components/ProgressSummary';
import MuscleGroupCard from '@/components/MuscleGroupCard';

function formatWorkoutDateRange(oldest?: string, mostRecent?: string): string {
  if (!oldest || !mostRecent) return '';

  const formatDate = (dateStr: string) =>
    new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const oldestLabel = formatDate(oldest);
  const mostRecentLabel = formatDate(mostRecent);

  if (oldest === mostRecent) return oldestLabel;

  return `${oldestLabel} – ${mostRecentLabel}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [storedDateRange, setStoredDateRange] = useState<WorkoutDateRange | null>(null);
  const [dateRange, setDateRange] = useState(365); // Default: last year
  const [hideInactive, setHideInactive] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedRange = loadDateRangeSelection();
    if (storedRange !== null) {
      setDateRange(storedRange);
    }
    const stored = loadWorkoutData();
    if (!stored) {
      router.push('/upload');
      return;
    }
    setWorkoutData(stored.data);
    setStoredDateRange(stored.dateRange ?? null);
  }, [router]);

  useEffect(() => {
    saveDateRangeSelection(dateRange);
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
    if (!workoutData) return MUSCLE_GROUPS.filter(m => m !== 'Cardio');

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - dateRange);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];

    const muscleWorkoutCounts = MUSCLE_GROUPS.filter(m => m !== 'Cardio').map((muscle) => {
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

  const overallDateRangeLabel = useMemo(() => {
    if (!workoutData) return '';

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - dateRange);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];

    const workoutDates = new Set<string>();
    Object.values(workoutData).forEach(exerciseData => {
      Object.keys(exerciseData.weeks)
        .filter(weekStart => weekStart >= cutoffStr)
        .forEach(weekStart => workoutDates.add(weekStart));
    });

    const sortedWorkoutDates = Array.from(workoutDates).sort();
    let oldest = sortedWorkoutDates[0];
    let mostRecent = sortedWorkoutDates[sortedWorkoutDates.length - 1];

    if (storedDateRange?.oldest) {
      if (!oldest || storedDateRange.oldest >= cutoffStr) {
        oldest = storedDateRange.oldest;
      }
    }
    if (storedDateRange?.mostRecent) {
      if (!mostRecent || storedDateRange.mostRecent >= cutoffStr) {
        mostRecent = storedDateRange.mostRecent;
      }
    }

    return formatWorkoutDateRange(oldest, mostRecent);
  }, [workoutData, dateRange, storedDateRange]);

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
        <header style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <h1 className="text-4xl font-extrabold tracking-[0.15em] uppercase relative inline-block pb-2" style={{ marginBottom: '12px' }}>
              Jacked
              <span className="absolute bottom-0 left-0 w-10 h-[3px] bg-[#4ade80] rounded"></span>
            </h1>
            {overallDateRangeLabel ? (
              <span className="muscle-group-summary">{overallDateRangeLabel}</span>
            ) : null}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="text-[#a3a3a3] text-base">Feeling stronger?</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
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
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  color: '#737373',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#a3a3a3'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#737373'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
              {menuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: 0,
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    minWidth: '200px',
                    zIndex: 10
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: 'var(--text-sm)',
                      color: '#e5e5e5',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={hideInactive}
                      onChange={(e) => setHideInactive(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    Hide inactive exercises
                  </label>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Date Range Selector */}
        <div className="date-range-selector">
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
        </div>

        {/* Progress Summary */}
        <ProgressSummary workoutData={workoutData} dateRange={dateRange} hideInactive={hideInactive} />

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

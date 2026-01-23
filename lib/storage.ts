// localStorage wrapper for workout data persistence

import { WorkoutData, StoredWorkoutData, WorkoutDateRange } from './types';

const STORAGE_KEY = 'fitbod_workout_data';
const STORAGE_VERSION = '1.0';
const DATE_RANGE_KEY = 'fitbod_date_range_days';

/**
 * Save workout data to localStorage
 */
export function saveWorkoutData(data: WorkoutData, fileName: string, dateRange?: WorkoutDateRange): void {
  try {
    const stored: StoredWorkoutData = {
      version: STORAGE_VERSION,
      data,
      dateRange,
      uploadedAt: new Date().toISOString(),
      fileName
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      throw new Error('Storage quota exceeded. Try a smaller CSV file or clear existing data.');
    }
    throw error;
  }
}

/**
 * Load workout data from localStorage
 */
export function loadWorkoutData(): StoredWorkoutData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    return JSON.parse(stored) as StoredWorkoutData;
  } catch (error) {
    console.error('Failed to load workout data:', error);
    return null;
  }
}

/**
 * Clear workout data from localStorage
 */
export function clearWorkoutData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if workout data exists
 */
export function hasWorkoutData(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

/**
 * Save selected date range (in days) to localStorage
 */
export function saveDateRangeSelection(days: number): void {
  localStorage.setItem(DATE_RANGE_KEY, String(days));
}

/**
 * Load selected date range (in days) from localStorage
 */
export function loadDateRangeSelection(): number | null {
  const stored = localStorage.getItem(DATE_RANGE_KEY);
  if (!stored) {
    return null;
  }
  const parsed = Number(stored);
  return Number.isFinite(parsed) ? parsed : null;
}

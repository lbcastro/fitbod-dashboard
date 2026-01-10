// Core type definitions for Fitbod dashboard

export const MUSCLE_GROUPS = [
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Calves',
] as const;

export type MuscleGroup = typeof MUSCLE_GROUPS[number];

// Raw CSV row from Fitbod export
export interface FitbodCSVRow {
  Date: string;
  Exercise: string;
  Reps: string;
  'Weight(kg)': string;
  'Duration(s)': string;
  'Distance(m)': string;
  Incline: string;
  Resistance: string;
  isWarmup: string;
  Note: string;
  multiplier: string;
}

// Week aggregation data
export interface WeekData {
  max: number;          // Max weight that week
  sets: number;         // Total sets
  maxReps: number;      // Max reps at the max weight
  load: number;         // Sum of (weight × reps × multiplier)
}

// Exercise data structure (matches HTML v8 format)
export interface ExerciseData {
  muscle: MuscleGroup;
  secondary: MuscleGroup[];
  weeks: Record<string, WeekData>;  // { "2025-01-06": {...} }
}

// Full workout dataset
export type WorkoutData = Record<string, ExerciseData>;

// localStorage structure
export interface StoredWorkoutData {
  version: string;          // "1.0"
  data: WorkoutData;
  dateRange?: WorkoutDateRange;
  uploadedAt: string;       // ISO timestamp
  fileName: string;
}

export interface WorkoutDateRange {
  oldest: string;       // YYYY-MM-DD
  mostRecent: string;   // YYYY-MM-DD
}

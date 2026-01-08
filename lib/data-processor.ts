// Data processing logic (ported from Python process_archetype_data.py)

import Papa from 'papaparse';
import { FitbodCSVRow, WorkoutData, ExerciseData, WeekData } from './types';
import { EXERCISE_MUSCLE_MAP } from './constants';

/**
 * Convert date string to Monday of that week in YYYY-MM-DD format.
 * Ported from Python: dt - timedelta(days=dt.weekday())
 */
export function getWeekStart(dateStr: string): string {
  // Fitbod dates: "2025-01-01 06:30:00 PM +0000"
  const datePart = dateStr.split(' ')[0];  // "2025-01-01"
  const dt = new Date(datePart + 'T00:00:00');  // Avoid timezone issues

  const day = dt.getDay();  // 0 = Sunday
  const diff = day === 0 ? 6 : day - 1;  // Monday offset
  dt.setDate(dt.getDate() - diff);

  return dt.toISOString().split('T')[0];
}

/**
 * Parse CSV text into FitbodCSVRow objects
 */
export function parseCSV(csvText: string): Promise<FitbodCSVRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<FitbodCSVRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
        } else {
          resolve(results.data);
        }
      },
      error: (error: Error) => {
        reject(new Error(`CSV parsing failed: ${error.message}`));
      },
    });
  });
}

/**
 * Process CSV rows into WorkoutData structure.
 * Ported from Python process_csv() function.
 */
export function processCSVRows(rows: FitbodCSVRow[]): WorkoutData {
  const workoutData: WorkoutData = {};
  let unknownExercises = new Set<string>();

  rows.forEach(row => {
    // Skip warmup sets (exact match to Python)
    if (row.isWarmup?.toLowerCase() === 'true') {
      return;
    }

    const exercise = row.Exercise?.trim();
    if (!exercise) return;

    const weight = parseFloat(row['Weight(kg)']);
    const reps = parseInt(row.Reps, 10);
    const multiplier = parseFloat(row.multiplier);

    // Validate parsed values
    if (isNaN(weight) || isNaN(reps) || isNaN(multiplier)) {
      return;
    }

    // Get week start date
    const weekStart = getWeekStart(row.Date);

    // Get muscle mapping
    const muscleInfo = EXERCISE_MUSCLE_MAP[exercise];
    if (!muscleInfo) {
      unknownExercises.add(exercise);
      return;
    }

    // Initialize exercise if first time
    if (!workoutData[exercise]) {
      workoutData[exercise] = {
        muscle: muscleInfo.muscle,
        secondary: muscleInfo.secondary,
        weeks: {}
      };
    }

    // Initialize week if first time
    if (!workoutData[exercise].weeks[weekStart]) {
      workoutData[exercise].weeks[weekStart] = {
        max: 0,
        sets: 0,
        maxReps: 0,
        load: 0
      };
    }

    // Calculate load for this set
    const setLoad = weight * reps * multiplier;

    // Update week data (aggregate metrics)
    const weekData = workoutData[exercise].weeks[weekStart];
    weekData.max = Math.max(weekData.max, weight);
    weekData.sets += 1;
    weekData.maxReps = Math.max(weekData.maxReps, reps);
    weekData.load = Math.round((weekData.load + setLoad) * 10) / 10;  // Round to 1 decimal
  });

  // Log unknown exercises
  if (unknownExercises.size > 0) {
    console.warn(`Unknown exercises (${unknownExercises.size}):`, Array.from(unknownExercises).join(', '));
  }

  return workoutData;
}

/**
 * Main processing pipeline: CSV text -> WorkoutData
 */
export async function processWorkoutCSV(csvText: string): Promise<WorkoutData> {
  const rows = await parseCSV(csvText);

  if (rows.length === 0) {
    throw new Error('CSV file is empty');
  }

  const workoutData = processCSVRows(rows);

  if (Object.keys(workoutData).length === 0) {
    throw new Error('No valid exercise data found. Check that CSV contains non-warmup sets with known exercises.');
  }

  return workoutData;
}

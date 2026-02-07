import { MuscleGroup, WorkoutData } from './types';

export function calculateMuscleFrequencyPerWeek(
  workoutData: WorkoutData,
  muscle: MuscleGroup,
  dateRange: number
): number {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  const workoutDates = new Set<string>();

  Object.entries(workoutData)
    .filter(([, data]) => data.muscle === muscle)
    .forEach(([, data]) => {
      Object.keys(data.weeks)
        .filter((weekStart) => weekStart >= cutoffStr)
        .forEach((weekStart) => workoutDates.add(weekStart));
    });

  if (workoutDates.size === 0) {
    return 0;
  }

  const sortedDates = Array.from(workoutDates).sort((a, b) => a.localeCompare(b));
  const firstDate = new Date(`${sortedDates[0]}T00:00:00`);
  const lastDate = new Date(`${sortedDates[sortedDates.length - 1]}T00:00:00`);
  const spanDays = Math.max((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24), 0);
  const activeSpanWeeks = Math.max(spanDays / 7 + 1, 1);

  return workoutDates.size / activeSpanWeeks;
}

export function getFrequencyStepColor(value: number): string {
  const green = '#4ade80';
  const yellow = '#facc15';
  const orange = '#f59e0b';
  const red = '#ef4444';
  const clamped = Math.max(0, Math.min(3, value));

  if (clamped >= 0.75 && clamped <= 2.25) return green;
  if ((clamped >= 0.5 && clamped < 0.75) || (clamped > 2.25 && clamped <= 2.5)) return yellow;
  if ((clamped >= 0.25 && clamped < 0.5) || (clamped > 2.5 && clamped <= 2.75)) return orange;
  return red;
}

export function formatFrequencyPerWeek(value: number, decimals = 1): string {
  const fixed = value.toFixed(decimals);
  return fixed
    .replace(/\.0+$/, '')
    .replace(/(\.\d*[1-9])0+$/, '$1');
}

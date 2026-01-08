'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'react-chartjs-2';
import { WeekData } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface ExerciseChartProps {
  exerciseName: string;
  weeks: Record<string, WeekData>;
  dateRange: number;
  allWeeks: string[];
  status: string;
}

export default function ExerciseChart({ exerciseName, weeks, dateRange, allWeeks, status }: ExerciseChartProps) {
  // Use shared X axis (allWeeks) for consistent alignment across all charts
  if (allWeeks.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center py-4">
        No data in selected date range
      </div>
    );
  }

  // Generate labels from allWeeks
  const labels = allWeeks.map((weekStart) => {
    const date = new Date(weekStart + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Map allWeeks to data, filling gaps with null for weeks without data
  const weightData = allWeeks.map((weekStart) => {
    return weeks[weekStart]?.max ?? null;
  });
  const repsData = allWeeks.map((weekStart) => {
    return weeks[weekStart]?.maxReps ?? null;
  });

  // Determine status color based on passed status (matches MuscleGroupCard)
  let statusColor = '#fbbf24'; // default yellow (stable)
  if (status.includes('Adding')) statusColor = '#4ade80'; // green
  else if (status.includes('Declining')) statusColor = '#ef4444'; // red

  const chartData = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Reps',
        data: repsData,
        backgroundColor: '#3a3a3a',
        borderColor: 'transparent',
        barThickness: 8,
        maxBarThickness: 8,
        yAxisID: 'y1',
        order: 2,
        datalabels: {
          display: false,
        },
      },
      {
        type: 'line' as const,
        label: 'Weight (kg)',
        data: weightData,
        borderColor: statusColor,
        backgroundColor: statusColor,
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: statusColor,
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        tension: 0.2,
        spanGaps: true,
        yAxisID: 'y',
        order: 1,
        datalabels: {
          display: false,
        },
      },
    ],
  };

  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#e5e5e5',
        bodyColor: '#e5e5e5',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '100%' }}>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
}

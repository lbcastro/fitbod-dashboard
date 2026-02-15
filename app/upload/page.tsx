'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileDropzone from '@/components/FileDropzone';
import LandingSections from '@/components/LandingSections';
import { processWorkoutCSV } from '@/lib/data-processor';
import { saveWorkoutData } from '@/lib/storage';

export default function UploadPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      setProgress('Reading CSV file...');

      // Read file as text
      const csvText = await file.text();

      setProgress('Processing workout data... this is going to be cool.');

      const formData = new FormData();
      formData.append('file', file);

      // Upload to server for background blob storage
      // Server responds immediately, then queues blob upload
      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        console.warn('CSV backup upload failed, continuing anyway');
      }

      // Process data
      const { workoutData, dateRange } = await processWorkoutCSV(csvText);

      setProgress('Saving to storage...');

      // Save to localStorage
      saveWorkoutData(workoutData, file.name, dateRange);

      setProgress('All done! Taking you to your dashboard...');

      // Navigate to dashboard
      setTimeout(() => {
        window.location.assign('/dashboard');
      }, 500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsProcessing(false);
      setProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section
        style={{
          minHeight: '100svh',
          position: 'relative',
          paddingBottom: 'calc(var(--space-3xl) + env(safe-area-inset-bottom, 0px))'
        }}
      >
        <div className="dashboard-container" style={{ maxWidth: '800px' }}>
          {/* Header - matching dashboard */}
          <header style={{ marginBottom: '48px', paddingBottom: '24px' }}>
            <h1 className="text-4xl font-extrabold tracking-[0.15em] uppercase relative inline-block pb-2" style={{ marginBottom: '12px' }}>
              Jacked
              <span className="absolute bottom-0 left-0 w-10 h-[3px] bg-[#4ade80] rounded"></span>
            </h1>
            <div className="text-[#a3a3a3] text-base">Feeling stronger?</div>
          </header>

          <FileDropzone onFileSelect={handleFileSelect} isProcessing={isProcessing} />

          {progress && (
            <div style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
              <p style={{ fontSize: 'var(--text-sm)', color: '#a3a3a3' }}>{progress}</p>
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: 'var(--space-xl)',
                padding: 'var(--space-lg) var(--space-xl)',
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: '#ef4444' }}>{error}</p>
            </div>
          )}

          <div
            style={{
              marginTop: 'var(--space-3xl)',
              textAlign: 'center',
              fontSize: 'var(--text-sm)',
              color: '#737373'
            }}
          >
            <p>Export your workout data from Fitbod</p>
            <p style={{ marginTop: 'var(--space-sm)' }}>Log → Settings → Export Workout Data</p>
            <p style={{ marginTop: 'var(--space-xl)', fontSize: 'var(--text-xs)', color: '#737373' }}>
              Starting with Fitbod. More apps coming soon
            </p>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 'calc(var(--space-xl) + env(safe-area-inset-bottom, 0px))',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#525252',
            fontSize: 'var(--text-sm)',
            textAlign: 'center'
          }}
        >
          Scroll to learn more ↓
        </div>
      </section>

      {/* Landing sections for first-time users */}
      <LandingSections />
    </div>
  );
}

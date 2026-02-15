'use client';

import { useState, useCallback } from 'react';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export default function FileDropzone({ onFileSelect, isProcessing }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.name.endsWith('.csv'));

    if (csvFile) {
      onFileSelect(csvFile);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        position: 'relative',
        padding: 'var(--space-3xl)',
        textAlign: 'center',
        background: isDragging ? 'rgba(74, 222, 128, 0.05)' : 'rgba(255, 255, 255, 0.02)',
        border: isDragging ? '2px dashed rgba(74, 222, 128, 0.3)' : '2px dashed rgba(255, 255, 255, 0.1)',
        borderRadius: 'var(--radius-lg)',
        cursor: isProcessing ? 'default' : 'pointer',
        opacity: isProcessing ? 0.5 : 1,
        pointerEvents: isProcessing ? 'none' : 'auto',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!isProcessing && !isDragging) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
      }}
    >
      <input
        type="file"
        accept=".csv"
        onChange={handleFileInput}
        disabled={isProcessing}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: isProcessing ? 'default' : 'pointer'
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        <div>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 500,
              color: '#ffffff',
              marginBottom: 'var(--space-sm)'
            }}
          >
            {isProcessing ? 'Processing...' : 'Drop your Fitbod CSV here'}
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: '#a3a3a3' }}>
            or click to browse
          </p>
        </div>

        {!isProcessing && (
          <p style={{
            fontSize: 'var(--text-xs)',
            color: '#737373',
            marginTop: 'var(--space-md)'
          }}>
            Your data stays on your device. We never see it.
          </p>
        )}
      </div>
    </div>
  );
}

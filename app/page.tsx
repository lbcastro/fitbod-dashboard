'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { hasWorkoutData } from '@/lib/storage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (hasWorkoutData()) {
      router.push('/dashboard');
    } else {
      router.push('/upload');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold tracking-wider mb-4">JACKED</h1>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { getDailyCalendarImageUrl } from '@/services/calendar-image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    const fetchImage = async () => {
      try {
        const url = await getDailyCalendarImageUrl(dayOfYear);
        setImageUrl(url);
        setLoading(false);
      } catch (e: any) {
        setError(e.message || 'Failed to load image');
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Daily Tamil Calendar
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {imageUrl && (
          <div className="relative h-[300px] sm:h-[450px] md:h-[600px] w-[200px] sm:w-[300px] md:w-[400px] shadow-lg rounded-md overflow-hidden">
            <Image
              src={imageUrl}
              alt="Daily Tamil Calendar"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
      </main>
    </div>
  );
}

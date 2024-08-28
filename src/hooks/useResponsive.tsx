'use client';

import { useState, useEffect } from 'react';

export default function useResponsive(): 'mobile' | 'desktop' {
  const [screenWidth, setScreenWidth] = useState<number | null>(
    typeof window !== 'undefined' ? window.innerWidth : null
  );

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Use a debounced function to limit the number of times the updateScreenWidth function is called
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenWidth, 150);
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    updateScreenWidth();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenWidth && screenWidth <= 768 ? 'mobile' : 'desktop';
}

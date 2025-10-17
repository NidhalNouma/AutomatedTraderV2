import { useState, useEffect } from 'react';
import { Banner } from './banners';

export const useBanner = (banners: Banner[], autoRotate = true, interval = 5000) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    if (!autoRotate) return;

    const rotationInterval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, interval);

    return () => clearInterval(rotationInterval);
  }, [banners.length, autoRotate, interval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    } else if (isRightSwipe) {
      setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length);
    }
  };

  const goToNext = () => {
    setCurrentBanner(prev => (prev + 1) % banners.length);
  };

  const goToPrevious = () => {
    setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < banners.length) {
      setCurrentBanner(index);
    }
  };

  return {
    currentBanner,
    currentBannerData: banners[currentBanner],
    setCurrentBanner,
    goToNext,
    goToPrevious,
    goToSlide,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};
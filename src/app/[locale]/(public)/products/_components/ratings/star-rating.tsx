'use client';

import { Star, StarHalf } from 'lucide-react';
import { useState } from 'react';

type StarRatingProps = {
  max?: number; // total number of stars (default 5)
  value: number; // current rating value
  onChange: (value: number) => void; // callback when rating changes
};

export default function StarRating({
  max = 5,
  value,
  onChange,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  // If hovering, show hover state temporarily; otherwise show the saved value
  const displayValue = hover ?? value;

  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;

        return (
          <div
            key={i}
            className='relative cursor-pointer'
            // When the mouse leaves a star, clear the hover state
            onMouseLeave={() => setHover(null)}
          >
            <div
              className='relative w-6 h-6'
              // Handle click — detect half or full star based on click position
              onClick={e => {
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - left;
                const isHalf = clickX < width / 2;
                const newValue = isHalf ? starValue - 0.5 : starValue;
                onChange(newValue);
              }}
              // Handle hover — show live preview for half/full star
              onMouseMove={e => {
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const hoverX = e.clientX - left;
                const isHalf = hoverX < width / 2;
                setHover(isHalf ? starValue - 0.5 : starValue);
              }}
            >
              {/* Render full, half, or empty star based on current display value */}
              {displayValue >= starValue ? (
                <Star className='w-6 h-6 fill-yellow-500 text-yellow-500' />
              ) : displayValue >= starValue - 0.5 ? (
                <StarHalf className='w-6 h-6 fill-yellow-500 text-yellow-500' />
              ) : (
                <Star className='w-6 h-6 text-yellow-500 ' />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

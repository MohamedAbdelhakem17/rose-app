import { Star } from 'lucide-react';
import React from 'react';

//--- Component Props ---
interface ProductRatingProps {
  rateAvg: number;
  rateCount: number;
}
export default function ProductRating({
  rateAvg,
  rateCount,
}: ProductRatingProps) {
  return (
    //--- Product Rating ---
    <div className='flex items-center gap-1.5 my-4 py-4 border-y border-zinc-100'>
      <Star size={20} className='stroke-yellow-500 fill-yellow-500' />
      <p>
        Rating: <span className='font-semibold'>{rateAvg}/5</span>
      </p>
      <span className='text-blue-600 font-medium'>({rateCount} ratings)</span>
    </div>
  );
}

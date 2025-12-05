import { Star, StarHalf } from 'lucide-react';

type RatingIconProps = {
  rate: number;
};

export default function RatingIcon({ rate }: RatingIconProps) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = !Number.isInteger(rate);
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className='flex items-center gap-1 mb-2'>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className='fill-yellow-500 text-yellow-500 size-5' />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <StarHalf className='fill-yellow-500 text-yellow-500 size-5' />
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={i} className='text-yellow-500 size-5' />
      ))}
    </div>
  );
}

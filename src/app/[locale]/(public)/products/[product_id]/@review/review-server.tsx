import { Section } from '@/components/layout';
import RatingIcon from '@/components/shared/rating-icon';
import SectionTitle from '@/components/shared/sedtion-title';
import { Review } from '@/lib/types/reviews';
import { useTranslations } from 'next-intl';

interface ProductReviewServerProps {
  data: { reviews: Review[] };
}

export default function ProductReview({ data }: ProductReviewServerProps) {
  const t = useTranslations('');

  const ratings = data.reviews.map(r => r.rating);
  const avgRating = ratings.length
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : 0;

  return (
    <Section>
      {/* Rating summary */}
      <div className='border-b border-b-zinc-200 dark:border-b-zinc-700'>
        <SectionTitle title={t('product-review-title')} />
        <div className='flex flex-col justify-start items-start pt-2.5 pb-4 font-semibold gap-1'>
          <h3>{t('product-review-general-rating')}</h3>
          <p className='font-bold text-2xl'>
            {avgRating.toFixed(1)}{' '}
            <span className='font-medium text-sm text-zinc-500'>
              ({ratings.length}{' '}
              {t('product-review-rating-count', { count: ratings.length })})
            </span>
          </p>
          <RatingIcon rate={avgRating} />
        </div>
      </div>

      {/* Comments */}
      <div className='flex flex-col gap-4 mt-4'>
        {data.reviews.length ? (
          data.reviews.map(review => (
            <div
              key={review._id}
              className='p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg'
            >
              <div className='flex items-center gap-3 mb-1'>
                <img
                  src={review.user.photo}
                  alt={`${review.user.firstName} ${review.user.lastName}`}
                  className='w-10 h-10 rounded-full object-cover'
                />
                <p className='font-semibold'>
                  {review.user.firstName} {review.user.lastName}
                </p>
              </div>
              <RatingIcon rate={review.rating} />
              <p className='font-medium mt-1'>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className='text-zinc-500'>{t('product-review-no-reviews')}</p>
        )}
      </div>
    </Section>
  );
}

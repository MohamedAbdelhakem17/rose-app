import RatingIcon from '@/components/shared/rating-icon';
import { Review } from '@/lib/types/review';
import { getTranslations } from 'next-intl/server';
import React from 'react';

type ReviewGeneralRateProps = {
  payload: SuccessResponse<Review>;
};
export default async function ReviewGeneralRate({
  payload,
}: ReviewGeneralRateProps) {
  // Translate
  const t = await getTranslations();

  console.log(payload.reviews);
  

  return payload.reviews.map(el => (
    <div
      key={el._id}
      className=' flex flex-col justify-start items-start pt-2.5 pb-4 font-semibold gap-1 border-b border-b-zinc-200 dark:border-b-zinc-700'
    >
      <h2 className=' first-letter:uppercase'>{t('general-rate')}</h2>
      <div className=' flex justify-start items-center gap-1'>
        <h3 className=' font-bold text-2xl'>
          {el.rating === undefined ? '0' : el.rating}
        </h3>
        <span className=' font-medium text-sm text-zinc-500'>
          (
          {payload.metadata.totalItems > 1
            ? `${payload.metadata.totalItems} ratings`
            : `one rating`}
          )
        </span>
      </div>
      <RatingIcon rate={el.rating} />
    </div>
  ));
}

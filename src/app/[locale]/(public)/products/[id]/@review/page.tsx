import { Section } from '@/components/layout';
import RatingIcon from '@/components/shared/rating-icon';
import SectionTitle from '@/components/shared/sedtion-title';
import { Review } from '@/lib/types/review';
import React from 'react';
import ReviewComment from './_components/review-comment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import ReviewForm from './_components/review-form';
import ReviewFormUnauthenticated from './_components/review-form-unauthenticated';
import ReviewGeneralRate from './_components/review-general-rate';
import { MessageSquareOff } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

type ProductReviewProps = {
  params: {
    id: string;
  };
};
export default async function ProductReview({ params }: ProductReviewProps) {
  // Params
  const { id } = params;

  // Translate
  const t = await getTranslations();

  // Session
  const session = await getServerSession(authOptions);

  // Fetch
  const response = await fetch(
    `${process.env.BASE_URL}/products/${id}/reviews`
  );

  // Data
  const payload: ApiResponse<Review> = await response.json();
  if (payload.message != 'success') {
    throw new Error(payload.message);
  }

  return (
    <Section>
      <SectionTitle title={t('product-review-header')} />
      {payload.metadata.totalItems === 0 ? (
        <div className=' flex flex-col justify-start items-start pt-2.5 pb-4 font-semibold gap-1 border-b border-b-zinc-200 dark:border-b-zinc-700'>
          <h2 className=' first-letter:uppercase'> {t('general-rate')} </h2>
          <RatingIcon rate={0} />
        </div>
      ) : (
        <ReviewGeneralRate payload={payload} />
      )}

      <div className=' grid grid-cols-2'>
        {/* Comments */}
        <div className=' h-80 my-6 px-2 overflow-y-auto space-y-4 pr-2'>
          {payload.metadata.totalItems === 0 ? (
            <div className=' flex flex-col justify-center items-center gap-2 text-xl text-zinc-400 h-full '>
              <MessageSquareOff size={70} />
              <p className='first-letter:uppercase'> {t('no-comments')} </p>
            </div>
          ) : (
            <div>
              {payload.reviews.map(el => (
                <ReviewComment review={el} key={el._id} />
              ))}
            </div>
          )}
        </div>

        {/* Review form */}
        {session ? <ReviewForm /> : <ReviewFormUnauthenticated />}
      </div>
    </Section>
  );
}

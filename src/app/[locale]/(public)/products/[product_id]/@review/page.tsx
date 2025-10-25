'use client';

import { Section } from '@/components/layout';
import RatingIcon from '@/components/shared/rating-icon';
import SectionTitle from '@/components/shared/sedtion-title';
import { useParams } from 'next/navigation';

export default function ProductReview() {
  const { product_id } = useParams();
  void product_id;
  return (
    <Section>
      <div className=' border-b border-b-zinc-200 dark:border-b-zinc-700'>
        <SectionTitle title='Product Review' />
        <div className=' flex flex-col justify-start items-start pt-2.5 pb-4 font-semibold gap-1 '>
          <h3>General rating:</h3>
          <p className=' font-bold text-2xl'>
            4.5{' '}
            <span className=' font-medium text-sm text-zinc-500'>
              (8 rating)
            </span>
          </p>
          <RatingIcon rate={4.5} />
        </div>
      </div>

      {/* Comments */}
    </Section>
  );
}

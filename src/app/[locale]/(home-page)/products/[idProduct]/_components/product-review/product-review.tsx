'use client';

import { Section } from '@/components/layout';
import SectionTitle from '@/components/shared/sedtion-title';
import { useParams } from 'next/navigation';
import React from 'react';

export default function ProductReview() {
  let { idProduct } = useParams();
  return (
    <Section>
      <SectionTitle title='Product Review' />
      <div className=' flex flex-col justify-start items-start font-semibold'>
        <h3>General rating:</h3>
      </div>
    </Section>
  );
}

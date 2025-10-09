import React from 'react';
import OccasionCard from '../shared/occasion-card';

const occasions = [
  {
    title: 'Celebrate Her Forever with a Gift She’ll Always Remember',
    description: 'Wedding',
    image: '/images/wedding.webp',
  },
  {
    title: 'Honor the Beginning of a Beautiful Journey Together',
    description: 'Engagement',
    image: '/images/engagement.webp',
  },
  {
    title: 'Mark Every Year of Love with a Meaningful Surprise',
    description: 'Anniversary',
    image: '/images/anniversary.webp',
  },
];
export default function OccasionsSection() {
  return (
    <section className='flex justify-center items-center gap-6 mb-10'>
      {occasions.map(occasion => (
        <OccasionCard
          key={occasion.title}
          title={occasion.title}
          description={occasion.description}
          image={occasion.image}
        />
      ))}
    </section>
  );
}

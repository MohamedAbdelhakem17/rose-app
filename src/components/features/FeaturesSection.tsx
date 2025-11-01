import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import React from 'react';
import FeatureCard from '../shared/feature-card';

const features = [
  {
    title: 'Free Delivery',
    description: 'For orders above 120 EGP',
    icon: (
      <Truck
        width={40}
        height={40}
        strokeWidth={1}
      />
    ),
  },
  {
    title: 'Get Refund',
    description: 'Refunds within 30 days',
    icon: (
      <RefreshCw
        width={40}
        height={40}
        strokeWidth={1}
      />
    ),
  },
  {
    title: 'Safe Payment',
    description: '100% Secure Payment',
    icon: (
      <ShieldCheck
        width={40}
        height={40}
        strokeWidth={1}
      />
    ),
  },
  {
    title: '24/7 Support',
    description: 'Contact us at any time',
    icon: (
      <Headset
        width={40}
        height={40}
        strokeWidth={1}
      />
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className='bg-maroon-50 dark:bg-zinc-700 rounded-2xl p-10 min-h-36 flex justify-between '>
      {features.map(feature => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </section>
  );
}

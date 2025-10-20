'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Gift, Flower2, Candy } from 'lucide-react';
import cardImg from '@/../public/images/products-page/card-img.png';

export default function CategoriesFilter() {
  const categories = [
    { name: 'Cards', img: cardImg },
    { name: 'Chocolate', icon: Candy },
    { name: 'Flowers', icon: Flower2 },
    { name: 'Cards2', icon: Gift },
    { name: 'Chocolate2', icon: Candy },
    { name: 'Flowers2', icon: Flower2 },
    { name: 'Cards3', icon: Gift },
    { name: 'Chocolate3', icon: Candy },
    { name: 'Flowers3', icon: Flower2 },
  ];

  const [selected, setSelected] = React.useState('Flowers');

  return (
    <section className='space-y-3'>
      <div className='flex items-center justify-between '>
        <h2 className='font-semibold text-lg'>Category</h2>
        <Button
          variant='link'
          className='text-destructive p-0 h-auto'
          onClick={() => setSelected('')}
        >
          Reset
        </Button>
      </div>

      <div className='space-y-2 max-h-64 overflow-y-auto  '>
        {categories.map(({ name, icon: Icon }) => (
          <Card
            key={name}
            className={`flex items-center gap-3   rounded-none cursor-pointer transition-colors ${
              selected === name
                ? 'bg-destructive/10 border-destructive'
                : 'hover:bg-muted'
            }`}
            onClick={() => setSelected(name)}
          >
            <Icon
              size={24}
              className={
                selected === name
                  ? 'text-destructive'
                  : 'text-white bg-zinc-500 !p-0 !m-0'
              }
            />
            <span
              className={
                selected === name ? 'text-destructive font-medium' : ''
              }
            >
              {name}
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useState } from 'react';
import HeroCarouselItem from './hero-carousel-item';

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      id: 1,
      title: 'Say It with Flowers',
      subtitle: 'Elegant gifts for every special moment.',
      image: '/images/carousel-image.webp',
    },
    {
      id: 2,
      title: 'Celebrate Every Moment',
      subtitle: 'Make every day feel like a special occasion.',
      image: '/images/carousel-image.webp',
    },
    {
      id: 3,
      title: 'Timeless Beauty in Bloom',
      subtitle: 'Discover our finest flower collections.',
      image: '/images/carousel-image.webp',
    },
    {
      id: 4,
      title: 'Celebrate Every Moment',
      subtitle: 'Make every day feel like a special occasion.',
      image: '/images/carousel-image.webp',
    },
  ];

  const totalItems = slides.length;

  const handlePrev = () => {
    setIndex(prev => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex(prev => (prev === totalItems - 1 ? 0 : prev + 1));
  };

  return (
    <div className='relative w-full h-[440px] overflow-hidden'>
      <Carousel className='w-full h-full'>
        <CarouselContent
          style={{
            display: 'flex',
            transform: `translateX(-${index * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {slides.map(slide => (
            <CarouselItem key={slide.id} className='w-full flex-shrink-0'>
              <HeroCarouselItem
                title={slide.title}
                subtitle={slide.subtitle}
                image={slide.image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className='absolute bottom-8 end-9 transform -translate-y-1/2 w-20 h-9 bg-maroon-50 rounded-full flex justify-between items-center px-1'>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-2xl'
            onClick={handlePrev}
          >
            <ChevronLeft size={24} className='text-zinc-500' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-2xl'
            onClick={handleNext}
          >
            <ChevronRight size={24} className='text-maroon-900' />
          </Button>
        </div>

        {/* dots navigation */}
        <div className='absolute top-7 end-0 transform -translate-x-1/2 flex space-x-2'>
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-9 h-2.5 rounded-full ${
                idx === index ? 'bg-maroon-700' : 'w-2.5 bg-gray-300'
              }`}
              onClick={() => setIndex(idx)}
            ></button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}

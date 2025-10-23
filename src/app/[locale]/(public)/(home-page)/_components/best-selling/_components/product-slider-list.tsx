'use client';

import ProductItem from '@/components/features/products/product-item';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function ProductSliderList({
  products,
}: {
  products: MappingProductType[];
}) {
  const plugin = useRef(
    typeof window !== 'undefined'
      ? Autoplay({ delay: 3000, stopOnInteraction: false })
      : undefined
  );

  return (
    <Carousel
      opts={{
        loop: true,
        align: 'start',
      }}
      plugins={plugin.current ? [plugin.current] : []}
      className='col-span-3 w-full [direction:ltr]'
    >
      <CarouselContent>
        {products.map(product => (
          <CarouselItem key={product._id} className='basis-1/3 h-full'>
            <ProductItem product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-maroon-600 shadow-md hover:bg-maroon-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300'>
        <ChevronLeft className='w-6 h-6' />
      </CarouselPrevious>

      <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-maroon-600 shadow-md hover:bg-maroon-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300'>
        <ChevronRight className='w-6 h-6' />
      </CarouselNext>
    </Carousel>
  );
}

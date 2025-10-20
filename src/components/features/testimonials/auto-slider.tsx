'use client';

import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useRef, useState } from 'react';
import RatingIcon from '@/components/shared/rating-icon';
import { formatDateFull } from '@/lib/utils/date-format';
import { TESTIMONIALS_DATA } from '@/lib/constants/testimonials-data.constant';
import { cn } from '@/lib/utils/utils';
import UserImage from '@/components/shared/user-image';

export default function AutoSlider() {
  // Carousel Setting
  const plugin = useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: false,
    })
  );

  // Truncate
  const [toggle, setToggle] = useState(true);

  // Toggle Truncate
  function toggleTruncate() {
    setToggle(!toggle);
  }

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      className=' w-[800px]'
    >
      <CarouselContent className='w-96 h-[404px] p-8 mt-16'>
        {TESTIMONIALS_DATA.map(value => (
          <CarouselItem
            key={value.content}
            className=' relative min-h-72 flex flex-col justify-center items-center gap-3 bg-white text-zinc-800 rounded-3xl p-5 mx-10'
          >
            <UserImage username={value.user.name} color='bg-red-500' />
            <h3 className=' font-semibold text-center capitalize pt-14'>{`${value.user.name}`}</h3>
            <div className='flex flex-col justify-center items-center gap-2.5 my-6 '>
              <RatingIcon rate={value.rating} />
              <p
                className={cn(
                  'relative font-medium w-72',
                  toggle ? 'truncate h-12' : 'min-h-12 min-w-72'
                )}
              >
                {value.content}
                <label
                  className='absolute bottom-0 right-0 text-xs cursor-pointer text-soft-pink-200'
                  onClick={toggleTruncate}
                >
                  {toggle ? 'show more' : 'show less'}
                </label>
              </p>
            </div>
            <p className='text-xs font-medium text-zinc-400 '>
              {formatDateFull(value.createdAt)}
            </p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

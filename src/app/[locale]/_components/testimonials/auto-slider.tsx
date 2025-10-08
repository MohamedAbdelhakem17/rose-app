'use client';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useRef, useState } from 'react';
import RatingIcon from '@/components/shared/rating-icon';
import { Testimonials } from '@/lib/types/payload';
import { formatDateFull } from '@/lib/utils/date-format';
import Image from 'next/image';

function AutoSlider({ payload }: { payload: Testimonials[] }) {
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

  // Get Locale

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
    >
      <CarouselContent className=' h-[404px] p-8 mt-16'>
        {payload.map(value => (
          <CarouselItem
            key={value.content}
            className=' relative w-96 min-h-72 flex flex-col justify-center items-center gap-3 bg-white text-zinc-800 rounded-3xl p-5'
          >
            <div className='flex justify-center items-center absolute -top-20 right-28 w-32 h-32 rounded-full border-white border-4 z-50'>
              <Image
                src={value.user.photo}
                alt={`${value.user.firstName} ${value.user.lastName}`}
                width={128}
                height={128}
                className='object-cover'
              />
            </div>

            <h3 className=' font-semibold text-center capitalize pt-14'>{`${value.user.firstName} ${value.user.lastName}`}</h3>

            <div className='flex flex-col justify-center items-center gap-2.5 my-6 '>
              <RatingIcon rate={value.rating} />

              <p
                className={`relative ${toggle ? 'truncate h-12' : 'min-h-12 min-w-72'} font-medium w-72 `}
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

export default AutoSlider;

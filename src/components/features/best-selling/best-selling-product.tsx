'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ApiResponse, BestSellerResponse } from '@/lib/types/api.types';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
export default function BestSellingProduct() {
  const getDataFunction = async () => {
    const res = await fetch('/api/products');
    const payload: ApiResponse<BestSellerResponse> = await res.json();
    return payload;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ['best-selling-products'],
    queryFn: getDataFunction,
  });
  console.log(data, error);
  if (isLoading) return <div>Loading...</div>;
  if (!data || !data.products?.length) return <div>No products found</div>;
  return (
    <div className='w-[954px] relative'>
      <Carousel className='w-full max-w-[900px] mx-auto'>
        <CarouselContent>
          {data?.products?.map(product => (
            <CarouselItem key={product._id} className='basis-1/3'>
              <div className='flex flex-col'>
                <div>
                  <Image
                    src={`${product.imgCover}`}
                    width={302}
                    height={272}
                    alt='imgCover'
                    className='rounded-xl object-cover'
                  />
                </div>

                <h1 className='font-primary font-semibold text-lg leading-[100%] align-middle tracking-normal text-maroon-700 w-[302px] h-[18] mt-3.5 mb-3'>
                  {product.title}
                </h1>
                <div className='flex flex-row justify-between align-items-center gap-2.5 w-full h-[43px]'>
                  <div>
                    <h3 className='flex'>
                      {[0, 1, 2, 3, 4].map(i => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < product.rateAvg ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </h3>
                    <div className='font-primary font-medium  align-bottom text-base h-[28px]'>
                      <span className='text-maroon-700 mr-2'>
                        {product.priceAfterDiscount?.toLocaleString('en-EG', {
                          style: 'currency',
                          currency: 'EGP',
                        })}
                      </span>
                      <span className='line-through text-zinc-400'>
                        {product.price?.toLocaleString('en-EG', {
                          style: 'currency',
                          currency: 'EGP',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className='w-[42px] h-[42px] rounded-full bg-maroon-700 text-white flex items-center justify-center'>
                    <ShoppingCart className='w-6 h-6' />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=' text-white w-[38px] h-[38px] absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 z-20 bg-maroon-600 ' />
        <CarouselNext className=' text-white w-[38px] h-[38px] absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-20 bg-maroon-600 ' />
      </Carousel>
    </div>
  );
}

import getBestSellingProducts from '@/lib/apis/products-carousel';
import { ApiResponse, BestSellerResponse } from '@/lib/types/api.types';
import { MoveRight, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

export default async function MostPopularCard() {
  const products: ApiResponse<BestSellerResponse> =
    await getBestSellingProducts();

  return (
    <div className='mt-10'>
      <div className='grid grid-cols-4 gap-6'>
        {products?.products?.map(product => (
          <div key={product._id} className='flex flex-col w-[302px] '>
            {/* Image */}
            <div>
              <Image
                src={product.imgCover}
                width={302}
                height={272}
                alt={product.title}
                className='rounded-xl object-cover'
              />
            </div>

            {/* Title */}
            <h1 className='font-primary font-semibold text-lg text-maroon-700 mt-3 mb-3'>
              {product.title}
            </h1>

            {/* Rating & Price */}
            <div className='flex justify-between items-center gap-2.5'>
              <div>
                {/* Stars */}
                <div className='flex mb-1'>
                  {[0, 1, 2, 3, 4].map(i => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rateAvg
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Price */}
                <div className='font-primary font-medium text-base'>
                  <span className='text-maroon-700 mr-2'>
                    {product.priceAfterDiscount}.00 EGP
                  </span>
                  <span className='line-through text-zinc-400'>
                    {product.price}.00 EGP
                  </span>
                </div>
              </div>

              {/* Cart */}
              <div className='w-10 h-10 rounded-full bg-maroon-700 text-white flex items-center justify-center'>
                <ShoppingCart className='w-6 h-6' />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-row justify-end items-center gap-2.5 w-[1280px] h-10 mt-10 text-maroon-700'>
        <span className='font-primary font-semibold text-[16px] leading-[100%] tracking-[0%] align-middle'>
          View More
        </span>
        <MoveRight className='h-5 w-5' />
      </div>
    </div>
  );
}

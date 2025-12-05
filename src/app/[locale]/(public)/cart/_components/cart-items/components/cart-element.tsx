import { Star } from 'lucide-react';
import React from 'react';
import ProductPrice from './product-price';
import Image from 'next/image';
import { CartItem } from '@/lib/apis/cart/cart';
import RemoveElement from './btn-remove';
import { Link } from '@/i18n/navigation';

interface CartElementProps {
  CartItem: CartItem;
}
export default function CartElement({ CartItem }: CartElementProps) {
  const { price, product, quantity } = CartItem;

  return (
    <div className='flex gap-4'>
      {/* image container */}
      <Link
        href={`/products/${product._id}`}
        className='w-[117px] h-[140px] bg-zinc-200 rounded-lg relative'
      >
        <Image
          src={product.imgCover}
          alt={product.title}
          fill
          className='object-cover rounded-lg'
        />
      </Link>
      {/* details element */}
      <div className='h-[140px] flex-1 flex flex-col justify-between'>
        <div className='flex justify-between'>
          {/* details product name */}
          <div className=''>
            <Link href={`/products/${product._id}`}>
              <h2 className='font-semibold text-maroon-700 text-lg'>
                {product.title}
              </h2>
            </Link>
            <div className='flex items-center gap-0.5'>
              <Star size={20} className='stroke-yellow-500 fill-yellow-500' />
              <p>
                Rating: <strong>{product.rateAvg}/5</strong>
              </p>
              <span className='font-medium text-blue-600 ms-1'>
                ({product.rateCount} ratings)
              </span>
            </div>
          </div>
          {/* remove button */}

          <RemoveElement itemid={product._id} productTitle={product.title} />
        </div>

        {/* price section */}
        <ProductPrice
          price={price}
          quantity={quantity}
          productId={product._id}
          productTitle={product.title}
        />
      </div>
    </div>
  );
}

import { ShoppingCart } from 'lucide-react';
import React from 'react';
import ProductRating from './product-rating';
import { Button } from '@/components/shared/Button';
import { Product } from '@/lib/types/products/products';
import InStock from './in-stock';
import OutOfStock from './out-of-stock';
import WishlistBtn from './wishlist-btn';

//-- Component Props ---
interface ProductFeaturesProps {
  product: Product;
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {
  const {
    title,
    price,
    priceAfterDiscount,
    quantity,
    description,
    rateAvg,
    rateCount,
    _id,
  } = product;

  return (
    //--- Product Features ---
    <section className='flex flex-col justify-between h-full'>
      {/* product info */}
      <div>
        <h2 className='font-semibold text-3xl text-zinc-800'>{title}</h2>
        <div className='flex gap-3 items-center mt-2'>
          <h3 className='text-3xl font-bold text-zinc-800 flex gap-1.5 '>
            <span className='text-zinc-300 line-through'>{price}</span>
            {priceAfterDiscount}{' '}
            <span className='font-medium text-lg ms-0.5 pt-2'>EGP</span>
          </h3>
          {/* -- Stock Status --- */}
          {quantity > 0 ? <InStock quantity={quantity} /> : <OutOfStock />}
        </div>
        {/* -- Product Rating --- */}
        <ProductRating rateAvg={rateAvg} rateCount={rateCount} />
        <p className='text-zinc-600 leading-none tracking-[0em] p-1.5 text mb-6'>
          {description}
        </p>
      </div>
      {/* --- Action Buttons --- */}
      <div className=' w-full flex gap-2.5 items-center'>
        {/* -- Wishlist Button --- */}
        <WishlistBtn productId={_id} />
        {/* -- Add to Cart Button --- */}
        <Button
          className='flex-1 gap-2.5 px-4 py-2.5 flex justify-center items-center '
          disabled={quantity <= 0}
        >
          {' '}
          <ShoppingCart strokeWidth={1.5} />
          Add to Cart
        </Button>
      </div>
    </section>
  );
}

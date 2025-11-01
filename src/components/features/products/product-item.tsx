'use client';

import ProductCard from '@/components/features/products/product-card';
import { Link } from '@/i18n/navigation';

export default function ProductItem({
  product,
}: {
  product: MappingProductType;
}) {
  //  Functions
  const handelToggleAddInWishlist = () => {
    alert('Done');
  };

  const handelAddToCart = () => {
    alert('Added');
  };

  return (
    <>
      <ProductCard
        key={product._id}
        className='bg-white dark:bg-zinc-800 rounded-xl shadow-sm flex flex-col h-full'
      >
        {/* 🖼️ Product Image */}
        <ProductCard.Cover src={product.imgCover} alt={product.title}>
          {/* Product header */}
          <ProductCard.Header>
            {/*  Wishlist toggle */}
            <ProductCard.WishlistButton
              active={product.isInWishlist}
              onClick={handelToggleAddInWishlist}
            />

            {/*  Product Label */}
            {/* @ts-expect-error -- product.labels may not exactly match ProductLabel[] */}
            <ProductCard.Labels labels={product.labels} />
          </ProductCard.Header>
        </ProductCard.Cover>

        {/*  Product content */}
        <ProductCard.Content className='flex flex-col flex-1'>
          {/*  Product title */}
          <ProductCard.Title className='line-clamp-2 min-h-[3rem] dark:text-soft-pink-200'>
            <Link href={`products/${product._id}`}>{product.title}</Link>
          </ProductCard.Title>

          {/*  Card footer */}
          <ProductCard.Footer className='mt-auto'>
            {/*  Rating and  price */}
            <div>
              {/* rating */}
              <ProductCard.Rating rate={product.rateAvg} />

              {/* Price */}
              <ProductCard.Price
                current={product.priceAfterDiscount ?? product.price}
                old={product.priceAfterDiscount ? product.price : undefined}
              />
            </div>

            {/*  Add to cart button */}
            <ProductCard.CartButton onClick={handelAddToCart} />
          </ProductCard.Footer>
        </ProductCard.Content>
      </ProductCard>
    </>
  );
}

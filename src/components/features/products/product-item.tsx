'use client';

import ProductCard from '@/components/features/products/product-card';
import { Link } from '@/i18n/navigation';

export default function ProductItem({
  product,
}: {
  product: MappingProductType;
}) {
  // Functions
  const handelToggleAddInWishlist = () => {
    alert('Done');
  };

  const handelAddToCart = () => {
    alert('Added');
  };

  return (
    <>
      <ProductCard key={product._id} className='bg-white rounded-xl shadow-sm'>
        {/* Product Image */}
        <ProductCard.Cover src={product.imgCover} alt={product.title}>
          {/* Product header */}
          <ProductCard.Header>
            {/* Wishlist toggle */}
            <ProductCard.WishlistButton
              active={product.isInWishlist}
              onClick={handelToggleAddInWishlist}
            />

            {/* Product Label */}
            {/* @ts-expect-error -- product.labels may not exactly match ProductLabel[]; upstream types should be reconciled but suppress here */}
            <ProductCard.Labels labels={product.labels} />
          </ProductCard.Header>
        </ProductCard.Cover>

        {/* Product content */}
        <ProductCard.Content>
          {/* Product title */}
          <ProductCard.Title>
            <Link href={`products/${product._id}`}>{product.title}</Link>
          </ProductCard.Title>

          {/* Cart footer */}
          <ProductCard.Footer>
            {/* Rating and price */}
            <div>
              <ProductCard.Rating rate={product.rateAvg} />

              <ProductCard.Price
                current={product.priceAfterDiscount ?? product.price}
                old={product.priceAfterDiscount ? product.price : undefined}
              />
            </div>

            {/* Add To Cart */}
            <ProductCard.CartButton onClick={handelAddToCart} />
          </ProductCard.Footer>
        </ProductCard.Content>
      </ProductCard>
    </>
  );
}

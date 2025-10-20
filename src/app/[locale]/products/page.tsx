// app/products/page.tsx
import { Suspense } from 'react';
import ProductList from './_component/product-list';
import ProductListSkelton from './_component/product-list.skelton';

export default function Page({
  searchParams,
}: {
  searchParams: GetProductsParams;
}) {
  return (
    <main className='grid grid-cols-4 gap-x-6 py-16 px-20'>
      {/* Product filter */}
      <div className='col-span-1'>Filter</div>

      {/* Product list */}
      {/* Product list */}
      <section className='col-span-3'>
        <Suspense fallback={<ProductListSkelton />}>
          <ProductList searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}

// <div className='grid grid-cols-3 gap-4'>
//   {products?.map((product: MappingProductType) => (
//     <ProductItem key={product._id} product={product} />
//   ))}
// </div>

import { getProducts } from '@/lib/apis/product.api';
import ProductsGrid from './_components/product-item';

export default async function Page() {
  // Function
  const products: MappedProductResponse = await getProducts({
    limit: 6,
    page: 1,
  });

  return (
    <main className=' grid grid-cols-4 gap-x-6 py-16 px-20'>
      {/* Product filter */}
      <div className='col-span-1'>Filter</div>

      {/* Product list  */}
      <ProductsGrid products={products?.products} />
    </main>
  );
}

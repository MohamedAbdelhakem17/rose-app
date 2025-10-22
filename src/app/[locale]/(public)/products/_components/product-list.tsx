import ProductItem from '@/components/features/products/product-item';
import Pagination from '@/components/shared/pagination';
import { getProducts } from '@/lib/apis/product/product.api';
import ProductNotFound from './product-not-found';

export default async function ProductList({
  searchParams,
}: {
  searchParams?: GetProductsParams;
}) {
  // Query
  const { products, metadata }: MappedProductResponse =
    await getProducts(searchParams);

  return (
    <section className='grid grid-cols-3 gap-4'>
      {/* Display product */}
      {products.length === 0 ? (
        // Empty State
        <ProductNotFound />
      ) : (
        products?.map((product: MappingProductType) => (
          <ProductItem key={product._id} product={product} />
        ))
      )}

      {/* Pagination */}
      <Pagination totalPages={metadata?.totalPages} pathname='products' />
    </section>
  );
}

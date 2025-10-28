import ProductItem from '@/components/features/products/product-item';
import { getProducts } from '@/lib/apis/product/product.api';

export default async function MostPopularProduct({
  searchParams,
}: {
  searchParams?: GetProductsParams;
}) {
  // Query
  const { products }: MappedProductResponse = await getProducts({
    sort: '-sold',
    ...searchParams,
  });

  return (
    <>
      {/* Display product list */}
      {products?.map((product: MappingProductType) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </>
  );
}

import { getProducts } from '@/lib/apis/product.api';
import ProductItem from '@/components/features/products/product-item';

interface GetProductsParams {
  limit?: number;
  page?: number;
  [key: string]: string | number | undefined;
}

export default async function ProductsItems({
  searchParams,
}: {
  searchParams?: GetProductsParams;
}) {
  const { products }: MappedProductResponse = await getProducts(searchParams);

  return (
    <div className='grid grid-cols-3 gap-4'>
      {products?.map((product: MappingProductType) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

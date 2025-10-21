import { getProducts } from '@/lib/apis/product.api';
import ProductItem from '@/components/features/products/product-item';
import PaginationWrapper from './pagination-wrapper';

interface GetProductsParams {
  limit?: number;
  page?: number;
  [key: string]: string | number | undefined;
}

export default async function ProductList({
  searchParams,
}: {
  searchParams?: GetProductsParams;
}) {
  const response: MappedProductResponse = await getProducts(searchParams);

  return (
    <div className='grid grid-cols-3 gap-4'>
      {response?.products?.map((product: MappingProductType) => (
        <ProductItem key={product._id} product={product} />
      ))}

      <PaginationWrapper totalPages={response?.metadata?.totalPages} />
    </div>
  );
}

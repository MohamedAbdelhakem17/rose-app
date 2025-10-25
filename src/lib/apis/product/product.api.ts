'use server';
import { mappingProducts } from '@/lib/utils/mapping-products';
import { getTranslations } from 'next-intl/server';
import { REQUEST_HEADERS } from '../../constants/request-headers.constant';

export async function getProducts(
  params: GetProductsParams = {}
): Promise<MappedProductResponse> {
  // Translation
  const t = await getTranslations();

  // Default params
  const { limit = 6, page = 1, ...filters } = params;

  // Build query string dynamically
  const query = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => {
        void _;
        return value !== undefined && value !== null;
      })
    ),
  });

  // Fetch products data from the API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products?${query.toString()}`,
    {
      method: 'GET',
      headers: {
        ...REQUEST_HEADERS,
      },
    }
  );

  // If the server response is not OK, throw an error
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  // Parse the successful JSON response
  const payload: GetProductResponse = await response.json();

  // If the payload contains an error key, handle it gracefully
  if ('error' in payload) {
    throw new Error('Failed to fetch products');
  }

  // Map products
  const mappedPayload: MappedProductResponse = {
    ...payload,
    products: mappingProducts(payload.products, t),
  };

  return mappedPayload;
}

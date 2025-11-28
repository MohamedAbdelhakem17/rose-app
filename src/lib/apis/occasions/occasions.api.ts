'use server';

import { REQUEST_HEADERS } from '../../constants/request-headers.constant';

/**
 * Fetch occasions list from the API with filtering and pagination
 */
export async function getOccasions(
  params: GetProductsParams = {}
): Promise<GetOccasionsTypeResponse> {
  // Default params
  const { limit = 10, page = 1, ...filters } = params;

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

  // Fetch occasions data from the API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/occasions?${query.toString()}`,
    {
      method: 'GET',
      headers: {
        ...REQUEST_HEADERS,
      },
    }
  );

  // If the server response is not OK, throw an error
  if (!response.ok) {
    throw new Error('Failed to fetch occasions');
  }

  // Parse the successful JSON response
  const payload: GetOccasionsTypeResponse = await response.json();

  // If the payload contains an error key, handle it gracefully
  if ('error' in payload) {
    throw new Error('Failed to fetch occasions');
  }

  // Map occasions
  const mappedPayload: GetOccasionsTypeResponse = {
    ...payload,
    // occasions: payload.occasions.filter(o => o.productsCount !== 0),
    occasions: payload.occasions,
  };

  return mappedPayload;
}

/**
 * Fetch a single occasion by ID from the API
 */
export async function getOccasion(
  id: string
): Promise<GetOccasionTypeResponse> {
  if (!id) {
    throw new Error('Occasion ID is required');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/occasions/${id}`,
    {
      method: 'GET',
      headers: {
        ...REQUEST_HEADERS,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch occasion with id: ${id}`);
  }

  const payload: GetOccasionTypeResponse | { error: string } =
    await response.json();

  if ('error' in payload) {
    throw new Error(payload.error || 'Failed to fetch occasion');
  }

  return payload as GetOccasionTypeResponse;
}

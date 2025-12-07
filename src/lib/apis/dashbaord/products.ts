export interface ProductsResponse {
  message: string;
  metadata: Metadata;
  products: ProductType[];
}

export interface ErrorResponse {
  message: string;
}

export async function getProducts(
  page: number = 1,
  search: string = ''
): Promise<{ data: ProductsResponse | null; error: string | null }> {
  const limit = 10;

  try {
    const res = await fetch(
      `${process.env.BASE_URL}/products?page=${page}&limit=${limit}&search=${search}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

        next: { tags: ['products'] },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      let errorData: ErrorResponse | null = null;

      try {
        errorData = await res.json();
      } catch {
      }

      throw new Error(errorData?.message || 'Failed to fetch categories');
    }

    const data: ProductsResponse = await res.json();
    return { data, error: null };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';
    return {
      data: null,
      error: errorMessage,
    };
  }
}

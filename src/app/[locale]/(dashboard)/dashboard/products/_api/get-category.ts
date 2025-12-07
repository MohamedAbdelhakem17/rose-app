export async function getCategories() {
  try {
    // Fetch
    const response = await fetch(`${process.env.BASE_URL}/api/v1/categories`, {
      cache: 'no-store',
    });

    // Payload
    const payload: SuccessResponse<Category> = await response.json();
    if (!response.ok)
      throw new Error(payload.message || 'Failed to add product');

    return payload;
  } catch (err: any) {
    throw new Error(
      err.message || 'Something went wrong while adding the product'
    );
  }
}

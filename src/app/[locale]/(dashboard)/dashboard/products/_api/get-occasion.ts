export async function getOccasion() {
  try {
    // Fetch
    const response = await fetch(`${process.env.BASE_URL}/api/v1/occasions`, {
      cache: 'no-store',
    });

    // Payload
    const payload: SuccessResponse<{ occasions: [OccasionsType] }> =
      await response.json();
    if (!response.ok)
      throw new Error(payload.message || 'Failed to add product');

    return payload;
  } catch (err: any) {
    throw new Error(
      err.message || 'Something went wrong while adding the product'
    );
  }
}

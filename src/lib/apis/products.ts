//--- Function to Fetch Product by ID ---
import { ProductResponse } from '../types/products/products';

export async function fetchProductById(productId: string) {
  //--- Fetch Product Data from API ---
  try {
    const response = await fetch(
      `https://flower.elevateegy.com/api/v1/products/${productId}`
    );
    //--- Handle Response Errors ---
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    //--- Parse and Return Product Data ---
    const data: ProductResponse = await response.json();

    return data;
  } catch (error) {
    //--- Handle Fetch Errors ---
    console.error('Error fetching product:', error);
  }
}

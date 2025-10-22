//--- Function to Fetch Product by ID ---
import { ProductResponse } from '../types/products/products';

export async function fetchProductById(productId: string) {
  //--- Fetch Product Data from API ---
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`
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

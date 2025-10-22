//--- API Route to Get Product by ID ---
import { NextResponse } from 'next/server';

//-- GET Product by ID ---
export async function GET(
  request: Request,
  { params }: { params: { 'product-id': string } }
) {
  //-- Fetch Product from External API ---
  try {
    const productId = params['product-id'];

    const response = await fetch(
      `https://flower.elevateegy.com/api/v1/products/${productId}`
    );
    //-- Handle Response Errors ---
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch product from external API' },
        { status: response.status }
      );
    }
    //-- Parse Response Data ---
    const data = await response.json();
    //-- Return Product Data ---
    return NextResponse.json(data);
  } catch (error) {
    //-- Handle Fetch Errors ---
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get product',
      },
      { status: 500 }
    );
  }
}

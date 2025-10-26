import { REQUEST_HEADERS } from '@/lib/constants/request-headers.constant';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    //  Get user token
    const token = await getToken({ req });

    //  If user not logged in
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid token. Please login again.' },
        { status: 401 }
      );
    }

    //  API endpoint
    const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders`;

    //  Fetch data from backend
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        ...REQUEST_HEADERS,
        Authorization: `Bearer ${token.token}`,
      },
    });

    //  Handle non-successful responses
    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Failed to fetch orders',
        },
        { status: response.status }
      );
    }

    //  Parse successful response
    const payload = await response.json();

    return NextResponse.json(payload);
  } catch (error) {
    //  Handle unexpected errors
    void error;
    return NextResponse.json(
      { error: 'Something went wrong while fetching orders.' },
      { status: 500 }
    );
  }
}

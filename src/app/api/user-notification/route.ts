import { GetUserNotificationsResponse } from '@/lib/types/user-notification';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return new NextResponse(null, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const limit = params.get('limit');
  const page = params.get('page');

  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/user?limit=${limit}&page=${page}`;

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token?.token,
    },
    cache: 'no-cache',
  });

  const payload: GetUserNotificationsResponse = await response.json();

  return NextResponse.json(payload);
}

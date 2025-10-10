import { NextResponse, NextRequest } from 'next/server';
import { GetUnreadNotificationUserCountResponse } from '@/lib/types/user-notification';

const DUMMY_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlN2EwNzE3ZmVlNjhhNGMyZWEwOGRiIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjAwNDgyNTB9.BtyWO-wcNnjs2wVfHg2mQkfCr4kNFq3Xy-SQY9FW0LU';

export async function GET(req: NextRequest) {
  void req;
  const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/notifications/unread-count';

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + DUMMY_TOKEN,
    },
    cache: 'no-cache',
  });

  const payload: GetUnreadNotificationUserCountResponse = await response.json();

  return NextResponse.json(payload);
}

'use server';

import { getToken } from '@/lib/utils/cookies';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Helper to get token from either cookie or session
async function getAuthToken() {
  // Try to get token from cookie first
  const cookieToken = await getToken();
  if (cookieToken) return cookieToken;
}

export async function fetchAddresses() {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }

  const res = await fetch(`${BASE_URL}/api/v1/addresses`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch addresses: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

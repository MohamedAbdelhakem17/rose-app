'use server';

// Import utility to get auth token from cookies
import { getToken } from '@/lib/utils/cookies';

// Import authentication options and order payload type
import { OrderPayload } from '@/lib/types/checkout';

// Base URL for API requests
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Ensure BASE_URL is defined
if (!BASE_URL) {
  throw new Error('BASE_URL environment variable is not defined');
}

// Helper function to retrieve the authentication token
async function getAuthToken() {
  const cookieToken = await getToken();
  if (cookieToken) return cookieToken;
}

// Function to create a cash-on-delivery order
export async function createCashOrder(payload: OrderPayload) {
  // Get authentication token
  const token = await getAuthToken();

  // Throw error if user is not logged in
  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }

  // Send POST request to create a cash order
  const res = await fetch(`${BASE_URL}/api/v1/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // Handle API errors gracefully
  if (!res.ok) {
    let errorMessage;
    try {
      const errorData = await res.json();
      errorMessage =
        errorData.message || errorData.error || 'Unknown error occurred';
    } catch {
      errorMessage = await res.text();
    }
    throw new Error(errorMessage);
  }

  // Return successful response as JSON
  return res.json();
}

// Function to create a credit card order
export async function createCardOrder(payload: OrderPayload) {
  // Get authentication token
  const token = await getAuthToken();

  // Throw error if user is not logged in
  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }

  // Send POST request to create a card order
  const res = await fetch(
    `${BASE_URL}/api/v1/orders/checkout?url=http://localhost:3000/orders`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  // Handle API errors gracefully
  if (!res.ok) {
    let errorMessage;
    try {
      const errorData = await res.json();
      errorMessage =
        errorData.message || errorData.error || 'Unknown error occurred';
    } catch {
      errorMessage = await res.text();
    }
    throw new Error(errorMessage);
  }

  // Return successful response as JSON
  return res.json();
}

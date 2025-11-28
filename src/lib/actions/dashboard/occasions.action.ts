'use server';

import { getToken } from '@/lib/utils/get-token';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/occasions`;

// ------------------------------------
// Types
// ------------------------------------
interface ErrorResponse {
  error: string;
}

export type OccasionsResponse = OccasionMutationResponse | ErrorResponse;

// ------------------------------------
// Helper: Get Auth Token
// ------------------------------------
async function getAuthToken(): Promise<string | ErrorResponse> {
  const token = await getToken();

  if (!token) {
    return { error: 'Unauthorized. Please login.' };
  }

  return token.token as string;
}

async function fetchWithAuth(
  url: string,
  options: RequestInit
): Promise<OccasionsResponse> {
  try {
    // Get token
    const token = await getAuthToken();
    if (typeof token !== 'string') return token;

    // Request
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle HTTP Errors
    if (!response.ok) {
      return { error: `Request failed with status ${response.status}` };
    }

    // Parse JSON
    const payload = await response.json();

    // API-level error
    if ('error' in payload) {
      return { error: payload.error };
    }

    return payload;
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unexpected error occurred.';
    return { error: errorMessage };
  }
}

// ------------------------------------
// Actions
// ------------------------------------

// Add new occasion
async function addNewOccasionsAction(
  dataPayload: FormData
): Promise<OccasionsResponse> {
  return fetchWithAuth(BASE_URL, {
    method: 'POST',
    body: dataPayload,
  });
}

// Update existing occasion`
async function updateOccasionsAction({
  id,
  dataPayload,
}: {
  id: string;
  dataPayload: FormData;
}): Promise<OccasionsResponse> {
  if (!id) return { error: 'Occasion ID is required for updating.' };

  return fetchWithAuth(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: dataPayload,
  });
}

// Delete occasion
async function deleteOccasionsAction(id: string): Promise<OccasionsResponse> {
  if (!id) return { error: 'Occasion ID is required for deleting.' };

  return fetchWithAuth(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}

export { addNewOccasionsAction, deleteOccasionsAction, updateOccasionsAction };

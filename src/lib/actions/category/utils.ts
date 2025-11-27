// Utility functions for category actions (not a server file - no "use server" directive)
// These are imported by the server action files

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_BASE_URL environment variable is not defined'
  );
}

export { BASE_URL };

/**
 * Converts base64 image string to File object
 */
export function base64ToFile(
  base64String: string,
  fileName: string
): { file: File; mimeType: string } {
  let mimeType = 'image/jpeg'; // Default
  let base64Data = base64String;

  if (base64String.includes(',')) {
    const [prefix, data] = base64String.split(',');
    base64Data = data;
    const mimeMatch = prefix.match(/data:([^;]+)/);
    if (mimeMatch) {
      mimeType = mimeMatch[1];
    }
  }

  const imageBuffer = Buffer.from(base64Data, 'base64');
  const uint8Array = new Uint8Array(imageBuffer);
  const file = new File([uint8Array], fileName, {
    type: mimeType,
  });

  return { file, mimeType };
}

/**
 * Handles API fetch errors and returns appropriate error messages
 */
export function handleFetchError(
  error: unknown,
  defaultMessage: string
): string {
  if (error instanceof Error) {
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }
    if (
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('ENOTFOUND')
    ) {
      return `Cannot connect to API server at ${BASE_URL}. Please verify the API URL is correct.`;
    }
    if (error.message.includes('fetch failed')) {
      return 'Network error: Unable to connect to the API. Please check your connection and try again.';
    }
    return error.message;
  }
  return defaultMessage;
}

/**
 * Parses API error response and extracts error message
 */
export async function parseErrorResponse(response: Response): Promise<string> {
  let errorData: Record<string, unknown> = {};
  try {
    errorData = await response.json();
  } catch {
    const text = await response.text().catch(() => '');
    errorData = { message: text || `HTTP ${response.status}` };
  }

  return typeof errorData.message === 'string'
    ? errorData.message
    : typeof errorData.error === 'string'
      ? errorData.error
      : typeof errorData.msg === 'string'
        ? errorData.msg
        : typeof errorData.detail === 'string'
          ? errorData.detail
          : `API Error (${response.status})`;
}

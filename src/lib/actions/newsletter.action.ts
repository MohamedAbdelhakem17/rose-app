'use server';

/**
 * Subscribes a user to the newsletter.
 * This function calls the backend subscription API and returns a structured response.
 * It never throws — instead, it returns either { data } or { error } for consistent handling.
 *
 * @param {string} email - The user's email address to subscribe.
 * @returns {Promise<{ data?: any; error?: string }>} - The result object containing either data or an error message.
 */
export async function subscribeNewsletter(email: string) {
  try {
    // Make the POST request to the subscription endpoint
    const res = await fetch(`${process.env.BASE_URL}/subscriptions/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    // Handle non-OK responses gracefully
    if (!res.ok) {
      // Try to get a detailed error message from the server, or use a fallback
      const error = await res.text();
      return { error: error || 'Failed to subscribe' };
    }

    // Parse and return the successful response
    const data = await res.json();
    return { data };
  } catch (err) {
    // Catch network or unexpected errors (e.g., server down, timeout)
    return { error: 'Something went wrong. Please try again later.' };
  }
}

'use server';

interface Subscription {
  _id: string;
  email: string;
  active: boolean;
  subscribedAt: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  unsubscribedAt: string | null;
}

interface SuccessNewsletterResponse {
  message: string;
  subscription: Subscription;
}

interface FailedNewsletterResponse {
  error: string;
}

export type NewsletterResponse =
  | SuccessNewsletterResponse
  | FailedNewsletterResponse;

export async function subscribeToNewsletter(email: string) {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/subscriptions/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
     if (!response.ok) {
      return response.json();
    }
    const data: NewsletterResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unknown error occurred';
  }
}

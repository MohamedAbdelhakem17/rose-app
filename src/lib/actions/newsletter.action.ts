'use server';

export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${process.env.BASE_URL}/subscriptions/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error('Failed to subscribe');
  }

  return res.json();
}

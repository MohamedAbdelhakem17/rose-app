'use server';

export async function forgotPasswordAction({ email }: { email: string }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://flower.elevateegy.com';

  if (!email) throw new Error('Email is required');

  const res = await fetch(`${baseUrl}/api/v1/auth/forgotPassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = data.error || data.message || 'Something went wrong';
    throw new Error(errorMsg);
  }

  return {
    message: data.message,
    info: data.info,
  };
}

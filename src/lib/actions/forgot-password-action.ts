'use server';

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get('email');
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://flower.elevateegy.com';

  if (!email) throw new Error('Email is required');

  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/forgotPassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // The backend sends "error" when the email is invalid
      const errorMsg = data.error || data.message || 'Something went wrong';
      throw new Error(errorMsg);
    }

    return {
      message: data.message,
      info: data.info,
    };
  } catch (err: any) {
    console.error('Forgot Password Error:', err.message);
    throw new Error(err.message || 'Something went wrong');
  }
}

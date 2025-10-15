'use server';

import { cookies } from 'next/headers';

export async function resetPasswordAction(formData: FormData) {
  const newPassword = formData.get('newPassword');
  const cookieStore = cookies();
  const email = cookieStore.get('reset_email')?.value; // your stored cookie name
  console.log('email', email);

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://flower.elevateegy.com';

  if (!email) throw new Error('Email not found in cookies');
  if (!newPassword) throw new Error('New password is required');

  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/resetPassword`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data.error || data.message || 'Something went wrong';
      throw new Error(errorMsg);
    }

    return {
      message: data.message,
      token: data.token,
    };
  } catch (err: any) {
    console.error('Create New Password Error:', err.message);
    throw new Error(err.message || 'Something went wrong');
  }
}

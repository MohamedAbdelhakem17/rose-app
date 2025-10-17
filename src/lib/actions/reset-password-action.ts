'use server';

import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

export async function resetPasswordAction(formData: FormData) {
  // Translations
  const t = await getTranslations();
  // Extract form data
  const newPassword = formData.get('newPassword');
  const cookieStore = cookies();
  const email = cookieStore.get('reset_email')?.value;

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://flower.elevateegy.com';

  if (!email) throw new Error(t('reset-error-email-missing'));
  if (!newPassword) throw new Error(t('reset-error-password-missing'));

  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/resetPassword`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data.error || data.message || t('reset-error-generic');
      throw new Error(errorMsg);
    }

    return {
      message: data.message,
      token: data.token,
    };
  } catch (err: any) {
    console.error('Create New Password Error:', err.message);
    throw new Error(err.message || t('reset-error-generic'));
  }
}

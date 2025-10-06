import { apiFetch } from '@/lib/apis/api-client';
import { clearToken, setToken } from '@/lib/utils/cookies';

export async function loginService(email: string, password: string) {
  const data = await apiFetch<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // حفظ التوكين في الكوكيز
  setToken(data.token);
  return data;
}

export async function logoutService() {
  clearToken();
}

export async function getProfileService() {
  return apiFetch('/user/profile', { auth: true });
}

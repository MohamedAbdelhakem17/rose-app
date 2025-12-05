'use server';

export async function getServerToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/token`);

  const data = await res.json();
  return data.token;
}

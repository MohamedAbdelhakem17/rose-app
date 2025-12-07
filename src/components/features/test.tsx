import { cookies } from "next/headers";

export default async function DebugCookies() {
  const all = cookies().getAll();
  console.log('All cookies:', all);

  return <pre>{JSON.stringify(all, null, 2)}</pre>;
}
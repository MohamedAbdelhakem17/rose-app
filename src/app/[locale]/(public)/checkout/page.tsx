import { fetchAddresses } from '@/lib/actions/checkout.action';
import CheckoutClient from './components/checkout-client';

export default async function CheckoutPage() {
  const res = await fetchAddresses();
  const addresses = Array.isArray(res.addresses) ? res.addresses : [];

  return <CheckoutClient addresses={addresses} />;
}

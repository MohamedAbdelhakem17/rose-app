export type OrderPayload = {
  shippingAddress: {
    street: string;
    phone: string;
    city: string;
    lat: number;
    long: number;
  };
};

type CreateOrderParams = {
  payload: OrderPayload;
  paymentMethod: 'cash' | 'card';
};

// src/lib/types/address.ts
export interface Address {
  _id: string;
  street: string;
  phone: string;
  city: string;
  lat: number;
  long: number;
}

export type ShippingAddressProps = {
  address: Address;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
};

interface CheckoutClientProps {
  addresses: Address[];
}

interface PaymentOptionProps {
  title: string;
  description: string;
  imageSrc: any;
  isSelected?: boolean;
  onSelect?: () => void;
}

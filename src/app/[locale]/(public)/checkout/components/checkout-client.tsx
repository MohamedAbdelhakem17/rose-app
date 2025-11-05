'use client';
import * as React from 'react';
import { useState } from 'react';
import ShippingAddress from './shipping-address';
import { PaymentOption } from './payment-options';
import CustomStepper from './custom-stepper';
import { useCreateOrder } from '@/hooks/use-create-order';
import { CheckoutClientProps } from '@/lib/types/checkout';
import { useTranslations } from 'next-intl';

export default function CheckoutClient({ addresses }: CheckoutClientProps) {
  //translations
  const t = useTranslations();
  // States
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const [selectedPayment, setSelectedPayment] = useState<
    'cash' | 'card' | null
  >(null);
  // Custom hook for creating orders
  const { mutate: createOrder, isPending } = useCreateOrder();

  // Handles final order submission
  const handleDone = () => {
    const selected = addresses.find(a => a._id === selectedAddressId);
    if (!selected || !selectedPayment) return; // stop if missing address or payment

    // Prepare order payload
    const payload = {
      shippingAddress: {
        street: selected.street,
        phone: selected.phone,
        city: selected.city,
        lat: selected.lat,
        long: selected.long,
      },
    };

    // Trigger order creation API
    createOrder({ payload, paymentMethod: selectedPayment });
  };

  // Stepper configuration for checkout flow
  const steps = React.useMemo(
    () => [
      {
        id: 1,
        label: t('checkout-step-shipping'),
        content: (
          <div className='flex flex-col w-full gap-4'>
            {/* Display available addresses */}
            {addresses.length === 0 ? (
              <p>{t('checkout-no-addresses')}</p>
            ) : (
              addresses.map(addr => (
                <ShippingAddress
                  key={addr._id}
                  address={addr}
                  isSelected={selectedAddressId === addr._id}
                  onSelect={setSelectedAddressId}
                />
              ))
            )}
          </div>
        ),
        // Disable "Next" if no address selected
        isNextDisabled: () => !selectedAddressId,
      },
      {
        id: 2,
        label: t('checkout-step-payment'),
        content: (
          <div className='grid grid-cols-2 gap-4 w-full'>
            {/* Cash on delivery option */}
            <PaymentOption
              title={t('checkout-payment-cash-title')}
              description={t('checkout-payment-cash-description')}
              imageSrc='/assets/images/checkout/cash.png'
              isSelected={selectedPayment === 'cash'}
              onSelect={() => setSelectedPayment('cash')}
            />

            {/* Credit card option */}
            <PaymentOption
              title={t('checkout-payment-card-title')}
              description={t('checkout-payment-card-description')}
              imageSrc='/assets/images/checkout/credit.png'
              isSelected={selectedPayment === 'card'}
              onSelect={() => setSelectedPayment('card')}
            />
          </div>
        ),
        // Disable "Done" if no payment selected or API pending
        isNextDisabled: () => !selectedPayment || isPending,
        // On final step completion, trigger order creation
        onDone: handleDone,
      },
    ],
    [addresses, selectedAddressId, selectedPayment, isPending, t]
  );

  // Render the stepper with all steps
  return <CustomStepper steps={steps} />;
}

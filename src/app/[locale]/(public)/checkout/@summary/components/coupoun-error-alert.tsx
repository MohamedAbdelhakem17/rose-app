// components/coupon/CouponErrorAlert.tsx
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CouponErrorAlertProps {
  error: string | null;
}

export function CouponErrorAlert({ error }: CouponErrorAlertProps) {
  if (!error) return null;
  return (
    <Alert variant='destructive' className='mb-6'>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

import z from 'zod';
import { useTranslations } from 'next-intl';

export const loginSchema = z.object({
  email: z.email('Invalid email address').nonempty('Your email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character.'
    )
    .nonempty('Your password is required'),
});

const useOtpSchema = () => {
  // Localization
  const t = useTranslations();
  // Otp schema
  return z.object({
    resetCode: z
    .string()
    .min(6, t('otp-validation-message'))
    .max(6, t('otp-validation-message')),
  });
};

// Otp type
export type OtpValues = z.infer<ReturnType<typeof useOtpSchema>>;
export { useOtpSchema };

// Login type
export type LoginValues = z.infer<typeof loginSchema>;

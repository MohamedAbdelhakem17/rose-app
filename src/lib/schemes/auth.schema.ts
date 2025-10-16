import { useTranslations } from 'next-intl';
import z from 'zod';

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

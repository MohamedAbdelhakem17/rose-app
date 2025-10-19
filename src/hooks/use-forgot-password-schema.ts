import * as z from 'zod';
import { useTranslations } from 'next-intl';

export const useForgotPasswordSchema = () => {
  const t = useTranslations();

  return z.object({
    email: z
      .string()
      .min(1, { message: t('email-required') })
      .email({ message: t('email-invalid') }),
  });
};

export type ForgotPasswordFields = z.infer<
  ReturnType<typeof useForgotPasswordSchema>
>;

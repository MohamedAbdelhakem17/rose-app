import * as z from 'zod';
import { useTranslations } from 'next-intl';

export const useResetPasswordSchema = () => {
  const t = useTranslations();

  return z
    .object({
      password: z
        .string()
        .min(1, { message: t('password-required') })
        .min(8, { message: t('password-min-length') })
        .regex(/[A-Z]/, { message: t('password-uppercase') })
        .regex(/[a-z]/, { message: t('password-lowercase') })
        .regex(/[0-9]/, { message: t('password-number') })
        .regex(/[@$!%*?&]/, { message: t('password-special-char') }),

      confirmPassword: z
        .string()
        .min(1, { message: t('password-confirm-required') }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('passwords-mismatch'),
      path: ['confirmPassword'],
    });
};

export type ResetPasswordFields = z.infer<
  ReturnType<typeof useResetPasswordSchema>
>;

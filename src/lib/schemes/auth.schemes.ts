import * as z from 'zod';

// Forgot Password Schema

/**
 * Forgot Password Schema
 * @param {t: Record<string, string>} Record type for forgot password schema
 * @returns {z.object} Forgot password schema object
 * @description Forgot password schema object with email field
 */
export const forgotPasswordSchema = (t: Record<string, string>) =>
  z.object({
    email: z.string().min(1, t.email_required).email(t.email_invalid),
  });

// Reset Password Schema

/**
 * Reset Password Schema
 * @param {t: Record<string, string>} Record type for reset password schema
 * @returns {z.object} Reset password schema object
 * @description Reset password schema object with password and confirmPassword fields
 */
export const resetPasswordSchema = (t: Record<string, string>) =>
  z
    .object({
      password: z
        .string()
        .min(8, t.password_min_length)
        .regex(/[A-Z]/, t.password_uppercase)
        .regex(/[a-z]/, t.password_lowercase)
        .regex(/[0-9]/, t.password_number)
        .regex(/[@$!%*?&]/, t.password_special_char),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t.passwords_mismatch,
      path: ['confirmPassword'],
    });

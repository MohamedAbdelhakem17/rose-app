import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z
      // Password validation rules
      .string()
      // At least 8 characters, one uppercase, one lowercase, one number, one special character
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[@$!%*?&]/, 'Must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    //feedback message
    message: "Passwords don't match",
    path: ['confirmPassword'], // set the path of the error to confirmPassword field
  });

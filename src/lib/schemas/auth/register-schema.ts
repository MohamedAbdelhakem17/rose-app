import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters long')
      .max(50, 'First name must be less than 50 characters'),
    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 characters long')
      .max(50, 'Last name must be less than 50 characters'),
    email: z.string().email('Invalid email address'),
    phone: z
      .string()
      .min(8, 'Phone number must be at least 8 digits')
      .max(15, 'Phone number is too long'),
    gender: z.string().min(1, 'Please select a gender'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    rePassword: z.string(),
  })
  .refine(data => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

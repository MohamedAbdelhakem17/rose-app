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
      .regex(/^\+201[0-2,5][0-9]{8}$/, 'Invalid Egyptian phone number'),
    gender: z.string().min(1, 'Please select a gender'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[@$!%*?&]/, 'Must contain at least one special character'),

    rePassword: z.string(),
  })
  .refine(data => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

import z from 'zod';

// Otp schema
const otpSchema = z.object({
  resetCode: z
    .string()
    .min(6, 'OTP code must be 6 digits')
    .max(6, 'OTP code must be 6 digits'),
});

// Otp type
export type OtpValues = z.infer<typeof otpSchema>;

export { otpSchema };

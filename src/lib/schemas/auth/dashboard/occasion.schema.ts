import { z } from 'zod';

export const occasionSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  image: z.any().refine(file => file instanceof File, 'Image is required'),
});

export type OccasionSchemaType = z.infer<typeof occasionSchema>;

export const occasionEditSchema = z.object({
  name: z.string().min(2, 'Name is required'),
});

export type OccasionEditSchemaType = z.infer<typeof occasionEditSchema>;

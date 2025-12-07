import z from 'zod';

export const addProductSchema = z.object({
  title: z
    .string('please enter string')
    .min(3, 'title must be at least 3 characters long.')
    .nonempty('title is required'),
  description: z
    .string('please enter string')
    .min(3, 'description must be at least 3 characters long.')
    .nonempty('description is required'),
  price: z.string('please enter numbers'),
  discount: z.string().optional(),
  priceAfterDiscount: z.string().optional(),
  quantity: z.string('please enter numbers'),
  productCoverImage: z
    .string('please choice image')
    .nonempty('product cover image is required'),
  productGallery: z
    .array(z.string())
    .nonempty('Product gallery is required')
    .min(1, 'You must upload at least one image'),

  category: z.string('please enter string').nonempty('category is required'),
  occasion: z.string('please enter string').nonempty('occasion is required'),
});

// Login type
export type AddProductForm = z.infer<typeof addProductSchema>;

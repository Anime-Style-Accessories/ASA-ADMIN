import { z } from 'zod';

export const createProductFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  quantity: z.number().positive('Stock must be positive'),
  image: z.string().min(1, 'Image is required'),
  color: z.string().min(1, 'Color is required'),
  size: z.string().min(1, 'Size is required'),
  category: z.string().min(1, 'Category is required'),
});

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>;

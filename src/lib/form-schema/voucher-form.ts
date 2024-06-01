import { z } from 'zod';

export const createVoucherFormSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
  discount: z.number().int().positive('Discount must be positive'),
  expirationDate: z.string().min(1, 'Expiration date is required'),
});

export type CreateVoucherFormSchema = z.infer<typeof createVoucherFormSchema>;

import { IBaseResponse } from '@/utils';
import { CategoryData } from './category';

export type ProductData = {
  id: string;
  name: string;
  categoryDto: CategoryData;
  description: string;
  price: number;
  color: string;
  quantity: number;
  image: string;
  size: string;
};

export type ProductDto = IBaseResponse<ProductData>;

export type CreateProductRequest = Omit<ProductData, 'id' | 'categoryDto'> & {
  category?: string;
};

export type UpdateProductRequest = Omit<ProductData, 'categoryDto'>;

export type ProductDBField = {
  productPrice: number;
  productQuantity: number;
  productColor: string;
  productSize: string;
  productName: string;
};

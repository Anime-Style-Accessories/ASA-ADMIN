import { IBaseResponse } from '@/utils';

export type CategoryData = {
  id: string;
  name: string;
  description: string;
};

export type CategoryDto = IBaseResponse<CategoryData>;

export type CreateCategoryRequest = Omit<CategoryData, 'id'>;

export type UpdateCategoryRequest = CreateCategoryRequest;

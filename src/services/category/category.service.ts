import { API_ROUTES } from '@/constants';
import {
  CategoryDto,
  CreateCategoryRequest,
  PageDataCategory,
  PaginationParams,
  UpdateCategoryRequest,
} from '@/dto';
import { apiClient } from '@/lib';

export const categoryService = {
  createCategory: async (
    category: CreateCategoryRequest,
    signal?: AbortSignal,
  ) =>
    await apiClient.post<CategoryDto>(API_ROUTES.CATEGORY.CREATE, category, {
      signal,
    }),
  getAllCategories: async ({ page = 0, size = 10 }: PaginationParams) =>
    await apiClient.get<PageDataCategory>(API_ROUTES.CATEGORY.GET_ALL, {
      params: {
        page,
        size,
      },
    }),
  deleteCategory: async (id: string) =>
    await apiClient.delete<void>(API_ROUTES.CATEGORY.DELETE.replace(':id', id)),
  getCategory: async (id: string) =>
    await apiClient.get<CategoryDto>(
      API_ROUTES.CATEGORY.GET.replace(':id', id),
    ),
  updateCategory: async (
    id: string,
    data: UpdateCategoryRequest,
    signal?: AbortSignal,
  ) =>
    await apiClient.put<CategoryDto>(
      API_ROUTES.CATEGORY.UPDATE.replace(':id', id),
      data,
      { signal },
    ),
};

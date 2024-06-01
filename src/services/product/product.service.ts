import { API_ROUTES } from '@/constants';
import {
  CreateProductRequest,
  PageDataProduct,
  PaginationParams,
  ProductDto,
  UpdateProductRequest,
} from '@/dto';
import { apiClient } from '@/lib';

export const productService = {
  createProduct: async (product: CreateProductRequest) =>
    await apiClient.post<ProductDto>(API_ROUTES.PRODUCT.CREATE, product),
  getAllProducts: async ({ page, size }: PaginationParams) =>
    await apiClient.get<PageDataProduct>(API_ROUTES.PRODUCT.GET_ALL, {
      params: { page, size, name: '' },
    }),

  getProductById: async (id: string) =>
    await apiClient.get<ProductDto>(API_ROUTES.PRODUCT.GET.replace(':id', id)),
  deleteProduct: async (id: string) =>
    await apiClient.delete(API_ROUTES.PRODUCT.DELETE.replace(':id', id)),
  updateProduct: async (id: string, product: UpdateProductRequest) =>
    await apiClient.put<ProductDto>(
      API_ROUTES.PRODUCT.UPDATE.replace(':id', id),
      product,
    ),
  getProductsByCategoryAndName: async ({
    category,
    page,
    size,
  }: {
    category: string;
  } & PaginationParams) =>
    await apiClient.get<PageDataProduct>(API_ROUTES.PRODUCT.GET_BY_CATEGORY, {
      params: { category, name: '', page, size },
    }),
};

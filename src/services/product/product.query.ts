import { QUERY_KEY } from '@/constants';
import { PaginationParams } from '@/dto';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { productService } from './product.service';

export const useGetAllProductsQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.PRODUCTS.GET_PRODUCTS, params],
    queryFn: async () => {
      const res = await productService.getAllProducts(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetProductQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.PRODUCTS.GET_PRODUCT, id],
    queryFn: async () => {
      const res = await productService.getProductById(id);
      return res.data;
    },
  });
};

export const useGetProductsByCategoryAndNameQuery = ({
  category,
  ...params
}: {
  category: string;
} & PaginationParams) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.PRODUCTS.GET_PRODUCTS_BY_CATEGORY_AND_NAME,
      category,
      params,
    ],
    queryFn: async () => {
      const res = await productService.getProductsByCategoryAndName({
        category,
        ...params,
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

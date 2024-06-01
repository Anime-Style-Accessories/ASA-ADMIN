import { QUERY_KEY } from '@/constants';
import { PaginationParams } from '@/dto';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { categoryService } from './category.service';

export const useGetAllCategoriesQuery = (params: PaginationParams) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORIES, params.page],
    queryFn: async () => {
      const res = await categoryService.getAllCategories(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetCategoryQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORY, id],
    queryFn: async () => {
      const res = await categoryService.getCategory(id);
      return res.data;
    },
  });
};

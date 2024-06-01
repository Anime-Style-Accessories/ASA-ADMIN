import { QUERY_KEY } from '@/constants';
import { CreateCategoryRequest, UpdateCategoryRequest } from '@/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from './category.service';

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateCategoryRequest) => {
      const res = await categoryService.createCategory(data);
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORIES],
        });
      }
      return res.data;
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await categoryService.deleteCategory(id);
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORIES],
        });
      }
      return res.data;
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      id: string;
      data: UpdateCategoryRequest;
    }) => {
      const res = await categoryService.updateCategory(id, data);
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORIES],
        });
      }
      return res.data;
    },
  });
};

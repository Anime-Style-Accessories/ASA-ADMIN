import { QUERY_KEY } from '@/constants';
import { CreateProductRequest, UpdateProductRequest } from '@/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from './product.service';

export const useCreateProductMutation = (signal?: AbortSignal) => {
  return useMutation({
    mutationFn: async (data: CreateProductRequest) => {
      const res = await productService.createProduct(data, signal);
      return res.data;
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await productService.deleteProduct(id);
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.PRODUCTS.GET_PRODUCTS],
        });
      }
      return res.data;
    },
  });
};

export const useUpdateProductMutation = (signal?: AbortSignal) => {
  return useMutation({
    mutationFn: async (data: UpdateProductRequest) => {
      const res = await productService.updateProduct(data.id, data, signal);
      return res.data;
    },
  });
};

import { QUERY_KEY } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from './order.service';

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      paymentStatus: string;
      deliveryStatus: string;
    }) => {
      const res = await orderService.updateOrderStatus(
        data.id,
        data.paymentStatus,
        data.deliveryStatus,
      );
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.ORDERS.GET_ORDER, data.id],
        });
      }
      return res.data;
    },
  });
};

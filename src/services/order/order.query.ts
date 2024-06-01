import { QUERY_KEY } from '@/constants';
import { PaginationParams } from '@/dto';
import { useQuery } from '@tanstack/react-query';
import { orderService } from './order.service';

export const useGetOrderQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ORDERS.GET_ORDER, id],
    queryFn: async () => {
      const res = await orderService.getOrderById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useGetOrdersQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.ORDERS.GET_ORDERS, params],
    queryFn: async () => {
      const res = await orderService.getOrders(params);
      return res.data;
    },
  });
};

export const useGetOrderItemsQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ORDERS.GET_ORDER_ITEMS, id],
    queryFn: async () => {
      const res = await orderService.getOrderItems(id);
      return res.data;
    },
  });
};

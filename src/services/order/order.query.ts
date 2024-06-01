import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { orderService } from './order.service';

export const useGetOrderQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ORDERS.GET_ORDER, id],
    queryFn: async () => {
      const res = await orderService.getOrderById(id);
      return res.data;
    },
  });
};

export const useGetOrdersQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ORDERS.GET_ORDERS],
    queryFn: async () => {
      const res = await orderService.getOrders();
      return res.data;
    },
  });
};

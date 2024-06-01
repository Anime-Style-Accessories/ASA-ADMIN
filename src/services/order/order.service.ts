import { API_ROUTES } from '@/constants';
import { OrderDto, PageDataOrder } from '@/dto';
import { apiClient } from '@/lib';

export const orderService = {
  getAllOrders: async () =>
    await apiClient.get<PageDataOrder>(API_ROUTES.ORDER.GET_ALL),
  getOrderById: async (id: string) =>
    await apiClient.get<OrderDto>(API_ROUTES.ORDER.GET.replace(':id', id)),
  getOrders: async () =>
    await apiClient.get<PageDataOrder>(API_ROUTES.ORDER.GET),
};

import { API_ROUTES } from '@/constants';
import {
  OrderDto,
  PageDataOrder,
  PageDataOrderItem,
  PaginationParams,
} from '@/dto';
import { apiClient } from '@/lib';

export const orderService = {
  getOrderById: async (id: string) =>
    await apiClient.get<OrderDto>(API_ROUTES.ORDER.GET.replace(':id', id)),
  getOrders: async (params: PaginationParams) =>
    await apiClient.get<PageDataOrder>(API_ROUTES.ORDER.GET_ALL, { params }),
  updateOrderStatus: async (
    id: string,
    paymentStatus: string,
    shippingStatus: string,
  ) =>
    await apiClient.post(API_ROUTES.ORDER.UPDATE_STATUS.replace(':id', id), {
      paymentStatus,
      shippingStatus,
    }),
  getOrderItems: async (id: string) =>
    await apiClient.get<PageDataOrderItem>(
      API_ROUTES.ORDER.GET_ITEMS.replace(':id', id),
    ),
};

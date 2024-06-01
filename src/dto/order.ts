import { IBaseResponse } from '@/utils';
import { UserData } from './user';

export type CreateOrderItemRequest = {
  productId: string;
  quantity: number;
  pricePerUnit: number;
  size: string;
  color: string;
  voucher: number;
  shipping: number;
};

export type CreateOrderRequest = {
  totalAmount: number;
  email: string;
  address: string;
  orderItems: CreateOrderItemRequest[];
};

export type OrderData = {
  id: string;
  user: UserData;
  createdAt: string;
  totalAmount: number;
  paymentStatus: string;
  shippingStatus: string;
};

export type OrderDto = IBaseResponse<OrderData>;

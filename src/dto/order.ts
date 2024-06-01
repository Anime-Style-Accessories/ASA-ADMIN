import { IBaseResponse } from '@/utils';

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
  user: string;
  createdAt: string;
  totalAmount: number;
  paymentStatus: string;
  shippingStatus: string;
};

export type OrderItemData = {
  id: string;
  quantity: number;
  pricePerUnit: number;
  size: string;
  color: string;
  productData: {
    createdAt: string;
    updatedAt: string;
    productName: string;
    productImage: string;
    productPrice: number;
    productQuantity: number;
    productColor: string;
    productSize: string;
    category: {
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type OrderDto = IBaseResponse<OrderData>;

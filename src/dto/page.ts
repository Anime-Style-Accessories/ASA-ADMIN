import { CategoryData } from './category';
import { OrderData, OrderItemData } from './order';
import { ProductData } from './product';
import { VoucherData } from './voucher';

export type PaginationParams = {
  page: number;
  size: number;
};

export type PaginationWithSortParams<T> = PaginationParams & {
  sort?: 'ASC' | 'DESC';
  sortBy?: keyof T;
};

export type PageData<T> = {
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  message: string;
  status: string;
  data: T[];
};

export type PageDataVoucher = PageData<VoucherData>;
export type PageDataProduct = PageData<ProductData>;
export type PageDataOrder = PageData<OrderData>;
export type PageDataCategory = PageData<CategoryData>;
export type PageDataOrderItem = PageData<OrderItemData>;

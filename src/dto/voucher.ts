import { IBaseResponse } from '@/utils';

export type VoucherData = {
  id: string;
  code: string;
  discount: number;
  expirationDate: string;
  description: string;
  title: string;
  quantity: number;
};

export type VoucherDto = IBaseResponse<VoucherData>;

export type CreateVoucherRequest = Omit<VoucherData, 'id'>;

export type UpdateVoucherRequest = CreateVoucherRequest & {
  id: string;
};

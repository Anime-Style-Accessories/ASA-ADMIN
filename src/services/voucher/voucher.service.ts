import { API_ROUTES } from '@/constants';
import {
  CreateVoucherRequest,
  PageDataVoucher,
  PaginationParams,
  VoucherDto,
} from '@/dto';
import { apiClient } from '@/lib';

export const voucherService = {
  createVoucher: async (voucher: CreateVoucherRequest, signal?: AbortSignal) =>
    await apiClient.post<VoucherDto>(API_ROUTES.VOUCHER.CREATE, voucher, {
      signal,
    }),
  getAllVouchers: async ({ page = 0, size = 10 }: PaginationParams) =>
    await apiClient.get<PageDataVoucher>(API_ROUTES.VOUCHER.GET_ALL, {
      params: {
        page,
        size,
      },
    }),
  deleteVoucher: async (id: string) =>
    await apiClient.delete<void>(API_ROUTES.VOUCHER.DELETE.replace(':id', id)),
  getVoucher: async (id: string) =>
    await apiClient.get<VoucherDto>(API_ROUTES.VOUCHER.GET.replace(':id', id)),
  updateVoucher: async (
    id: string,
    voucher: CreateVoucherRequest,
    signal?: AbortSignal,
  ) =>
    await apiClient.put<VoucherDto>(
      API_ROUTES.VOUCHER.UPDATE.replace(':id', id),
      voucher,
      { signal },
    ),
};

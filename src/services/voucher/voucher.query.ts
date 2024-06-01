import { QUERY_KEY } from '@/constants';
import { PaginationParams } from '@/dto';
import { useQuery } from '@tanstack/react-query';
import { voucherService } from './voucher.service';

export const useGetAllVouchersQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.VOUCHERS.GET_VOUCHERS, params],
    queryFn: async () => {
      const res = await voucherService.getAllVouchers(params);
      return res.data;
    },
  });
};

export const useGetVoucherQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.VOUCHERS.GET_VOUCHER, id],
    queryFn: async () => {
      const res = await voucherService.getVoucher(id);
      return res.data;
    },
  });
};

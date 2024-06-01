import { QUERY_KEY } from '@/constants';
import { CreateVoucherRequest, UpdateVoucherRequest, VoucherData } from '@/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { voucherService } from './voucher.service';

export const useCreateVoucherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateVoucherRequest) => {
      const res = await voucherService.createVoucher(data);
      if (res.status === 200) {
        queryClient.setQueryData(
          [QUERY_KEY.VOUCHERS.GET_VOUCHERS],
          (oldData: VoucherData[]) => {
            console.log('oldData', oldData);
            return [...oldData, res.data];
          },
        );
      }
      return res.data;
    },
  });
};

export const useDeleteVoucherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await voucherService.deleteVoucher(id);
      if (res.status === 204) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.VOUCHERS.GET_VOUCHERS],
        });
      }
    },
  });
};

export const useUpdateVoucherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateVoucherRequest) => {
      const res = await voucherService.updateVoucher(data.id, data);
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.VOUCHERS.GET_VOUCHERS],
        });
      }
      return res.data;
    },
  });
};

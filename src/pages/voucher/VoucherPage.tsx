import { CustomTable, PageHeader } from '@/components';
import { QUERY_KEY, ROUTES } from '@/constants';
import { VoucherData } from '@/dto';
import { useGetAllVouchersQuery, voucherService } from '@/services/voucher';
import { Spinner } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RenderCellvoucher from './components/RenderCellVoucher';
import { VoucherColumnKey, voucherColumns } from './config';

const VoucherPage = () => {
  const [page, setPage] = useState(0);
  const { data, isPlaceholderData, isFetching } = useGetAllVouchersQuery({
    page,
    size: 10,
  });
  const vouchers = data?.data || ([] as VoucherData[]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isPlaceholderData && data?.hasNext) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.VOUCHERS.GET_VOUCHERS, page + 1],
        queryFn: async () => {
          const res = await voucherService.getAllVouchers({
            page: page + 1,
            size: 10,
          });
          return res.data;
        },
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  const navigate = useNavigate();

  const onClickCreate = () => {
    navigate(ROUTES.COUPONS.NEW);
  };

  return (
    <div>
      <PageHeader
        title="All Vouchers"
        queryKey={[QUERY_KEY.VOUCHERS.GET_VOUCHERS]}
      />
      <CustomTable
        dataSource={vouchers}
        columns={voucherColumns}
        RenderCell={(voucher, columnKey) => (
          <RenderCellvoucher voucher={voucher} columnKey={columnKey} />
        )}
        searchKeys={['code', 'title'] as VoucherColumnKey[]}
        searchPlaceholder="Search voucher..."
        bodyProps={{
          emptyContent: 'No voucher found',
          isLoading: isFetching,
          loadingContent: <Spinner size="sm" />,
        }}
        onClickCreate={onClickCreate}
        createText="Create new voucher"
        page={page}
        totalPage={data?.totalPages || 0}
        onChangePage={setPage}
        showPagination={(data?.totalPages || 0) > 1}
      />
    </div>
  );
};

export default VoucherPage;

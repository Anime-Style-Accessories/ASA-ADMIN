import { CustomTable, PageHeader } from '@/components';
import { QUERY_KEY } from '@/constants';
import { OrderData } from '@/dto';
import { orderService, useGetOrdersQuery } from '@/services/order';
import { Spinner } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import RenderCellOrder from './components/RenderCellOrder';
import { OrderColumnKey, orderColumns } from './config';

const OrderPage = () => {
  const [page, setPage] = useState(0);
  const { data, isPlaceholderData, isFetching } = useGetOrdersQuery({
    page,
    size: 10,
  });
  const orders = data?.data || ([] as OrderData[]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isPlaceholderData && data?.hasNext) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.ORDERS.GET_ORDERS, page + 1],
        queryFn: async () => {
          const res = await orderService.getOrders({
            page: page + 1,
            size: 10,
          });
          return res.data;
        },
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);
  return (
    <div>
      <PageHeader title="All Orders" queryKey={[QUERY_KEY.ORDERS.GET_ORDERS]} />
      <CustomTable
        dataSource={orders || []}
        columns={orderColumns}
        RenderCell={(order, columnKey) => (
          <RenderCellOrder order={order} columnKey={columnKey} />
        )}
        searchKeys={['id', 'user'] as OrderColumnKey[]}
        searchPlaceholder="Search orders..."
        bodyProps={{
          emptyContent: 'No orders found',
          isLoading: isFetching,
          loadingContent: <Spinner size="sm" />,
        }}
        showCreate={false}
        page={page}
        totalPage={data?.totalPages || 0}
        onChangePage={setPage}
        showPagination={(data?.totalPages || 0) > 1}
      />
    </div>
  );
};

export default OrderPage;

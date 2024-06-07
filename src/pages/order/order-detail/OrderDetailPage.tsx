import { OrderItemCard, PageHeader, ScreenLoader } from '@/components';
import { OrderData, OrderItemData } from '@/dto';
import { EPaymentStatus, EShippingStatus } from '@/lib/enums';
import {
  useGetOrderItemsQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} from '@/services/order';
import { formatCurrency } from '@/utils';
import { Select, SelectItem } from '@nextui-org/react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const OrderDetailPage = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetOrderQuery(id!);
  const { isLoading: orderItemLoading, data: orderItemsData } =
    useGetOrderItemsQuery(id!);
  const order = data?.data || ({} as OrderData);
  const orderItems = orderItemsData?.data || ([] as OrderItemData[]);

  const updateOrderStatusMutation = useUpdateOrderStatusMutation();

  const onChangePaymentStatus = (e: any) => {
    updateOrderStatusMutation.mutate(
      {
        id: order.id,
        paymentStatus: e.target.value,
        deliveryStatus: order.shippingStatus,
      },
      {
        onSuccess: () => {
          toast.success('Update payment status successfully');
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || err.message);
        },
      },
    );
  };

  const onChangeShippingStatus = (e: any) => {
    updateOrderStatusMutation.mutate(
      {
        id: order.id,
        paymentStatus: order.paymentStatus,
        deliveryStatus: e.target.value,
      },
      {
        onSuccess: () => {
          toast.success('Update shipping status successfully');
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || err.message);
        },
      },
    );
  };

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <div>
      <PageHeader title="Order" showRefresh={false} />
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-background border border-foreground-200 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
            <p className="text-foreground-700">
              Date: {dayjs(order.createdAt).format('DD/MM/YYYY HH:mm')}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <p className="text-foreground-700">Payment Status: </p>
              <Select
                className="w-40"
                defaultSelectedKeys={[order.paymentStatus]}
                selectionMode="single"
                onChange={onChangePaymentStatus}>
                {Object.values(EPaymentStatus).map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <p className="text-foreground-700">Shipping Status: </p>
              <Select
                className="w-40"
                defaultSelectedKeys={[order.shippingStatus]}
                selectionMode="single"
                onChange={onChangeShippingStatus}>
                {Object.values(EShippingStatus).map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Items</h2>
            <ul className="space-y-4 mt-4">
              {orderItems.map(item => (
                <OrderItemCard key={item.id} orderItem={item} />
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <p className="text-foreground-700">{'N/A'}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Total</h2>
            <p className="text-foreground-700">
              {formatCurrency(order.totalAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

import { ColumnType } from '@/components';

export type OrderColumnKey =
  | 'actions'
  | 'user'
  | 'createdAt'
  | 'paymentStatus'
  | 'totalAmount'
  | 'shippingStatus'
  | 'id';
export const orderColumns: ColumnType<OrderColumnKey>[] = [
  {
    label: 'ID',
    key: 'id',
  },
  {
    label: 'User',
    key: 'user',
    allowSorting: true,
  },
  {
    label: 'Created At',
    key: 'createdAt',
    allowSorting: true,
  },
  {
    label: 'Total Amount',
    key: 'totalAmount',
    allowSorting: true,
  },
  {
    label: 'Payment Status',
    key: 'paymentStatus',
    allowSorting: true,
  },

  {
    label: 'Shipping Status',
    key: 'shippingStatus',
    allowSorting: true,
  },
  {
    label: 'Actions',
    key: 'actions',
  },
];

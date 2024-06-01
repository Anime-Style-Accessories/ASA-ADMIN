import { ColumnType } from '@/components';

export type VoucherColumnKey =
  | 'actions'
  | 'title'
  | 'id'
  | 'code'
  | 'discount'
  | 'quantity'
  | 'expirationDate';
export const voucherColumns: ColumnType<VoucherColumnKey>[] = [
  {
    label: 'ID',
    key: 'id',
    allowSorting: true,
  },

  {
    label: 'Title',
    key: 'title',
    allowSorting: true,
  },
  {
    label: 'Code',
    key: 'code',
    allowSorting: true,
  },
  {
    label: 'Discount',
    key: 'discount',
    allowSorting: true,
  },
  {
    label: 'Quantity',
    key: 'quantity',
    allowSorting: true,
  },
  {
    label: 'Expiration Date',
    key: 'expirationDate',
    allowSorting: true,
  },
  {
    label: 'Actions',
    key: 'actions',
  },
];

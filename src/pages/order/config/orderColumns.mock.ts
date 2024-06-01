import { ColumnType } from '@/components';

export type OrderColumnKey =
  | 'actions'
  | 'name'
  | 'price'
  | 'quantity'
  | 'size'
  | 'color';
export const orderColumns: ColumnType<OrderColumnKey>[] = [
  {
    label: 'Order',
    key: 'name',
    allowSorting: true,
  },
  {
    label: 'Price',
    key: 'price',
    allowSorting: true,
  },
  {
    label: 'Quantity',
    key: 'quantity',
    allowSorting: true,
  },
  {
    label: 'Size',
    key: 'size',
    allowSorting: true,
  },
  {
    label: 'Color',
    key: 'color',
    allowSorting: true,
  },
  {
    label: 'Actions',
    key: 'actions',
  },
];

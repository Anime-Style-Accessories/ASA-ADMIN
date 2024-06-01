import { ColumnType } from '@/components';

export type ProductColumnKey =
  | 'actions'
  | 'name'
  | 'price'
  | 'quantity'
  | 'size'
  | 'color';
export const productColumns: ColumnType<ProductColumnKey>[] = [
  {
    label: 'Product',
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

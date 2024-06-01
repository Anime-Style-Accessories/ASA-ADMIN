import { ColumnType } from '@/components';

export type CategoryColumnKey = 'actions' | 'name' | 'id' | 'description';
export const categoryColumns: ColumnType<CategoryColumnKey>[] = [
  {
    label: 'ID',
    key: 'id',
    allowSorting: true,
  },
  {
    label: 'Category',
    key: 'name',
    allowSorting: true,
  },
  {
    label: 'Description',
    key: 'description',
  },
  {
    label: 'Actions',
    key: 'actions',
  },
];

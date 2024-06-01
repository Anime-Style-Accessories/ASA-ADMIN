import { ROUTES } from '@/constants';
import { ProductData } from '@/dto';
import { useDeleteProductMutation } from '@/services/product';
import { formatCurrency } from '@/utils';
import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { SquarePen, Trash2 } from 'lucide-react';
import { Key, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ProductColumnKey } from '../config';

type Props = {
  product: ProductData;
  columnKey: Key;
};

const RenderCellProduct = ({ product, columnKey }: Props) => {
  const cellValue = product[columnKey as keyof ProductData];
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const isLoading = false;

  const deleteProductMutation = useDeleteProductMutation();

  const onDelete = () => {
    deleteProductMutation.mutate(product.id, {
      onSuccess: () => {
        toast.success('Delete product successfully');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || err.message);
      },
    });
  };

  const category = product.categoryDto;

  switch (columnKey as ProductColumnKey) {
    case 'name':
      return (
        <div className="flex gap-2">
          <Image
            src={product.image}
            alt={product.name}
            width={50}
            height={50}
            className="hidden overflow-hidden object-contain md:block"
          />
          <div>
            <p className="line-clamp-1">{product.name}</p>
            <p className="line-clamp-1 text-sm text-slate-500">
              {category.name}
            </p>
          </div>
        </div>
      );
    case 'price':
      return formatCurrency(product.price);
    case 'quantity':
      return product.quantity;
    case 'color':
      return (
        <div
          className="size-6 rounded-full"
          style={{
            background: product.color,
          }}
        />
      );
    case 'size':
      return product.size;
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            color="primary"
            onPress={() =>
              navigate(ROUTES.PRODUCTS.EDIT.replace(':id', product.id))
            }>
            <SquarePen size={20} />
          </Button>
          <Popover
            placement="right"
            isOpen={showPopover}
            onOpenChange={setShowPopover}
            showArrow>
            <PopoverTrigger>
              <Button
                isIconOnly
                variant="light"
                color="danger"
                size="sm"
                onClick={() => console.log('delete')}>
                <Trash2 size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2 self-end px-1 py-2">
                <p className="font-bold">Delete confirmation</p>
                <p>
                  Are you sure you want to delete <b>{product.name}</b> product?
                </p>
                <div className="flex justify-end space-x-2">
                  <Button color="danger" onClick={onDelete} size="sm">
                    {isLoading ? 'Deleting...' : 'Yes'}
                  </Button>
                  <Button
                    color="default"
                    onClick={() => setShowPopover(false)}
                    size="sm">
                    No
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};

export default RenderCellProduct;

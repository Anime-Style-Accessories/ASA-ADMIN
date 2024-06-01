import { ROUTES } from '@/constants';
import { OrderData } from '@/dto';
import { formatCurrency } from '@/utils';
import { Button } from '@nextui-org/react';
import dayjs from 'dayjs';
import { SquarePen } from 'lucide-react';
import { Key, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderColumnKey } from '../config';

type Props = {
  order: OrderData;
  columnKey: Key;
};

const RenderCellOrder = ({ order, columnKey }: Props) => {
  const cellValue = order[columnKey as keyof OrderData];
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const isLoading = false;

  const onDelete = () => {};

  switch (columnKey as OrderColumnKey) {
    case 'totalAmount':
      return formatCurrency(order.totalAmount);
    case 'createdAt':
      return dayjs(order.createdAt).format('DD/MM/YYYY HH:mm');
    case 'paymentStatus':
      return order.paymentStatus;
    case 'shippingStatus':
      return order.shippingStatus;
    case 'user':
      return order.user;
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            color="primary"
            onPress={() => navigate(ROUTES.ORDERS.ID.replace(':id', order.id))}>
            <SquarePen size={20} />
          </Button>
          {/* <Popover
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
                  Are you sure you want to delete <b>{order.id}</b> order?
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
          </Popover> */}
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};

export default RenderCellOrder;

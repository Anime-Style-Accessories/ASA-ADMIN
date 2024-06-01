import { ROUTES } from '@/constants';
import { VoucherData } from '@/dto';
import { useDeleteVoucherMutation } from '@/services/voucher';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { SquarePen, Trash2 } from 'lucide-react';
import { Key, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { VoucherColumnKey } from '../config';

type Props = {
  voucher: VoucherData;
  columnKey: Key;
};

const RenderCellvoucher = ({ voucher, columnKey }: Props) => {
  const cellValue = voucher[columnKey as keyof VoucherData];
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const deleteVoucherMutation = useDeleteVoucherMutation();
  const isLoading = deleteVoucherMutation.isPending;

  const onDelete = () => {
    deleteVoucherMutation.mutate(voucher.id, {
      onSuccess: () => {
        setShowPopover(false);
        toast.success('Delete voucher successfully');
      },
      onError: (err: any) => {
        const response = err?.response?.data;
        toast.error(response?.message || err.message);
      },
    });
  };

  switch (columnKey as VoucherColumnKey) {
    case 'id':
      return voucher.id;
    case 'code':
      return voucher.code;
    case 'discount':
      return voucher.discount;
    case 'quantity':
      return voucher.quantity;
    case 'expirationDate':
      return voucher.expirationDate
        ? dayjs(voucher.expirationDate).format('DD/MM/YYYY')
        : 'N/A';
    case 'title':
      return voucher.title;
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            color="primary"
            onClick={() =>
              navigate(ROUTES.COUPONS.EDIT.replace(':id', voucher.id))
            }>
            <SquarePen size={20} />
          </Button>
          <Popover
            placement="right"
            isOpen={showPopover}
            onOpenChange={setShowPopover}
            showArrow>
            <PopoverTrigger>
              <Button isIconOnly variant="light" color="danger" size="sm">
                <Trash2 size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2 self-end px-1 py-2">
                <p className="font-bold">Delete confirmation</p>
                <p>
                  Are you sure you want to delete <b>{voucher.code}</b> voucher?
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

export default RenderCellvoucher;

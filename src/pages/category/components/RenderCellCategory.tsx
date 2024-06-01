import { ROUTES } from '@/constants';
import { CategoryData } from '@/dto';
import { useDeleteCategoryMutation } from '@/services/category';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { SquarePen, Trash2 } from 'lucide-react';
import { Key, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CategoryColumnKey } from '../config';

type Props = {
  category: CategoryData;
  columnKey: Key;
};

const RenderCellcategory = ({ category, columnKey }: Props) => {
  const cellValue = category[columnKey as keyof CategoryData];
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const deleteCategoryMutation = useDeleteCategoryMutation();
  const isLoading = deleteCategoryMutation.isPending;

  const onDelete = () => {
    deleteCategoryMutation.mutate(category.id, {
      onSuccess: () => {
        setShowPopover(false);
        toast.success('Delete category successfully');
      },
      onError: (err: any) => {
        const response = err?.response?.data;
        toast.error(response?.message || err.message);
      },
    });
  };

  switch (columnKey as CategoryColumnKey) {
    case 'id':
      return category.id;
    case 'name':
      return category.name;
    case 'description':
      return category.description;
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            color="primary"
            onClick={() =>
              navigate(ROUTES.CATEGORIES.EDIT.replace(':id', category.id))
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
                  Are you sure you want to delete <b>{category.name}</b>{' '}
                  category?
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

export default RenderCellcategory;

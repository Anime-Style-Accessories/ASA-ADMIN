import { ROUTES } from '@/constants';
import {
  CategoryData,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/dto';
import { createCategoryFormSchema } from '@/lib/form-schema';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/services/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = {
  type?: 'new' | 'edit';
  data?: CategoryData;
};

const CategoryForm = ({ data, type = 'new' }: Props) => {
  const isEdit = type === 'edit';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateCategoryRequest | UpdateCategoryRequest>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: data || undefined,
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();
  const navigate = useNavigate();

  const isLoading = createCategoryMutation.isPending;

  const onSubmit = (_data: CreateCategoryRequest | UpdateCategoryRequest) => {
    if (isEdit) {
      updateCategoryMutation.mutate(
        {
          data: _data,
          id: data!.id,
        },
        {
          onSuccess: ({ message }) => {
            reset();
            navigate(ROUTES.CATEGORIES.INDEX);
            toast.success(message);
          },
          onError: (error: any) => {
            const response = error?.response?.data;
            toast.error(response?.message || error.message);
          },
        },
      );
    } else {
      createCategoryMutation.mutate(_data, {
        onSuccess: ({ message }) => {
          reset();
          navigate(ROUTES.CATEGORIES.INDEX);
          toast.success(message);
        },
        onError: (error: any) => {
          const response = error?.response?.data;
          toast.error(response?.message || error.message);
        },
      });
    }
  };

  return (
    <div className="flex gap-8 md:flex-row flex-col">
      <div className="md:max-w-md">
        <p>
          {isEdit
            ? 'Update the category details below'
            : 'Start by creating a new category. You can add a name and description'}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-4 bg-background rounded shadow border flex-1">
        <Input
          {...register('name')}
          autoFocus
          label="Name"
          labelPlacement="outside"
          placeholder="Name of the category"
          variant="bordered"
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          isDisabled={isLoading}
          value={watch('name')}
        />
        <Textarea
          {...register('description')}
          label="Description"
          labelPlacement="outside"
          placeholder="Description of the category"
          variant="bordered"
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          isDisabled={isLoading}
          value={watch('description')}
        />
        <Button type="submit" color="primary">
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;

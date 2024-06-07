import { ROUTES } from '@/constants';
import { CreateVoucherRequest, UpdateVoucherRequest, VoucherData } from '@/dto';
import { createVoucherFormSchema } from '@/lib/form-schema';
import {
  useCreateVoucherMutation,
  useUpdateVoucherMutation,
} from '@/services/voucher';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = {
  type?: 'new' | 'edit';
  data?: VoucherData;
};

const VoucherForm = ({ data, type = 'new' }: Props) => {
  const isEdit = type === 'edit';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateVoucherRequest | UpdateVoucherRequest>({
    resolver: zodResolver(createVoucherFormSchema),
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const [abortControllerRef, setAbortController] = useState(
    new AbortController(),
  );
  const createVoucherMutation = useCreateVoucherMutation(
    abortControllerRef.signal,
  );
  const updateVoucherMutation = useUpdateVoucherMutation(
    abortControllerRef.signal,
  );
  const navigate = useNavigate();

  const isLoading = createVoucherMutation.isPending;

  const onCancel = () => {
    abortControllerRef.abort();
    setAbortController(new AbortController());
  };

  const onSubmit = (_data: CreateVoucherRequest | UpdateVoucherRequest) => {
    if (new Date(_data.expirationDate) < new Date()) {
      return toast.error('Expiration date must be in the future');
    }
    if (isEdit) {
      updateVoucherMutation.mutate(
        { ..._data, id: data!.id },
        {
          onSuccess: ({ message }) => {
            reset();
            navigate(ROUTES.COUPONS.INDEX);
            toast.success(message);
          },
          onError: (error: any) => {
            const response = error?.response?.data;
            toast.error(response?.message || error.message);
          },
        },
      );
    } else {
      createVoucherMutation.mutate(_data, {
        onSuccess: ({ message }) => {
          reset();
          navigate(ROUTES.COUPONS.INDEX);
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
            ? 'Update the voucher details below'
            : 'Start by creating a new voucher. You can add a code and description'}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-4 bg-background rounded shadow border flex-1">
        <Input
          {...register('title')}
          label="Title"
          labelPlacement="outside"
          placeholder="Title of the voucher"
          variant="bordered"
          errorMessage={errors.title?.message}
          isInvalid={!!errors.title}
          isDisabled={isLoading}
          value={watch('title')}
        />
        <Input
          {...register('code')}
          label="Code"
          labelPlacement="outside"
          placeholder="Code of the voucher"
          variant="bordered"
          errorMessage={errors.code?.message}
          isInvalid={!!errors.code}
          isDisabled={isLoading || isEdit}
          value={watch('code')}
          isReadOnly={isEdit}
        />
        <Textarea
          {...register('description')}
          label="Description"
          labelPlacement="outside"
          placeholder="Description of the voucher"
          variant="bordered"
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          isDisabled={isLoading}
          value={watch('description')}
        />
        <Input
          {...register('discount', {
            valueAsNumber: true,
          })}
          label="Discount"
          labelPlacement="outside"
          placeholder="Discount of the voucher"
          variant="bordered"
          errorMessage={errors.discount?.message}
          isInvalid={!!errors.discount}
          isDisabled={isLoading}
          value={watch('discount')?.toString()}
          type="number"
        />
        <Input
          {...register('quantity', {
            valueAsNumber: true,
          })}
          label="Quantity"
          labelPlacement="outside"
          placeholder="Quantity of the voucher"
          variant="bordered"
          errorMessage={errors.quantity?.message}
          isInvalid={!!errors.quantity}
          isDisabled={isLoading}
          value={watch('quantity')?.toString()}
          type="number"
        />

        <Input
          {...register('expirationDate')}
          label="Expiration date"
          labelPlacement="outside"
          placeholder="Expiration date of the voucher"
          variant="bordered"
          errorMessage={errors.expirationDate?.message}
          isInvalid={!!errors.expirationDate}
          isDisabled={isLoading}
          value={watch('expirationDate')?.toString()}
          type="date"
        />

        {isLoading ? (
          <Button type="button" onPress={onCancel}>
            Cancel
          </Button>
        ) : (
          <Button type="submit" color="primary">
            {isEdit ? 'Update' : 'Create'}
          </Button>
        )}
      </form>
    </div>
  );
};

export default VoucherForm;

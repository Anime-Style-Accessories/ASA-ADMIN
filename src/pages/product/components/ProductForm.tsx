import { CategorySelect } from '@/components';
import { ROUTES } from '@/constants';
import { CreateProductRequest, ProductData, UpdateProductRequest } from '@/dto';
import { EProductColor, EProductSize } from '@/lib/enums';
import { createProductFormSchema } from '@/lib/form-schema';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/services/product';
import { useUploadSingleMutation } from '@/services/upload';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = {
  type?: 'new' | 'edit';
  data?: ProductData;
};

const ProductForm = ({ data, type = 'new' }: Props) => {
  const isEdit = type === 'edit';
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<CreateProductRequest | UpdateProductRequest>({
    resolver: zodResolver(createProductFormSchema),
  });

  useEffect(() => {
    if (data) {
      reset({
        category: data?.categoryDto.name,
        ...data,
      });
      if (data.image) {
        setValue('image', data.image);
      }
    }
  }, [data, reset, setValue]);

  const [file, setFile] = useState<File | null>(null);

  const uploadMutation = useUploadSingleMutation();
  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const navigate = useNavigate();

  const isLoading = uploadMutation.isPending || createProductMutation.isPending;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setValue('image', URL.createObjectURL(file));
    }
  };

  const mutation = (_data: CreateProductRequest | UpdateProductRequest) => {
    console.log(_data);
    if (isEdit) {
      updateProductMutation.mutate(
        {
          id: data!.id,
          ..._data,
        },
        {
          onSuccess: () => {
            toast.dismiss();
            reset();
            navigate(ROUTES.PRODUCTS.INDEX);
            toast.success('Product updated successfully');
          },
          onError: (err: any) => {
            toast.dismiss();
            toast.error(err?.response?.data?.message || err.message);
          },
        },
      );
    } else {
      createProductMutation.mutate(_data, {
        onSuccess: () => {
          toast.dismiss();
          reset();
          navigate(ROUTES.PRODUCTS.INDEX);
          toast.success('Product created successfully');
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || err.message);
        },
      });
    }
  };

  const onSubmit = (_data: CreateProductRequest | UpdateProductRequest) => {
    if (!file && watch('image')) {
      mutation(_data);
      return;
    }
    if (file && watch('image')) {
      toast.loading('Processing product', {
        duration: Infinity,
      });
      uploadMutation.mutate(file, {
        onSuccess: res => {
          setValue('image', res.image);
          mutation({
            ..._data,
            image: res.image,
          });
        },
        onError: (err: any) => {
          toast.dismiss();
          toast.error(err?.response?.data?.message || err.message);
        },
      });
      return;
    }
    return toast.error('Please choose an image');
  };

  return (
    <div className="flex md:flex-row flex-col gap-8">
      <div className="md:max-w-md">
        <p>
          {isEdit
            ? 'Update the product details below'
            : 'Fill in the product details below'}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 flex-1">
        <label className="space-y-2 block">
          <p className="text-sm text-foreground">Image</p>
          {watch('image') && (
            <img
              src={watch('image')}
              alt="Product"
              className="w-32 h-32 object-cover border"
            />
          )}
          <input
            onChange={onFileChange}
            disabled={isLoading}
            type="file"
            accept="image/*"
            className="block"
          />
        </label>
        <Input
          {...register('name')}
          autoFocus
          label="Name"
          labelPlacement="outside"
          placeholder="Name of the product"
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
          placeholder="Description of the product"
          variant="bordered"
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          isDisabled={isLoading}
          value={watch('description')}
        />
        <Input
          {...register('price', { valueAsNumber: true })}
          label="Price"
          labelPlacement="outside"
          placeholder="Price of the product"
          variant="bordered"
          errorMessage={errors.price?.message}
          isInvalid={!!errors.price}
          isDisabled={isLoading}
          endContent="$"
          type="number"
          value={watch('price')?.toString()}
        />
        <CategorySelect
          {...register('category')}
          isDisabled={isLoading}
          label="Category"
          labelPlacement="outside"
          placeholder="Select category"
          selectionMode="single"
          selectedKeys={watch('category') ? [watch('category')] : ([] as any)}
        />
        <Select
          {...register('color')}
          label="Color"
          labelPlacement="outside"
          isDisabled={isLoading}
          placeholder="Select color"
          selectionMode="single"
          selectedKeys={watch('color') ? [watch('color')] : []}>
          {Object.values(EProductColor).map(color => (
            <SelectItem key={color} value={color}>
              {color}
            </SelectItem>
          ))}
        </Select>
        <Select
          {...register('size')}
          label="Size"
          isDisabled={isLoading}
          labelPlacement="outside"
          placeholder="Select size"
          selectionMode="single"
          selectedKeys={watch('size') ? [watch('size')] : []}>
          {Object.values(EProductSize).map(size => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </Select>
        <Input
          {...register('quantity', { valueAsNumber: true })}
          label="Quantity"
          labelPlacement="outside"
          placeholder="Quantity of the product"
          variant="bordered"
          errorMessage={errors.quantity?.message}
          isInvalid={!!errors.quantity}
          isDisabled={isLoading}
          type="number"
          value={watch('quantity')?.toString()}
        />
        <Button type="submit" color="primary">
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;

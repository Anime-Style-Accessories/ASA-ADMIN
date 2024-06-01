import { PageHeader } from '@/components';
import { useGetProductQuery } from '@/services/product';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const EditProductPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isLoading, isError } = useGetProductQuery(id!);
  return (
    <div>
      <PageHeader title="Edit Product" showRefresh={false} />
      <ProductForm type="edit" data={data?.data} />
    </div>
  );
};

export default EditProductPage;

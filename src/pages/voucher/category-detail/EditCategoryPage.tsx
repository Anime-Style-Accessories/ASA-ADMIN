import { PageHeader } from '@/components';
import { useGetCategoryQuery } from '@/services/category';
import { useParams } from 'react-router-dom';
import CategoryForm from '../components/VoucherForm';

const EditCategoryPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isLoading, isError } = useGetCategoryQuery(id!);
  return (
    <div>
      <PageHeader title="Edit Category" showRefresh={false} />
      <CategoryForm type="edit" data={data?.data} />
    </div>
  );
};

export default EditCategoryPage;

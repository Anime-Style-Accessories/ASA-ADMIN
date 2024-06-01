import { PageHeader } from '@/components';
import CategoryForm from './components/CategoryForm';

const AddProductPage = () => {
  return (
    <div>
      <PageHeader title="Add Category" showRefresh={false} />
      <CategoryForm />
    </div>
  );
};

export default AddProductPage;

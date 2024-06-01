import { PageHeader } from '@/components';
import ProductForm from './components/ProductForm';

const AddProductPage = () => {
  return (
    <div>
      <PageHeader title="Add Product" showRefresh={false} />
      <ProductForm />
    </div>
  );
};

export default AddProductPage;

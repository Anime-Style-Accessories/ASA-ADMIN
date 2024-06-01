import { PageHeader } from '@/components';
import CategoryForm from './components/VoucherForm';

const AddVoucherPage = () => {
  return (
    <div>
      <PageHeader title="Add Voucher" showRefresh={false} />
      <CategoryForm />
    </div>
  );
};

export default AddVoucherPage;

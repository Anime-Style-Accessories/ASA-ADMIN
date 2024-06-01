import { PageHeader } from '@/components';
import { useGetVoucherQuery } from '@/services/voucher';
import { useParams } from 'react-router-dom';
import VoucherForm from '../components/VoucherForm';

const EditVoucherPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isLoading, isError } = useGetVoucherQuery(id!);
  return (
    <div>
      <PageHeader title="Edit Voucher" showRefresh={false} />
      <VoucherForm type="edit" data={data?.data} />
    </div>
  );
};

export default EditVoucherPage;

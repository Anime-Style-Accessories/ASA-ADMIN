import { CustomTable, PageHeader } from '@/components';
import { QUERY_KEY, ROUTES } from '@/constants';
import { ProductData } from '@/dto';
import { productService, useGetAllProductsQuery } from '@/services/product';
import { Spinner } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RenderCellProduct from './components/RenderCellProduct';
import { ProductColumnKey, productColumns } from './config';

const ProductPage = () => {
  const [page, setPage] = useState(0);
  const { data, isPlaceholderData, isFetching } = useGetAllProductsQuery({
    page,
    size: 10,
  });
  const products = data?.data || ([] as ProductData[]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isPlaceholderData && data?.hasNext) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.PRODUCTS.GET_PRODUCTS, page + 1],
        queryFn: async () => {
          const res = await productService.getAllProducts({
            page: page + 1,
            size: 10,
          });
          return res.data;
        },
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);
  const navigate = useNavigate();

  const onClickCreate = () => {
    navigate(ROUTES.PRODUCTS.NEW);
  };

  return (
    <div>
      <PageHeader title="Add Product" showRefresh={false} />
      <CustomTable
        dataSource={products || []}
        columns={productColumns}
        RenderCell={(product, columnKey) => (
          <RenderCellProduct product={product} columnKey={columnKey} />
        )}
        searchKeys={['name'] as ProductColumnKey[]}
        searchPlaceholder="Search products..."
        bodyProps={{
          emptyContent: 'No products found',
          isLoading: isFetching,
          loadingContent: <Spinner size="sm" />,
        }}
        onClickCreate={onClickCreate}
        createText="Create new product"
        page={page}
        totalPage={data?.totalPages || 0}
        onChangePage={setPage}
        showPagination={(data?.totalPages || 0) > 1}
      />
    </div>
  );
};

export default ProductPage;

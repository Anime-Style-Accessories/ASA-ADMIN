import { CustomTable, PageHeader } from '@/components';
import { QUERY_KEY, ROUTES } from '@/constants';
import { CategoryData } from '@/dto';
import { categoryService, useGetAllCategoriesQuery } from '@/services/category';
import { Spinner } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RenderCellCategory from './components/RenderCellCategory';
import { CategoryColumnKey, categoryColumns } from './config';

const CategoryPage = () => {
  const [page, setPage] = useState(0);
  const { data, isPlaceholderData, isFetching } = useGetAllCategoriesQuery({
    page,
    size: 10,
  });
  const categories = data?.data || ([] as CategoryData[]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isPlaceholderData && data?.hasNext) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.CATEGORIES.GET_CATEGORIES, page + 1],
        queryFn: async () => {
          const res = await categoryService.getAllCategories({
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
    navigate(ROUTES.CATEGORIES.NEW);
  };

  return (
    <div>
      <PageHeader
        title="All Categories"
        queryKey={[QUERY_KEY.CATEGORIES.GET_CATEGORIES]}
      />
      <CustomTable
        dataSource={categories}
        columns={categoryColumns}
        RenderCell={(category, columnKey) => (
          <RenderCellCategory category={category} columnKey={columnKey} />
        )}
        searchKeys={['name'] as CategoryColumnKey[]}
        searchPlaceholder="Search category..."
        bodyProps={{
          emptyContent: 'No category found',
          isLoading: isFetching,
          loadingContent: <Spinner size="sm" />,
        }}
        onClickCreate={onClickCreate}
        createText="Create new category"
        page={page}
        totalPage={data?.totalPages || 0}
        onChangePage={setPage}
        showPagination={(data?.totalPages || 0) > 1}
      />
    </div>
  );
};

export default CategoryPage;

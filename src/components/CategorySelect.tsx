import { QUERY_KEY } from '@/constants';
import { CategoryData } from '@/dto';
import { categoryService, useGetAllCategoriesQuery } from '@/services/category';
import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useQueryClient } from '@tanstack/react-query';
import { forwardRef, useEffect, useState } from 'react';

const CategorySelect = forwardRef<
  HTMLSelectElement,
  Omit<SelectProps, 'children'>
>((props, ref) => {
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isFetching, isPlaceholderData } = useGetAllCategoriesQuery({
    page,
    size: 10,
  });
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

  const categories = data?.data || ([] as CategoryData[]);
  const [, scrollerRef] = useInfiniteScroll({
    hasMore: data?.hasNext,
    isEnabled: isOpen,
    shouldUseLoader: true,
    onLoadMore: () => setPage(prev => prev + 1),
  });

  return (
    <div>
      <Select
        ref={ref}
        isLoading={isFetching}
        scrollRef={scrollerRef}
        selectionMode="single"
        onOpenChange={setIsOpen}
        {...props}>
        {categories.map(category => (
          <SelectItem key={category.name} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
});

export default CategorySelect;

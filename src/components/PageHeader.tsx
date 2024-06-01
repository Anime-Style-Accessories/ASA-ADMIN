'use client';
import { Button } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronLeft, RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type PageHeaderProps = {
  title: string;
  queryKey?: string[];
  showRefresh?: boolean;
  showBack?: boolean;
};

const PageHeader = ({
  title,
  queryKey = [],
  showRefresh = true,
  showBack = false,
}: PageHeaderProps) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <div
      className="mb-5 flex flex-col gap-5 rounded-lg border border-foreground-200 bg-background !p-5 md:mb-[26px] md:!p-[26px] lg:flex-row
    lg:items-center lg:gap-4 lg:!py-5">
      {showBack && (
        <Button isIconOnly variant="light" onPress={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
      )}
      <h1 className="flex-1 text-center text-4xl font-bold lg:text-left">
        {title}
      </h1>
      {showRefresh && (
        <button
          className="group hidden w-fit items-center gap-2 text-sm
           font-semibold xl:flex"
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: queryKey,
            });
          }}>
          Data Refresh
          <RotateCw size={16} className=" group-hover:animate-spin" />
        </button>
      )}
      <div
        className=" flex h-11 items-center justify-center rounded-md
       border border-foreground-200 px-9 text-sm font-bold lg:w-[310px]">
        {dayjs(currentTime).format('MMMM d, yyyy HH')}
        <span className="animate-pulse">:</span>
        {dayjs(currentTime).format('mm:ss')}
      </div>
    </div>
  );
};
export default PageHeader;

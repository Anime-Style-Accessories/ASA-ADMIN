'use client';
import { ROUTES } from '@/constants';
import { cn } from '@/lib';
import { Image } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { SidebarGroupItem, sidebarMock } from '.';

const Sidebar = () => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={cn(
          'flex h-screen max-h-screen flex-col bg-background transition-transform md:relative md:z-auto md:transform-none',
        )}>
        <div
          className={cn(
            'flex min-h-20 items-center border-b-1',
            'justify-start px-6',
          )}>
          <div className="flex w-full items-center justify-center">
            <Link to={ROUTES.DASHBOARD}>
              <Image
                src={
                  theme === 'dark'
                    ? '/ASA_LOGO_DARK.png'
                    : '/ASA_LOGO_LIGHT.png'
                }
                width={140}
                height={140}
                alt="Logo"
                className="object-contain w-[80px] h-[80px]"
              />
            </Link>
          </div>
        </div>
        <motion.div
          className={cn(
            `flex h-screen max-h-screen flex-col gap-4 overflow-y-auto border-r-1 scrollbar-thin`,
            'w-[20rem] p-6',
          )}
          animate={{ width: '20rem' }}
          initial={{ width: '20rem' }}
          transition={{ duration: 0.2 }}
          exit={{ width: '20rem' }}>
          <div className={cn('flex flex-col', 'gap-6')}>
            {sidebarMock.map(item => (
              <SidebarGroupItem {...item} key={item.title} />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;

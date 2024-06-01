import { MainLayout } from '@/layout';
import { Outlet } from 'react-router-dom';

const BasePage = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default BasePage;

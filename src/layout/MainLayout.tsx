import { Sidebar, Topbar } from '@/components';
import { ROUTES } from '@/constants';
import { useAuthContext } from '@/context';
import { useGetCurrentUserQuery } from '@/services/user';
import { Spinner } from '@nextui-org/react';
import { PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MainLayout = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, setUser } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoading, data, isError, error } = useGetCurrentUserQuery();
  useEffect(() => {
    if (isLoading) return;
    if (isError) {
      // toast.error('Please login to continue');
      setUser(null);
      navigate(ROUTES.AUTH.LOGIN);
      return;
    }
    if (data) {
      navigate(pathname);
      setUser(data.data);
    } else {
      navigate(ROUTES.AUTH.LOGIN);
    }
  }, [navigate, isLoading, data, isError, setUser, pathname]);

  return isLoading ? (
    <Spinner />
  ) : isAuthenticated ? (
    <div className="flex max-h-screen min-h-screen">
      <Sidebar />
      <div className="flex h-screen max-h-screen min-h-screen flex-1 flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-auto bg-background p-2 md:p-6">
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex max-h-screen min-h-screen">{children}</div>
  );
};

export default MainLayout;

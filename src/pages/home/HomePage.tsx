import { ROUTES } from '@/constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.DASHBOARD);
  }, []);
  return <div>Loading...</div>;
};

export default HomePage;

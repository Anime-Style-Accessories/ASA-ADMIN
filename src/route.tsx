import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './constants';
import {
  AddCategoryPage,
  AddProductPage,
  AddVoucherPage,
  BasePage,
  CategoryPage,
  DashboardPage,
  EditCategoryPage,
  EditProductPage,
  EditVoucherPage,
  HomePage,
  LoginPage,
  OrderDetailPage,
  OrderPage,
  ProductPage,
  VoucherPage,
} from './pages';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <BasePage />,
    children: [
      {
        path: ROUTES.AUTH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.PRODUCTS.INDEX,
        element: <ProductPage />,
      },
      {
        path: ROUTES.PRODUCTS.NEW,
        element: <AddProductPage />,
      },
      {
        path: ROUTES.PRODUCTS.EDIT,
        element: <EditProductPage />,
      },
      {
        path: ROUTES.CATEGORIES.INDEX,
        element: <CategoryPage />,
      },
      {
        path: ROUTES.CATEGORIES.NEW,
        element: <AddCategoryPage />,
      },
      {
        path: ROUTES.CATEGORIES.EDIT,
        element: <EditCategoryPage />,
      },
      {
        path: ROUTES.COUPONS.INDEX,
        element: <VoucherPage />,
      },
      {
        path: ROUTES.COUPONS.NEW,
        element: <AddVoucherPage />,
      },
      {
        path: ROUTES.COUPONS.EDIT,
        element: <EditVoucherPage />,
      },
      {
        path: ROUTES.ORDERS.INDEX,
        element: <OrderPage />,
      },
      {
        path: ROUTES.ORDERS.ID,
        element: <OrderDetailPage />,
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
]);

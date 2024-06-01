import { ROUTES as APP_ROUTES } from '@/constants';
import {
  Layers3,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  TicketPercent,
} from 'lucide-react';
import { TSidebarGroup } from './Sidebar.type';

export const sidebarMock: TSidebarGroup[] = [
  {
    title: 'Main',
    items: [
      {
        icon: LayoutDashboard,
        href: APP_ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
    ],
  },
  {
    title: 'Product management',
    items: [
      {
        title: 'Products',
        icon: Package,
        href: APP_ROUTES.PRODUCTS.INDEX,
        items: [
          {
            title: 'All products',
            href: APP_ROUTES.PRODUCTS.INDEX,
          },
          {
            title: 'Add new product',
            href: APP_ROUTES.PRODUCTS.NEW,
          },
        ],
      },
      {
        title: 'Categories',
        icon: Layers3,
        href: APP_ROUTES.CATEGORIES.INDEX,
        items: [
          {
            title: 'All categories',
            href: APP_ROUTES.CATEGORIES.INDEX,
          },
          {
            title: 'Add new category',
            href: APP_ROUTES.CATEGORIES.NEW,
          },
        ],
      },
    ],
  },
  {
    title: 'Order management',
    items: [
      {
        title: 'Orders',
        icon: ShoppingCart,
        href: APP_ROUTES.ORDERS.INDEX,
      },
      // {
      //   title: 'Refunds',
      //   icon: HandCoins,
      //   href: APP_ROUTES.REFUNDS.REQUESTED,
      // },
    ],
  },
  {
    title: 'Promotional management',
    items: [
      {
        title: 'Coupons',
        icon: TicketPercent,
        href: APP_ROUTES.COUPONS.INDEX,
        items: [
          {
            title: 'All coupons',
            href: APP_ROUTES.COUPONS.INDEX,
          },
          {
            title: 'Add new coupon',
            href: APP_ROUTES.COUPONS.NEW,
          },
        ],
      },
    ],
  },
  // {
  //   title: 'Other',
  //   items: [
  //     {
  //       title: 'Notifications',
  //       icon: Bell,
  //       href: APP_ROUTES.NOTIFICATIONS.INDEX,
  //     },
  //   ],
  // },
  {
    title: 'Site management',
    items: [
      {
        title: 'Settings',
        icon: Settings,
        href: APP_ROUTES.SETTINGS.INDEX,
        items: [
          {
            title: 'Maintainance settings',
            href: APP_ROUTES.SETTINGS.MAINTAINANCE,
          },
        ],
      },
    ],
  },
];

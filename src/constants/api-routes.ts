export const API_ROUTES = {
  AUTH: {
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGIN: '/auth/authenticate',
    LOGOUT: '/auth/logout',
  },
  USER: {
    GET_CURRENT_USER: '/users/me',
  },
  CATEGORY: {
    CREATE: '/category/create',
    GET_ALL: '/category/all',
    DELETE: '/category/delete/:id',
    GET: '/category/get/:id',
    UPDATE: '/category/update/:id',
  },
  VOUCHER: {
    CREATE: '/vouchers/create',
    GET_ALL: '/vouchers/getAll',
    DELETE: '/vouchers/:id',
    UPDATE: '/vouchers/:id',
    GET: '/vouchers/getById/:id',
    CHECK_CODE: '/vouchers/check_voucher',
  },
  PRODUCT: {
    CREATE: '/product',
    GET_ALL: '/product/getProductsBySearch',
    DELETE: '/product/:id',
    GET: '/product/:id',
    UPDATE: '/product/:id',
    GET_BY_CATEGORY: '/product/getProductsByCategoryAndName',
  },
  UPLOAD: {
    SINGLE: '/upload/single',
  },
  ORDER: {
    CREATE: '/orders/create_order',
    GET_ALL: '/orders/getOrders',
    GET: '/orders/getOrderById/:id',
    UPDATE_STATUS: '/orders/updateOrderStatus/:id',
    GET_ITEMS: '/order_items/:id',
  },
};

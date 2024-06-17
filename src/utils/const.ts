export const Routes = {
  MAIN: '/',
  CATALOG: '/catalog',
  ABOUT: '/about',
  CART: '/cart',
  PROFILE: '/profile',
  LOGIN: '/login',
  SIGNUP: '/signup',
  NOT_FOUND: '*',
  PROGRAMMING: '/catalog/programming',
  DESIGN: '/catalog/design',
  MARKETING: '/catalog/marketing',
  BUSINESS: '/catalog/business',
  PRODUCT_DETAIL: '/catalog/:category/:productId',
};

export const localStorageTokenKey = 'userTokenDDS';

export const CategoryId: {
  PROGRAMMING: 'c96ff3d0-1688-4913-90ae-a3056e259e68';
  BUSINESS: '78db1a69-6023-44b5-8b3d-a8f294cdd335';
  DESIGN: 'dac8edad-bf16-4f56-859c-f364efde1c2a';
  MARKETING: '9f44fc3d-b2b9-4625-91e8-03934154b07d';
} = {
  PROGRAMMING: 'c96ff3d0-1688-4913-90ae-a3056e259e68',
  BUSINESS: '78db1a69-6023-44b5-8b3d-a8f294cdd335',
  DESIGN: 'dac8edad-bf16-4f56-859c-f364efde1c2a',
  MARKETING: '9f44fc3d-b2b9-4625-91e8-03934154b07d',
};

export const CategoryMap = {
  'c96ff3d0-1688-4913-90ae-a3056e259e68': 'Programming',
  '78db1a69-6023-44b5-8b3d-a8f294cdd335': 'Business',
  'dac8edad-bf16-4f56-859c-f364efde1c2a': 'Design',
  '9f44fc3d-b2b9-4625-91e8-03934154b07d': 'Marketing',
};

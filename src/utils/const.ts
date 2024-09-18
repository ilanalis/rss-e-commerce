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
export const localStorageAnonymousId = 'anonymousIdDDS';
export const localStorageCartsId = 'cartsIdDDS';

export const CategoryId: {
  PROGRAMMING: 'a217802e-37e8-4e30-aeb4-69e1197a12b5';
  BUSINESS: '5e12f1b9-406c-4719-8cc9-af131511e2d9';
  DESIGN: '2bcab347-1ebf-45d9-b643-6cfaf2b33508';
  MARKETING: '634d7e9e-b05d-4b9f-9ead-5bf8f6c711d7';
} = {
  PROGRAMMING: 'a217802e-37e8-4e30-aeb4-69e1197a12b5',
  BUSINESS: '5e12f1b9-406c-4719-8cc9-af131511e2d9',
  DESIGN: '2bcab347-1ebf-45d9-b643-6cfaf2b33508',
  MARKETING: '634d7e9e-b05d-4b9f-9ead-5bf8f6c711d7',
};

export const CategoryMap = {
  'a217802e-37e8-4e30-aeb4-69e1197a12b5': 'Programming',
  '5e12f1b9-406c-4719-8cc9-af131511e2d9': 'Business',
  '2bcab347-1ebf-45d9-b643-6cfaf2b33508': 'Design',
  '634d7e9e-b05d-4b9f-9ead-5bf8f6c711d7': 'Marketing',
};

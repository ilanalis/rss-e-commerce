import './styles/normalize.css';
import './styles/variables.css';
import './styles/global.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';
import { localStorageTokenKey } from './utils/const';
import { useApiRootContext } from './contexts/useApiRootContext';
import { createAnonymousApiBuilder, refreshUser } from './utils/api/commercetools-api';
import { useUserContext } from './contexts/useUserContext';
import { useCartContext } from './contexts/useCartContext';
import { getCartProducts } from './utils/api/cart-api';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

function App() {
  const { setApiRoot } = useApiRootContext();
  const { setIsUserLoggedIn } = useUserContext();
  const { setCartProductsQuantity } = useCartContext();

  useEffect(() => {
    const userToken = localStorage.getItem(localStorageTokenKey);

    if (userToken) {
      const response = refreshUser();
      if (response.success && response.apiBuilder) {
        setApiRoot(response.apiBuilder);
        getProductsQuantity(response.apiBuilder);
        setIsUserLoggedIn(true);
      }
    } else {
      const currentApiRoot = createAnonymousApiBuilder();
      setApiRoot(currentApiRoot);
      getProductsQuantity(currentApiRoot);
    }
  }, [setApiRoot, setIsUserLoggedIn]);

  async function getProductsQuantity(apiRoot: ByProjectKeyRequestBuilder) {
    const response = await getCartProducts(apiRoot);

    if (response.success && response.products) {
      setCartProductsQuantity(response.products.length);
    }
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

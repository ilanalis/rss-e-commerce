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

function App() {
  const { setApiRoot } = useApiRootContext();
  const { setIsUserLoggedIn } = useUserContext();

  useEffect(() => {
    const userToken = localStorage.getItem(localStorageTokenKey);

    if (userToken) {
      const response = refreshUser();
      if (response.success && response.apiBuilder) {
        setApiRoot(response.apiBuilder);
        setIsUserLoggedIn(true);
      }
    } else {
      const currentApiRoot = createAnonymousApiBuilder();
      setApiRoot(currentApiRoot);
    }
  }, [setApiRoot, setIsUserLoggedIn]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

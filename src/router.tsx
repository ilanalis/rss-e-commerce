import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import Main from './pages/main';
import Login from './pages/login';
import SignUp from './pages/sign-up/';
import Courses from './pages/courses/';
import AboutUs from './pages/about-us';
import Profile from './pages/profile';
import Cart from './pages/cart';
import CheckAuth from './components/checkAuth';
import UserContextProvider from './contexts/userContext';
import NotFound from './pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UserContextProvider>
        <Layout />
      </UserContextProvider>
    ),
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <UserContextProvider>
        <CheckAuth>
          <Layout />
        </CheckAuth>
      </UserContextProvider>
    ),
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
]);

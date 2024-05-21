import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import Main from './pages/main';
import LoginForm from './pages/authorization/login';
import RegistrationForm from './pages/authorization/registration';
import Courses from './pages/courses/';
import AboutUs from './pages/about-us';
import Profile from './pages/profile';
import Cart from './pages/cart';
import CheckAuth from './components/checkAuth';
import UserContextProvider from './contexts/userContext';
import NotFound from './pages/not-found';
import AuthLayout from './components/auth-layout';
import { Routes } from './utils/const';

export const router = createBrowserRouter([
  {
    path: Routes.MAIN,
    element: (
      <UserContextProvider>
        <Layout />
      </UserContextProvider>
    ),
    children: [
      {
        path: Routes.MAIN,
        element: <Main />,
      },
      {
        path: Routes.COURSES,
        element: <Courses />,
      },
      {
        path: Routes.ABOUT,
        element: <AboutUs />,
      },
      {
        path: Routes.CART,
        element: <Cart />,
      },
      {
        path: Routes.PROFILE,
        element: <Profile />,
      },
      {
        path: Routes.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
  {
    path: Routes.MAIN,
    element: (
      <UserContextProvider>
        <CheckAuth>
          <AuthLayout />
        </CheckAuth>
      </UserContextProvider>
    ),
    children: [
      {
        path: Routes.LOGIN,
        element: <LoginForm />,
      },
      {
        path: Routes.SIGNUP,
        element: <RegistrationForm />,
      },
    ],
  },
]);

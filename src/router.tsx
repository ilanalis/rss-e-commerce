import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import Main from './pages/main';
import LoginForm from './pages/authorization/login';
import RegistrationForm from './pages/authorization/registration';
import Courses from './pages/courses/';
import AboutUs from './pages/about-us';
import Profile from './pages/profile';
import Cart from './pages/cart';
import NotFound from './pages/not-found';
import AuthorizationLayout from '@pages/authorization';
import ProtectedRoute from './components/protectedRoute';
import PublicRoute from './components/publicRoute';
import { Routes } from './utils/const';

export const router = createBrowserRouter([
  {
    path: Routes.MAIN,
    element: <Layout />,
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
        path: Routes.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
  {
    path: Routes.MAIN,
    element: (
      <PublicRoute>
        <AuthorizationLayout />
      </PublicRoute>
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
  {
    path: Routes.MAIN,
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: Routes.PROFILE,
        element: <Profile />,
      },
    ],
  },
]);

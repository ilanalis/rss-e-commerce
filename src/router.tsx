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
import { CategoryId, Routes } from './utils/const';
import ProductList from './components/product-list';

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
        path: Routes.CATALOG,
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
  {
    path: Routes.CATALOG,
    element: <Layout />,
    children: [
      {
        path: Routes.PROGRAMMING,
        element: <ProductList categoryId={CategoryId.PROGRAMMING} />,
      },
    ],
  },
  {
    path: Routes.CATALOG,
    element: <Layout />,
    children: [
      {
        path: Routes.DESIGN,
        element: <ProductList categoryId={CategoryId.DESIGN} />,
      },
    ],
  },
  {
    path: Routes.CATALOG,
    element: <Layout />,
    children: [
      {
        path: Routes.MARKETING,
        element: <ProductList categoryId={CategoryId.MARKETING} />,
      },
    ],
  },
  {
    path: Routes.CATALOG,
    element: <Layout />,
    children: [
      {
        path: Routes.BUSINESS,
        element: <ProductList categoryId={CategoryId.BUSINESS} />,
      },
    ],
  },
]);

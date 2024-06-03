import { useUserContext } from '@/contexts/useUserContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isUserLoggedIn } = useUserContext();

  if (isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;

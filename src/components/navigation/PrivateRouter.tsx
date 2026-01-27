import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import { IGetUsers } from '../../API/auth/auth.interface';

interface IPrivateRoute {
  component: ReactNode;
  redirectTo: string;
  currentUser: IGetUsers;
  isLoading: boolean;
}

const PrivateRouter: FC<IPrivateRoute> = ({
  component: Component,
  redirectTo = '/',
  currentUser,
  isLoading,
}) => {
  // const { data, isLoading } = useQuery({ queryKey: ['current'] });

  if (isLoading) return null;
  if (!currentUser) return <Navigate to={redirectTo} />;

  return Component;
};

export default PrivateRouter;

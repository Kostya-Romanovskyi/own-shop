import { FC } from 'react';
import { Navigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import { IGetUsers } from '../../API/auth/auth.interface';

interface RestrictedRouterProps {
  component: React.ReactElement;
  redirectTo?: string;
  currentUser: IGetUsers;
}

const RestrictedRouter: FC<RestrictedRouterProps> = ({
  component: Component,
  redirectTo = '/',
  currentUser,
}) => {
  // const { data } = useQuery({ queryKey: ['current'] });

  return currentUser ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRouter;

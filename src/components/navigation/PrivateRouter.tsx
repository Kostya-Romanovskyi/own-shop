import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface IPrivateRoute {
	component: ReactNode;
	redirectTo: string;
}

const PrivateRouter: FC<IPrivateRoute> = ({ component: Component, redirectTo = '/' }) => {
	const { data } = useQuery({ queryKey: ['current'] });
	console.log(data);

	return data ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRouter;

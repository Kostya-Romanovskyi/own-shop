import { useQuery } from '@tanstack/react-query';
import { useGetUserOrders } from '../../hooks/useOrder';
import { IGetUsers } from '../../API/auth/auth.interface';
import UserOrdersItem from '../UserOrdersItem/UserOrdersItem';

const UserOrdersList = () => {
	const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] });

	const { data: orders } = useGetUserOrders(user?.id ?? -1);

	return (
		<ul>
			{orders &&
				orders.map(({ id, status, order_items, totalPrice }) => (
					<UserOrdersItem key={id} order_items={order_items} status={status} totalPrice={totalPrice} />
				))}
		</ul>
	);
};

export default UserOrdersList;

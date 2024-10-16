import { useQuery } from '@tanstack/react-query';
import { useGetUserOrders } from '../../hooks/useOrder';
import { IGetUsers } from '../../API/auth/auth.interface';
import UserOrdersItem from '../UserOrdersItem/UserOrdersItem';

const UserOrdersList = () => {
	const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] });

	const { data: orders } = useGetUserOrders(user?.id ?? -1);

	return (
		<div className='container'>
			<ul>
				{orders &&
					orders.map(
						({
							id,
							order_date,
							status,
							order_items,
							chopsticks,
							chopsticks_quantity,
							allergic,
							type_of_allergy,
							soy_sauce,
							additional_information,
							totalPrice,
						}) => (
							<UserOrdersItem
								key={id}
								order_id={id}
								order_items={order_items}
								order_date={order_date}
								status={status}
								totalPrice={totalPrice}
								chopsticks={chopsticks}
								chopsticks_quantity={chopsticks_quantity}
								allergic={allergic}
								type_of_allergy={type_of_allergy}
								soy_sauce={soy_sauce}
								additional_information={additional_information}
							/>
						)
					)}
			</ul>
		</div>
	);
};

export default UserOrdersList;

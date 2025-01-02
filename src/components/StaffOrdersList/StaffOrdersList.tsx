import { useGetAllOrders } from '../../hooks/useOrder';
import StaffOrdersItem from '../StaffOrdersItem/StaffOrdersItem';

const StaffOrdersList = () => {
	const { data: allOrders } = useGetAllOrders({ page: 1, limit: 5 });

	console.log(allOrders);

	return (
		<ul>
			{allOrders &&
				allOrders.map(
					({
						id,
						user_id,
						order_date,
						status,
						order_items,
						chopsticks,
						chopsticks_quantity,
						allergic,
						type_of_allergy,
						soy_sauce,
						additional_information,
						total_price,
						user,
					}) => (
						<StaffOrdersItem
							key={id}
							id={id}
							user_id={user_id}
							order_id={id}
							order_items={order_items}
							order_date={order_date}
							status={status}
							totalPrice={total_price}
							chopsticks={chopsticks}
							chopsticks_quantity={chopsticks_quantity}
							allergic={allergic}
							type_of_allergy={type_of_allergy}
							soy_sauce={soy_sauce}
							additional_information={additional_information}
							user={user}
						/>
					)
				)}
		</ul>
	);
};

export default StaffOrdersList;

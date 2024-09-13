import { Status } from '../../API/order/order.interface'
import { useAddNewOrder } from '../../hooks/useOrder'

const Order = () => {
	const orderMutation = useAddNewOrder()

	const handleMakeOrder = () => {
		const createOrder = {
			user_id: 7,
			status: Status.PENDING,
		}

		orderMutation(createOrder)
	}

	return (
		<>
			<p>Payment</p>

			<button onClick={handleMakeOrder} type='button'>
				Make order
			</button>
		</>
	)
}

export default Order

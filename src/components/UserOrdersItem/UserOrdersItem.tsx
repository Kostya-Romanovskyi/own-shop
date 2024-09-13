import { FC } from 'react'
import { IOrderItems, Status } from '../../API/order/order.interface'

interface IUserOrderItem {
	order_items: IOrderItems[]
	status: Status
	totalPrice: string
}

const UserOrdersItem: FC<IUserOrderItem> = ({ order_items, status, totalPrice }) => {
	console.log(order_items)

	return (
		<li style={{ border: '1px solid black' }}>
			{order_items.map(item => {
				return (
					<>
						<img src={`${item.product.image}`} alt={`${item.product.name}`} width={150} height={100} />
						<p>{item.quantity}</p>
					</>
				)
			})}

			<p>{status}</p>
			<p>{totalPrice}</p>
		</li>
	)
}

export default UserOrdersItem

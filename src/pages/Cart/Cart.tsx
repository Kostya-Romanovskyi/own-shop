import { Link } from 'react-router-dom'
import CartList from '../../components/CartList/CartList'
import { useQuery } from '@tanstack/react-query'
import { IGetUsers } from '../../API/auth/auth.interface'
import { ICartInfo } from '../../API/cart/cart.interface'

const Cart = () => {
	const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] })
	const { data } = useQuery<ICartInfo>({ queryKey: ['user-cart', user?.id], enabled: !!user?.id })
	console.log(data)

	return (
		<>
			<Link to='/'>Back</Link>
			<CartList />
			<p>Total price: {data?.totalPrice}</p>
			<button type='button'>Make order</button>
		</>
	)
}

export default Cart

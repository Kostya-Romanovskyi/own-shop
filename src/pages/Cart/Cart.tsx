import { Link, useNavigate } from 'react-router-dom';
import CartList from '../../components/CartList/CartList';
import { useQuery } from '@tanstack/react-query';
import { IGetUsers } from '../../API/auth/auth.interface';
import { ICartInfo } from '../../API/cart/cart.interface';

import './cart.scss';
import { useEffect } from 'react';
import MainButton from '../../components/MainButton/MainButton';

const Cart = () => {
	const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] });
	const { data: cartData, isLoading } = useQuery<ICartInfo>({
		queryKey: ['user-cart', user?.id],
		enabled: !!user?.id,
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (cartData?.result.length === 0) {
		return <div>Your cart is empty</div>;
	}

	return (
		<main>
			<div className='container__cart'>
				<Link to='/'>Back</Link>
				<CartList />
				<div className='total__wrapper'>
					<p className='total__price'>Total price: {cartData && cartData.totalPrice}</p>

					<MainButton redirect='/order' classStyle='total__btn' click={() => {}} name='Make order' />
				</div>
			</div>
		</main>
	);
};

export default Cart;

import { Link, useNavigate } from 'react-router-dom';
import CartList from '../../components/CartList/CartList';
import { useQuery } from '@tanstack/react-query';
import { IGetUsers } from '../../API/auth/auth.interface';
import { ICartInfo } from '../../API/cart/cart.interface';

import './cart.scss';
import { useEffect } from 'react';
import MainButton from '../../components/MainButton/MainButton';

import EmptyCartIcon from '../../assets/Cart/empty-cart.png';

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
		return (
			<div className='container'>
				<div>Loading...</div>
			</div>
		);
	}

	if (cartData?.result.length === 0) {
		return (
			<div className='container'>
				<div className='cart__empty__container'>
					<div>Your cart is still empty</div>
					<img className='cart__empty__img' src={EmptyCartIcon} alt='Empty cart image' />
				</div>
			</div>
		);
	}

	return (
		<div className='container__cart'>
			<Link to='/'>Back</Link>
			<CartList />
			<div className='total__wrapper'>
				<p className='total__price'>Total price: {cartData && cartData.totalPrice}</p>

				<MainButton redirect='/order' classStyle='total__btn' click={() => {}} name='Make order' />
			</div>
		</div>
	);
};

export default Cart;

import { Link, Outlet } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import LogoutBtn from '../LogoutBtn/LogoutBtn';
import HeaderButton from '../HeaderButton/HeaderButton';
import MainButton from '../MainButton/MainButton';

import { RxHamburgerMenu } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import { FaShoppingCart } from 'react-icons/fa';

import './header.scss';
import NavItems from '../NavItems/NavItems';
import { IRegister } from '../../API/auth/auth.interface';
import { ICartInfo } from '../../API/cart/cart.interface';

const Header = () => {
	const { data: user } = useQuery<IRegister>({ queryKey: ['current'] });
	const { data: cartItems } = useQuery<ICartInfo>({ queryKey: ['user-cart', user?.id] });

	const [isOpen, setIsOpen] = useState(false);

	// toggle burger state
	const handleBurgerToggle = () => {
		screen.width <= 768 && setIsOpen(!isOpen);
	};

	// scroll block when burger is open
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('scroll__block');
		} else {
			document.body.classList.remove('scroll__block');
		}

		return () => {
			document.body.classList.remove('scroll__block');
		};
	}, [isOpen]);

	return (
		<>
			<header className='header'>
				<div className='container'>
					<div className='header__wrapper'>
						<div onClick={handleBurgerToggle} className={`${isOpen ? 'backdrop__open' : 'backdrop__closed'}`}></div>
						{/* <img className='header__logo' src='../../../public/logo.webp' alt='Logo own-shop' /> */}
						<div>Logo</div>

						<HeaderButton click={handleBurgerToggle} Icon={RxHamburgerMenu} classStyle='' />

						<div className={`header__mobile__wrapper ${isOpen ? 'opened__burger' : ''}`}>
							<NavItems click={handleBurgerToggle} classStyle='' classNav='' />

							{user && user !== null ? (
								<div className='header__auth__wrapp'>
									<Link to='/cart' className='header__cart__icon'>
										<FaShoppingCart />

										<div className='header__cart__counter'>{cartItems && cartItems.result.length}</div>
									</Link>
									<LogoutBtn />
								</div>
							) : (
								<div className='header__auth__wrapp'>
									<MainButton redirect='/login' name='Login' click={handleBurgerToggle} classStyle='margin-10' />
									<MainButton redirect='/register' name='Register' click={handleBurgerToggle} classStyle='' />
								</div>
							)}

							<HeaderButton click={handleBurgerToggle} Icon={RxCross2} classStyle='close__btn' />
						</div>
					</div>
				</div>
			</header>

			<Suspense fallback='Loading...'>
				<Outlet />
			</Suspense>
		</>
	);
};

export default Header;

import { Link, Outlet } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import LogoutBtn from '../LogoutBtn/LogoutBtn';
import HeaderButton from '../HeaderButton/HeaderButton';
import MainButton from '../MainButton/MainButton';

import { RxHamburgerMenu } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import './header.scss';

const Header = () => {
	const { data: user } = useQuery({ queryKey: ['current'] });

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
							<nav className='header__nav'>
								<ul className='header__list'>
									<li className='header__item'>
										<Link onClick={handleBurgerToggle} className='header__link' to={'/'}>
											Home
										</Link>
									</li>

									<li className='header__item'>
										<Link onClick={handleBurgerToggle} className='header__link' to={'/menu'}>
											Menu
										</Link>
									</li>

									<li className='header__item'>
										<Link onClick={handleBurgerToggle} className='header__link' to={'/shop'}>
											Shop
										</Link>
									</li>

									<li className='header__item'>
										<Link onClick={handleBurgerToggle} className='header__link' to={'/order'}>
											Order
										</Link>
									</li>

									<li className='header__item'>
										<Link onClick={handleBurgerToggle} className='header__link' to={'/contact'}>
											Contact us
										</Link>
									</li>

									<li className='header__item'>
										<Link onClick={handleBurgerToggle} className='header__link' to={'/profile'}>
											Profile
										</Link>
									</li>
								</ul>
							</nav>

							{user && user !== null ? (
								<div>
									<Link to='/cart'>Cart</Link>
									<LogoutBtn />
								</div>
							) : (
								<div className='header__auth__wrapp'>
									{/* <Link onClick={handleBurgerToggle} className='header__auth__btn margin-10' to={'/login'}>
										Login
									</Link> */}
									{/* <Link onClick={handleBurgerToggle} className='header__auth__btn' to={'/register'}>
										Register
									</Link> */}

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

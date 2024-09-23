import { Link } from 'react-router-dom';

import './footer-nav.scss';

const FooterNav = () => {
	return (
		<nav className='nav'>
			<ul className={`footer__nav__list`}>
				<li className='footer__nav__item'>
					<Link className={`footer__nav__link`} to={'/'}>
						Home
					</Link>
				</li>

				<li className='footer__nav__item'>
					<Link className={`footer__nav__link`} to={'/menu'}>
						Menu
					</Link>
				</li>

				<li className='footer__nav__item'>
					<Link className={`footer__nav__link`} to={'/shop'}>
						Shop
					</Link>
				</li>

				<li className='footer__nav__item'>
					<Link className={`footer__nav__link`} to={'/contact'}>
						Contact us
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default FooterNav;

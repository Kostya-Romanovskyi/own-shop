import { Link } from 'react-router-dom';

import './nav-items.scss';
import { FC } from 'react';

interface INavItem {
	click: () => void;
	classStyle: string;
	classNav: string;
}
const NavItems: FC<INavItem> = ({ click, classStyle, classNav }) => {
	return (
		<nav className='nav'>
			<ul className={`nav__list ${classNav}`}>
				<li className='nav__item'>
					<Link onClick={click} className={`nav__link ${classStyle}`} to={'/'}>
						Home
					</Link>
				</li>

				<li className='nav__item'>
					<Link onClick={click} className={`nav__link ${classStyle}`} to={'/menu'}>
						Menu
					</Link>
				</li>

				<li className='nav__item'>
					<Link onClick={click} className={`nav__link ${classStyle}`} to={'/shop'}>
						Shop
					</Link>
				</li>

				{/* <li className='nav__item'>
					<Link onClick={click} className={`nav__link ${classStyle}`} to={'/order'}>
						Order
					</Link>
				</li> */}

				{/* <li className='nav__item'>
					<Link onClick={click} className={`nav__link ${classStyle}`} to={'/contact'}>
						Contact us
					</Link>
				</li> */}

				{/* <li className='nav__item'>
					<Link onClick={click} className={`nav__link ${classStyle}`} to={'/profile/my-data'}>
						Profile
					</Link>
				</li> */}
			</ul>
		</nav>
	);
};

export default NavItems;

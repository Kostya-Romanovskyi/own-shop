import { Link } from 'react-router-dom';

import MainButton from '../MainButton/MainButton';
import FooterNav from '../FooterNav/FooterNav';
import GoogleMapComponent from '../GoogleMap/GoogleMap';

import './footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer__wrapper'>
					<div className='footer__nav'>
						<FooterNav />

						<MainButton name='Order now' redirect='/order' classStyle='footer__button' click={() => {}} />
					</div>

					<div className='footer__location'>
						<h2 className='footer__location__title'>Locate us</h2>

						<GoogleMapComponent />
					</div>

					<div className='footer__schedule'>
						<h2 className='footer__schedule__title'>Open hours</h2>

						<div>
							<div className='schedule__days'>Mon - Fri:</div>
							<div className='schedule__description mb-10'>
								<span>10:00 am - 8:00 pm</span>
							</div>
							<div className='schedule__days'>Sat:</div>
							<div className='schedule__description'>
								<span>12:00 pm - 6:00pm</span>
							</div>
						</div>
					</div>
				</div>

				<div className='footer__info'>
					<div className='footer__info__logo'>Logo</div>

					<div className='footer__info__wrapp'>
						<h3 className='footer__info__title'>Follow us:</h3>

						<ul className='footer__info__list'>
							<li className='footer__info__item'>
								<Link to='/'>Instagram</Link>
							</li>
							<li className='footer__info__item'>
								<Link to='/'>Facebook</Link>
							</li>
							<li className='footer__info__item'>
								<Link to='/'>Twitter</Link>
							</li>
						</ul>
					</div>

					<div className='footer__info__rights'>
						© 2024 ownSushi.<span className='footer__info__span'>All rights reserved.</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

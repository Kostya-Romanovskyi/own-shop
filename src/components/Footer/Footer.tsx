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

					<div className='footer__info__list'>
						<h3>Follow us:</h3>
						<ul>
							<li>Instagram</li>
							<li>Facebook</li>
							<li>Twitter</li>
						</ul>
					</div>

					<div className='footer__info__rights'>© 2024 ownSushi. All rights reserved.</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

import MainButton from '../MainButton/MainButton';
import NavItems from '../NavItems/NavItems';
import './footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer__wrapper'>
					<div className='footer__nav'>
						<NavItems classNav='nav__list' classStyle='footer__nav__items' click={() => {}} />

						<MainButton name='Order now' redirect='/order' classStyle='footer__button' click={() => {}} />
					</div>

					<div className='footer__location'>
						<h2>Locate us</h2>
					</div>

					<div className='footer__schedule'>
						<h2>Open hours</h2>

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
			</div>
		</footer>
	);
};

export default Footer;

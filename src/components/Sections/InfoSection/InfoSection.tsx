import MainButton from '../../MainButton/MainButton';
import InfoItem from '../../InfoItem/InfoItem';

import image1 from '../../../assets/Info__section/sushi.png';
import image2 from '../../../assets/Info__section/sushi2.png';
import image3 from '../../../assets/Info__section/sushi3.png';

import './InfoSection.scss';

const InfoSection = () => {
	return (
		<section className='section'>
			<div className='container'>
				<div className='info__wrapper'>
					<div className='info__left'>
						<InfoItem title='"Our priority is quality, now and always."' image={image1} alt='Shrimp' />

						<InfoItem title='"The customer always comes first."' image={image2} alt='Happy salmon' />
					</div>

					<div className='info__right'>
						<InfoItem title='Join us today and start enjoying the experience!' image={image3} alt='Surprised salmon' />

						<MainButton click={() => {}} classStyle='info__btn' redirect='' name='Join us' />
					</div>
				</div>
			</div>
		</section>
	);
};

export default InfoSection;

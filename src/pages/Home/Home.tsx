import MainButton from '../../components/MainButton/MainButton';
import Sushi_1 from '../../assets/Hero__img/sushi_1.png';
import Sushi_2 from '../../assets/Hero__img/sushi_2.png';
import Sushi_3 from '../../assets/Hero__img/sushi_3.png';
import Sushi_4 from '../../assets/Hero__img/sushi_4.png';

import './home.scss';

const Home = () => {
	const handleClick = () => {};
	return (
		<main>
			<section className='hero__section'>
				<div className='container'>
					<h1 className='hero__title'>Savor the Art of Freshness at ownSushi</h1>

					<ul className='hero__img__list'>
						<li>
							<img className='hero__image' src={Sushi_1} alt='Smiling sushi' />
						</li>
						<li>
							<img className='hero__image' src={Sushi_2} alt='laughing sushi' />
						</li>
						<li>
							<img className='hero__image' src={Sushi_3} alt='sushi' />
						</li>
						<li>
							<img className='hero__image' src={Sushi_4} alt='sushi' />
						</li>
					</ul>

					<div className='header__btn__wrapp'>
						<MainButton redirect='/orders' name='Order now' click={() => {}} classStyle='hero__btn margin__10' />

						<MainButton redirect='/reservation' name='Make reservation' click={() => {}} classStyle='hero__btn' />
					</div>
				</div>
			</section>
		</main>
	);
};

export default Home;

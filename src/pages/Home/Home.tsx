import HeroSection from '../../components/Sections/HeroSection/HeroSection';

import ScheduleSection from '../../components/Sections/ScheduleSection/ScheduleSection';

import CarouselSection from '../../components/Sections/CarouselSection/CarouselSection';

import './home.scss';
import ReviewsSection from '../../components/Sections/ReviewsSection/ReviewsSection';
import InfoSection from '../../components/Sections/InfoSection/InfoSection';

import Footer from '../../components/Footer/Footer';

const Home = () => {



	return (
		<main>
			<HeroSection />

			<ScheduleSection />

			<CarouselSection />

			<ReviewsSection />

			<InfoSection />

			<Footer />
		</main>
	);
};

export default Home;

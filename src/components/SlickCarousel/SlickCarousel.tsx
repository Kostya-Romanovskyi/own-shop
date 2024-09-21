import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlickCarousel.scss';

import img1 from '../../assets/Hero__img/sushi_1.png';
import img2 from '../../assets/Hero__img/sushi_2.png';
import img3 from '../../assets/Hero__img/sushi_3.png';
import img4 from '../../assets/Hero__img/sushi_4.png';

const nextArrStyles = {
	display: 'block',

	position: 'absolute',
	bottom: 0,
	right: '15px',
	zIndex: 1000,
};

const prevArrStyles = {
	display: 'block',

	position: 'absolute',
	bottom: 0,
	left: '5px',
	zIndex: 1000,
};

function SampleNextArrow(props: any) {
	const { className, style, onClick } = props;
	return <div className={className} style={{ ...style, ...nextArrStyles }} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
	const { className, style, onClick } = props;
	return <div className={className} style={{ ...style, ...prevArrStyles }} onClick={onClick} />;
}

const SlickCarousel = () => {
	var settings = {
		infinite: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		cssEase: 'linear',
		pauseOnHover: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div className='slider__container'>
			<Slider {...settings}>
				<div className='slider__img__wrapp'>
					<img className='slider__img' src={img1} alt='' />
				</div>
				<div className='slider__img__wrapp'>
					<img className='slider__img' src={img2} alt='' />
				</div>
				<div className='slider__img__wrapp'>
					<img className='slider__img' src={img3} alt='' />
				</div>
				<div className='slider__img__wrapp'>
					<img className='slider__img' src={img4} alt='' />
				</div>
			</Slider>
		</div>
	);
};

export default SlickCarousel;

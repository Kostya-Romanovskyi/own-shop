import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlickCarousel.scss';

import img1 from '../../assets/gallery/Omurice.jpg';
import img2 from '../../assets/gallery/Oyakodon.jpg';
import img3 from '../../assets/gallery/curry.jpeg';
import img4 from '../../assets/gallery/gyudon.webp';
import img5 from '../../assets/gallery/harusame.avif';
import img6 from '../../assets/gallery/katsu.jpeg';

const nextArrStyles = {
  display: 'block',

  position: 'absolute',
  bottom: 0,
  right: '15px',
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

const gallery = [
  { img: img1, name: '1' },
  { img: img2, name: '2' },
  { img: img3, name: '3' },
  { img: img4, name: '4' },
  { img: img5, name: '5' },
  { img: img6, name: '6' },
];

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
    centerMode: true,
    centerPadding: '0px',
    adaptiveHeight: true,

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
    <div className="slider__container">
      <Slider {...settings}>
        {gallery.map(({ img, name }) => (
          <div key={name} className="slider__img__wrapp">
            <img className="slider__img" src={img} alt={name} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickCarousel;

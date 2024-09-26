import { FC, useState } from 'react';

import Image from '../../assets/Info__section/sushi.png';
import Image2 from '../../assets/Info__section/sushi2.png';

import './image-zoom.scss';

interface IImageZoom {
	image: string;
}

const ImageZoom: FC<IImageZoom> = ({ image }) => {
	const [isDisassembled, setIsDisassembled] = useState(false);

	// Функция для переключения состояния разборки
	const toggleDisassembly = () => {
		setIsDisassembled(!isDisassembled);
	};

	return (
		<div className={`sushi-container ${isDisassembled ? 'disassembled' : ''}`} onClick={toggleDisassembly}>
			{/* Слой нори */}
			<div className='sushi-layer nori'>
				<img style={{ background: 'black' }} src={Image} alt='Nori' />
			</div>
			{/* Слой рыбы */}
			<div className='sushi-layer fish'>
				<img src={Image2} alt='Fish' />
			</div>
			{/* Слой риса */}
			<div className='sushi-layer rice'>
				<img src={image} alt='Rice' />
			</div>
		</div>
	);
};

export default ImageZoom;

import { FC, useState } from 'react';

import Image from '../../assets/Info__section/sushi.png';
import Image2 from '../../assets/Info__section/sushi2.png';

import './image-zoom.scss';

interface IImageZoom {
	image: string;
}

const ImageZoom: FC<IImageZoom> = ({ image }) => {
	const [isDisassembled, setIsDisassembled] = useState(false);

	// Toggle function
	const toggleDisassembly = () => {
		setIsDisassembled(!isDisassembled);
	};

	return (
		<div className={`sushi-container ${isDisassembled ? 'disassembled' : ''}`} onClick={toggleDisassembly}>
			{/* Layer nori */}
			<div className='sushi-layer nori'>
				<img style={{ background: 'black' }} src={Image} alt='Nori' />
			</div>
			{/* Layer fish */}
			<div className='sushi-layer fish'>
				<img src={Image2} alt='Fish' />
			</div>
			{/* Layer rice */}
			<div className='sushi-layer rice'>
				<img src={image} alt='Rice' />
			</div>
		</div>
	);
};

export default ImageZoom;

import { FC } from 'react';

import './categories-item.scss';
interface ICategoriesItemProps {
	name: string;
	image: string;
}

const CategoriesItem: FC<ICategoriesItemProps> = ({ name, image }) => {
	return (
		<li className='category__item'>
			<img className='category__image' src={image} alt={name} />

			<p className='category__name'>{name}</p>
		</li>
	);
};

export default CategoriesItem;

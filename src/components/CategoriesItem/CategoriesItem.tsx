import { FC } from 'react';
import './categories-item.scss';

interface ICategoriesItemProps {
	name: string;
	description: string;
	image: string;
}

const CategoriesItem: FC<ICategoriesItemProps> = ({ name, description, image }) => {
	return (
		<>
			<div>{name}</div>
			<div>{description}</div>
			<img src={image} alt={name} />
		</>
	);
};

export default CategoriesItem;

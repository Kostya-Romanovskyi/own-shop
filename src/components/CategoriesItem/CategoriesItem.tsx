import { FC } from 'react';
import './categories-item.scss';
import { Link, useParams } from 'react-router-dom';

interface ICategoriesItemProps {
	name: string;
	description: string;
	image: string;
}

const CategoriesItem: FC<ICategoriesItemProps> = ({ name, description, image }) => {
	const { categoryName } = useParams();

	return (
		<Link to={`/menu/categories/${categoryName}/${name.toLowerCase()}`}>
			<li
				className='categories__item'
				style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${image})` }}
			>
				<h3 className='categories__item-title'>{name}</h3>
				<p className='categories__item-description'>{description}</p>
			</li>
		</Link>
	);
};

export default CategoriesItem;

import { useAllCategories } from '../../hooks/useAllCategories';
import CategoriesItem from '../CategoriesItem/CategoriesItem';

import './categories-list.scss';

interface ICategoriesListProps {
	name: string;
	image: string;
}

const CategoriesList = () => {
	const { data: categoriesData } = useAllCategories();
	console.log(categoriesData);

	return (
		<ul className='category__list'>
			{categoriesData &&
				categoriesData.map(({ name, image }: ICategoriesListProps) => {
					return <CategoriesItem name={name} image={image} />;
				})}
		</ul>
	);
};

export default CategoriesList;

import { useAllCategories } from '../../hooks/useAllCategories';
import CategoriesItemSlider from '../CategoriesItemSlider/CategoriesItemSlider';

import './categories-list-slider.scss';

interface ICategoriesListSliderProps {
	id: number;
	name: string;
	image: string;
}

const CategoriesListSlider = () => {
	const { data: categoriesData } = useAllCategories();
	console.log(categoriesData);

	return (
		<ul className='category__list'>
			{categoriesData &&
				categoriesData.map(({ id, name, image }: ICategoriesListSliderProps) => {
					return <CategoriesItemSlider key={id} name={name} image={image} />;
				})}
		</ul>
	);
};

export default CategoriesListSlider;

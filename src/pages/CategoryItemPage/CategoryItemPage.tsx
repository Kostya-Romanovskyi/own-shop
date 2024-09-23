import { useCategoryByName } from '../../hooks/useAllCategories';

import { useParams } from 'react-router-dom';

import './category-item-page.scss';
import CategoriesList from '../../components/CategoriesList/CategoriesList';

const CategoryItemPage = () => {
	const { categoryName } = useParams<{ categoryName: string }>();

	const { data: categoryData, isLoading, error } = useCategoryByName(categoryName || '');

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading category.</div>;
	}

	if (!categoryData) {
		return <div>No category found.</div>;
	}

	return (
		<>
			<h2>{categoryName && `${categoryName[0].toUpperCase()}${categoryName?.slice(1, categoryName.length)}`}</h2>
			
			<CategoriesList categoryItems={categoryData.products} />;
		</>
	);
};

export default CategoryItemPage;

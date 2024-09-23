import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getCategoryById } from '../API/categories/categories';
import { ICategoryByName } from '../API/categories/categories.interface';
export const useAllCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: getAllCategories,
	});
};

export const useCategoryByName = (categoryName: string) => {
	return useQuery<ICategoryByName | undefined>({
		queryKey: ['categories-name', categoryName],
		queryFn: () => getCategoryById(categoryName),
	});
};

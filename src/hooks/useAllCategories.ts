import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../API/categories/categories';

export const useAllCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: getAllCategories,
	});
};

import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getProductsByName } from '../API/products/products';

export const useAllProducts = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: getAllProducts,
	});
};

export const useProductsByName = (name: string) => {
	return useQuery({
		queryKey: ['products-list'],
		queryFn: () => getProductsByName(name),
	});
};

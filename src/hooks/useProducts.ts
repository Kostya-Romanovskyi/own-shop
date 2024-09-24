import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getProductsByName, getProductsItemById } from '../API/products/products';

// export const useAllProducts = () => {
// 	const queryClient = useQueryClient()

// 	const { mutate } = useMutation({
// 		mutationFn: getAllProducts,
// 		onSuccess: data => {
// 			queryClient.setQueryData(['products'], data)
// 		},
// 	})

// 	return mutate
// }

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

export const useProductsItemById = (id: string) => {
	return useQuery({
		queryKey: ['products-item'],
		queryFn: () => getProductsItemById(id),
	});
};

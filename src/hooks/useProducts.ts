import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllProducts } from '../API/products/products'

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
	})
}

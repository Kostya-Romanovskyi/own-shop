import { useQuery, useMutation } from '@tanstack/react-query'
import { addNewOrder, getUserOrders } from '../API/order/order'

export const useAddNewOrder = () => {

	const { mutate } = useMutation({
		mutationFn: addNewOrder,
		// onSuccess: data => {},
	})

	return mutate
}

export const useGetUserOrders = (userId: number) => {
	return useQuery({
		queryKey: ['UserOrders', userId],
		queryFn: () => getUserOrders(userId),
	})
}

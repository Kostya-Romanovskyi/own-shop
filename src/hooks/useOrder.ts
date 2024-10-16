import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewOrder, getUserOrders } from '../API/order/order';
import { IUserOrder } from '../API/order/order.interface';

export const useAddNewOrder = () => {
	const queryClient = useQueryClient();
	const { data: user } = useQuery<IUserOrder>({ queryKey: ['current'] });

	const { mutate } = useMutation({
		mutationFn: addNewOrder,
		onSuccess: () => {
			alert('Success');
			queryClient.invalidateQueries({ queryKey: ['user-cart', user?.id] });
		},
		onError: error => {
			alert(error);
		},
	});

	return mutate;
};

export const useGetUserOrders = (userId: number) => {
	return useQuery({
		queryKey: ['UserOrders', userId],
		queryFn: () => getUserOrders(userId),
	});
};

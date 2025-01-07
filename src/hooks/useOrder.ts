import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewOrder, getAllOrders, getUserOrders, updateOrderStatus } from '../API/order/order';
import { IPaginationSetting, IUpdateStatus, IUserOrder } from '../API/order/order.interface';
import { toast } from 'react-toastify';
import playOrderSound from '../helpers/PlayOrderSound';

export const useGetAllOrders = (paginationSetting: IPaginationSetting) => {
	return useQuery({
		queryKey: ['AllOrders', paginationSetting],
		queryFn: async ({ queryKey }) => {
			const [, { page, limit }] = queryKey as [string, IPaginationSetting];
			return getAllOrders({ page, limit });
		},
	});
};

export const useAddNewOrder = () => {
	const queryClient = useQueryClient();
	const { data: user } = useQuery<IUserOrder>({ queryKey: ['current'] });

	const { mutate } = useMutation({
		mutationFn: addNewOrder,
		onSuccess: () => {
			alert('Success');
			queryClient.invalidateQueries({ queryKey: ['user-cart', user?.id] });

			playOrderSound()
		},
		onError: error => {
			alert(error);
		},
	});

	return mutate;
};

export const useGetUserOrders = (userId: number, page: number) => {
	return useQuery({
		queryKey: ['UserOrders', userId, page],
		queryFn: () => getUserOrders(userId, page),
	});
};

export const useUpdateStatus = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-status'],
		mutationFn: (updatedData: IUpdateStatus) => updateOrderStatus(updatedData),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['AllOrders'] });
			toast.success(data.message);
		},
		onError: error => {
			alert(error);
		},
	});

	return { mutate, isPending };
};

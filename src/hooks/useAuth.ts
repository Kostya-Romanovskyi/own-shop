import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../API/auth/auth';

import { loginUser, logout } from '../API/auth/auth';
import { toast } from 'react-toastify';

export const useCurrentUser = () => {
	return useQuery({
		queryKey: ['current'],
		queryFn: getCurrentUser,
		select: data => data,
	});
};

export const useLoginUser = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: loginUser,

		onSuccess: data => {
			queryClient.setQueryData(['login'], data);

			if (data?.token) {
				const token = data?.token;
				localStorage.setItem('token-shop', token);
			}
		},

		onError: error => {
			toast.error(error.message);
		},
	});

	return { mutate, isPending };
};

export const useLogoutUser = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: logout,
	});

	return { mutate, isPending };
};

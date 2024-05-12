import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCurrentUser } from '../API/auth/auth'

import { loginUser, logout } from '../API/auth/auth'

export const useCurrentUser = () => {
	return useQuery({
		queryKey: ['current'],
		queryFn: getCurrentUser,
		select: data => data?.data,
	})
}

export const useLoginUser = () => {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: loginUser,
		onSuccess: data => {
			queryClient.setQueryData(['login'], data)

			if (data?.token) {
				const token = data?.token
				localStorage.setItem('token-shop', token)
			}
		},
	})

	return mutate
}

export const useLogoutUser = () => {
	const { mutate } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			alert('done')
		},
	})

	return mutate
}

import { useQueryClient } from '@tanstack/react-query'
import { IRegister } from '../../API/auth/auth.interface'
import { useLogoutUser } from '../../hooks/useAuth'

const Home = () => {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData<IRegister>(['current'])

	const mutateLogout = useLogoutUser()

	const handleLogout = () => {
		if (data && typeof data.id === 'number') {
			mutateLogout(data.id, {
				onSuccess: async () => {
					await queryClient.invalidateQueries({ queryKey: ['current'] })
				},
			})
		}
	}

	return (
		<>
			<button onClick={handleLogout}>Logout</button>
		</>
	)
}

export default Home

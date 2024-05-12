import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ILogin, IRegister } from '../../API/auth/auth.interface'
import { loginUser } from '../../API/auth/auth'
import { useLoginUser } from '../../hooks/useAuth'

const LoginPage = () => {
	const loginMutation = useLoginUser()
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ILogin>()

	const onSubmit: SubmitHandler<ILogin> = async user => {
		console.log(user)
		loginMutation(user, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['current'] })
			},
		})

		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor='email'>Email</label>
			<input {...register('email', { required: true })} />
			{errors.email && <span>This field is required</span>}

			<label htmlFor='password'>Password</label>
			<input {...register('password', { required: true })} />
			{errors.password && <span>This field is required</span>}

			<input type='submit' />
		</form>
	)
}

export default LoginPage

import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILogin } from '../../API/auth/auth.interface';
import { useLoginUser } from '../../hooks/useAuth';

import './LoginPage.scss';

const LoginPage = () => {
	const loginMutation = useLoginUser();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ILogin>();

	const onSubmit: SubmitHandler<ILogin> = async user => {
		console.log(user);
		loginMutation(user, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['current'] });
			},
		});

		reset();
	};

	return (
		<main>
			<div className='container'>
				<div className='login__wrapper'>
					<form className='login__form' onSubmit={handleSubmit(onSubmit)}>
						<div className='input__login__wrapper'>
							<label className='login__label' htmlFor='email'>
								Email
							</label>

							<input
								className={`login__input ${errors.email ? 'login__error__border' : ''}`}
								{...register('email', { required: true })}
							/>
							{errors.email && <span className='login__error'>Email field is required</span>}
						</div>

						<div className='input__login__wrapper'>
							<label className='login__label' htmlFor='password'>
								Password
							</label>
							<input
								className={`login__input ${errors.password ? 'login__error__border' : ''}`}
								{...register('password', { required: true })}
							/>
							{errors.password && <span className='login__error'>Password field is required</span>}
						</div>

						<button className='login__button' type='submit'>
							Log In
						</button>
					</form>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;

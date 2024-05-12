import { useForm, SubmitHandler } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'

import { registerNewUser } from '../../API/auth/auth'
import { IRegister, UserRole } from '../../API/auth/auth.interface'
import { useState } from 'react'

const RegisterPage = () => {
	const [captcha, setCaptcha] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegister>()

	const onSubmit: SubmitHandler<IRegister> = (data: IRegister) => {
		if (captcha) {
			registerNewUser({ ...data, role: UserRole.USER })

			reset()

			return
		}

		alert('u are robot')
	}

	function onChange(value: any) {
		console.log('Captcha value:', value)

		setCaptcha(true)
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='name'>Name</label>
				<input type='text' {...register('name', { required: true })} id='name' />
				{errors.name && <span>Field 'Name' is required for registration</span>}

				<label htmlFor='last_name'>Last name</label>
				<input type='text' {...register('last_name', { required: true })} id='last_name' />
				{errors.last_name && <span>Field 'Last name' is required for registration</span>}

				<label htmlFor='email'>Email</label>
				<input type='text' {...register('email', { required: true })} id='email' />
				{errors.last_name && <span>Field 'Email' is required for registration</span>}

				<label htmlFor='password'>Password</label>
				<input type='text' {...register('password', { required: true })} id='password' />
				{errors.last_name && <span>Field 'Password' is required for registration</span>}

				<label htmlFor='phone'>Phone</label>
				<input type='text' {...register('phone', { required: true })} id='phone' />
				{errors.last_name && <span>Field 'Phone' is required for registration</span>}

				<label htmlFor='additional_information'>Additional information</label>
				<input type='text' {...register('additional_information')} id='additional_information' />

				<label htmlFor='image'>Avatar</label>
				<input type='text' {...register('image')} id='image' />

				<ReCAPTCHA sitekey='6LeYfNgpAAAAANbWfmHiiiVNqWqQq3s3riSzNgaS' onChange={onChange} id='captcha' />

				<button type='submit'>register</button>
			</form>
		</>
	)
}

export default RegisterPage

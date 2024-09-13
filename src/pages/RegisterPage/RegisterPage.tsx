import { useForm, SubmitHandler } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'

import { registerNewUser } from '../../API/auth/auth'
import { IRegister, UserRole } from '../../API/auth/auth.interface'
import { useState } from 'react'

const RegisterPage = () => {
	const [captcha, setCaptcha] = useState(false)

	const {
		register,
		watch,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegister>()

	const password = watch('password')

	const onSubmit: SubmitHandler<IRegister> = data => {
		if (captcha) {
			const formData = new FormData()

			formData.append('name', data.name)
			formData.append('last_name', data.last_name)
			formData.append('email', data.email)
			formData.append('password', data.password)
			formData.append('password_check', data.password_check)
			formData.append('phone', data.phone)
			formData.append('additional_information', data.additional_information || '')
			formData.append('role', UserRole.USER)
			formData.append('image', data.image[0])

			if (data.password !== data.password_check) return

			registerNewUser(formData)

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
				{errors.email && <span>Field 'Email' is required for registration</span>}

				<label htmlFor='password'>Password</label>
				<input type='text' {...register('password', { required: true })} id='password' />
				{errors.password && <span>Field 'Password' is required for registration</span>}

				<label htmlFor='password_check'>Repeat password</label>

				<input
					type='text'
					{...register('password_check', {
						required: `Field 'Repeat password' is required for registration`,
						validate: value => value === password || 'Passwords do not match',
					})}
					id='password_check'
				/>
				{errors.password_check && <span>{errors.password_check?.message}</span>}

				<label htmlFor='phone'>Phone</label>
				<input type='text' {...register('phone', { required: true })} id='phone' />
				{errors.phone && <span>Field 'Phone' is required for registration</span>}

				<label htmlFor='additional_information'>Additional information</label>
				<input type='text' {...register('additional_information')} id='additional_information' />

				<label htmlFor='image'>Avatar</label>
				<input type='file' {...register('image')} id='image' name='image' />

				<ReCAPTCHA sitekey='6LeYfNgpAAAAANbWfmHiiiVNqWqQq3s3riSzNgaS' onChange={onChange} id='captcha' />

				<button type='submit'>Register</button>
			</form>
		</>
	)
}

export default RegisterPage

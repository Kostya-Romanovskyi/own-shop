import { useForm, SubmitHandler } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

import { registerNewUser } from '../../API/auth/auth';
import { IRegister, UserRole } from '../../API/auth/auth.interface';
import { ChangeEvent, useState } from 'react';

import { FaCheck } from 'react-icons/fa';
import { FaPersonCirclePlus } from 'react-icons/fa6';

import './register-page.scss';

const RegisterPage = () => {
	const [captcha, setCaptcha] = useState(false);
	const [file, setFile] = useState(false);

	const {
		register,
		watch,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegister>();

	const password = watch('password');

	const onSubmit: SubmitHandler<IRegister> = data => {
		if (captcha) {
			const formData = new FormData() as unknown as IRegister;

			formData['name'] = data.name;
			formData['last_name'] = data.last_name;
			formData['email'] = data.email;
			formData['password'] = data.password;
			formData['password_check'] = data.password_check;
			formData['phone'] = data.phone;
			formData['additional_information'] = data.additional_information;
			formData['role'] = UserRole.USER;

			if (data.image instanceof FileList) {
				formData['image'] = data.image[0];
			}

			if (data.password !== data.password_check) return;

			registerNewUser({ ...formData });

			reset();

			return;
		}

		alert('u are robot');
	};

	function onChange(value: any) {
		console.log('Captcha value:', value);

		setCaptcha(true);
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files;
		if (file) {
			setFile(true);
		} else {
			setFile(true);
			false;
		}
	};

	return (
		<main>
			<div className='container'>
				<form onSubmit={handleSubmit(onSubmit)} className='register__form'>
					<div>
						<label className='register__label' htmlFor='name'>
							Name
						</label>
						<input
							className={`register__input ${errors.name ? 'register__error__border' : ''}`}
							type='text'
							{...register('name', { required: true })}
							id='name'
						/>
						{errors.name && <span className='register__error'>Field 'Name' is required for registration</span>}
					</div>

					<div>
						<label className='register__label' htmlFor='last_name'>
							Last name
						</label>
						<input
							className={`register__input  ${errors.last_name ? 'register__error__border' : ''}`}
							type='text'
							{...register('last_name', { required: true })}
							id='last_name'
						/>
						{errors.last_name && (
							<span className='register__error'>Field 'Last name' is required for registration</span>
						)}
					</div>

					<div>
						<label className='register__label' htmlFor='email'>
							Email
						</label>
						<input
							className={`register__input  ${errors.email ? 'register__error__border' : ''}`}
							type='text'
							{...register('email', { required: true })}
							id='email'
						/>
						{errors.email && <span className='register__error'>Field 'Email' is required for registration</span>}
					</div>

					<div>
						<label className='register__label' htmlFor='password'>
							Password
						</label>
						<input
							className={`register__input  ${errors.password ? 'register__error__border' : ''}`}
							type='password'
							{...register('password', { required: true })}
							id='password'
						/>
						{errors.password && <span className='register__error'>Field 'Password' is required for registration</span>}
					</div>
					<div>
						<label className='register__label' htmlFor='password_check'>
							Repeat password
						</label>

						<input
							className={`register__input  ${errors.password_check ? 'register__error__border' : ''}`}
							type='password'
							{...register('password_check', {
								required: `Field 'Repeat password' is required for registration`,
								validate: value => value === password || 'Passwords do not match',
							})}
							id='password_check'
						/>
						{errors.password_check && <span className='register__error'>{errors.password_check?.message}</span>}
					</div>

					<div>
						<label className='register__label' htmlFor='phone'>
							Phone
						</label>
						<input
							className={`register__input  ${errors.phone ? 'register__error__border' : ''}`}
							type='text'
							{...register('phone', { required: true })}
							id='phone'
						/>
						{errors.phone && <span className='register__error'>Field 'Phone' is required for registration</span>}
					</div>

					<div>
						<label className='register__label' htmlFor='additional_information'>
							Additional information
						</label>
						<input
							className={`register__input  ${errors.additional_information ? 'register__error__border' : ''}`}
							type='text'
							{...register('additional_information')}
							id='additional_information'
						/>
					</div>

					<div className='register__file__wrapper'>
						<label className='register__label custom-file-upload' htmlFor='image'>
							Upload Avatar
						</label>

						<input onInput={handleFileChange} className='' type='file' {...register('image')} id='image' name='image' />
						{file ? <FaCheck style={{ color: 'green' }} /> : <FaPersonCirclePlus style={{ fontSize: '1.3rem' }} />}
					</div>

					<div className='captcha__wrapper'>
						<ReCAPTCHA sitekey='6LeYfNgpAAAAANbWfmHiiiVNqWqQq3s3riSzNgaS' onChange={onChange} id='captcha' />
					</div>
					<button className='register__btn' type='submit'>
						Register
					</button>
				</form>
			</div>
		</main>
	);
};

export default RegisterPage;

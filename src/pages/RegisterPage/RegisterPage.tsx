import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { ChangeEvent, useState } from 'react';

import { FaCheck } from 'react-icons/fa';
import { FaPersonCirclePlus } from 'react-icons/fa6';

import { IRegister, UserRole } from '../../API/auth/auth.interface';

import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import './register-page.scss';

const RegisterPage = () => {
	const [captchaValid, setCaptchaValid] = useState(false);
	const [avatarUploaded, setAvatarUploaded] = useState(false);

	const {
		register,
		control,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<IRegister>();

	// Email validation
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// Password check
	const password = watch('password');

	const onSubmit: SubmitHandler<IRegister> = data => {
		if (!captchaValid) {
			alert('Please complete the CAPTCHA');
			return;
		}

		if (data.password !== data.password_check) {
			alert('Passwords do not match');
			return;
		}

		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value as string | Blob);
		});
		formData.append('role', UserRole.USER);

		if (data.image instanceof FileList) {
			formData.append('image', data.image[0]);
		}

		console.log('Form Data:', Object.fromEntries(formData.entries()));

		// registerNewUser(formData);
		reset();
	};

	// handle input Avatar load
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files;
		if (file) {
			setAvatarUploaded(true);
		} else {
			setAvatarUploaded(true);
			false;
		}
	};

	// handle Captcha change
	const handleCaptchaChange = (value: string | null) => {
		setCaptchaValid(!!value);
	};

	return (
		<main>
			<div className='container'>
				<form onSubmit={handleSubmit(onSubmit)} className='register__form'>
					{/** Name field */}
					<div>
						<label className='register__label' htmlFor='name'>
							Name
						</label>
						<input
							className={`register__input ${errors.name ? 'register__error__border' : ''}`}
							type='text'
							{...register('name', { required: 'Name is required' })}
							id='name'
						/>
						{errors.name && <span className='register__error'>{errors.name.message}</span>}
					</div>

					{/*Last name field */}
					<div>
						<label className='register__label' htmlFor='last_name'>
							Last Name
						</label>
						<input
							className={`register__input ${errors.last_name ? 'register__error__border' : ''}`}
							type='text'
							{...register('last_name', { required: 'Last name is required' })}
							id='last_name'
						/>
						{errors.last_name && <span className='register__error'>{errors.last_name.message}</span>}
					</div>

					{/* Email field */}
					<div>
						<label className='register__label' htmlFor='email'>
							Email
						</label>

						<input
							className={`register__input  ${errors.email ? 'register__error__border' : ''}`}
							type='text'
							{...register('email', {
								required: true,
								pattern: {
									value: emailRegex,
									message: 'Invalid email format',
								},
							})}
							id='email'
						/>
						{errors.email && <span className='register__error'>Field 'Email' is required for registration</span>}
						{errors.email && <span className='register__error'>{errors.email.message}</span>}
					</div>

					{/*Phone field */}
					<div>
						<label className='register__label' htmlFor='phone'>
							Phone
						</label>
						<Controller
							name='phone'
							control={control}
							rules={{
								required: 'Phone number is required',
								validate: value => isPossiblePhoneNumber(value || '') || 'Invalid phone number',
							}}
							render={({ field }) => (
								<PhoneInput
									{...field}
									id='phone'
									placeholder='Enter phone number'
									international
									className={`custom-phone-input ${
										field.value && isPossiblePhoneNumber(field.value) ? 'valid-phone' : ''
									}`}
								/>
							)}
						/>
						{errors.phone && <span className='register__error'>{errors.phone.message}</span>}
					</div>

					{/** Password field */}
					<div>
						<label className='register__label' htmlFor='password'>
							Password
						</label>
						<input
							className={`register__input ${errors.password ? 'register__error__border' : ''}`}
							type='password'
							{...register('password', { required: 'Password is required' })}
							id='password'
						/>
						{errors.password && <span className='register__error'>{errors.password.message}</span>}
					</div>

					{/* Password check field */}
					<div>
						<label className='register__label' htmlFor='password_check'>
							Repeat Password
						</label>
						<input
							className={`register__input ${errors.password_check ? 'register__error__border' : ''}`}
							type='password'
							{...register('password_check', {
								required: 'Please repeat your password',
								validate: value => value === password || 'Passwords do not match',
							})}
							id='password_check'
						/>
						{errors.password_check && <span className='register__error'>{errors.password_check.message}</span>}
					</div>

					{/* Additional info field*/}
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
						{avatarUploaded ? (
							<FaCheck style={{ color: 'green' }} />
						) : (
							<FaPersonCirclePlus style={{ fontSize: '1.3rem' }} />
						)}
					</div>

					{/** CAPTCHA */}
					<div className='captcha__wrapper'>
						<ReCAPTCHA sitekey='6LeYfNgpAAAAANbWfmHiiiVNqWqQq3s3riSzNgaS' onChange={handleCaptchaChange} id='captcha' />
					</div>

					{/** Registration button */}
					<button className='register__btn' type='submit'>
						Register
					</button>
				</form>
			</div>
		</main>
	);
};

export default RegisterPage;

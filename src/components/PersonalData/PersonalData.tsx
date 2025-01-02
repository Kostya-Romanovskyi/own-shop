import { useForm, SubmitHandler } from 'react-hook-form';
import './personal-data.scss';
import { useQuery } from '@tanstack/react-query';
import { IRegister } from '../../API/auth/auth.interface';
import { useEffect, useState } from 'react';

import InputString from '../InputString/InputString';

type Inputs = {
	name: string;
	last_name: string;
	email: string;
	phone: string;
	additional_information: string;
};

const PersonalData = () => {
	const { data: userData } = useQuery<IRegister>({ queryKey: ['current'] });

	const [formData, setFormData] = useState({
		name: userData?.name || '',
		last_name: userData?.last_name || '',
		email: userData?.email || '',
		phone: userData?.phone || '',
		additional_information: userData?.additional_information || '',
	});

	useEffect(() => {
		setFormData({
			name: userData?.name || '',
			last_name: userData?.last_name || '',
			email: userData?.email || '',
			phone: userData?.phone || '',
			additional_information: userData?.additional_information || '',
		});
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='personal__data__wrapp'>
				<div className='personal__input__wrapp'>
					<InputString
						placeholder={formData?.name || ''}
						label='Name'
						name='name'
						register={register}
						type='text'
						defaultValue={formData?.name || ''}
					/>
				</div>

				<div className='personal__input__wrapp'>
					<InputString
						placeholder={formData?.last_name || ''}
						label='Last name'
						name='last_name'
						register={register}
						type='text'
						defaultValue={formData?.last_name || ''}
					/>
					{/* errors will return when field validation fails  */}
					{errors.last_name && <span>This field is required</span>}
				</div>
			</div>

			<div className='personal__data__wrapp'>
				<div className='personal__input__wrapp'>
					<InputString
						placeholder={formData?.email || ''}
						label='Email'
						name='email'
						register={register}
						type='email'
						defaultValue={formData?.email || ''}
					/>
				</div>

				<div className='personal__input__wrapp'>
					<InputString
						placeholder={formData?.phone || ''}
						label='Phone number'
						name='phone'
						register={register}
						type='tel'
						defaultValue={formData?.phone || ''}
					/>
				</div>
			</div>

			<div>
				<label className='personal__additional__label' htmlFor='additional_information'>
					Additional information about you (about allergies, preferences etc...)
				</label>
				<textarea
					className='personal__additional__info'
					{...register('additional_information')}
					name='additional_information'
					id='additional_information'
					defaultValue={formData?.additional_information}
				></textarea>
			</div>

			<button className='button__type--btn button__type--indent' type='submit'>
				Apply changes
			</button>
		</form>
	);
};

export default PersonalData;

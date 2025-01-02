import { FC } from 'react';
import { ChangeEvent } from 'react';
import './input-string.scss';

interface IInputString {
	label: string;
	name: string;
	defaultValue: string;
	type: string;
	register: any;
	placeholder: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

const InputString: FC<IInputString> = ({
	label,
	name,
	defaultValue,
	type = 'string',
	register,
	placeholder = '',
	onChange = () => {},
	error,
}) => {
	return (
		<>
			<label className='main__label' htmlFor={name}>
				{label}
			</label>
			<input
				className='main__input'
				{...register(name)}
				type={type}
				name={name}
				id={name}
				placeholder={placeholder}
				onChange={onChange}
				defaultValue={defaultValue}
			/>
			{error && <p>{error}</p>}
		</>
	);
};

export default InputString;

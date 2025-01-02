export const customSelectStyles = {
	control: (provided: any) => ({
		...provided,
		backgroundColor: '#282729',
		borderColor: 'rgba(225, 225, 225, 15%)',
		color: '#ffffff',
	}),
	option: (provided: any, state: any) => ({
		...provided,
		backgroundColor: state.isSelected ? 'darkgray' : '#282729', // Selected option background
		color: '#ffffff',
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: '#ffffff', // Selected value text color
	}),
	menu: (provided: any) => ({
		...provided,
		backgroundColor: '#282729', // Dropdown menu background
		borderColor: 'rgba(225, 225, 225, 15%)',
	}),
	input: (provided: any) => ({
		...provided,
		color: '#ffffff',
	}),
	placeholder: (provided: any) => ({
		...provided,
		color: '#ffffff',
	}),
};

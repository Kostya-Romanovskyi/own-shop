import SelectComponent from '../../components/SelectComponent/SelectComponent';
import ProfileList from '../../components/ProfileList/ProfileList';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './profile.scss';

const options = [
	{ value: 'my-data', label: 'Personal data' },
	{ value: 'my-orders', label: 'My orders' },
];

const Profile = () => {
	const [selectedOption, setSelectedOption] = useState(options[0]);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		location.pathname === '/profile' ? navigate('/profile/my-data') : '';
	}, [location.pathname]);

	return (
		<div className='container'>
			<div className='select__wrapper'>
				<div className='show__mobile'>
					<SelectComponent options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
				</div>

				<div className='flex__container'>
					<ProfileList />

					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Profile;

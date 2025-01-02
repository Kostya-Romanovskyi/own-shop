import { Link, useLocation } from 'react-router-dom';
import { MdAccountBox } from 'react-icons/md';
import { FaListAlt } from 'react-icons/fa';
import './profile-list.scss';

const ProfileList = () => {
	const location = useLocation();
	console.log(location);

	return (
		<ul className='show__desktop profile__list'>
			<Link className='profile__link' to='/profile/my-data'>
				<li className={`profile__item ${location.pathname === '/profile/my-data' ? 'active-item' : ''}`}>
					Personal data <MdAccountBox className='profile__icon' />
				</li>
			</Link>

			<Link className='profile__link' to='/profile/my-orders'>
				<li className={`profile__item ${location.pathname === '/profile/my-orders' ? 'active-item' : ''}`}>
					My orders <FaListAlt className='profile__icon' />
				</li>
			</Link>
		</ul>
	);
};

export default ProfileList;

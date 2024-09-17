import { FC } from 'react';
import { Link } from 'react-router-dom';

import './main-button.scss';

interface IMainButtonProps {
	redirect: string;
	name: string;
	click: () => void;
	classStyle: string;
}
const MainButton: FC<IMainButtonProps> = ({ redirect, name, click, classStyle }) => {
	return (
		<Link to={`${redirect}`} onClick={click} className={`main-button ${classStyle}`}>
			{name}
		</Link>
	);
};

export default MainButton;

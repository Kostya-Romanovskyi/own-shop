import { FC } from 'react';
import './headerButton.scss';

interface IHeaderButtonProps {
	click: () => void;
	icon: string;
}

const HeaderButton: FC<IHeaderButtonProps> = ({ click, icon }) => {
	return (
		<button onClick={click} className={`header__btn`} type='button'>
			{icon}
		</button>
	);
};

export default HeaderButton;

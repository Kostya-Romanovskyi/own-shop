import { FC } from 'react';
import './layout.scss';
import Header from '../Header/Header';
import VeryFooter from '../VeryFooter/VeryFooter';

interface ILayoutProps {
	children: any;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className='wrapper'>
			<Header />

			<main>{children}</main>

			<VeryFooter />
		</div>
	);
};

export default Layout;

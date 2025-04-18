import { FC } from 'react';
import './layout.scss';
import Header from '../Header/Header';
import VeryFooter from '../VeryFooter/Footer';
import { useCurrentUser } from '../../hooks/useAuth';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';
import HeaderStaff from '../HeaderStaff/HeaderStaff';

interface ILayoutProps {
  children: any;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading)
    return (
      <div className="loading__container">
        <div>
          <Spinner size={spinnerSize.lg} />
          <p>Sorry, the hosting is free</p>
          <p>It can take a few seconds</p>
        </div>
      </div>
    );

  return (
    <div className="wrapper">
      {user?.role === 'admin' ? <HeaderStaff /> : <Header />}

      <main className={user?.role === 'admin' ? 'staff-layout' : 'user-layout'}>{children}</main>

      {user?.role !== 'admin' && <VeryFooter />}
    </div>
  );
};

export default Layout;

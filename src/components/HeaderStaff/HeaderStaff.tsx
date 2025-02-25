import { useEffect } from 'react';
import { useGetAllOrders } from '../../hooks/useOrder';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LogoutBtn from '../LogoutBtn/LogoutBtn';
import playOrderSound from '../../helpers/PlayOrderSound';
import './header-staff.scss';

const HeaderStaff = () => {
  const { data: orders } = useGetAllOrders();

  const checkStatus = orders?.find(order => order.status === 'Pending');

  useEffect(() => {
    if (checkStatus?.status === 'Pending') {
      playOrderSound();

      const intervalId = setInterval(playOrderSound, 5000);

      return () => clearInterval(intervalId);
    }

    return () => {};
  }, [checkStatus]);

  return (
    <>
      <div className="container header__staff__padding">
        <ul className="header__staff__list">
          <li
            className={`header__staff__item active__orders blink-bg ${checkStatus?.status === 'Pending' ? 'tabs__blink' : ''}`}
          >
            <Link to="/staff">Active orders</Link>
          </li>
          <li className="header__staff__item">
            <Link to="/today-orders">All orders for today</Link>
          </li>
          <li className="header__staff__item">
            <Link to="/orders-by-date">All orders by date</Link>
          </li>
          <li className="header__staff__item">
            <LogoutBtn />
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
};

export default HeaderStaff;

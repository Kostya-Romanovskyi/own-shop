import { Link, Outlet } from 'react-router-dom';
import './admin.scss';
import { useGetAllOrders } from '../../hooks/useOrder';
import { useLocation } from 'react-router-dom';

const Admin = () => {
  const { data: orders } = useGetAllOrders();
  const checkStatus = orders?.find(order => order.status === 'Pending');
  const location = useLocation();
  console.log(location);

  return (
    <div className="admin__wrapper admin__container">
      <div className="">
        <ul>
          <Link className="profile__link" to="/admin-page/staff">
            <li
              className={`profile__item active__orders blink-bg ${checkStatus?.status === 'Pending' ? 'tabs__blink' : ''} 
			  ${location.pathname === '/admin-page/staff' ? 'active__link' : ''}`}
            >
              Active orders
            </li>
          </Link>

          <Link className="profile__link" to="/admin-page/today-orders">
            <li
              className={`profile__item ${location.pathname === '/admin-page/today-orders' ? 'active__link' : ''}`}
            >
              {' '}
              All orders for today
            </li>
          </Link>

          <Link className="profile__link" to="/admin-page/orders-by-date">
            <li
              className={`profile__item ${location.pathname === '/admin-page/orders-by-date' ? 'active__link' : ''}`}
            >
              All orders by date
            </li>
          </Link>

          <Link className="profile__link " to="/admin-page/manage-category">
            <li
              className={`profile__item ${location.pathname === '/admin-page/manage-category' ? 'active__link' : ''}`}
            >
              Manage Category
            </li>
          </Link>

          <Link className="profile__link" to="/admin-page/manage-product">
            <li
              className={`profile__item ${location.pathname === '/admin-page/manage-product' ? 'active__link' : ''}`}
            >
              Manage Product
            </li>
          </Link>

          <Link className="profile__link " to="/admin-page/manage-items">
            <li
              className={`profile__item ${location.pathname === '/admin-page/manage-items' ? 'active__link' : ''}`}
            >
              Manage Items
            </li>
          </Link>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default Admin;

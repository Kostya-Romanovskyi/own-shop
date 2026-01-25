import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useAuth';

const RedirectAdmin = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const allowedPages = [
    '/admin-page/staff',
    '/admin-page/manage-items',
    '/admin-page/manage-category',
    '/admin-page/manage-product',
    '/admin-page',
    '/admin-page/today-orders',
    '/admin-page/orders-by-date',
  ];

  useEffect(() => {
    if (user?.role === 'admin' && !allowedPages.includes(location.pathname)) {
      navigate('/admin-page/staff', { replace: true });
    }
  }, [user, location, navigate]);

  return <>{children}</>;
};

export default RedirectAdmin;

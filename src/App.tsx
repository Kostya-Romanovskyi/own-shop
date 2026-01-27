import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Reservation from './pages/Reservation/Reservation';
import CategoryItemPage from './pages/CategoryItemPage/CategoryItemPage';

import './App.scss';

import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useCurrentUser } from './hooks/useAuth';

import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import Profile from './pages/Profile/Profile';
import Shop from './pages/Shop/Shop';

import ProductsListPage from './pages/ProductsListPage/ProductsListPage';
import Product from './pages/Product/Product';
import { useUserCart } from './hooks/useCart';

import RestrictedRouter from './components/navigation/RestrictedRouter';
import PrivateRouter from './components/navigation/PrivateRouter';
import UserOrdersList from './components/UserOrdersList/UserOrdersList';
import PersonalData from './components/PersonalData/PersonalData';
import Search from './pages/Search/Search';
import Spinner from './components/Spinner/Spinner';
import spinnerSize from './constants/spinnerSize';
import Admin from './pages/Admin/Admin';
import ManageItemsSection from './components/Sections/ManageItemsSection/ManageItemsSection';
import ManageCategorySection from './components/Sections/ManageCategorySection/ManageCategorySection';
import ManageProductSection from './components/Sections/ManageProductSection/ManageProductSection';
import Staff from './pages/Staff/Staff';
import SuccessReservationPage from './pages/SuccessReservationPage/SuccessReservationPage';
import UserReservations from './components/UserReservations/UserReservations';
import SuccessRegisterPage from './pages/SuccsessRegisterPage/SuccessRegisterPage';
import UserRewards from './components/UserRewards/UserRewards';
import { UserRole } from './API/auth/auth.interface';

import RedirectAdmin from './components/navigation/RedirectAdmin';
import TodayOrdersPage from './pages/TodayOrdersPage/TodayOrdersPage';
import OrdersByDatePage from './pages/OrdersByDatePage/OrdersByDatePage';
// import { useQuery } from '@tanstack/react-query';
// import { ICartInfo } from './API/cart/cart.interface';

function App() {
  const { data: user, isLoading } = useCurrentUser();

  const { data: cartData, isLoading: isCartLoading } = useUserCart(user?.id);

  // const { data: cartData, isLoading: isCartLoading } = useQuery<ICartInfo>({
  //   queryKey: ['user-cart', user?.id],
  //   enabled: !!user?.id,
  // });

  // console.log(cartData && 'Cart data in App.tsx:', cartData);

  if (isLoading) {
    return (
      <div className="container">
        <Spinner size={spinnerSize.lg} />
      </div>
    );
  }

  return (
    <RedirectAdmin>
      <Routes>
        <Route index path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/menu/categories" />
        <Route path="/menu/categories/:categoryName" element={<CategoryItemPage />} />
        <Route path="/menu/categories/:categoryName/:allItemsName" element={<ProductsListPage />} />
        <Route
          path="/menu/categories/:categoryName/:productName/:productId"
          element={<Product />}
        />

        <Route path="/menu/search/item-page/:itemId" element={<Product />} />
        <Route path="/menu/search/:query" element={<Search />} />

        <Route path="/menu/all-items/:allItemsName" element={<ProductsListPage />} />

        <Route
          path="/cart"
          element={
            <Cart
              currentUser={user}
              cartData={cartData ?? { result: [], totalPrice: 0 }}
              isCartLoading={isCartLoading}
            />
          }
        />

        <Route path="/shop" element={<Shop />} />

        <Route path="/success-registration" element={<SuccessRegisterPage />} />

        <Route
          path="/profile"
          element={
            <PrivateRouter
              component={<Profile />}
              redirectTo="/"
              currentUser={user}
              isLoading={isLoading}
            />
          }
        >
          <Route
            path="/profile/my-data"
            element={
              <PrivateRouter
                component={<PersonalData currentUser={user} />}
                redirectTo="/"
                currentUser={user}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/profile/my-orders"
            element={
              <PrivateRouter
                component={<UserOrdersList currentUser={user} />}
                redirectTo="/"
                currentUser={user}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/profile/my-rewards"
            element={
              <PrivateRouter
                component={<UserRewards />}
                redirectTo="/"
                currentUser={user}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/profile/my-reservations"
            element={
              <PrivateRouter
                component={<UserReservations currentUser={user} />}
                redirectTo="/"
                currentUser={user}
                isLoading={isLoading}
              />
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <RestrictedRouter component={<LoginPage />} redirectTo="/menu" currentUser={user} />
          }
        />

        <Route
          path="/register"
          element={
            <RestrictedRouter component={<RegisterPage />} redirectTo="/menu" currentUser={user} />
          }
        />

        <Route
          path="/reservation"
          element={
            <PrivateRouter
              component={<Reservation currentUser={user} />}
              redirectTo="/login"
              currentUser={user}
              isLoading={isLoading}
            />
          }
        />

        <Route
          path="/success-reservation"
          element={
            <PrivateRouter
              component={<SuccessReservationPage />}
              redirectTo="/login"
              currentUser={user}
              isLoading={isLoading}
            />
          }
        />

        <Route
          path="/order"
          element={
            <PrivateRouter
              component={<Order />}
              redirectTo="/"
              currentUser={user}
              isLoading={isLoading}
            />
          }
        />

        {user && user?.role === UserRole.ADMIN ? (
          <>
            <Route path="/admin-page" element={<Admin />}>
              <Route path="/admin-page/manage-items" element={<ManageItemsSection />} />
              <Route path="/admin-page/manage-category" element={<ManageCategorySection />} />
              <Route path="/admin-page/manage-product" element={<ManageProductSection />} />
              <Route path="/admin-page/staff" element={<Staff />} />
              <Route path="/admin-page/today-orders" element={<TodayOrdersPage />} />
              <Route path="/admin-page/orders-by-date" element={<OrdersByDatePage />} />
            </Route>
          </>
        ) : null}

        <Route path="*" element={<Navigate to={'/'} replace />} />
      </Routes>
    </RedirectAdmin>
  );
}

export default App;

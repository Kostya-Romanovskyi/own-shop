import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
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

function App() {
	const { data: user, isLoading } = useCurrentUser();

	useUserCart(user?.id);

	return (
		<>
			{isLoading ? (
				<div className='container'>
					<Spinner size={spinnerSize.lg} />
				</div>
			) : (
				<Routes>
					<Route index path='/' element={<Home />} />

					<Route path='/menu' element={<Menu />} />

					<Route path='/menu/categories' />
					<Route path='/menu/categories/:categoryName' element={<CategoryItemPage />} />
					<Route path='/menu/categories/:categoryName/:allItemsName' element={<ProductsListPage />} />
					<Route path='/menu/categories/:categoryName/:productName/:productId' element={<Product />} />

					<Route path='/menu/search/item-page/:itemId' element={<Product />} />
					<Route path='/menu/search/:query' element={<Search />} />

					<Route path='/menu/all-items/:allItemsName' element={<ProductsListPage />} />

					<Route path='/cart' element={<Cart />} />

					<Route path='/shop' element={<Shop />} />

					<Route path='/profile' element={<Profile />}>
						<Route path='/profile/my-data' element={<PrivateRouter component={<PersonalData />} redirectTo='/' />} />

						<Route
							path='/profile/my-orders'
							element={<PrivateRouter component={<UserOrdersList />} redirectTo='/' />}
						/>
					</Route>

					<Route path='/login' element={<RestrictedRouter component={<LoginPage />} redirectTo='/menu' />} />

					<Route path='/register' element={<RestrictedRouter component={<RegisterPage />} redirectTo='/menu' />} />

					<Route path='/order' element={<PrivateRouter component={<Order />} redirectTo='/' />} />

					<Route path='/admin-page' element={<Admin />}>
						<Route path='/admin-page/manage-items' element={<ManageItemsSection />} />
						<Route path='/admin-page/manage-category' element={<ManageCategorySection />} />
						<Route path='/admin-page/manage-product' element={<ManageProductSection />} />
					</Route>

					<Route path='/staff' element={<Staff />} />
				</Routes>
			)}
		</>
	);
}

export default App;

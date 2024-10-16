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

import Header from './components/Header/Header';
import ProductsListPage from './pages/ProductsListPage/ProductsListPage';
import Product from './pages/Product/Product';
import { useUserCart } from './hooks/useCart';

import RestrictedRouter from './components/navigation/RestrictedRouter';
import PrivateRouter from './components/navigation/PrivateRouter';



function App() {
	const { data: user, isLoading } = useCurrentUser();

	useUserCart(user?.id);

	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<Routes>
					<Route path='/' element={<Header />}>
					
						<Route index path='/' element={<Home />} />

						<Route path='/menu' element={<Menu />} />

						<Route path='/menu/categories' />
						<Route path='/menu/categories/:categoryName' element={<CategoryItemPage />} />
						<Route path='/menu/categories/:categoryName/:productName' element={<ProductsListPage />} />
						<Route path='/menu/categories/:categoryName/:productName/:productId' element={<Product />} />

						<Route path='/cart' element={<Cart />} />
						<Route path='/shop' element={<Shop />} />
						<Route path='/profile' element={<Profile />} />

						<Route path='/login' element={<RestrictedRouter component={<LoginPage />} redirectTo='/menu' />} />

						<Route path='/register' element={<RestrictedRouter component={<RegisterPage />} redirectTo='/menu' />} />

						<Route path='/order' element={<PrivateRouter component={<Order />} redirectTo='/' />} />
					</Route>
				</Routes>
			)}
		</>
	);
}

export default App;

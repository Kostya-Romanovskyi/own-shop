import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';

import './App.scss';

import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useCurrentUser } from './hooks/useAuth';

// import PrivateRouter from './components/navigation/PrivateRouter';
// import RestrictedRouter from './components/navigation/RestrictedRouter';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import Profile from './pages/Profile/Profile';
import Shop from './pages/Shop/Shop';

import Header from './components/Header/Header';
function App() {
	const { isLoading } = useCurrentUser();

	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<Header /> {/* This ensures the Header is always rendered */}
					<Routes>
						<Route index path='/' element={<Home />} />
						<Route path='/menu' element={<Menu />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/shop' element={<Shop />} />
						<Route path='/order' element={<Order />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
					</Routes>
				</>
			)}
		</>
	);
}

export default App;

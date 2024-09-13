import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'

import './App.scss'

import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import { useCurrentUser } from './hooks/useAuth'

import PrivateRouter from './components/navigation/PrivateRouter'
import RestrictedRouter from './components/navigation/RestrictedRouter'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import Profile from './pages/Profile/Profile'
import Shop from './pages/Shop/Shop'

import Header from './components/Header/Header'
function App() {
	const { isLoading } = useCurrentUser()

	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<Routes>
					{/*Private Router when user unauth  */}
					<Route path='/' element={<Header />}>
						<Route path='/menu' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/shop' element={<Shop />} />

						<Route path='/order' element={<Order />} />
						<Route path='/profile' element={<Profile />} />

						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
					</Route>
					{/* <Route element={<PrivateRouter />}>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/order' element={<Order />} />
						<Route path='/profile' element={<Profile />} />
					</Route>

					<Route path='/register' element={<RestrictedRouter component={<RegisterPage />} redirectTo='/' />} />
					<Route path='/login' element={<RestrictedRouter component={<LoginPage />} redirectTo='/' />} />

					<Route path='/register' element={<RegisterPage />} />
					<Route path='/login' element={<LoginPage />} /> */}
				</Routes>
			)}
		</>
	)
}

export default App

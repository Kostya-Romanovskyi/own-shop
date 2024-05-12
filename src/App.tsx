import { Route } from 'react-router-dom'

import Home from './pages/Home/Home'

import './App.css'

import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import { useCurrentUser } from './hooks/useAuth'

function App() {
	useCurrentUser()

	return (
		<>
			<Route path='/register' element={<RegisterPage />} />
			<Home />
			<LoginPage />
		</>
	)
}

export default App

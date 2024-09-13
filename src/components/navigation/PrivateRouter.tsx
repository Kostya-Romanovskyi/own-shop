import { FC } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const PrivateRouter: FC = () => {
	const { data } = useQuery({ queryKey: ['current'] })
	console.log(data)

	return data ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRouter

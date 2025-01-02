import axios from 'axios';
import { IOrdersInCart, INewOrder, IStaffAllOrders, IPaginationSetting, IUpdateStatus } from './order.interface';

// const BASE_URL = `http://localhost:3000/api`;
const BASE_URL = `https://own-shop-back.onrender.com/api`;

export const getAllOrders = async (paginationSetting: IPaginationSetting) => {
	try {
		const response = await axios.get<IStaffAllOrders[]>(`${BASE_URL}/orders`, {
			params: {
				page: paginationSetting.page,
				limit: paginationSetting.limit,
			},
		});
		console.log(response.data);

		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getUserOrders = async (userId: number, page: number = 1, limit: number = 5) => {
	try {
		const response = await axios.get<IOrdersInCart>(`${BASE_URL}/${userId}/orders`, {
			params: {
				page,
				limit,
			},
		});
		console.log(response.data);

		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const addNewOrder = async (newOrder: INewOrder) => {
	try {
		const response = await axios.post(`${BASE_URL}/order`, newOrder);
		console.log(response);

		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || 'Your cart is empty');
	}
};

export const updateOrderStatus = async (updatedData: IUpdateStatus) => {
	try {
		const response = await axios.put(`${BASE_URL}/update-status/${updatedData.orderId}`, updatedData.status);
		console.log(response);

		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || 'Your cart is empty');
	}
};

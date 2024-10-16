import axios from 'axios';
import { IUserOrders, INewOrder } from './order.interface';

const BASE_URL = `http://localhost:3000/api`;
// const BASE_URL = `https://own-shop-back.onrender.com/api`;

export const getUserOrders = async (userId: number) => {
	try {
		const response = await axios.get<IUserOrders>(`${BASE_URL}/${userId}/orders`);
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

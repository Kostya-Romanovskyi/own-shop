import axios from 'axios';
import { IItem } from './item.interface';

// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://own-shop-back.onrender.com/api';

// BASE item url
export const itemUrl = 'https://own-shop-back.onrender.com/';

export const getAllItems = async () => {
	try {
		const result = await axios.get(`${BASE_URL}/items`);
		console.log(result);

		return result.data;
	} catch (error) {
		console.error(error);
	}
};

export const getItemById = async (id: string) => {
	try {
		const result = await axios.get<IItem>(`${BASE_URL}/items/${id}`);

		console.log(result.data);

		return result.data;
	} catch (error) {
		console.error(error);
	}
};

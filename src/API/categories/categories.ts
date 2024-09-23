import axios from 'axios';
import { ICategoryByName } from './categories.interface';

const BASE_URL = `http://localhost:3000/api`;

export const getAllCategories = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/categories`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getCategoryById = async (categoryName: string): Promise<ICategoryByName | undefined> => {
	try {
		const response = await axios.get<ICategoryByName>(`${BASE_URL}/categories/${categoryName}`);
		console.log(response);

		return response.data;
	} catch (error: any) {
		console.error(error.message || error);

		return undefined;
	}
};

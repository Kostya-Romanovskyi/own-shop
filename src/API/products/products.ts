import axios from 'axios';
import { IAllProducts } from './products.interface';

// const BASE_URL = 'http://localhost:3000/api'
const BASE_URL = 'https://own-shop-back.onrender.com/api';

// BASE item url
export const itemUrl = 'https://own-shop-back.onrender.com/';

export const getAllProducts = async () => {
	try {
		const result = await axios.get<IAllProducts>(`${BASE_URL}/items`);
		console.log(result);

		return result.data;
	} catch (error) {
		console.error(error);
	}
};

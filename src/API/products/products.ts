import axios from 'axios';
import { IProduct } from './products.interface';
import { IAddNewCategory } from '../categories/categories.interface';

// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://own-shop-back.onrender.com/api';

// BASE item url
export const itemUrl = 'https://own-shop-back.onrender.com/';

export const getAllProducts = async () => {
	try {
		const result = await axios.get<IProduct[]>(`${BASE_URL}/products`);
		console.log(result);

		return result.data;
	} catch (error) {
		console.error(error);
	}
};

// localhost:3000/api/products/potatoes

export const getProductsByName = async (name: string) => {
	try {
		const result = await axios.get<IProduct>(`${BASE_URL}/products/${name}`);

		console.log('Products by name:', result.data);

		return result.data;
	} catch (error) {
		console.error(error);
	}
};

export const addNewProduct = async (newProduct: IAddNewCategory) => {
	try {
		const response = await axios.post(`${BASE_URL}/products`, newProduct, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteProduct = async (productId: string) => {
	try {
		const response = await axios.delete(`${BASE_URL}/products/${productId}`);

		return response.data;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

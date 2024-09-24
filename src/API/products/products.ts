import axios from 'axios';
import { IProduct, ProductsItem, IProductItem } from './products.interface';

// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://own-shop-back.onrender.com/api';

// BASE item url
export const itemUrl = 'https://own-shop-back.onrender.com/';

export const getAllProducts = async () => {
	try {
		const result = await axios.get<ProductsItem>(`${BASE_URL}/items`);
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

		console.log(result.data);

		return result.data;
	} catch (error) {
		console.error(error);
	}
};

export const getProductsItemById = async (id: string) => {
	try {
		const result = await axios.get<IProductItem>(`${BASE_URL}/items/${id}`);

		console.log(result.data);

		return result.data;
	} catch (error) {
		console.error(error);
	}
};

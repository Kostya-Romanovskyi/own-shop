import axios from 'axios';
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

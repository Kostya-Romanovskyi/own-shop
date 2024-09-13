import axios from 'axios'
import { IAllProducts } from './products.interface'

const BASE_URL = 'http://localhost:3000/api'

// BASE item url
export const itemUrl = 'http://localhost:3000/'

export const getAllProducts = async () => {
	try {
		const result = await axios.get<IAllProducts>(`${BASE_URL}/items`)
		console.log(result)

		return result.data
	} catch (error) {
		console.error(error)
	}
}

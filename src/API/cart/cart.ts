import axios from 'axios'
import { BackendResponse, ICartList, INewItemInCart, ICartUpdateItem } from './cart.interface'

const BASE_URL = `http://localhost:3000/api`

export const getProductsInCart = async (userId: number) => {
	try {
		const result = await axios.get<BackendResponse>(`${BASE_URL}/${userId}/cart`)
		console.log('get', result)

		return result.data
	} catch (error) {
		console.error(error)
	}
}

export const calcTotalPrice = async (userId: number) => {
	try {
		const result = await axios.get<ICartList>(`${BASE_URL}/${userId}/calc-totalPrice`)
		console.log(result)

		return result
	} catch (error) {
		console.error(error)
	}
}

export const addItemInCart = async (newItem: INewItemInCart) => {
	try {
		const response = axios.post(`${BASE_URL}/cart`, newItem)
		return response
	} catch (error) {
		console.error(error)
	}
}

export const updateItemInCart = async (cartId: number, updatedItem: ICartUpdateItem) => {
	try {
		axios.patch(`${BASE_URL}/${cartId}/cart-item-update`, updatedItem)
	} catch (error) {
		console.error(error)
	}
}

export const deleteItemFromCart = async (itemId: number) => {
	try {
		axios.delete<number>(`${BASE_URL}/${itemId}/delete-cart`)
	} catch (error) {
		console.error(error)
	}
}

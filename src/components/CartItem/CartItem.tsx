import { FC, useState, useCallback } from 'react'
import { IProduct } from '../../API/products/products.interface'
import { useDeleteItem, useUpdateItem } from '../../hooks/useCart'

import InputPrice from '../InputPrice/InputPrice'

import debounce from 'lodash.debounce'
import { useImages } from '../../hooks/useImages'
import { useQuery } from '@tanstack/react-query'
import { IGetUsers } from '../../API/auth/auth.interface'

interface ICartItemProps {
	id: number
	quantity: number
	price: string
	unit_price: number
	cart_status: string
	products_item?: IProduct
}

const CartItem: FC<ICartItemProps> = ({ id, quantity, price, unit_price, cart_status, products_item }) => {
	const [cartQuantity, setCartQuantity] = useState<number>(quantity)
	const [cartPrice, setCartPrice] = useState<number>(+price)

	const { data } = useQuery<IGetUsers>({ queryKey: ['current'] })

	const { mutate, isPending } = useDeleteItem(id)

	// hook for update item in cart
	const { mutate: mutateUpdate } = useUpdateItem(
		id,
		{
			products_item_id: products_item?.id ? products_item?.id : -1,
			quantity: cartQuantity,
		},
		data?.id ? data?.id : -1
	)

	// pass product image in cart
	let image = ''

	if (products_item?.image) {
		image = useImages(products_item?.image)
	}
	// debounce for mutation update quantity of product in cart
	const handleUpdate = useCallback(
		debounce(() => {
			mutateUpdate()
		}, 500),
		[cartQuantity]
	)

	// change quantity and price in cart
	const handleChange = (newQuantity: number, newPrice: number): void => {
		handleUpdate()

		setCartQuantity(newQuantity)
		setCartPrice(newPrice)
	}

	return (
		<li>
			<img src={`${image}`} alt={`${products_item?.name} picture`} width={200} height={100} />
			<h2>{products_item?.name}</h2>
			<p> `Price for 1: {unit_price} CAD$`</p>
			<p>
				Price for {cartQuantity}: {cartPrice.toFixed(2)} CAD$
			</p>
			<p>{cart_status}</p>

			<InputPrice onQuantityChange={handleChange} price={unit_price} quantity={quantity} />

			<button onClick={() => mutate()} disabled={isPending} type='button'>
				{isPending ? 'Loading...' : 'Delete item'}
			</button>
		</li>
	)
}

export default CartItem

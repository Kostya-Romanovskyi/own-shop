import { useState, FC, ChangeEvent, useEffect } from 'react'

interface InputPriceProps {
	price: number
	quantity?: number
	onQuantityChange: (quantity: number, updatedPrice: number) => void
}

const InputPrice: FC<InputPriceProps> = ({ price, quantity, onQuantityChange }) => {
	const defaultQuantity = 1
	const [refreshQuantity, setRefreshQuantity] = useState<number>(quantity && quantity > 1 ? quantity : defaultQuantity)
	const [updatedPrice, setUpdatedPrice] = useState<number>(
		quantity && quantity > 1 ? price * quantity : price * defaultQuantity
	)

	// input increment
	const handleIncrement = (): void => {
		if (refreshQuantity === 10) return

		setRefreshQuantity((prevState: number) => {
			const newQuantity = prevState + 1
			setUpdatedPrice(newQuantity * price)
			return newQuantity
		})
	}

	// input decrement
	const handleDecrement = (): void => {
		if (refreshQuantity === 1) return
		setRefreshQuantity((prevState: number) => {
			const newQuantity = prevState - 1
			setUpdatedPrice(newQuantity * price)
			return newQuantity
		})
	}

	// input change
	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		let newQuantity = parseInt(event.target.value)
		if (isNaN(newQuantity) || newQuantity < 1) {
			newQuantity = 1
		}
		if (newQuantity > 10) {
			newQuantity = 10
		}
		setRefreshQuantity(newQuantity)
		setUpdatedPrice(newQuantity * price)
	}

	useEffect(() => {
		onQuantityChange(refreshQuantity, updatedPrice)
	}, [refreshQuantity, updatedPrice])

	return (
		<div>
			<button onClick={handleDecrement} type='button'>
				-
			</button>
			<input onChange={handleChange} type='number' value={refreshQuantity} />
			<button onClick={handleIncrement} type='button'>
				+
			</button>
		</div>
	)
}

export default InputPrice

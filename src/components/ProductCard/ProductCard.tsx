import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useImages } from '../../hooks/useImages';
import { useAddToCart } from '../../hooks/useCart';
import InputPrice from '../InputPrice/InputPrice';

import { INewItemInCart } from '../../API/cart/cart.interface';
import { IAllProducts } from '../../API/products/products.interface';
import { IGetUsers } from '../../API/auth/auth.interface';

import './ProductCard.scss';

interface IProductCard {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	productList: IAllProducts;
}

const ProductCard: FC<IProductCard> = ({ id, name, description, price, image, productList }) => {
	const [quantity, setQuantity] = useState<number>(1);
	const [updatedPrice, setUpdatedPrice] = useState<number>(+price);

	const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] });

	const { mutate, isPending } = useAddToCart();

	const handleQuantityChange = (newQuantity: number, newPrice: number): void => {
		setQuantity(newQuantity);
		setUpdatedPrice(newPrice);
	};

	// add product in card
	const handleAddToCart = (id: number): void => {
		const product = productList?.find(item => item.id === id);

		if (product) {
			const newItemInCart: INewItemInCart = {
				users_id: user?.id || -1,
				products_item_id: product?.id,
				quantity: quantity,
				unit_price: +product?.price,
			};

			mutate(newItemInCart);
		}
	};

	// pass image
	const finalImage = image ? useImages(image) : '';

	return (
		<li className='card'>
			<img className='card_img ' src={finalImage} alt={`${name} picture`} />
			<h2>{name}</h2>
			<p className={`card_description`}>{description}</p>
			<h3>{updatedPrice.toFixed(2)}</h3>

			<InputPrice onQuantityChange={handleQuantityChange} price={price} />

			{user !== null ? (
				<button onClick={() => handleAddToCart(id)} className='card__button' disabled={isPending} type='button'>
					{isPending ? 'Loading...' : '	Add to cart'}
				</button>
			) : (
				''
			)}
		</li>
	);
};

export default ProductCard;

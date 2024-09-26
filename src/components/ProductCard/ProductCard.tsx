import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useImages } from '../../hooks/useImages';
import { useAddToCart } from '../../hooks/useCart';

import { INewItemInCart } from '../../API/cart/cart.interface';
import { IProductItem } from '../../API/products/products.interface';
import { IGetUsers } from '../../API/auth/auth.interface';

import './ProductCard.scss';
import { Link, useParams } from 'react-router-dom';
import MainButton from '../MainButton/MainButton';

interface IProductCard {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	productList: IProductItem[];
}

const ProductCard: FC<IProductCard> = ({ id, name, description, price, image, productList }) => {
	// const [quantity, setQuantity] = useState<number>(1);
	// const [updatedPrice, setUpdatedPrice] = useState<number>(+price);
	console.log(productList);

	const { categoryName, productName } = useParams();

	const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] });

	const { mutate, isPending } = useAddToCart();

	// const handleQuantityChange = (newQuantity: number, newPrice: number): void => {
	// 	setQuantity(newQuantity);
	// 	setUpdatedPrice(newPrice);
	// };

	// add product in card
	const handleAddToCart = (id: number): void => {
		const product = productList?.find(item => item.id === id);

		if (product) {
			const newItemInCart: INewItemInCart = {
				users_id: user?.id || -1,
				products_item_id: product?.id,
				quantity: 1,
				unit_price: +product?.price,
			};

			mutate(newItemInCart);
		}
	};

	// pass image
	const finalImage = image ? useImages(image) : '';

	return (
		<li className='card'>
			<Link to={`/menu/categories/${categoryName}/${productName}/${id}`}>
				<img className='card_img ' src={finalImage} alt={`${name} picture`} />
				<h2>{name}</h2>
				<p className={`card_description`}>{description}</p>

				<h3 className='card__price'>{price.toFixed(2)} CAD$</h3>

				<MainButton
					redirect={user ? '' : '/login'}
					name={'Add to cart'}
					classStyle='card__button'
					click={() => handleAddToCart(id)}
				/>
			</Link>
		</li>
	);
};

export default ProductCard;

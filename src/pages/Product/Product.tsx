import './product.scss';
import { useQuery } from '@tanstack/react-query';
import { useAddToCart } from '../../hooks/useCart';
import { INewItemInCart } from '../../API/cart/cart.interface';
import { IGetUsers } from '../../API/auth/auth.interface';
import { useItemById } from '../../hooks/useItems';
import { useParams } from 'react-router-dom';
import VeryFooter from '../../components/VeryFooter/VeryFooter';
import MainButton from '../../components/MainButton/MainButton';
// import ImageZoom from '../../components/ImageZoom/ImageZoom';

const Product = () => {
	const { productId } = useParams<{ productId: string }>();

	const { data: productItem } = useItemById(productId || '');
	const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] });

	const { mutate } = useAddToCart(user?.id || -1);

	// add product in card
	const handleAddToCart = (id: number): void => {
		console.log(productItem);

		if (productItem) {
			const newItemInCart: INewItemInCart = {
				users_id: user?.id || -1,
				products_item_id: id,
				quantity: 1,
				unit_price: +productItem?.price,
			};

			mutate(newItemInCart);
		}
	};

	return (
		<>
			<main>
				<section>
					<div className='container'>
						<h2 className='product-item__title'>{productItem?.name}</h2>
						<div className='product-item__wrapper'>
							<div className='product-item__small__section '>
								<img className='product-item__image' src={`${productItem?.image}`} alt='' />

								{/* <InputPrice onQuantityChange={() => {}} quantity={1} price={productItem?.price} /> */}
								{/* <ImageZoom image={productItem?.image || ''} /> */}
							</div>
							<div className='product-item__small__section '>
								<p className='product-item__description'>{productItem?.description}</p>
								<p className='product-item__price'>{productItem?.price} CAD$</p>
								<MainButton
									redirect={user ? '' : '/login'}
									name={'Add to cart'}
									classStyle='card__button'
									click={() => {
										console.log(`Attempting to add product with ID: ${productItem?.id}`); // Лог для отладки
										handleAddToCart(productItem?.id || -1);
									}}
								/>
								{/* <p>{productItem?.type}</p> */}
							</div>
						</div>
						<p className='ingredients__category'>Ingredients:</p>
						<ul className='ingredients__list'>
							{productItem?.ingredients.map(({ id, name, calories, allergen_info }) => (
								<li className='ingredients__item' key={id}>
									<p className='ingredients__name'>{name}</p>
									<p className='ingredients__info'>Calories: {calories}</p>
									<p className='ingredients__info'>Allergen: {allergen_info}</p>
								</li>
							))}
						</ul>
					</div>
				</section>
			</main>

			<footer className='footer'>
				<div className='container'>
					<VeryFooter />
				</div>
			</footer>
		</>
	);
};

export default Product;

// привязать цену к компоненту с инпутом, просто передавать в тот компонент цену, компонент будет считать

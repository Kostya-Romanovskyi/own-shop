import './product.scss';
import { useProductsItemById } from '../../hooks/useProducts';
import { useParams } from 'react-router-dom';
import ImageZoom from '../../components/ImageZoom/ImageZoom';

const Product = () => {
	const { productId } = useParams<{ productId: string }>();

	const { data: productItem } = useProductsItemById(productId || '');

	return (
		<main>
			<section>
				<div className='container'>
					<div className='product__wrapper'>
						<div className='product__left'>
							<h2 className='product__title'>{productItem?.name}</h2>

							<img className='product__image' src={`${productItem?.image}`} alt='' />

							<p className='product__description'>{productItem?.description}</p>
							<p>{productItem?.price}</p>
							{/* <InputPrice onQuantityChange={() => {}} quantity={1} price={productItem?.price} /> */}
							<ImageZoom image={productItem?.image || ''} />
						</div>
						<div className='product__right'>
							<p>{productItem?.price}</p>
							<p>{productItem?.type}</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Product;

// привязать цену к компоненту с инпутом, просто передавать в тот компонент цену, компонент будет считать

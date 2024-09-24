import './product.scss';
import { useProductsItemById } from '../../hooks/useProducts';
import { useParams } from 'react-router-dom';

const Product = () => {
	const { productId } = useParams<{ productId: string }>();

	const { data: productItem } = useProductsItemById(productId || '');

	return (
		<main>
			<section>
				<div className='container'>
					<h2>{productItem?.name}</h2>
					<p>{productItem?.description}</p>
					<img src={`${productItem?.image}`} alt='' />
					<p>{productItem?.price}</p>
					<p>{productItem?.type}</p>
				</div>
			</section>
		</main>
	);
};

export default Product;

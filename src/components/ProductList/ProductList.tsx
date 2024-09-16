import { useAllProducts } from '../../hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';

import { useLocation } from 'react-router-dom';

import './ProductList.scss';

const ProductList = () => {
	const { data: productsData, isLoading } = useAllProducts();

	const { pathname } = useLocation();

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='container'>
			<ul className='product-list'>
				{productsData &&
					productsData.map(({ id, name, description, price, image, type }) => {
						if (pathname === '/menu' && type === 'food') {
							return (
								<ProductCard
									key={id}
									id={id}
									name={name}
									description={description}
									price={price}
									image={image}
									productList={productsData}
								/>
							);
						} else if (pathname === '/shop' && type === 'product') {
							return (
								<ProductCard
									key={id}
									id={id}
									name={name}
									description={description}
									price={price}
									image={image}
									productList={productsData}
								/>
							);
						}
					})}
			</ul>
		</div>
	);
};

export default ProductList;

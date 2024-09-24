import { useAllProducts } from '../../hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';

import './ProductList.scss';
import { FC } from 'react';
import { ProductsItem } from '../../API/products/products.interface';

interface IProductListProps {
	list: ProductsItem[];
}

const ProductList: FC<IProductListProps> = ({ list }) => {
	const { data: productsData, isLoading } = useAllProducts();

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='container'>
			<ul className='product-list'>
				{list &&
					productsData &&
					list.map(({ id, name, description, price, image }) => {
						return (
							<ProductCard
								key={id}
								id={id}
								name={name}
								description={description}
								price={+price}
								image={image}
								productList={Array.isArray(productsData) ? productsData : [productsData]}
							/>
						);
					})}
			</ul>
		</div>
	);
};

export default ProductList;

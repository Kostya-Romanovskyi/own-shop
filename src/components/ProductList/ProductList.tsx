import ProductCard from '../ProductCard/ProductCard';

import './ProductList.scss';
import { useLocation } from 'react-router-dom';
import { FC } from 'react';
import { IProductItem } from '../../API/products/products.interface';

interface IProductListProps {
	list: IProductItem[];
}

const ProductList: FC<IProductListProps> = ({ list }) => {
	const location = useLocation();

	const slicedList = location.pathname === '/menu' ? list.slice(0, 5) : list;

	return (
		<div className='container'>
			<ul className='product-list'>
				{slicedList.map(({ id, name, description, price, image }) => (
					<ProductCard key={id} id={id} name={name} description={description} price={+price} image={image} />
				))}
			</ul>
		</div>
	);
};

export default ProductList;

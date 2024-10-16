import './pre-items-list.scss';
import { Link } from 'react-router-dom';
import { useAllProducts } from '../../hooks/useProducts';
import ProductList from '../ProductList/ProductList';

const PreItemsList = () => {
	const { data: productsList, isLoading } = useAllProducts();

	return (
		<ul style={{ marginBottom: 30 }}>
			{isLoading
				? 'loading'
				: productsList?.map(({ name, products_items }) => (
						<li className='pre__items__element' key={name}>
							<Link to={'/'}></Link>
							<h2 className='pre__items__title'>{name}</h2>

							<ProductList list={products_items} />
						</li>
				  ))}
		</ul>
	);
};

export default PreItemsList;

import './pre-items-list.scss';
import { Link } from 'react-router-dom';
import { useAllProducts } from '../../hooks/useProducts';
import ProductList from '../ProductList/ProductList';

const PreItemsList = () => {
	const { data: productsList, isLoading } = useAllProducts();
	console.log(productsList);

	return (
		<ul style={{ marginBottom: 30 }}>
			{isLoading
				? 'loading'
				: productsList?.map(({ name, products_items }) => (
						<li className='pre__items__element' key={name}>
							<div className='pre__items__title--wrap'>
								<Link to={`/menu/all-items/${name.toLowerCase()}`}>
									<h2 className='pre__items__title'>{name}</h2>
								</Link>
							</div>

							<ProductList list={products_items} />
						</li>
				  ))}
		</ul>
	);
};

export default PreItemsList;

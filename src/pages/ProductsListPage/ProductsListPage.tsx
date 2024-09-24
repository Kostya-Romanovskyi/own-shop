import { useParams } from 'react-router-dom';
import { useProductsByName } from '../../hooks/useProducts';
import ProductList from '../../components/ProductList/ProductList';

import './products-list-page.scss';

const ProductsListPage = () => {
	const { productName } = useParams<{ productName: string }>();

	const { data: productsByName } = useProductsByName(productName || '');

	return (
		<>
			<h2>{productName}</h2>

			{productsByName ? (
				<ProductList list={productsByName.products_items} />
			) : (
				<div>No products found for "{productName}".</div>
			)}
		</>
	);
};

export default ProductsListPage;

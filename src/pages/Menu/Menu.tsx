import { useAllCategories } from '../../hooks/useAllCategories';

import ProductList from '../../components/ProductList/ProductList';

const Menu = () => {
	// useAllProducts();
	useAllCategories();

	return (
		<>
			<ProductList />
		</>
	);
};

export default Menu;

import { useAllItems } from '../../../hooks/useItems';
import ProductList from '../../ProductList/ProductList';
import './all-items-section.scss';

const AllItemsSection = () => {
	const { data: allItems, isLoading } = useAllItems();

	const maxElements = 5;

	const sortedItems = isLoading ? [] : allItems.sort(() => Math.random() - 0.5).slice(0, maxElements);

	return (
		<section className='random__items'>
			<h2 className='random__title'>More dishes</h2>
			<ProductList list={sortedItems} />
		</section>
	);
};

export default AllItemsSection;

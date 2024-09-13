import { useAllProducts } from '../../hooks/useProducts'



import ProductList from '../../components/ProductList/ProductList'

const Home = () => {
	useAllProducts()

	return (
		<>
	
			<ProductList />
		</>
	)
}

export default Home

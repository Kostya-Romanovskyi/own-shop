// export interface IProduct {
// 	id: number
// 	name: string
// 	description: string
// 	price: number
// 	products_id: number
// 	image: string
// 	type: string
// 	updatedAt: Date
// 	createdAt: Date
// }
// export type IAllProducts = IProduct[]

export interface IProduct {
	find(arg0: (item: any) => boolean): unknown;
	id: number;
	name: string;
	category_id: number;
	description: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
	products_items: ProductsItem[];
}

export interface ProductsItem {
	map(
		arg0: ({
			id,
			name,
			description,
			price,
			image,
			type,
		}: {
			id: any;
			name: any;
			description: any;
			price: any;
			image: any;
			type: any;
		}) => import('react/jsx-runtime').JSX.Element | undefined
	): import('react').ReactNode;
	id: number;
	name: string;
	description: string;
	price: string;
	products_id: number;
	image: string;
	type: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProductItem {
	id: number;
	name: string;
	description: string;
	price: string;
	products_id: number;
	image: string;
	type: string;
	createdAt: Date;
	updatedAt: Date;
}

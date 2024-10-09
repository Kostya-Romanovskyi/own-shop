export interface IProduct {
	id: number;
	name: string;
	category_id: number;
	description: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
	products_items: IProductItem[];
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

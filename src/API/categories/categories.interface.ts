export interface ICategoryByName {
	id: number;
	name: string;
	description: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
	products: IProductIncludedInCategory[];
}

export interface IProductIncludedInCategory {
	id: number;
	name: string;
	category_id: number;
	description: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

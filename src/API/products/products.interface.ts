export interface IProduct {
	id: number
	name: string
	description: string
	price: number
	products_id: number
	image: string
	type: string
	updatedAt: Date
	createdAt: Date
}
export type IAllProducts = IProduct[]

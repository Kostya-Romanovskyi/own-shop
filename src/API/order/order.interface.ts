export enum Status {
	PENDING = 'Pending',
	PROCESSING = 'Processing',
	DELIVERED = 'Delivered',
	CANCELLED = 'Cancelled',
}

export interface INewOrder {
	user_id: number;
	status: Status;
}

export interface IRespAddNewOrder {
	id: number;
	user_id: number;
	status: Status;
	total_price: number;
}

export interface IUserOrderProduct {
	id: number;
	image: string;
	name: string;
	price: string;
}

export interface IOrderItems {
	createdAt: string;
	id: number;
	price: string;
	product: IUserOrderProduct;
	quantity: number;
}

export interface IUserOrder {
	id: number;
	order_items: IOrderItems[];
	status: Status;
	totalPrice: string;
	order_date: Date;
	chopsticks: string;
	chopsticks_quantity: number;
	allergic: string;
	type_of_allergy: string;
	soy_sauce: string;
	additional_information: string;
}

export type IUserOrders = IUserOrder[];

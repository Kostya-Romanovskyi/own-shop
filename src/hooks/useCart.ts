import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addItemInCart,
	calcTotalPrice,
	deleteItemFromCart,
	getProductsInCart,
	updateItemInCart,
} from '../API/cart/cart';
import { ICartUpdateItem } from '../API/cart/cart.interface';

export const useAddToCart = (userId: number) => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: addItemInCart,
		onSuccess: () => {
			alert('Successfully added in cart');
			queryClient.invalidateQueries({ queryKey: ['user-cart', userId] });
		},
	});

	return { mutate, isPending };
};

export const useUserCart = (userId: number) => {
	return useQuery({
		queryKey: ['user-cart', userId],
		queryFn: async () => getProductsInCart(userId),
		select: data => (data && data?.data) || [],
	});
};

export const useTotalPrice = (userId: number) => {
	return useQuery({
		queryKey: ['totalPrice', userId],
		queryFn: () => calcTotalPrice(userId),
		select: data => data?.data || [],
	});
};

export const useDeleteItem = (itemId: number, userId: number) => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: () => {
			return deleteItemFromCart(itemId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-cart', userId] });
		},

		onError: error => {
			console.error('Error deleting item:', error);
		},
	});

	return { mutate, isPending };
};

export const useUpdateItem = (cartId: number, updatedItem: ICartUpdateItem, userId: number) => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			await updateItemInCart(cartId, updatedItem);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-cart', userId] });
		},
	});

	return { mutate, isPending };
};

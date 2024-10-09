import { useQuery } from '@tanstack/react-query';
import { getAllItems, getItemById } from '../API/item/item';

export const useAllItems = () => {
	return useQuery({
		queryKey: ['items'],
		queryFn: getAllItems,
	});
};

export const useItemById = (id: string) => {
	return useQuery({
		queryKey: ['item-id'],
		queryFn: () => getItemById(id),
	});
};

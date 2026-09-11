import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "..";

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => categoryApi.deleteCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};

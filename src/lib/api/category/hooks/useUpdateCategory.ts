import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi, UpdateCategoryPayload } from "..";

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: UpdateCategoryPayload;
		}) => categoryApi.updateCategory(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};

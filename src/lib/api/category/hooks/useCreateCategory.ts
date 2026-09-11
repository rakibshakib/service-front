import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi, CreateCategoryPayload } from "..";

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateCategoryPayload) => categoryApi.createCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi, UpdateCategoryStatusPayload } from "..";

export const useUpdateCategoryStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: UpdateCategoryStatusPayload;
		}) => categoryApi.updateCategoryStatus(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};

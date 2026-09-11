import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi } from "..";

export const useDeleteService = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => serviceApi.deleteService(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
		},
	});
};

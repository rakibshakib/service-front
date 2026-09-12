import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "..";

export const useDeleteCustomer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => customerApi.deleteCustomer(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		},
	});
};

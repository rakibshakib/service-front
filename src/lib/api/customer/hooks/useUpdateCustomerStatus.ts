import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "..";

export const useUpdateCustomerStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: { isActive: boolean };
		}) => customerApi.updateCustomerStatus(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		},
	});
};

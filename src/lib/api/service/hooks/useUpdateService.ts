import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi, UpdateServicePayload } from "..";

export const useUpdateService = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: UpdateServicePayload;
		}) => serviceApi.updateService(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
			queryClient.invalidateQueries({ queryKey: ["service", id] });
		},
	});
};

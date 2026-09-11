import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi, UpdateServiceStatusPayload } from "..";

export const useUpdateServiceStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: UpdateServiceStatusPayload;
		}) => serviceApi.updateServiceStatus(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
		},
	});
};

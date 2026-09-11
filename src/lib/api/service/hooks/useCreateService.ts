import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi, CreateServicePayload } from "..";

export const useCreateService = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateServicePayload) => serviceApi.createService(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
		},
	});
};

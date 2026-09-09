import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorApi, ToggleVendorServicePayload } from "..";

export const useToggleVendorService = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: ToggleVendorServicePayload;
		}) => vendorApi.toggleVendorService(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["vendorServices", id] });
		},
	});
};

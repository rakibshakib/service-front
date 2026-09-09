import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorApi, UpdateVendorStatusPayload } from "..";

export const useUpdateVendorStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: UpdateVendorStatusPayload;
		}) => vendorApi.updateVendorStatus(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["vendors"] });
			queryClient.invalidateQueries({ queryKey: ["vendor", id] });
		},
	});
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorApi, UpdateVendorPayload } from "..";

export const useUpdateVendor = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			userId,
			data,
		}: {
			userId: number;
			data: UpdateVendorPayload;
		}) => vendorApi.updateVendorStatus(userId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendors"] });
		},
	});
};

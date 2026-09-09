import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorApi, UpdateVendorApprovalPayload } from "..";

export const useUpdateVendorApproval = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: UpdateVendorApprovalPayload;
		}) => vendorApi.updateVendorApproval(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["vendors"] });
			queryClient.invalidateQueries({ queryKey: ["vendor", id] });
		},
	});
};

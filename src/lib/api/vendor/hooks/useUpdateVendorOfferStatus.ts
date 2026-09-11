import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorApi, UpdateVendorOfferStatusPayload } from "..";

export const useUpdateVendorOfferStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: UpdateVendorOfferStatusPayload;
		}) => vendorApi.updateVendorOfferStatus(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["vendor", id] });
		},
	});
};

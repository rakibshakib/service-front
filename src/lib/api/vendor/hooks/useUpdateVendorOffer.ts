import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorApi, VendorOfferPayload } from "..";

export const useUpdateVendorOffer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: VendorOfferPayload;
		}) => vendorApi.updateVendorOffer(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["vendor", id] });
		},
	});
};

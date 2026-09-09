import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorApi } from "..";

export const useDeleteVendorOffer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => vendorApi.deleteVendorOffer(id),
		onSuccess: (_, id) => {
			queryClient.invalidateQueries({ queryKey: ["vendor", id] });
		},
	});
};

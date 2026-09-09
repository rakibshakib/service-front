import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorApi } from "..";

export const useUploadVendorLogo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			file,
		}: {
			id: number;
			file: File;
		}) => vendorApi.uploadLogo(id, file),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["vendor", id] });
			queryClient.invalidateQueries({ queryKey: ["vendors"] });
		},
	});
};

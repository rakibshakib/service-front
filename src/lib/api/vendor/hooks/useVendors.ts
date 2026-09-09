import { useQuery } from "@tanstack/react-query";
import { vendorApi, VendorPaginationParams } from "..";

export const useVendors = (params?: VendorPaginationParams) => {
	return useQuery({
		queryKey: ["vendors", params],
		queryFn: () => vendorApi.getVendors(params),
	});
};

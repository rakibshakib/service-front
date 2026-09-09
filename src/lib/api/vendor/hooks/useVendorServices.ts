import { useQuery } from "@tanstack/react-query";
import { vendorApi, VendorPaginationParams } from "..";

export const useVendorServices = (id: number, params?: VendorPaginationParams) => {
	return useQuery({
		queryKey: ["vendorServices", id, params],
		queryFn: () => vendorApi.getVendorServices(id, params),
		enabled: !!id,
	});
};

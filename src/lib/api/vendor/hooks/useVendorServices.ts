import { useQuery } from "@tanstack/react-query";
import { vendorApi, VendorPaginationParams, CategoryServicesGroup, PaginatedResponse } from "..";

export const useVendorServices = (id: number, params?: VendorPaginationParams) => {
	return useQuery<PaginatedResponse<CategoryServicesGroup>>({
		queryKey: ["vendorServices", id, params],
		queryFn: () => vendorApi.getVendorServices(id, params),
		enabled: !!id,
	});
};

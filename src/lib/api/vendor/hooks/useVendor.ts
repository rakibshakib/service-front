import { useQuery } from "@tanstack/react-query";
import { vendorApi } from "..";

export const useVendor = (id: number) => {
	return useQuery({
		queryKey: ["vendor", id],
		queryFn: () => vendorApi.getVendor(id),
		enabled: !!id,
	});
};

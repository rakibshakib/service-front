import { useQuery } from "@tanstack/react-query";
import { vendorApi } from "..";

export const useVendors = () => {
	return useQuery({
		queryKey: ["vendors"],
		queryFn: vendorApi.getVendors,
	});
};

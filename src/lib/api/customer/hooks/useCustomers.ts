import { useQuery } from "@tanstack/react-query";
import { customerApi, CustomerPaginationParams } from "..";

export const useCustomers = (params?: CustomerPaginationParams) => {
	return useQuery({
		queryKey: ["customers", params],
		queryFn: () => customerApi.getCustomers(params),
	});
};

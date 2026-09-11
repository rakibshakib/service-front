import { useQuery } from "@tanstack/react-query";
import { serviceApi, ServicePaginationParams } from "..";

export const useServices = (params?: ServicePaginationParams) => {
	return useQuery({
		queryKey: ["services", params],
		queryFn: () => serviceApi.getServices(params),
	});
};

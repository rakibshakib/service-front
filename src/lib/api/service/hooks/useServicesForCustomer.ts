import { useQuery } from "@tanstack/react-query";
import { serviceApi, ServiceForCustomerParams } from "..";

export const useServicesForCustomer = (params?: ServiceForCustomerParams) => {
	return useQuery({
		queryKey: ["servicesForCustomer", params],
		queryFn: () => serviceApi.getServicesForCustomer(params),
	});
};

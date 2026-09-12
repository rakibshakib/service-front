import { useQuery } from "@tanstack/react-query";
import { customerApi } from "..";

export const useCustomer = (id: number) => {
	return useQuery({
		queryKey: ["customer", id],
		queryFn: () => customerApi.getCustomer(id),
	});
};

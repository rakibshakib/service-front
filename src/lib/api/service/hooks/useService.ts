import { useQuery } from "@tanstack/react-query";
import { serviceApi } from "..";

export const useService = (id: number) => {
	return useQuery({
		queryKey: ["service", id],
		queryFn: () => serviceApi.getService(id),
		enabled: !!id,
	});
};

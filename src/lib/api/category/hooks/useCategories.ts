import { useQuery } from "@tanstack/react-query";
import { categoryApi, CategoryPaginationParams } from "..";

export const useCategories = (params?: CategoryPaginationParams) => {
	return useQuery({
		queryKey: ["categories", params],
		queryFn: () => categoryApi.getCategories(params),
	});
};

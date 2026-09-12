import { useQuery } from "@tanstack/react-query";
import { categoryApi, CategoryDropdownParams, CategoryDropdownOption } from "..";

interface CategoryDropdownResponse {
	data: CategoryDropdownOption[];
}

export const useCategoryDropdown = (params?: CategoryDropdownParams, enabled = true) => {
	return useQuery<CategoryDropdownResponse>({
		queryKey: ["categoryDropdown", params],
		queryFn: () => categoryApi.getDropdown(params),
		enabled,
	});
};

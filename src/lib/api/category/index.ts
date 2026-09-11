import api from "../index";
import ApiRoutes from "../api-routes";

// Category type based on API response
export interface Category {
	id: number;
	name: string;
	description: string | null;
	icon: string | null;
	imageUrl: string | null;
	imagePath: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	totalServices: number;
	totalVendors: number;
}

// Pagination meta
export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// Paginated response
export interface CategoryListResponse {
	data: Category[];
	meta: PaginationMeta;
}

// Create category payload
export interface CreateCategoryPayload {
	name: string;
	description?: string;
	isActive?: boolean;
	image?: File;
}

// Update category payload
export interface UpdateCategoryPayload {
	name?: string;
	description?: string;
	isActive?: boolean;
	image?: File;
}

// Update status payload
export interface UpdateCategoryStatusPayload {
	isActive: boolean;
}

// Pagination params
export interface CategoryPaginationParams {
	page?: number;
	limit?: number;
	all_services?: boolean;
}

// API functions
export const categoryApi = {
	// Get categories with pagination
	getCategories: (params?: CategoryPaginationParams): Promise<CategoryListResponse> =>
		api.get(ApiRoutes.category.root, { params }),

	// Get single category
	getCategory: (id: number): Promise<Category> =>
		api.get(`${ApiRoutes.category.root}/${id}`),

	// Create category
	createCategory: (data: CreateCategoryPayload): Promise<Category> => {
		const formData = new FormData();
		formData.append("name", data.name);
		if (data.description) formData.append("description", data.description);
		if (data.isActive !== undefined) formData.append("isActive", String(data.isActive));
		if (data.image) formData.append("image", data.image);
		return api.post(ApiRoutes.category.root, formData);
	},

	// Update category
	updateCategory: (id: number, data: UpdateCategoryPayload): Promise<Category> => {
		const formData = new FormData();
		if (data.name) formData.append("name", data.name);
		if (data.description !== undefined) formData.append("description", data.description);
		if (data.isActive !== undefined) formData.append("isActive", String(data.isActive));
		if (data.image) formData.append("image", data.image);
		return api.patch(`${ApiRoutes.category.root}/${id}`, formData);
	},

	// Update category status
	updateCategoryStatus: (id: number, data: UpdateCategoryStatusPayload): Promise<Category> =>
		api.patch(ApiRoutes.category.status(id), data),

	// Delete category
	deleteCategory: (id: number): Promise<{ message: string }> =>
		api.delete(`${ApiRoutes.category.root}/${id}`),
};

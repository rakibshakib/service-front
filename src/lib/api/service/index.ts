import api from "../index";
import ApiRoutes from "../api-routes";

// Service type based on API response
export interface Service {
	id: number;
	name: string;
	description: string | null;
	imageUrl: string | null;
	imagePath: string | null;
	isActive: boolean;
	categoryId: number;
	category?: {
		id: number;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
}

// Pagination meta
export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// Paginated response
export interface ServiceListResponse {
	data: Service[];
	meta: PaginationMeta;
}

// Create service payload
export interface CreateServicePayload {
	name: string;
	description?: string;
	categoryId: number;
	isActive?: boolean;
	image?: File;
}

// Update service payload
export interface UpdateServicePayload {
	name?: string;
	description?: string;
	categoryId?: number;
	isActive?: boolean;
	image?: File;
}

// Update status payload
export interface UpdateServiceStatusPayload {
	isActive: boolean;
}

// Pagination params
export interface ServicePaginationParams {
	page?: number;
	limit?: number;
}

// API functions
export const serviceApi = {
	// Get services with pagination
	getServices: (params?: ServicePaginationParams): Promise<ServiceListResponse> =>
		api.get(ApiRoutes.service.root, { params }),

	// Get single service
	getService: (id: number): Promise<Service> =>
		api.get(`${ApiRoutes.service.root}/${id}`),

	// Create service
	createService: (data: CreateServicePayload): Promise<Service> => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("categoryId", String(data.categoryId));
		if (data.description) formData.append("description", data.description);
		if (data.isActive !== undefined) formData.append("isActive", String(data.isActive));
		if (data.image) formData.append("image", data.image);
		return api.post(ApiRoutes.service.root, formData);
	},

	// Update service
	updateService: (id: number, data: UpdateServicePayload): Promise<Service> => {
		const formData = new FormData();
		if (data.name) formData.append("name", data.name);
		if (data.description !== undefined) formData.append("description", data.description);
		if (data.categoryId) formData.append("categoryId", String(data.categoryId));
		if (data.isActive !== undefined) formData.append("isActive", String(data.isActive));
		if (data.image) formData.append("image", data.image);
		return api.patch(`${ApiRoutes.service.root}/${id}`, formData);
	},

	// Update service status
	updateServiceStatus: (id: number, data: UpdateServiceStatusPayload): Promise<Service> =>
		api.patch(ApiRoutes.service.status(id), data),

	// Delete service
	deleteService: (id: number): Promise<{ message: string }> =>
		api.delete(`${ApiRoutes.service.root}/${id}`),
};

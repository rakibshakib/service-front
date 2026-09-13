import api from "../index";
import ApiRoutes from "../api-routes";

// Service type based on API response
export interface ServiceVariation {
	id: number;
	name: string;
	price: string;
	serviceId: number;
	createdAt: string;
	updatedAt: string;
}

export interface ServiceCategoryVendor {
	userId: number;
	businessName: string;
	logoUrl: string | null;
	rating: string;
}

export interface ServiceCategory {
	id: number;
	name: string;
	description?: string;
	isActive?: boolean;
	imageUrl?: string | null;
	imagePath?: string | null;
}

export interface Service {
	id: number;
	name: string;
	shortDescription?: string;
	description: string | null;
	imageUrl: string | null;
	imagePath: string | null;
	basePrice: string;
	discountAmount: string;
	discountType: string;
	rating: string;
	totalReviews: number;
	isActive: boolean;
	categoryId: number;
	createdById: number;
	createdAt: string;
	updatedAt: string;
	variations: ServiceVariation[];
	category: ServiceCategory;
	vendors: ServiceCategoryVendor[];
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
	shortDescription: string;
	basePrice: number | string;
	categoryId: number | string;
	description?: string;
	discountAmount?: number | string;
	discountType?: "FLAT" | "PERCENTAGE";
	variations?: { name: string; price: number | string }[];
	image: File;
}

// Update service payload
export interface UpdateServicePayload {
	name?: string;
	shortDescription?: string;
	basePrice?: number | string;
	categoryId?: number | string;
	description?: string;
	discountAmount?: number | string;
	discountType?: "FLAT" | "PERCENTAGE";
	variations?: { id?: number; name: string; price: number | string }[];
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
		formData.append("shortDescription", data.shortDescription);
		formData.append("basePrice", String(data.basePrice));
		formData.append("categoryId", String(data.categoryId));
		if (data.description) formData.append("description", data.description);
		if (data.discountAmount !== undefined && data.discountAmount !== "") {
			formData.append("discountAmount", String(data.discountAmount));
		}
		if (data.discountType) formData.append("discountType", data.discountType);
		if (data.variations && data.variations.length > 0) {
			formData.append("variations", JSON.stringify(data.variations));
		}
		formData.append("image", data.image);
		return api.post(ApiRoutes.service.root, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	},

	// Update service
	updateService: (id: number, data: UpdateServicePayload): Promise<Service> => {
		const formData = new FormData();
		if (data.name) formData.append("name", data.name);
		if (data.shortDescription !== undefined) formData.append("shortDescription", data.shortDescription);
		if (data.basePrice !== undefined) formData.append("basePrice", String(data.basePrice));
		if (data.categoryId) formData.append("categoryId", String(data.categoryId));
		if (data.description !== undefined) formData.append("description", data.description);
		if (data.discountAmount !== undefined) {
			formData.append("discountAmount", String(data.discountAmount));
		}
		if (data.discountType !== undefined) formData.append("discountType", data.discountType);
		if (data.variations !== undefined) {
			formData.append("variations", JSON.stringify(data.variations));
		}
		if (data.image) formData.append("image", data.image);
		return api.patch(`${ApiRoutes.service.root}/${id}`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	},

	// Update service status
	updateServiceStatus: (id: number, data: UpdateServiceStatusPayload): Promise<Service> =>
		api.patch(ApiRoutes.service.status(id), data),

	// Delete service
	deleteService: (id: number): Promise<{ message: string }> =>
		api.delete(`${ApiRoutes.service.root}/${id}`),
};

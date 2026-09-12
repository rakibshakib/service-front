import api from "../index";
import ApiRoutes from "../api-routes";

// Customer type based on API response
export interface Customer {
	userId: number;
	name: string;
	email: string;
	phone: string | null;
	address: string | null;
	isActive: boolean;
	imageUrl: string | null;
	imagePath: string | null;
	createdAt: string;
}

// Pagination meta
export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// Paginated response
export interface CustomerListResponse {
	data: Customer[];
	meta: PaginationMeta;
}

// Single customer response
export interface CustomerResponse {
	message: string;
	content: Customer;
}

// Update status payload
export interface UpdateCustomerStatusPayload {
	isActive: boolean;
}

// Pagination params
export interface CustomerPaginationParams {
	page?: number;
	limit?: number;
}

// API functions
export const customerApi = {
	// Get customers with pagination
	getCustomers: (params?: CustomerPaginationParams): Promise<CustomerListResponse> =>
		api.get(ApiRoutes.customer.root, { params }),

	// Get single customer
	getCustomer: (id: number): Promise<CustomerResponse> =>
		api.get(`${ApiRoutes.customer.root}/${id}`),

	// Update customer status
	updateCustomerStatus: (id: number, data: UpdateCustomerStatusPayload): Promise<{ message: string; content: Customer }> =>
		api.patch(ApiRoutes.customer.status(id), data),

	// Delete customer
	deleteCustomer: (id: number): Promise<{ message: string; content: { userId: number } }> =>
		api.delete(`${ApiRoutes.customer.root}/${id}`),
};

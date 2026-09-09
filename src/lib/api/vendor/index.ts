import api from "../index";
import ApiRoutes from "../api-routes";

// Vendor status enum
export const VENDOR_STATUS = {
	PENDING: "PENDING",
	APPROVED: "APPROVED",
	REJECTED: "REJECTED",
} as const;

export type VendorStatus = (typeof VENDOR_STATUS)[keyof typeof VENDOR_STATUS];

// Vendor type based on API response
export interface Vendor {
	userId: number;
	businessName: string;
	address: string;
	status: VendorStatus;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	rating: string;
	responseTime: string;
	logoUrl: string | null;
	logoPath: string | null;
	vendorOffer: {
		id: number;
		vendorId: number;
		type: string;
		title: string;
		description: string | null;
		value: string;
		startDate: string;
		hasExpireDate: boolean;
		endDate: string | null;
		isActive: boolean;
		createdAt: string;
		updatedAt: string;
	} | null;
	name: string;
	phone: string | null;
}

// Paginated response meta
export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// Paginated response
export interface VendorListResponse {
	data: Vendor[];
	meta: PaginationMeta;
}

// Payload for updating vendor
export interface UpdateVendorPayload {
	status?: VendorStatus;
	isActive?: boolean;
}

// Pagination params
export interface VendorPaginationParams {
	page?: number;
	limit?: number;
}

export const vendorApi = {
	// Get vendors with pagination
	getVendors: (params?: VendorPaginationParams): Promise<VendorListResponse> =>
		api.get(ApiRoutes.vendor.root, { params }),

	// Get single vendor
	getVendor: (userId: number): Promise<Vendor> =>
		api.get(`${ApiRoutes.vendor.root}/${userId}`),

	// Update vendor status
	updateVendorStatus: (
		userId: number,
		data: UpdateVendorPayload,
	): Promise<Vendor> => api.put(`${ApiRoutes.vendor.root}/${userId}`, data),
};

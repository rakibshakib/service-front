import api from "../index";
import ApiRoutes from "../api-routes";

// Enums
export const VENDOR_STATUS = {
	PENDING: "PENDING",
	APPROVED: "APPROVED",
	REJECTED: "REJECTED",
} as const;

export type VendorStatus = (typeof VENDOR_STATUS)[keyof typeof VENDOR_STATUS];

export const OFFER_TYPE = {
	PERCENTAGE: "PERCENTAGE",
	FLAT: "FLAT",
	TEXT: "TEXT",
} as const;

export type OfferType = (typeof OFFER_TYPE)[keyof typeof OFFER_TYPE];

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
	coverUrl: string | null;
	coverPath: string | null;
	vendorOffer: VendorOffer | null;
	name: string;
	phone: string | null;
	email?: string;
	vendorCategories?: VendorCategory[];
}

// Vendor offer type
export interface VendorOffer {
	id: number;
	vendorId: number;
	type: OfferType;
	title: string;
	description: string | null;
	value: string;
	startDate: string;
	hasExpireDate: boolean;
	endDate: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

// Vendor category type
export interface VendorCategory {
	id: number;
	vendorId: number;
	categoryId: number;
	category?: {
		id: number;
		name: string;
		icon: string | null;
	};
}

// Vendor service type (legacy flat structure)
export interface VendorService {
	id: number;
	vendorId: number;
	serviceId: number;
	isActive: boolean;
	service?: {
		id: number;
		name: string;
		price: number;
		description: string;
		duration: string;
		categoryId: number;
	};
}

// Grouped service by category (API response structure)
export interface GroupedService {
	id: number;
	name: string;
	description: string | null;
	imageUrl: string | null;
	imagePath: string | null;
	isActive: boolean;
}

export interface ServiceCategory {
	id: number;
	name: string;
}

export interface CategoryServicesGroup {
	category: ServiceCategory;
	services: GroupedService[];
}

// Pagination meta
export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// Paginated response
export interface PaginatedResponse<T> {
	data: T[];
	meta: PaginationMeta;
}

// Payloads
export interface UpdateVendorPayload {
	name?: string;
	businessName?: string;
	address?: string;
	phone?: string;
	password?: string;
	confirmPassword?: string;
}

export interface UpdateVendorStatusPayload {
	isActive: boolean;
}

export interface UpdateVendorApprovalPayload {
	status: VendorStatus;
}

export interface ToggleVendorServicePayload {
	activeServicesId?: number[];
	inActiveServicesId?: number[];
}

export interface VendorOfferPayload {
	type?: OfferType;
	title?: string;
	description?: string;
	value?: number;
	startDate?: string;
	hasExpireDate?: boolean;
	endDate?: string;
	isActive?: boolean;
}

export interface UpdateVendorOfferStatusPayload {
	isActive: boolean;
}

export interface VendorPaginationParams {
	page?: number;
	limit?: number;
}

// API functions
export const vendorApi = {
	// List vendors (paginated)
	getVendors: (params?: VendorPaginationParams): Promise<PaginatedResponse<Vendor>> =>
		api.get(ApiRoutes.vendor.root, { params }),

	// Get single vendor
	getVendor: (id: number): Promise<Vendor> =>
		api.get(`${ApiRoutes.vendor.root}/${id}`),

	// Update vendor info
	updateVendor: (id: number, data: UpdateVendorPayload): Promise<Vendor> =>
		api.patch(`${ApiRoutes.vendor.root}/${id}`, data),

	// Delete vendor
	deleteVendor: (id: number): Promise<{ message: string }> =>
		api.delete(`${ApiRoutes.vendor.root}/${id}`),

	// Update vendor active status
	updateVendorStatus: (id: number, data: UpdateVendorStatusPayload): Promise<Vendor> =>
		api.patch(ApiRoutes.vendor.status(id), data),

	// Update vendor approval status
	updateVendorApproval: (id: number, data: UpdateVendorApprovalPayload): Promise<Vendor> =>
		api.patch(ApiRoutes.vendor.approval(id), data),

	// Get vendor services (grouped by category)
	getVendorServices: (id: number, params?: VendorPaginationParams): Promise<PaginatedResponse<CategoryServicesGroup>> =>
		api.get(ApiRoutes.vendor.services(id), { params }),

	// Toggle vendor service status
	toggleVendorService: (id: number, data: ToggleVendorServicePayload): Promise<VendorService> =>
		api.patch(ApiRoutes.vendor.services(id), data),

	// Upload vendor logo
	uploadLogo: (id: number, file: File): Promise<Vendor> => {
		const formData = new FormData();
		formData.append("file", file);
		return api.patch(ApiRoutes.vendor.logo(id), formData, {
			headers: {
				"Content-Type": undefined,
			},
		});
	},

	// Upload vendor cover
	uploadCover: (id: number, file: File): Promise<Vendor> => {
		const formData = new FormData();
		formData.append("file", file);
		return api.patch(ApiRoutes.vendor.cover(id), formData, {
			headers: {
				"Content-Type": undefined,
			},
		});
	},

	// Update vendor offer
	updateVendorOffer: (id: number, data: VendorOfferPayload): Promise<VendorOffer> =>
		api.patch(ApiRoutes.vendor.offers(id), data),

	// Delete vendor offer
	deleteVendorOffer: (id: number): Promise<{ message: string }> =>
		api.delete(ApiRoutes.vendor.offers(id)),

	// Update vendor offer status
	updateVendorOfferStatus: (id: number, data: UpdateVendorOfferStatusPayload): Promise<VendorOffer> =>
		api.patch(ApiRoutes.vendor.offerStatus(id), data),

	// Update vendor categories
	updateVendorCategories: (id: number, categoryIds: number[]): Promise<VendorCategory> =>
		api.patch(ApiRoutes.vendor.categories(id), { categoryIds }),
};

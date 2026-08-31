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
	name: string;
	phone: string;
}

// Payload for updating vendor
export interface UpdateVendorPayload {
	status?: VendorStatus;
	isActive?: boolean;
}

export const vendorApi = {
	// Get all vendors
	getVendors: (): Promise<Vendor[]> => api.get(ApiRoutes.vendor.root),

	// Get single vendor
	getVendor: (userId: number): Promise<Vendor> =>
		api.get(`${ApiRoutes.vendor.root}/${userId}`),

	// Update vendor status
	updateVendorStatus: (
		userId: number,
		data: UpdateVendorPayload,
	): Promise<Vendor> => api.put(`${ApiRoutes.vendor.root}/${userId}`, data),
};

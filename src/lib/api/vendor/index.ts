import api from "../index";
import ApiRoutes from "../api-routes";

export interface Vendor {
	id: string;
	name: string;
	email: string;
	category: string;
	rating: number;
	jobsCompleted: number;
	earnings: number;
	status: "Active" | "Pending Approval" | "Suspended";
	location: string;
}

export interface Service {
	id: string;
	name: string;
	price: number;
	category: string;
	rating: number;
	bookings: number;
	status: "Active" | "Draft";
}

export interface Booking {
	id: string;
	customerName: string;
	customerPhone: string;
	serviceName: string;
	date: string;
	time: string;
	amount: number;
	status: "Pending" | "In Progress" | "Completed" | "Cancelled";
	location: string;
}

export interface Discount {
	id: string;
	name: string;
	type: "percent" | "flat";
	value: number;
	minBooking: number;
	status: "Active" | "Expired";
	expires: string;
}

export const vendorApi = {
	// Profile
	getProfile: (): Promise<Vendor> => api.get(ApiRoutes.vendor.profile),
	updateProfile: (data: Partial<Vendor>): Promise<Vendor> =>
		api.put(ApiRoutes.vendor.profile, data),

	// Services
	getServices: (): Promise<Service[]> =>
		api.get(ApiRoutes.vendor.services),
	createService: (data: Partial<Service>): Promise<Service> =>
		api.post(ApiRoutes.vendor.createService, data),
	updateService: (id: string, data: Partial<Service>): Promise<Service> =>
		api.put(`${ApiRoutes.vendor.services}/${id}`, data),
	deleteService: (id: string): Promise<{ message: string }> =>
		api.delete(`${ApiRoutes.vendor.services}/${id}`),

	// Bookings
	getBookings: (): Promise<Booking[]> =>
		api.get(ApiRoutes.vendor.bookings),
	updateBookingStatus: (
		id: string,
		status: Booking["status"],
	): Promise<Booking> =>
		api.patch(`${ApiRoutes.vendor.bookings}/${id}/status`, { status }),

	// Discounts
	getDiscounts: (): Promise<Discount[]> =>
		api.get(ApiRoutes.vendor.discounts),
	createDiscount: (data: Partial<Discount>): Promise<Discount> =>
		api.post(ApiRoutes.vendor.createDiscount, data),
	deleteDiscount: (id: string): Promise<{ message: string }> =>
		api.delete(`${ApiRoutes.vendor.discounts}/${id}`),

	// Dashboard Stats
	getDashboardStats: (): Promise<{
		earnings: number;
		totalBookings: number;
		completed: number;
		rating: number;
	}> => api.get(ApiRoutes.vendor.dashboardStats),
};

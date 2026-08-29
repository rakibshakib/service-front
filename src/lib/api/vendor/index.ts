import api from "../index";

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
	getProfile: (): Promise<Vendor> => api.get("/vendor/profile"),
	updateProfile: (data: Partial<Vendor>): Promise<Vendor> =>
		api.put("/vendor/profile", data),

	// Services
	getServices: (): Promise<Service[]> => api.get("/vendor/services"),
	createService: (data: Partial<Service>): Promise<Service> =>
		api.post("/vendor/services", data),
	updateService: (id: string, data: Partial<Service>): Promise<Service> =>
		api.put(`/vendor/services/${id}`, data),
	deleteService: (id: string): Promise<{ message: string }> =>
		api.delete(`/vendor/services/${id}`),

	// Bookings
	getBookings: (): Promise<Booking[]> => api.get("/vendor/bookings"),
	updateBookingStatus: (
		id: string,
		status: Booking["status"],
	): Promise<Booking> =>
		api.patch(`/vendor/bookings/${id}/status`, { status }),

	// Discounts
	getDiscounts: (): Promise<Discount[]> => api.get("/vendor/discounts"),
	createDiscount: (data: Partial<Discount>): Promise<Discount> =>
		api.post("/vendor/discounts", data),
	deleteDiscount: (id: string): Promise<{ message: string }> =>
		api.delete(`/vendor/discounts/${id}`),

	// Dashboard Stats
	getDashboardStats: (): Promise<{
		earnings: number;
		totalBookings: number;
		completed: number;
		rating: number;
	}> => api.get("/vendor/dashboard/stats"),
};

import api from "../index";

export interface AdminVendor {
	id: string;
	name: string;
	owner: string;
	category: string;
	rating: number;
	jobsCompleted: number;
	earnings: number;
	status: "Active" | "Pending Approval" | "Suspended";
	location: string;
}

export interface Customer {
	id: string;
	name: string;
	phone: string;
	bookings: number;
	spent: number;
	joined: string;
}

export interface Category {
	id: string;
	name: string;
	count: number;
	status: "Active" | "Inactive";
}

export interface PlatformStats {
	totalRevenue: number;
	totalBookings: number;
	activeVendors: number;
	avgRating: number;
}

export const adminApi = {
	// Dashboard
	getDashboardStats: (): Promise<PlatformStats> =>
		api.get("/admin/dashboard/stats"),

	// Vendors
	getVendors: (): Promise<AdminVendor[]> => api.get("/admin/vendors"),
	getVendor: (id: string): Promise<AdminVendor> =>
		api.get(`/admin/vendors/${id}`),
	updateVendorStatus: (
		id: string,
		status: AdminVendor["status"],
	): Promise<AdminVendor> =>
		api.patch(`/admin/vendors/${id}/status`, { status }),

	// Customers
	getCustomers: (): Promise<Customer[]> => api.get("/admin/customers"),
	getCustomer: (id: string): Promise<Customer> =>
		api.get(`/admin/customers/${id}`),

	// Categories
	getCategories: (): Promise<Category[]> => api.get("/admin/categories"),
	createCategory: (data: Partial<Category>): Promise<Category> =>
		api.post("/admin/categories", data),
	updateCategory: (
		id: string,
		data: Partial<Category>,
	): Promise<Category> =>
		api.put(`/admin/categories/${id}`, data),
	deleteCategory: (id: string): Promise<{ message: string }> =>
		api.delete(`/admin/categories/${id}`),

	// Bookings
	getAllBookings: (): Promise<
		Array<{
			id: string;
			customerName: string;
			serviceName: string;
			vendorName: string;
			amount: number;
			status: string;
			date: string;
		}>
	> => api.get("/admin/bookings"),
};

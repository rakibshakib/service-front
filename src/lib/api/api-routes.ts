const ApiRoutes = {
	auth: {
		login: "/api/auth/login",
		logout: "/api/auth/logout",
	},
	admin: {
		dashboardStats: "/admin/dashboard/stats",
		vendors: "/admin/vendors",
		customers: "/admin/customers",
		categories: "/admin/categories",
		createCategory: "/admin/categories",
		bookings: "/admin/bookings",
	},
	vendor: {
		profile: "/vendor/profile",
		services: "/vendor/services",
		createService: "/vendor/services",
		bookings: "/vendor/bookings",
		discounts: "/vendor/discounts",
		createDiscount: "/vendor/discounts",
		dashboardStats: "/vendor/dashboard/stats",
	},
};

export default ApiRoutes;

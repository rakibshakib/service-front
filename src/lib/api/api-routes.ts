const ApiRoutes = {
	auth: {
		login: "/api/auth/login",
		logout: "/api/auth/logout",
	},
	vendor: {
		root: "/api/vendor",
		status: (id: number) => `/api/vendor/${id}/status`,
		approval: (id: number) => `/api/vendor/${id}/approval`,
		services: (id: number) => `/api/vendor/${id}/services`,
		logo: (id: number) => `/api/vendor/${id}/logo`,
		cover: (id: number) => `/api/vendor/${id}/cover`,
		offers: (id: number) => `/api/vendor/${id}/vendor-offers`,
		offerStatus: (id: number) => `/api/vendor/${id}/vendor-offers-status`,
		categories: (id: number) => `/api/vendor/${id}/updateCategory`,
	},
	category: {
		root: "/api/category",
		status: (id: number) => `/api/category/${id}/status`,
	},
	service: {
		root: "/api/service",
		status: (id: number) => `/api/service/${id}/status`,
	},
};

export default ApiRoutes;

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
		offers: (id: number) => `/api/vendor/${id}/vendor-offers`,
		offerStatus: (id: number) => `/api/vendor/${id}/vendor-offers-status`,
		categories: (id: number) => `/api/vendor/${id}/updateCategory`,
	},
};

export default ApiRoutes;

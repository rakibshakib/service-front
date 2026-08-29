import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.shebapro.com/api/v1",
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request Interceptor
api.interceptors.request.use(
	(config) => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("sbp_token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Response Interceptor
api.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		const originalRequest = error.config;

		// Handle 401 - Unauthorized (token expired)
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (typeof window !== "undefined") {
				localStorage.removeItem("sbp_token");
				window.location.href = "/login/admin";
			}

			return Promise.reject(error);
		}

		// Handle 403 - Forbidden
		if (error.response?.status === 403) {
			if (typeof window !== "undefined") {
				window.location.href = "/unauthorized";
			}
		}

		// Handle 500 - Server Error
		if (error.response?.status >= 500) {
			console.error("Server error:", error.response?.data);
		}

		return Promise.reject(error.response?.data || error);
	},
);

export default api;

import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 15000,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request Interceptor
api.interceptors.request.use(
	(config) => {
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
		const url = originalRequest?.url || "";

		// Skip redirect for auth endpoints (login, register, etc.)
		const isAuthEndpoint =
			url.includes("/api/login") ||
			url.includes("/api/register") ||
			url.includes("/api/forgot-password") ||
			url.includes("/api/reset-password");

		// Handle 401 - Unauthorized (cookie expired or invalid)
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!isAuthEndpoint
		) {
			originalRequest._retry = true;

			if (typeof window !== "undefined") {
				window.location.href = "/login/admin";
			}

			return Promise.reject(error);
		}

		// Handle 403 - Forbidden
		if (error.response?.status === 403 && !isAuthEndpoint) {
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

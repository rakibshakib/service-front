import api from "../index";

export interface LoginPayload {
	email: string;
	password: string;
}

export interface AuthResponse {
	user: {
		id: string;
		name: string;
		email: string;
		role: "admin" | "vendor";
		avatar?: string;
	};
}

export const authApi = {
	login: (data: LoginPayload): Promise<AuthResponse> =>
		api.post("/auth/login", data),

	getProfile: (): Promise<AuthResponse["user"]> =>
		api.get("/auth/profile"),

	logout: (): Promise<{ message: string }> =>
		api.post("/auth/logout"),

	forgotPassword: (email: string): Promise<{ message: string }> =>
		api.post("/auth/forgot-password", { email }),

	resetPassword: (data: { token: string; password: string }): Promise<{ message: string }> =>
		api.post("/auth/reset-password", data),
};

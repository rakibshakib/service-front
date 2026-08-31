// User Types
export type UserType = "ADMIN" | "VENDOR" | "CUSTOMER";

// Base User
export interface BaseUser {
	id: number;
	name: string;
	email: string;
	phone: string | null;
	userType: UserType;
}

// Admin User
export interface AdminUser extends BaseUser {
	userType: "ADMIN";
	admin: {
		userId: number;
		role: "SUPER_ADMIN" | "ADMIN";
	};
}

// Vendor User
export interface VendorUser extends BaseUser {
	userType: "VENDOR";
	vendor: {
		userId: number;
		businessName: string;
		address: string;
		status: "APPROVED" | "PENDING" | "REJECTED";
		isActive: boolean;
	};
}

// Customer User (skip for now, but type defined)
export interface CustomerUser extends BaseUser {
	userType: "CUSTOMER";
	customer: {
		userId: number;
		address: string;
	};
}

// Union type
export type User = AdminUser | VendorUser | CustomerUser;

// Auth Response
export interface AuthResponse {
	message: string;
	user: User;
}

// Login Payload
export interface LoginPayload {
	email: string;
	password: string;
}

// User Type Constants
export const USER_TYPES = {
	ADMIN: "ADMIN",
	VENDOR: "VENDOR",
	CUSTOMER: "CUSTOMER",
} as const;

// Route mapping per role
export const ROLE_REDIRECTS: Record<UserType, string> = {
	ADMIN: "/admin",
	VENDOR: "/vendor",
	CUSTOMER: "/",
};

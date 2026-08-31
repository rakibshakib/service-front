import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { USER_TYPES } from "./lib/api/auth/auth.type";

// Protected route prefixes
const ADMIN_PREFIX = "/admin";
const VENDOR_PREFIX = "/vendor";
const LOGIN_PREFIX = "/login";

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Get cookies
	const accessToken = request.cookies.get("access_token")?.value;
	const userType = request.cookies.get("userType")?.value;

	// Check if route is protected
	const isAdminRoute = pathname.startsWith(ADMIN_PREFIX);
	const isVendorRoute = pathname.startsWith(VENDOR_PREFIX);
	const isLoginRoute = pathname.startsWith(LOGIN_PREFIX);

	const isAuthenticated = !!accessToken && !!userType;

	// If accessing login pages while already authenticated, redirect to dashboard
	if (isLoginRoute && isAuthenticated) {
		if (userType === USER_TYPES.ADMIN) {
			return NextResponse.redirect(new URL("/admin", request.url));
		}
		if (userType === USER_TYPES.VENDOR) {
			return NextResponse.redirect(new URL("/vendor", request.url));
		}
	}

	// If accessing admin routes
	if (isAdminRoute) {
		// Not authenticated - redirect to admin login
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL("/login/admin", request.url));
		}

		// Authenticated but wrong role - redirect to their dashboard
		if (userType !== USER_TYPES.ADMIN) {
			const redirectPath =
				userType === USER_TYPES.VENDOR ? "/vendor" : "/";
			return NextResponse.redirect(new URL(redirectPath, request.url));
		}
	}

	// If accessing vendor routes
	if (isVendorRoute) {
		// Not authenticated - redirect to vendor login
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL("/login/vendor", request.url));
		}

		// Authenticated but wrong role - redirect to their dashboard
		if (userType !== USER_TYPES.VENDOR) {
			const redirectPath =
				userType === USER_TYPES.ADMIN ? "/admin" : "/";
			return NextResponse.redirect(new URL(redirectPath, request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/admin/:path*",
		"/vendor/:path*",
		"/login/:path*",
	],
};

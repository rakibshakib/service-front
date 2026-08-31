import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "..";
import ApiRoutes from "../api-routes";
import { AuthResponse, LoginPayload, ROLE_REDIRECTS } from "./auth.type";

// Cookie helper - set with 7 days expiry
const setCookie = (name: string, value: string, days = 7) => {
	if (typeof document === "undefined") return;
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
};

// Cookie helper - remove
const removeCookie = (name: string) => {
	if (typeof document === "undefined") return;
	document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export { removeCookie, setCookie };

const login = (data: LoginPayload): Promise<AuthResponse> => {
	return api.post(ApiRoutes.auth.login, data);
};

const useLoginMutate = () => {
	const router = useRouter();
	const setUser = useAuthStore((s) => s.setUser);

	return useMutation({
		mutationFn: login,
		mutationKey: ["login"],
		onError: (err: { message?: string }) => {
			console.error("Login error:", err);
		},
		onSuccess: (data) => {
			// Set user in store
			setUser(data.user);

			// Set userType cookie for middleware
			setCookie("userType", data.user.userType);

			// Redirect based on role
			const redirectPath = ROLE_REDIRECTS[data.user.userType];
			router.push(redirectPath);
		},
	});
};

export default useLoginMutate;

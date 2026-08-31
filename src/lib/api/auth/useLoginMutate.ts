import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "..";
import ApiRoutes from "../api-routes";
import { AuthResponse, LoginPayload, ROLE_REDIRECTS } from "./auth.type";

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
			setUser(data.user);
			const redirectPath = ROLE_REDIRECTS[data.user.userType];
			router.push(redirectPath);
		},
	});
};

export default useLoginMutate;

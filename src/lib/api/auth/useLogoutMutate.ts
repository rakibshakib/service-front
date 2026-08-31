import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "..";
import ApiRoutes from "../api-routes";

const logoutApi = (): Promise<{ message: string }> => {
	return api.post(ApiRoutes.auth.logout);
};

const useLogoutMutate = () => {
	const router = useRouter();
	const logout = useAuthStore((s) => s.logout);

	return useMutation({
		mutationFn: logoutApi,
		mutationKey: ["logout"],
		onSuccess: () => {
			logout();
			router.push("/login/admin");
		},
		onError: () => {
			// Even if API fails, clear local state
			logout();
			router.push("/login/admin");
		},
	});
};

export default useLogoutMutate;

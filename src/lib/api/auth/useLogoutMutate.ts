import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "..";
import ApiRoutes from "../api-routes";
import { UserType, USER_TYPES } from "./auth.type";
import { removeCookie } from "./useLoginMutate";

const logoutApi = (): Promise<{ message: string }> => {
	return api.post(ApiRoutes.auth.logout);
};

const useLogoutMutate = (userType?: UserType) => {
	const router = useRouter();
	const clearStore = useAuthStore((s) => s.logout);

	return useMutation({
		mutationFn: logoutApi,
		mutationKey: ["logout"],
		onSuccess: () => {
			clearStore();
			removeCookie("userType");

			const redirectPath =
				userType === USER_TYPES.VENDOR
					? "/login/vendor"
					: "/login/admin";
			router.push(redirectPath);
		},
		onError: () => {
			clearStore();
			removeCookie("userType");

			const redirectPath =
				userType === USER_TYPES.VENDOR
					? "/login/vendor"
					: "/login/admin";
			router.push(redirectPath);
		},
	});
};

export default useLogoutMutate;

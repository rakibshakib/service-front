import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/api/auth/auth.type";

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	setUser: (user: User | null) => void;
	logout: () => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,

			setUser: (user) =>
				set({
					user,
					isAuthenticated: !!user,
				}),

			logout: () =>
				set({
					user: null,
					isAuthenticated: false,
				}),
		}),
		{
			name: "sbp_auth",
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);

export default useAuthStore;

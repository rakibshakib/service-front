"use client";

import type { UserType } from "@/lib/api/auth/auth.type";
import useLogoutMutate from "@/lib/api/auth/useLogoutMutate";
import { LogOut } from "lucide-react";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import type { SidebarConfig } from "./sidebar-config";

interface SidebarProps {
	config: SidebarConfig;
	isCollapsed: boolean;
	userType?: UserType;
}

const Sidebar = ({ config, isCollapsed, userType }: SidebarProps) => {
	const Icon = config.icon;
	const { mutate: logout, isPending } = useLogoutMutate(userType);

	return (
		<aside
			className={`${isCollapsed ? "w-17.5" : "w-64"} bg-card border-r border-border transition-all duration-300 flex flex-col justify-between shrink-0 z-20`}
		>
			<div className="p-3 space-y-6">
				{/* Logo */}
				<div
					className={`px-3 py-2 rounded-xl bg-muted/50 border border-border flex items-center justify-between ${!isCollapsed && "justify-center"}`}
				>
					{isCollapsed ? (
						<Icon className="w-5 h-5 text-primary" />
					) : (
						<div className="flex items-center gap-2">
							<Image
								src="/shebapro.png"
								alt="ShebaPro"
								width={28}
								height={28}
								className="rounded-lg object-contain"
							/>
							<div>
								<span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
									{config.subtitle}
								</span>
								<span className="text-xs font-extrabold text-primary flex items-center gap-1 mt-0.5">
									{config.title}
								</span>
							</div>
						</div>
					)}
				</div>

				{/* Nav Items */}
				<nav className="space-y-1">
					{config.menus.map((item) => (
						<SidebarItem
							key={item.id}
							item={item}
							isCollapsed={isCollapsed}
						/>
					))}
				</nav>
			</div>

			{/* Footer */}
			<div className="p-3 border-t border-border space-y-1">
				{config.footer?.map((item) => (
					<SidebarItem
						key={item.id}
						item={item}
						isCollapsed={isCollapsed}
					/>
				))}
				<button
					onClick={() => logout()}
					disabled={isPending}
					className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
				>
					{isPending ? (
						<div className="w-4 h-4 border-2 border-destructive/30 border-t-destructive rounded-full animate-spin" />
					) : (
						<LogOut className="w-4 h-4" />
					)}
					{!isCollapsed && <span>Sign Out</span>}
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarMenuItem } from "./sidebar-config";

interface SidebarItemProps {
	item: SidebarMenuItem;
	isCollapsed: boolean;
}

const SidebarItem = ({ item, isCollapsed }: SidebarItemProps) => {
	const pathname = usePathname();
	const isActive = pathname === item.href;
	const Icon = item.icon;

	return (
		<Link
			href={item.href}
			className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
				isActive
					? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
					: "text-muted-foreground hover:bg-muted hover:text-foreground"
			}`}
		>
			<div className="flex items-center gap-3">
				<Icon
					className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}
				/>
				{!isCollapsed && <span>{item.label}</span>}
			</div>
			{!isCollapsed && item.badge && (
				<span
					className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
						isActive
							? "bg-white/20 text-white"
							: "bg-muted text-muted-foreground"
					}`}
				>
					{item.badge}
				</span>
			)}
		</Link>
	);
};

export default SidebarItem;

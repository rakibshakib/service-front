import {
	Building2,
	CalendarCheck,
	Gift,
	HelpCircle,
	LayoutDashboard,
	Package,
	Percent,
	Settings,
	ShieldCheck,
	Tag,
	UserCheck,
	Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SidebarMenuItem {
	id: string;
	label: string;
	icon: LucideIcon;
	href: string;
	badge?: number;
}

export interface SidebarConfig {
	role: "admin" | "vendor";
	title: string;
	subtitle: string;
	icon: LucideIcon;
	menus: SidebarMenuItem[];
	footer?: SidebarMenuItem[];
}

export const adminSidebarConfig: SidebarConfig = {
	role: "admin",
	title: "ShebaPro",
	subtitle: "Admin Panel",
	icon: ShieldCheck,
	menus: [
		{
			id: "dashboard",
			label: "Dashboard",
			icon: LayoutDashboard,
			href: "/admin",
		},
		{
			id: "bookings",
			label: "Bookings",
			icon: CalendarCheck,
			href: "/admin/bookings",
			badge: 12,
		},
		{
			id: "categories",
			label: "Categories",
			icon: Tag,
			href: "/admin/categories",
		},
		{
			id: "vendors",
			label: "Vendors",
			icon: Users,
			href: "/admin/vendors",
			badge: 4,
		},
		{
			id: "customers",
			label: "Customers",
			icon: UserCheck,
			href: "/admin/customers",
		},
	],
	footer: [
		{
			id: "settings",
			label: "Settings",
			icon: Settings,
			href: "/admin/settings",
		},
		{
			id: "help",
			label: "Help & Support",
			icon: HelpCircle,
			href: "/admin/help",
		},
	],
};

export const vendorSidebarConfig: SidebarConfig = {
	role: "vendor",
	title: "ShebaPro",
	subtitle: "Vendor Portal",
	icon: Building2,
	menus: [
		{
			id: "dashboard",
			label: "Dashboard",
			icon: LayoutDashboard,
			href: "/vendor",
		},
		{
			id: "bookings",
			label: "Bookings",
			icon: CalendarCheck,
			href: "/vendor/bookings",
			badge: 5,
		},
		{
			id: "discounts",
			label: "Discounts",
			icon: Percent,
			href: "/vendor/discounts",
		},
		{
			id: "services",
			label: "My Services",
			icon: Package,
			href: "/vendor/services",
		},
	],
	footer: [
		{
			id: "settings",
			label: "Settings",
			icon: Settings,
			href: "/vendor/settings",
		},
		{
			id: "help",
			label: "Help & Support",
			icon: HelpCircle,
			href: "/vendor/help",
		},
	],
};

"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SidebarConfig } from "./sidebar-config";

interface TopNavbarProps {
	config: SidebarConfig;
	onToggleSidebar: () => void;
}

const TopNavbar = ({ config, onToggleSidebar }: TopNavbarProps) => {
	return (
		<header className="h-14 bg-card border-b border-border sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon-sm"
					onClick={onToggleSidebar}
				>
					<Menu className="w-5 h-5" />
				</Button>

				<div className="hidden sm:flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-xl border border-border">
					<Search className="w-4 h-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search..."
						className="bg-transparent text-sm font-medium focus:outline-none placeholder-muted-foreground w-48"
					/>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<Button
					variant="ghost"
					size="icon-sm"
					className="relative"
				>
					<Bell className="w-4 h-4" />
					<span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
				</Button>

				<div className="flex items-center gap-2 pl-2 border-l border-border">
					<div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
						{config.role === "admin" ? "AD" : "VC"}
					</div>
					<div className="hidden lg:flex flex-col text-left">
						<span className="text-xs font-bold text-foreground">
							{config.role === "admin"
								? "Platform Admin"
								: "Vendor Manager"}
						</span>
						<span className="text-[10px] text-muted-foreground font-medium">
							{config.role === "admin"
								? "admin@shebapro.com"
								: "vendor@shebapro.com"}
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default TopNavbar;

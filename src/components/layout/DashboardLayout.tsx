"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import type { SidebarConfig } from "./sidebar-config";

interface DashboardLayoutProps {
	config: SidebarConfig;
	children: React.ReactNode;
}

const DashboardLayout = ({ config, children }: DashboardLayoutProps) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className="min-h-screen bg-muted/30 text-foreground font-sans antialiased flex flex-col">
			<TopNavbar
				config={config}
				onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
			/>
			<div className="flex flex-1 overflow-hidden">
				<Sidebar config={config} isCollapsed={isCollapsed} />
				<main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
					{children}
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;

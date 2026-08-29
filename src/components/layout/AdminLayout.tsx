"use client";

import DashboardLayout from "./DashboardLayout";
import { adminSidebarConfig } from "./sidebar-config";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<DashboardLayout config={adminSidebarConfig}>
			{children}
		</DashboardLayout>
	);
};

export default AdminLayout;

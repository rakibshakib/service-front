"use client";

import DashboardLayout from "./DashboardLayout";
import { vendorSidebarConfig } from "./sidebar-config";

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<DashboardLayout config={vendorSidebarConfig}>
			{children}
		</DashboardLayout>
	);
};

export default VendorLayout;

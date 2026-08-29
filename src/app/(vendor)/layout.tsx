import VendorLayout from "@/components/layout/VendorLayout";

export default function Layout({ children }: LayoutProps<"/">) {
	return <VendorLayout>{children}</VendorLayout>;
}

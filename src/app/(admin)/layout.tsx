import AdminLayout from "@/components/layout/AdminLayout";

export default function Layout({ children }: LayoutProps<"/">) {
	return <AdminLayout>{children}</AdminLayout>;
}

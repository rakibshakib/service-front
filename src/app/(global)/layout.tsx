import CustomerLayout from "@/components/layout/CustomerLayout";

export default function Layout({ children }: LayoutProps<"/">) {
	return <CustomerLayout>{children}</CustomerLayout>;
}

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Providers from "@/components/global/Providers";
import "./globals.css";

const montserrat = Montserrat({
	variable: "--font-sans",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "ShebaPro - Service Marketplace",
	description: "Your one-stop verified solution for home services",
};

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${montserrat.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col font-sans">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

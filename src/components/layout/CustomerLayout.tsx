import React from "react";
import Footer from "../global/Footer";
import Navbar from "../global/Navbar";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default CustomerLayout;

import { Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
const Footer = () => {
	return (
		<footer className="bg-primary/5 text-muted-foreground mt-8 border-t border-border">
			{/* Main Footer */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
					{/* Brand + Description */}
					<div className="lg:col-span-4">
						<div className="flex items-center gap-2.5 mb-4">
							<Image
								src="/shebapro.png"
								alt="ShebaPro Logo"
								width={36}
								height={36}
								className="rounded-lg shadow-md object-contain"
							/>
							<span className="font-extrabold text-xl text-foreground">
								Sheba<span className="text-secondary">Pro</span>
							</span>
						</div>
						<p className="text-sm leading-relaxed mb-5 max-w-xs">
							Your one-stop verified solution for home services across
							Bangladesh. Trusted by 50,000+ customers.
						</p>
						{/* Social Links */}
						<div className="flex items-center gap-2">
							<a
								href="#"
								className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary flex items-center justify-center text-muted-foreground hover:text-white transition-all"
							>
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
							</a>
							<a
								href="#"
								className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary flex items-center justify-center text-muted-foreground hover:text-white transition-all"
							>
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
								</svg>
							</a>
							<a
								href="#"
								className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary flex items-center justify-center text-muted-foreground hover:text-white transition-all"
							>
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
								</svg>
							</a>
						</div>
					</div>

					{/* Services */}
					<div className="lg:col-span-2">
						<h5 className="text-foreground text-sm font-bold mb-4">
							Services
						</h5>
						<ul className="space-y-2.5">
							{[
								"AC Repair",
								"Home Cleaning",
								"Electrical",
								"Plumbing",
								"Painting",
								"Car Wash",
							].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="text-sm hover:text-primary hover:pl-1 transition-all"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div className="lg:col-span-2">
						<h5 className="text-foreground text-sm font-bold mb-4">
							Company
						</h5>
						<ul className="space-y-2.5">
							{[
								"About Us",
								"Become a Vendor",
								"Careers",
								"Blog",
								"Press",
							].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="text-sm hover:text-primary hover:pl-1 transition-all"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Support + Contact */}
					<div className="lg:col-span-4">
						<h5 className="text-foreground text-sm font-bold mb-4">
							Get in Touch
						</h5>
						<div className="space-y-3 mb-6">
							<a
								href="tel:16516"
								className="flex items-center gap-3 text-sm hover:text-primary transition-colors group"
							>
								<span className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center shrink-0 transition-all">
									<PhoneCall className="w-4 h-4 group-hover:text-white" />
								</span>
								<div>
									<span className="text-[10px] text-muted-foreground block">
										24/7 Support
									</span>
									<span className="text-foreground font-bold">
										16516
									</span>
								</div>
							</a>
							<a
								href="mailto:support@shebapro.com"
								className="flex items-center gap-3 text-sm hover:text-primary transition-colors group"
							>
								<span className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center shrink-0 transition-all">
									<Mail className="w-4 h-4 group-hover:text-white" />
								</span>
								<div>
									<span className="text-[10px] text-muted-foreground block">
										Email Us
									</span>
									<span className="text-foreground font-bold">
										support@shebapro.com
									</span>
								</div>
							</a>
							<div className="flex items-center gap-3 text-sm">
								<span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
									<MapPin className="w-4 h-4" />
								</span>
								<div>
									<span className="text-[10px] text-muted-foreground block">
										Visit Us
									</span>
									<span className="text-foreground font-bold">
										Gulshan, Dhaka
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
					<p className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} ShebaPro. All rights reserved.
					</p>
					<div className="flex items-center gap-4 text-xs">
						<a href="#" className="hover:text-primary transition-colors">
							Privacy Policy
						</a>
						<a href="#" className="hover:text-primary transition-colors">
							Terms of Service
						</a>
						<a href="#" className="hover:text-primary transition-colors">
							Cookie Policy
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

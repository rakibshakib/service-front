import { MapPin, PhoneCall, ShoppingBag } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
	return (
		<header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
				<div className="flex items-center gap-6">
					<a href="#" className="flex items-center gap-2 group">
						<Image
							src="/shebapro.png"
							alt="ShebaPro Logo"
							width={36}
							height={36}
							className="rounded-xl shadow-md group-hover:scale-105 transition-transform object-contain"
						/>
						<div className="flex flex-col">
							<span className="font-extrabold text-lg text-foreground tracking-tight leading-none">
								Sheba<span className="text-secondary">Pro</span>
							</span>
							<span className="text-[9px] text-muted-foreground font-medium tracking-widest uppercase">
								Services
							</span>
						</div>
					</a>
					<div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 cursor-pointer text-xs font-semibold text-muted-foreground transition-colors">
						<MapPin className="w-3.5 h-3.5 text-primary" />
						<span>{"Dhaka, Bangladesh"}</span>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<button className="hidden sm:flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-xl transition-all">
						<PhoneCall className="w-3.5 h-3.5" />
						<span>Helpline: 16516</span>
					</button>
					<button className="relative p-2.5 rounded-xl text-muted-foreground hover:bg-muted transition-colors">
						<ShoppingBag className="w-5 h-5" />
						<span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger"></span>
					</button>
					<button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all hover:shadow-lg">
						Sign In
					</button>
				</div>
			</div>
		</header>
	);
};

export default Navbar;

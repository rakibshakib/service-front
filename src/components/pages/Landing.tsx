"use client";

import ServiceCard from "@/components/global/service-card/ServiceCard";
import type { Service as ServiceCardType } from "@/components/global/service-card/types";
import VendorCard from "@/components/global/vendor-card/VendorCard";
import type { Vendor } from "@/components/global/vendor-card/types";
import Slider from "@/components/ui/slider";
import {
	ArrowRight,
	CheckCircle2,
	ChevronRight,
	Clock,
	Mail,
	MapPin,
	PhoneCall,
	Search,
	ShieldCheck,
	ShoppingBag,
	Sparkles,
	Star,
	Tag,
	TrendingUp,
	X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

// Types
interface Category {
	id: number;
	name: string;
	icon: string;
	count: number;
}

interface NewVendor {
	id: number;
	name: string;
	joined: string;
	specialty: string;
	rating: number;
	location: string;
	coverBg: string;
	logo: string;
	introDiscount: string;
	skills: string[];
}

// Data Sets
const categories: Category[] = [
	{ id: 1, name: "Cleaning", icon: "🧹", count: 120 },
	{ id: 2, name: "Electrical", icon: "⚡", count: 85 },
	{ id: 3, name: "Plumbing", icon: "🪠", count: 64 },
	{ id: 4, name: "Appliance", icon: "🔧", count: 95 },
	{ id: 5, name: "Painting", icon: "🎨", count: 42 },
	{ id: 6, name: "Car Wash", icon: "🚗", count: 50 },
	{ id: 7, name: "Driving", icon: "🚘", count: 30 },
	{ id: 8, name: "Pest Control", icon: "🐛", count: 38 },
	{ id: 9, name: "Moving", icon: "📦", count: 25 },
	{ id: 10, name: "Gardening", icon: "🌿", count: 45 },
	{ id: 11, name: "Tailoring", icon: "🧵", count: 60 },
	{ id: 12, name: "Photography", icon: "📸", count: 35 },
	{ id: 13, name: "Tutoring", icon: "📚", count: 70 },
	{ id: 14, name: "Massage", icon: "💆", count: 28 },
];

const services: ServiceCardType[] = [
	{
		name: "AC Deep Servicing & Gas Topup",
		shortDescription:
			"Complete jet wash cleaning, filter sanitization and gas level check by certified technicians.",
		basePrice: 1200,
		category: "Appliance",
		image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "Electro Care",
				rating: 4.8,
				avatar:
					"https://ui-avatars.com/api/?name=EC&background=12544F&color=fff&bold=true",
			},
		],
	},
	{
		name: "Full Home Deep Cleaning",
		shortDescription:
			"Comprehensive eco-friendly cleaning for all rooms, bathrooms, windows, and balcony.",
		basePrice: 2500,
		discountAmount: 15,
		discountType: "percent",
		category: "Cleaning",
		image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "CleanCo",
				rating: 4.9,
				avatar:
					"https://ui-avatars.com/api/?name=CC&background=12544F&color=fff&bold=true",
			},
			{
				name: "Sparkle",
				rating: 4.7,
				avatar:
					"https://ui-avatars.com/api/?name=SS&background=2A835F&color=fff&bold=true",
			},
		],
	},
	{
		name: "Sofa & Carpet Steam Clean",
		shortDescription:
			"Deep steam sanitization and stain removal for multi-seater sofas, chairs, and rugs.",
		basePrice: 800,
		category: "Cleaning",
		image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "FreshHome",
				rating: 4.7,
				avatar:
					"https://ui-avatars.com/api/?name=FH&background=8BBB92&color=fff&bold=true",
			},
		],
	},
	{
		name: "Electrical Wiring & DB Box Fix",
		shortDescription:
			"Troubleshooting short circuits, socket installations, and switchboard repairs.",
		basePrice: 500,
		category: "Electrical",
		image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "PowerGrid",
				rating: 4.6,
				avatar:
					"https://ui-avatars.com/api/?name=PG&background=12544F&color=fff&bold=true",
			},
		],
	},
	{
		name: "Bathroom Leakage & Pipe Repair",
		shortDescription:
			"Fix leaking taps, blockages, pipe fittings, and sanitary hardware upgrades.",
		basePrice: 650,
		category: "Plumbing",
		image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "PipeMaster",
				rating: 4.8,
				avatar:
					"https://ui-avatars.com/api/?name=PM&background=2A835F&color=fff&bold=true",
			},
			{
				name: "FlowFix",
				rating: 4.5,
				avatar:
					"https://ui-avatars.com/api/?name=FF&background=8BBB92&color=fff&bold=true",
			},
		],
	},
	{
		name: "Kitchen Deep Sanitization",
		shortDescription:
			"Complete kitchen deep clean with eco-friendly sanitizers and degreasers.",
		basePrice: 1500,
		discountAmount: 500,
		discountType: "flat",
		category: "Cleaning",
		image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "CleanCo",
				rating: 4.9,
				avatar:
					"https://ui-avatars.com/api/?name=CC&background=12544F&color=fff&bold=true",
			},
		],
	},
];

const vendors: Vendor[] = [
	{
		id: 1,
		name: "CleanCo Official Ltd.",
		jobs: "1.4k+",
		rating: 4.9,
		reviewsCount: 420,
		badge: "Top Rated",
		avatar: "CC",
		specialty: "Full Home & Commercial Cleaning",
		coverBg: "from-primary/80 to-secondary/80",
		logoBg: "bg-primary text-primary-foreground",
		responseTime: "< 15 mins",
		location: "Gulshan, Dhaka",
		skills: ["Deep Clean", "Sanitization", "Pest Control"],
		isOnline: true,
		startingPrice: 800,
	},
	{
		id: 2,
		name: "FixIt Master Solutions",
		jobs: "980+",
		rating: 4.8,
		reviewsCount: 310,
		badge: "Super Vendor",
		avatar: "FM",
		specialty: "Electrical Wiring & Plumbing Pro",
		coverBg: "from-slate-700 to-slate-900",
		logoBg: "bg-secondary text-secondary-foreground",
		responseTime: "< 20 mins",
		location: "Dhanmondi, Dhaka",
		skills: ["Circuit Repair", "Sanitary", "DB Box"],
		isOnline: true,
		startingPrice: 500,
	},
	{
		id: 3,
		name: "Electro Care BD",
		jobs: "650+",
		rating: 4.7,
		reviewsCount: 195,
		badge: "Verified Pro",
		avatar: "EC",
		specialty: "AC Servicing & Appliance Master",
		coverBg: "from-accent to-primary",
		logoBg: "bg-accent text-accent-foreground",
		responseTime: "< 30 mins",
		location: "Uttara, Dhaka",
		skills: ["AC Jet Wash", "Gas Refill", "Fridge Repair"],
		isOnline: false,
		startingPrice: 600,
	},
	{
		id: 4,
		name: "Speedy Plumbers Express",
		jobs: "1.1k+",
		rating: 4.9,
		reviewsCount: 380,
		badge: "Top Rated",
		avatar: "SP",
		specialty: "Emergency Sanitary & Pipe Fix",
		coverBg: "from-info to-primary",
		logoBg: "bg-info text-white",
		responseTime: "Instant",
		location: "Banani, Dhaka",
		skills: ["Leak Repair", "Tap Install", "Water Meter"],
		isOnline: true,
		startingPrice: 450,
	},
];

const discountServices: ServiceCardType[] = [
	{
		name: "Kitchen Deep Sanitization",
		shortDescription:
			"Complete kitchen deep clean with eco-friendly sanitizers and degreasers for a spotless shine.",
		basePrice: 1500,
		discountAmount: 500,
		discountType: "flat",
		category: "Cleaning",
		image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "CleanCo",
				rating: 4.9,
				avatar:
					"https://ui-avatars.com/api/?name=CC&background=12544F&color=fff&bold=true",
			},
		],
	},
	{
		name: "Car Interior Detailing & Foam Wash",
		shortDescription:
			"Premium interior detailing with foam wash, ceramic polish, and vacuum cleaning service.",
		basePrice: 2000,
		discountAmount: 600,
		discountType: "flat",
		category: "Car Wash",
		image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "ProAuto",
				rating: 4.8,
				avatar:
					"https://ui-avatars.com/api/?name=PA&background=2A835F&color=fff&bold=true",
			},
		],
	},
	{
		name: "Water Heater Repair & Installation",
		shortDescription:
			"Expert water heater repair, gas geyser installation, and maintenance services.",
		basePrice: 800,
		discountAmount: 300,
		discountType: "flat",
		category: "Appliance",
		image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "FixIt",
				rating: 4.7,
				avatar:
					"https://ui-avatars.com/api/?name=FI&background=8BBB92&color=fff&bold=true",
			},
		],
	},
];

const newVendors: NewVendor[] = [
	{
		id: 1,
		name: "Green Spark Solar & Electric",
		joined: "2 days ago",
		specialty: "Solar Panel & Smart Wiring",
		rating: 4.9,
		location: "Gulshan, Dhaka",
		coverBg: "from-secondary to-primary",
		logo: "GS",
		introDiscount: "15% OFF First Order",
		skills: ["Solar Grid", "Inverter", "Smart Switch"],
	},
	{
		id: 2,
		name: "Pro Auto Doorstep Foam Wash",
		joined: "5 days ago",
		specialty: "Eco Pressure Wash & Polishing",
		rating: 4.8,
		location: "Dhanmondi, Dhaka",
		coverBg: "from-info to-primary",
		logo: "PA",
		introDiscount: "Free Vacuum Clean",
		skills: ["Foam Wash", "Ceramic Coat", "Interior"],
	},
	{
		id: 3,
		name: "Urban Color Studio Painters",
		joined: "1 week ago",
		specialty: "Interior Design & Texture Paint",
		rating: 5.0,
		location: "Uttara, Dhaka",
		coverBg: "from-accent to-secondary",
		logo: "UC",
		introDiscount: "Free Color Consult",
		skills: ["Dampproofing", "3D Texture", "Wall Decor"],
	},
	{
		id: 4,
		name: "RapidFix Appliance Care",
		joined: "3 days ago",
		specialty: "Washing Machine & Fridge Repair",
		rating: 4.7,
		location: "Mirpur, Dhaka",
		coverBg: "from-primary to-accent",
		logo: "RF",
		introDiscount: "20% OFF First Service",
		skills: ["Fridge Repair", "Washing Machine", "Microwave"],
	},
	{
		id: 5,
		name: "FreshHome Pest Control",
		joined: "4 days ago",
		specialty: "Termite & Cockroach Treatment",
		rating: 4.6,
		location: "Banani, Dhaka",
		coverBg: "from-secondary to-info",
		logo: "FH",
		introDiscount: "Free Inspection",
		skills: ["Termite", "Rodent", "Mosquito"],
	},
	{
		id: 6,
		name: "BD LockSmith Pro",
		joined: "1 day ago",
		specialty: "Smart Lock & Security System",
		rating: 4.9,
		location: "Motijheel, Dhaka",
		coverBg: "from-info to-secondary",
		logo: "BL",
		introDiscount: "10% OFF Installation",
		skills: ["Smart Lock", "CCTV", "Alarm"],
	},
];

const Landing = () => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedLocation] = useState("Dhaka, Bangladesh");
	const [favoriteVendors, setFavoriteVendors] = useState<number[]>([]);

	const toggleFavorite = (id: number, e: React.MouseEvent) => {
		e.stopPropagation();
		setFavoriteVendors((prev) =>
			prev.includes(id) ? prev.filter((vId) => vId !== id) : [...prev, id],
		);
	};

	const filteredServices = services.filter((service) => {
		const matchesCategory = selectedCategory
			? service.category === selectedCategory
			: true;
		const matchesSearch =
			service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			service.category?.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
			{/* HEADER */}
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
							<span>{selectedLocation}</span>
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

			{/* HERO */}
			<section className="relative overflow-hidden bg-linear-to-br from-primary via-primary to-secondary text-primary-foreground py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

				<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
					{/* Left Content */}
					<div className="flex-1 text-center lg:text-left">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold tracking-wide border border-white/15 mb-6">
							<span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
							<span>#1 Trusted Service Marketplace in Bangladesh</span>
						</div>

						{/* Heading */}
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
							Expert Services,
							<br />
							<span className="text-accent">
								Right at Your Doorstep.
							</span>
						</h1>

						{/* Subtitle */}
						<p className="mt-5 text-sm sm:text-base text-white/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
							Book verified local professionals for home deep cleaning,
							AC servicing, electrical work, plumbing, and daily chores
							with transparent pricing.
						</p>

						{/* Search Bar */}
						<div className="mt-8 bg-white rounded-2xl p-1.5 shadow-2xl max-w-lg mx-auto lg:mx-0 flex flex-col sm:flex-row items-center gap-2">
							<div className="flex items-center gap-2 px-4 w-full">
								<Search className="w-5 h-5 text-muted-foreground shrink-0" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="What service do you need?"
									className="w-full py-3 text-foreground placeholder-muted-foreground focus:outline-none text-sm font-medium bg-transparent"
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery("")}
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										<X className="w-4 h-4" />
									</button>
								)}
							</div>
							<button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 transition-all shrink-0 flex items-center justify-center gap-2">
								<span>Search</span>
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>

						{/* Trust Indicators */}
						<div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-medium text-white/80">
							<span className="flex items-center gap-2">
								<span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
									<ShieldCheck className="w-4 h-4 text-accent" />
								</span>
								100% Verified Pros
							</span>
							<span className="flex items-center gap-2">
								<span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
									<CheckCircle2 className="w-4 h-4 text-accent" />
								</span>
								Fixed Price
							</span>
							<span className="flex items-center gap-2">
								<span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
									<Clock className="w-4 h-4 text-accent" />
								</span>
								7-Day Protection
							</span>
						</div>
					</div>

					{/* Right - Stats Card */}
					<div className="w-full lg:w-5/12 flex justify-center">
						<div className="relative w-full max-w-sm">
							{/* Glow */}
							<div className="absolute -inset-4 bg-gradient-to-r from-warning/20 via-accent/20 to-secondary/20 rounded-3xl blur-2xl" />

							{/* Card */}
							<div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 p-6 shadow-2xl">
								{/* Header */}
								<div className="flex items-center justify-between mb-5">
									<div className="flex items-center gap-3">
										<div className="w-11 h-11 rounded-xl bg-warning/20 flex items-center justify-center text-xl">
											⚡
										</div>
										<div>
											<h4 className="font-bold text-sm">
												Instant Booking
											</h4>
											<p className="text-[11px] text-white/60">
												Get pros within 60 min
											</p>
										</div>
									</div>
									<span className="bg-accent/20 text-accent text-[10px] font-bold px-2.5 py-1 rounded-full border border-accent/30">
										LIVE
									</span>
								</div>

								{/* Stats */}
								<div className="grid grid-cols-2 gap-3 mb-5">
									<div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
										<div className="text-[10px] text-white/50 uppercase tracking-wider font-medium">
											Happy Clients
										</div>
										<div className="text-xl font-black mt-1">
											50,000+
										</div>
									</div>
									<div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
										<div className="text-[10px] text-white/50 uppercase tracking-wider font-medium">
											Avg Rating
										</div>
										<div className="text-xl font-black mt-1 flex items-center gap-1">
											4.9
											<Star className="w-4 h-4 text-warning fill-warning" />
										</div>
									</div>
								</div>

								{/* Guarantee */}
								<div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-center gap-3">
									<div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
										<ShieldCheck className="w-5 h-5 text-accent" />
									</div>
									<div>
										<div className="text-xs font-bold">
											Verified Guarantee
										</div>
										<div className="text-[10px] text-white/50">
											Free re-service if unsatisfied
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* px-4 sm:px-6 lg:px-8  */}
			<div className="max-w-7xl mx-auto space-y-14 py-12">
				{/* CATEGORIES */}
				<section className="ps-4 pe-0">
					<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
						<div>
							<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
								<Tag className="w-3.5 h-3.5" />
								<span>Service Categories</span>
							</div>
							<h2 className="text-base sm:text-xl font-extrabold text-foreground mt-1">
								Explore Categories
							</h2>
						</div>
						{selectedCategory && (
							<button
								onClick={() => setSelectedCategory(null)}
								className="text-xs font-bold text-danger hover:underline self-start sm:self-auto"
							>
								Clear Category Filter
							</button>
						)}
					</div>
					<Slider
						data={categories}
						renderItem={(cat) => {
							const isSelected = selectedCategory === cat.name;
							return (
								<div
									onClick={() =>
										setSelectedCategory(isSelected ? null : cat.name)
									}
									className={`rounded-2xl p-2.5 text-center cursor-pointer transition-all border ${
										isSelected
											? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
											: "bg-card border-border hover:border-secondary hover:shadow-md text-card-foreground"
									}`}
								>
									<div
										className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-xl transition-transform ${isSelected ? "bg-white/20" : "bg-muted"}`}
									>
										{cat.icon}
									</div>
									<h3 className="font-bold text-xs">{cat.name}</h3>
									<span
										className={`text-[10px] block mt-0.5 font-medium ${isSelected ? "opacity-80" : "text-muted-foreground"}`}
									>
										{cat.count}+
									</span>
								</div>
							);
						}}
						config={{
							autoplay: { delay: 3000 },
							loop: true,
							breakpoints: {
								0: { slidesPerView: 3, spaceBetween: 8 },
								480: { slidesPerView: 4, spaceBetween: 10 },
								640: { slidesPerView: 5, spaceBetween: 12 },
								768: { slidesPerView: 6, spaceBetween: 14 },
								1024: { slidesPerView: 7.4, spaceBetween: 16 },
							},
						}}
					/>
				</section>

				{/* POPULAR SERVICES - Using Slider + ServiceCard */}
				<section className="ps-4 pe-0">
					<div className="flex justify-between items-end mb-6">
						<div>
							<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
								<TrendingUp className="w-3.5 h-3.5" />
								<span>Trending Now</span>
							</div>
							<h2 className="text-base sm:text-xl font-extrabold text-foreground mt-1">
								{selectedCategory
									? `${selectedCategory} Services`
									: "Popular Services"}
							</h2>
						</div>
						<button className="text-sm font-bold text-primary hover:text-secondary hover:underline flex items-center gap-1">
							<span>View All</span>
							<ChevronRight className="w-4 h-4" />
						</button>
					</div>

					{filteredServices.length === 0 ? (
						<div className="bg-card rounded-3xl p-8 text-center border border-border">
							<p className="text-muted-foreground font-medium">
								No services found matching your query.
							</p>
							<button
								onClick={() => {
									setSearchQuery("");
									setSelectedCategory(null);
								}}
								className="mt-3 text-xs font-bold text-primary underline"
							>
								Reset Search Filters
							</button>
						</div>
					) : (
						<Slider
							data={filteredServices}
							renderItem={(service) => (
								<ServiceCard service={service} variant="vertical" />
							)}
						/>
					)}
				</section>

				{/* TOP VENDORS */}
				<section className="bg-muted/50 py-4 ps-4 pe-0 sm:p-10 rounded-none md:rounded-3xl border border-border">
					<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
						<div>
							<h2 className="text-base sm:text-xl font-extrabold text-foreground mt-1">
								Top Rated Vendors
							</h2>
							<p className="text-xs sm:text-base text-muted-foreground mt-1">
								Handpicked professionals with top performance ratings
							</p>
						</div>
					</div>

					<Slider
						data={vendors}
						renderItem={(vendor) => {
							const isFav = favoriteVendors.includes(vendor.id);
							return (
								<VendorCard
									key={vendor.id}
									vendor={vendor}
									isFav={isFav}
									toggleFavorite={toggleFavorite}
								/>
							);
						}}
						config={{
							breakpoints: {
								0: { slidesPerView: 1.1, spaceBetween: 8 },
								480: { slidesPerView: 1.5, spaceBetween: 10 },
								640: { slidesPerView: 2, spaceBetween: 12 },
								768: { slidesPerView: 2.5, spaceBetween: 14 },
								1024: { slidesPerView: 3, spaceBetween: 16 },
								1280: { slidesPerView: 4.2, spaceBetween: 16 },
							},
						}}
					/>
				</section>

				{/* DISCOUNT SERVICES */}
				<section className="ps-4 pe-0">
					<div className="flex justify-between items-end mb-6">
						<div>
							<div className="flex items-center gap-2 text-xs font-bold text-danger uppercase tracking-wider">
								<Tag className="w-3.5 h-3.5" />
								<span>Exclusive Savings</span>
							</div>
							<h2 className="text-base sm:text-xl font-extrabold text-foreground mt-1">
								Special Discount Offers
							</h2>
						</div>
						<button className="text-sm font-bold text-primary hover:text-secondary hover:underline flex items-center gap-1">
							<span>View All</span>
							<ChevronRight className="w-4 h-4" />
						</button>
					</div>
					<Slider
						data={discountServices}
						renderItem={(service) => (
							<ServiceCard service={service} variant="horizontal" />
						)}
						config={{
							breakpoints: {
								0: { slidesPerView: 1.2, spaceBetween: 8 },
								480: { slidesPerView: 1.5, spaceBetween: 10 },
								640: { slidesPerView: 2, spaceBetween: 12 },
								768: { slidesPerView: 2.5, spaceBetween: 14 },
								1024: { slidesPerView: 3, spaceBetween: 16 },
								1280: { slidesPerView: 3.5, spaceBetween: 16 },
							},
						}}
					/>
				</section>

				{/* NEW VENDORS */}
				<section className="bg-linear-to-br	 from-secondary/10 via-accent/10 to-primary/10 border border-border rounded-none md:rounded-3xl py-4 ps-4 pe-0 sm:p-10 relative overflow-hidden">
					<div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
						<Sparkles className="w-80 h-80 text-primary" />
					</div>
					<div className="relative z-10">
						<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-4">
							<div>
								<span className="bg-secondary/15 text-secondary border border-secondary/20 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-2">
									Fresh Partners
								</span>
								<h2 className="text-base sm:text-xl font-black tracking-tight text-foreground">
									Newly Joined Vendors
								</h2>
								<p className="text-xs sm:text-base text-muted-foreground mt-1">
									Discover recently verified service providers in your
									neighborhood
								</p>
							</div>
						</div>
						<Slider
							data={newVendors}
							renderItem={(vendor) => (
								<VendorCard
									vendor={{
										id: vendor.id,
										name: vendor.name,
										jobs: "0",
										rating: vendor.rating,
										reviewsCount: 0,
										badge: "",
										avatar: vendor.logo,
										specialty: vendor.specialty,
										coverBg: vendor.coverBg,
										logoBg: "bg-card text-card-foreground",
										responseTime: "",
										location: vendor.location,
										skills: vendor.skills,
										isOnline: false,
										startingPrice: 0,
										introDiscount: vendor.introDiscount,
										joined: vendor.joined,
									}}
									variant="featured"
								/>
							)}
							config={{
								autoplay: { delay: 3000 },
								loop: true,
								breakpoints: {
									0: { slidesPerView: 1.2, spaceBetween: 8 },
									480: { slidesPerView: 1.5, spaceBetween: 10 },
									640: { slidesPerView: 2, spaceBetween: 12 },
									768: { slidesPerView: 3, spaceBetween: 14 },
								},
							}}
						/>
					</div>
				</section>
			</div>

			{/* FOOTER */}
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
							<a
								href="#"
								className="hover:text-primary transition-colors"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="hover:text-primary transition-colors"
							>
								Terms of Service
							</a>
							<a
								href="#"
								className="hover:text-primary transition-colors"
							>
								Cookie Policy
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Landing;

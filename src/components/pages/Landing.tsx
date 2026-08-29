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
	Search,
	ShieldCheck,
	Sparkles,
	Star,
	Tag,
	TrendingUp,
	X,
} from "lucide-react";
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
		<div>
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
		</div>
	);
};

export default Landing;

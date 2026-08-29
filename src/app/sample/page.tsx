"use client";

import ServiceCard from "@/components/global/service-card/ServiceCard";
import Slider from "@/components/ui/slider";

const mockServices = [
	{
		name: "Deep Home Cleaning Service",
		shortDescription:
			"Professional deep cleaning for kitchen, bedroom, and living spaces using eco-friendly materials.",
		basePrice: 1000,
		discountAmount: 20,
		discountType: "percent" as const,
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
			{
				name: "FreshHome",
				rating: 4.5,
				avatar:
					"https://ui-avatars.com/api/?name=FH&background=8BBB92&color=fff&bold=true",
			},
		],
	},
	{
		name: "AC Repair & Servicing",
		shortDescription:
			"Expert AC repair, gas refilling, and deep servicing for all brands.",
		basePrice: 800,
		discountAmount: 150,
		discountType: "flat" as const,
		category: "Repair",
		image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "CoolTech",
				rating: 4.8,
				avatar:
					"https://ui-avatars.com/api/?name=CT&background=12544F&color=fff&bold=true",
			},
		],
	},
	{
		name: "Plumbing Solutions",
		shortDescription:
			"Quick and reliable plumbing services for residential and commercial needs.",
		basePrice: 600,
		category: "Plumbing",
		image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "PipeMaster",
				rating: 4.6,
				avatar:
					"https://ui-avatars.com/api/?name=PM&background=2A835F&color=fff&bold=true",
			},
			{
				name: "FlowFix",
				rating: 4.3,
				avatar:
					"https://ui-avatars.com/api/?name=FF&background=8BBB92&color=fff&bold=true",
			},
		],
	},
	{
		name: "Electrical Wiring Work",
		shortDescription:
			"Safe and certified electrical wiring, repair, and installation services.",
		basePrice: 1200,
		category: "Electrical",
		image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "PowerGrid",
				rating: 0.8,
				avatar:
					"https://ui-avatars.com/api/?name=PG&background=12544F&color=fff&bold=true",
			},
		],
	},
	{
		name: "Painting & Wall Design",
		shortDescription:
			"Transform your space with professional painting and decorative wall designs.",
		basePrice: 2500,
		discountAmount: 500,
		discountType: "flat" as const,
		category: "Interior",
		image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
	},
	{
		name: "Gardening & Landscaping",
		shortDescription:
			"Professional garden maintenance, lawn care, and landscape design services.",
		basePrice: 700,
		category: "Outdoor",
	},
	{
		name: "Pest Control Service",
		shortDescription:
			"Effective and eco-friendly pest control for homes and offices.",
		basePrice: 900,
		discountAmount: 15,
		discountType: "percent" as const,
		category: "Cleaning",
		image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
		vendors: [
			{
				name: "BugFree",
				rating: 4.4,
				avatar:
					"https://ui-avatars.com/api/?name=BF&background=12544F&color=fff&bold=true",
			},
			{
				name: "SafePest",
				rating: 4.2,
				avatar:
					"https://ui-avatars.com/api/?name=SP&background=2A835F&color=fff&bold=true",
			},
			{
				name: "GreenGuard",
				rating: 4.0,
				avatar:
					"https://ui-avatars.com/api/?name=GG&background=8BBB92&color=fff&bold=true",
			},
			{
				name: "ProKill",
				rating: 3.9,
				avatar:
					"https://ui-avatars.com/api/?name=PK&background=12544F&color=fff&bold=true",
			},
		],
	},
];

export default function Page() {
	return (
		<div className="p-8 bg-background min-h-screen">
			<div className="max-w-7xl mx-auto space-y-12">
				{/* Vertical Slider */}
				<section>
					<h2 className="text-lg font-bold text-foreground mb-1">
						Vertical Cards Slider
					</h2>
					<p className="text-xs text-muted-foreground mb-4">
						Responsive — 4 → 3.6 → 3.2 → 2.9 → 2 → 1.2 slides
					</p>
					<Slider
						data={mockServices}
						renderItem={(service) => (
							<ServiceCard service={service} variant="vertical" />
						)}
					/>
				</section>

				{/* Horizontal Slider */}
				<section>
					<h2 className="text-lg font-bold text-foreground mb-1">
						Horizontal Cards Slider
					</h2>
					<p className="text-xs text-muted-foreground mb-4">
						Responsive — image left, info right
					</p>
					<Slider
						data={mockServices}
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
			</div>
		</div>
	);
}

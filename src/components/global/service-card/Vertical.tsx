import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import ServiceImage from "./ServiceImage";
import type { ServiceCardComputed } from "./types";

const Vertical = ({
	service,
	finalPrice,
	hasDiscount,
	avgRating,
}: ServiceCardComputed) => {
	const { name, shortDescription, image, category, vendors = [] } = service;

	return (
		<div className="group relative w-full rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
			{/* Image */}
			<div className="relative overflow-hidden rounded-t-xl h-36 bg-muted">
				<ServiceImage
					src={image}
					alt={name}
					sizes="(max-width: 1024px) 25vw, 280px"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				<div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

				{category && (
					<span className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm text-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm border border-border/50">
						{category}
					</span>
				)}

				{hasDiscount && (
					<span className="absolute top-2 left-2 bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
						{service.discountType === "percent"
							? `${service.discountAmount}% OFF`
							: `৳${service.discountAmount} OFF`}
					</span>
				)}
			</div>

			{/* Content */}
			<div className="p-3 space-y-2">
				<h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
					{name}
				</h3>

				<p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
					{shortDescription}
				</p>

				{vendors.length > 0 && (
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							{vendors.slice(0, 3).map((vendor, i) => (
								<div
									key={vendor.name}
									className="relative w-5 h-5 rounded-full overflow-hidden border-2 border-card bg-muted"
									style={{
										marginLeft: i > 0 ? "-6px" : 0,
										zIndex: 3 - i,
									}}
								>
									<Image
										src={
											vendor.avatar ||
											`https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.name)}&background=12544F&color=fff&bold=true`
										}
										alt={vendor.name}
										fill
										sizes="20px"
										className="object-cover"
									/>
								</div>
							))}
							{vendors.length > 3 && (
								<div className="relative w-5 h-5 rounded-full overflow-hidden border-2 border-card bg-muted -ml-1.5 z-0">
									<span className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold text-muted-foreground">
										+{vendors.length - 3}
									</span>
								</div>
							)}
						</div>

						{avgRating > 1 && (
							<span className="flex items-center gap-0.5 text-[10px] font-medium text-warning">
								<Star className="w-3 h-3 fill-current" />
								{avgRating.toFixed(1)}
							</span>
						)}
					</div>
				)}

				<div className="border-t border-border" />

				<div className="flex items-end justify-between">
					<div>
						<p className="text-[10px] text-muted-foreground leading-none mb-0.5">
							Starts from
						</p>
						<div className="flex items-baseline gap-1.5">
							<span className="text-base font-bold text-foreground">
								৳{finalPrice.toLocaleString()}
							</span>
							{hasDiscount && (
								<span className="text-xs text-muted-foreground line-through">
									৳{service.basePrice.toLocaleString()}
								</span>
							)}
						</div>
					</div>

					<Button size="xs" className="rounded-lg">
						Book Now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Vertical;

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import ServiceImage from "./ServiceImage";
import type { ServiceCardComputed } from "./types";

const Horizontal = ({
	service,
	finalPrice,
	hasDiscount,
	avgRating,
}: ServiceCardComputed) => {
	const { name, shortDescription, image, category, vendors = [] } = service;

	return (
		<div className="group relative flex items-stretch w-full max-w-85 rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
			{/* Image - Left Side */}
			<div className="relative overflow-hidden rounded-l-xl w-20 sm:w-30 shrink-0 bg-muted">
				<ServiceImage
					src={image}
					alt={name}
					sizes="96px"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

				{/* Badges on image - stacked */}
				<div className="absolute top-1.5 left-1.5 flex flex-col items-start gap-1">
					{hasDiscount && (
						<span className="bg-danger text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
							{service.discountType === "percent"
								? `${service.discountAmount}% OFF`
								: `৳${service.discountAmount} OFF`}
						</span>
					)}
					{category && (
						<span className="bg-card/90 backdrop-blur-sm text-foreground text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 rounded-full shadow-sm border border-border/50">
							{category}
						</span>
					)}
				</div>
			</div>

			{/* Content - Right Side */}
			<div className="flex flex-col justify-between flex-1 p-2 min-w-0">
				<div className="space-y-1">
					<h3 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
						{name}
					</h3>

					<p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
						{shortDescription}
					</p>

					{vendors.length > 0 && (
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								{vendors.slice(0, 3).map((vendor, i) => (
									<div
										key={vendor.name}
										className="relative w-4 h-4 rounded-full overflow-hidden border-2 border-card bg-muted"
										style={{
											marginLeft: i > 0 ? "-5px" : 0,
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
											sizes="16px"
											className="object-cover"
										/>
									</div>
								))}
								{vendors.length > 3 && (
									<div className="relative w-4 h-4 rounded-full overflow-hidden border-2 border-card bg-muted -ml-1.5 z-0">
										<span className="absolute inset-0 flex items-center justify-center text-[7px] font-semibold text-muted-foreground">
											+{vendors.length - 3}
										</span>
									</div>
								)}
							</div>

							{avgRating > 1 && (
								<span className="flex items-center gap-0.5 text-[9px] font-medium text-warning">
									<Star className="w-2.5 h-2.5 fill-current" />
									{avgRating.toFixed(1)}
								</span>
							)}
						</div>
					)}
				</div>

				{/* Price + CTA */}
				<div className="flex items-end justify-between pt-1.5 mt-1 border-t border-border">
					<div>
						<p className="text-[9px] text-muted-foreground leading-none mb-0.5">
							Starts from
						</p>
						<div className="flex items-baseline gap-1">
							<span className="text-sm font-bold text-foreground">
								৳{finalPrice.toLocaleString()}
							</span>
							{hasDiscount && (
								<span className="text-[10px] text-muted-foreground line-through">
									৳{service.basePrice.toLocaleString()}
								</span>
							)}
						</div>
					</div>

					<Button size="xs" className="rounded-md text-[10px]">
						Book Now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Horizontal;

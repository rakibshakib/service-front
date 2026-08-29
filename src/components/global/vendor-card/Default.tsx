"use client";

import { Button } from "@/components/ui/button";
import {
	Building2,
	CheckCircle2,
	ChevronRight,
	Heart,
	MapPin,
	Star,
	Zap,
} from "lucide-react";
import type { VendorCardProps } from "./types";

const Default = ({
	vendor,
	isFav = false,
	toggleFavorite,
}: VendorCardProps) => {
	return (
		<div className="group relative flex flex-col h-full rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
			{/* Cover */}
			<div
				className={`relative h-24 sm:h-28 bg-linear-to-br ${vendor.coverBg} overflow-hidden`}
			>
				<div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[8px_8px]" />
				<Building2 className="absolute -right-4 -bottom-4 w-20 h-20 text-white/10 pointer-events-none" />

				{/* Response Time Badge */}
				<span className="absolute top-2.5 left-2.5 z-10 bg-black/40 backdrop-blur-md text-accent text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
					<Zap className="w-3 h-3 fill-accent" />
					{vendor.responseTime}
				</span>

				{/* Favorite Button */}
				{toggleFavorite && (
					<button
						onClick={(e) => toggleFavorite(vendor.id, e)}
						className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
							isFav
								? "bg-danger text-white shadow-md scale-110"
								: "bg-black/25 text-white hover:bg-black/40"
						}`}
					>
						<Heart
							className={`w-3.5 h-3.5 ${isFav ? "fill-white" : ""}`}
						/>
					</button>
				)}
			</div>

			{/* Content */}
			<div className="flex-1 px-4 pb-4 relative">
				{/* Logo + Rating */}
				<div className="flex justify-between items-end -mt-7 mb-2.5">
					<div className="relative">
						<div
							className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${vendor.logoBg} border-[3px] border-card font-black text-sm sm:text-lg flex items-center justify-center shadow-md transition-transform group-hover:scale-105`}
						>
							{vendor.avatar}
						</div>
						{vendor.isOnline && (
							<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent border-2 border-card rounded-full" />
						)}
					</div>

					{vendor?.rating > 1 && (
						<span className="flex items-center gap-0.5 text-[10px] font-medium text-warning">
							<Star className="w-3 h-3 fill-current" />
							{vendor.rating?.toFixed(1)}
						</span>
					)}
				</div>

				{/* Name + Verified */}
				<div className="flex items-center gap-1.5">
					<h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
						{vendor.name}
					</h3>
					<CheckCircle2 className="w-3.5 h-3.5 text-info shrink-0 fill-info/10" />
				</div>

				{/* Location + Jobs */}
				<div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
					<span className="flex items-center gap-1 truncate">
						<MapPin className="w-3 h-3 text-primary shrink-0" />
						{vendor.location}
					</span>
					<span className="text-border">·</span>
				</div>

				{/* Skills */}
				{vendor.skills.length > 0 && (
					<div className="mt-2.5 flex flex-wrap gap-1">
						{vendor.skills.slice(0, 3).map((skill, i) => (
							<span
								key={i}
								className="bg-muted text-muted-foreground text-[9px] font-medium px-1.5 py-0.5 rounded border border-border"
							>
								{skill}
							</span>
						))}
						{vendor.skills.length > 3 && (
							<span className="text-[9px] text-muted-foreground font-medium px-1">
								+{vendor.skills.length - 3}
							</span>
						)}
					</div>
				)}
			</div>

			{/* Actions */}
			<div className="px-4 pb-4 flex items-center gap-2">
				<Button size="xs" className="flex-1 rounded-lg text-[11px]">
					View Profile
					<ChevronRight className="w-3 h-3" />
				</Button>
			</div>
		</div>
	);
};

export default Default;

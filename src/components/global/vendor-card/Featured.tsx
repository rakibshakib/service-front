"use client";

import { MapPin, Sparkles, Star, TrendingUp } from "lucide-react";
import type { VendorCardComputed } from "./types";

const Featured = ({ vendor }: { vendor: VendorCardComputed }) => {
	return (
		<div className="group relative flex gap-3.5 items-start rounded-2xl border border-border bg-card text-card-foreground p-3.5 shadow-sm hover:shadow-md transition-all duration-300 h-full">
			{/* Avatar */}
			<div className="relative shrink-0">
				<div
					className={`w-14 h-14 rounded-xl ${vendor.logoBg} font-black text-base flex items-center justify-center shadow-md transition-transform group-hover:scale-105`}
				>
					{vendor.avatar}
				</div>
				{vendor.isOnline && (
					<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent border-2 border-card rounded-full" />
				)}
			</div>

			{/* Info */}
			<div className="flex-1 min-w-0">
				{/* Name + Joined */}
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
						{vendor.name}
					</h3>
					{vendor.joined && (
						<span className="shrink-0 flex items-center gap-0.5 text-[9px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
							<TrendingUp className="w-2.5 h-2.5 text-secondary" />
							{vendor.joined}
						</span>
					)}
				</div>

				{/* Location */}
				<p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
					<MapPin className="w-3 h-3 text-primary shrink-0" />
					<span className="truncate">{vendor.location}</span>
				</p>

				{/* Discount + Rating Row */}
				<div className="flex items-center justify-between gap-2 mt-2">
					{vendor.introDiscount && (
						<div className="inline-flex items-center gap-1 bg-accent/10 border border-accent/25 rounded-lg px-2 py-0.5">
							<Sparkles className="w-3 h-3 text-warning shrink-0" />
							<span className="text-[10px] font-bold text-accent leading-none">
								{vendor.introDiscount}
							</span>
						</div>
					)}
					{vendor.rating > 1 && (
						<span className="flex items-center gap-0.5 text-[10px] font-bold text-warning">
							<Star className="w-3 h-3 fill-warning" />
							{vendor.rating.toFixed(1)}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Featured;

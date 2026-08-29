"use client";

import { Plus, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const discounts = [
	{ id: 1, name: "15% OFF First Order", type: "percent", value: 15, minBooking: "৳500", status: "Active", expires: "Sep 15, 2026" },
	{ id: 2, name: "৳200 OFF AC Service", type: "flat", value: 200, minBooking: "৳800", status: "Active", expires: "Sep 10, 2026" },
	{ id: 3, name: "Free Inspection", type: "flat", value: 0, minBooking: "Any", status: "Expired", expires: "Aug 20, 2026" },
];

export default function VendorDiscountsPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<Percent className="w-3.5 h-3.5" />
						<span>My Discounts</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">Discount Offers</h1>
				</div>
				<Button size="sm"><Plus className="w-3.5 h-3.5 mr-1" /> Create Discount</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{discounts.map((d) => (
					<div key={d.id} className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:border-primary/50 transition-all">
						<div className="flex items-center justify-between mb-3">
							<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${d.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{d.status}</span>
							<span className="text-[10px] text-muted-foreground">Exp: {d.expires}</span>
						</div>
						<h3 className="font-extrabold text-foreground">{d.name}</h3>
						<p className="text-xs text-muted-foreground mt-1">Min booking: {d.minBooking}</p>
						<div className="flex gap-2 mt-4">
							<Button size="xs" variant="outline" className="flex-1">Edit</Button>
							<Button size="xs" variant="destructive" className="flex-1">Delete</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

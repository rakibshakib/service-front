"use client";

import { Package, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
	{ id: 1, name: "AC Deep Servicing", price: "৳1,200", category: "Appliance", rating: 4.9, bookings: 120, status: "Active" },
	{ id: 2, name: "AC Gas Refill", price: "৳600", category: "Appliance", rating: 4.8, bookings: 85, status: "Active" },
	{ id: 3, name: "Sofa Steam Clean", price: "৳800", category: "Cleaning", rating: 4.7, bookings: 45, status: "Active" },
	{ id: 4, name: "Window AC Jet Wash", price: "৳900", category: "Appliance", rating: 4.9, bookings: 60, status: "Draft" },
];

export default function VendorServicesPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<Package className="w-3.5 h-3.5" />
						<span>My Services</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">Service Packages</h1>
				</div>
				<Button size="sm"><Plus className="w-3.5 h-3.5 mr-1" /> Add Service</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{services.map((s) => (
					<div key={s.id} className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:border-primary/50 transition-all">
						<div className="flex items-center justify-between mb-3">
							<span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{s.category}</span>
							<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"}`}>{s.status}</span>
						</div>
						<h3 className="font-extrabold text-foreground">{s.name}</h3>
						<div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
							<span className="font-black text-foreground text-sm">{s.price}</span>
							<span className="flex items-center gap-1 font-bold text-amber-500"><Star className="w-3 h-3 fill-amber-400" />{s.rating}</span>
						</div>
						<p className="text-[10px] text-muted-foreground mt-2">{s.bookings} total bookings</p>
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

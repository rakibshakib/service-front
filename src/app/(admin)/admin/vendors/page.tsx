"use client";

import { Building2, Search, Star } from "lucide-react";

const vendors = [
	{ id: "VN-501", name: "CleanCo Official", owner: "Kamrul Islam", category: "Cleaning", rating: 4.9, jobs: 1420, status: "Active" },
	{ id: "VN-502", name: "FixIt Master", owner: "Asif Rahman", category: "Electrical", rating: 4.8, jobs: 980, status: "Active" },
	{ id: "VN-503", name: "Electro Care BD", owner: "Mahfuz Ahmed", category: "Appliance", rating: 4.7, jobs: 650, status: "Active" },
	{ id: "VN-504", name: "Green Spark Electric", owner: "Sabbir Hossain", category: "Solar", rating: 4.9, jobs: 24, status: "Pending" },
];

export default function AdminVendorsPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<Building2 className="w-3.5 h-3.5" />
						<span>Vendor Management</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">All Vendors</h1>
				</div>
				<div className="relative">
					<Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
					<input type="text" placeholder="Search vendors..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary" />
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{vendors.map((v) => (
					<div key={v.id} className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:border-primary/50 transition-all">
						<div className="flex items-center gap-3 mb-3">
							<div className="w-11 h-11 rounded-xl bg-primary text-primary-foreground font-black text-sm flex items-center justify-center">{v.name.charAt(0)}</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-extrabold text-foreground text-sm truncate">{v.name}</h3>
								<p className="text-[10px] text-muted-foreground">{v.owner}</p>
							</div>
							<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${v.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{v.status}</span>
						</div>
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span>{v.category}</span>
							<span className="flex items-center gap-1 font-bold text-amber-500"><Star className="w-3 h-3 fill-amber-400" />{v.rating}</span>
							<span>{v.jobs} jobs</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

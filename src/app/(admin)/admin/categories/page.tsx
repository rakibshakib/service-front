"use client";

import { Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
	{ id: 1, name: "Cleaning", count: 120, status: "Active" },
	{ id: 2, name: "Electrical", count: 85, status: "Active" },
	{ id: 3, name: "Plumbing", count: 64, status: "Active" },
	{ id: 4, name: "Appliance", count: 95, status: "Active" },
	{ id: 5, name: "Painting", count: 42, status: "Active" },
	{ id: 6, name: "Car Wash", count: 50, status: "Active" },
];

export default function AdminCategoriesPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<Tag className="w-3.5 h-3.5" />
						<span>Service Categories</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">Manage Categories</h1>
				</div>
				<Button size="sm"><Plus className="w-3.5 h-3.5 mr-1" /> Add Category</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{categories.map((cat) => (
					<div key={cat.id} className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:border-primary/50 transition-all">
						<div className="flex items-center justify-between mb-3">
							<h3 className="font-extrabold text-foreground">{cat.name}</h3>
							<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">{cat.status}</span>
						</div>
						<p className="text-xs text-muted-foreground">{cat.count} services</p>
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

"use client";

import { Search, UserCheck } from "lucide-react";

const customers = [
	{ id: "CU-201", name: "Tanvir Hossain", phone: "+880 1711-223344", bookings: 12, spent: "৳14,400", joined: "Jan 2026" },
	{ id: "CU-202", name: "Nusrat Jahan", phone: "+880 1819-556677", bookings: 8, spent: "৳20,000", joined: "Mar 2026" },
	{ id: "CU-203", name: "Rahim Chowdhury", phone: "+880 1912-998811", bookings: 5, spent: "৳3,250", joined: "Jun 2026" },
	{ id: "CU-204", name: "Farhana Islam", phone: "+880 1515-887766", bookings: 15, spent: "৳12,000", joined: "Feb 2026" },
];

export default function AdminCustomersPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<UserCheck className="w-3.5 h-3.5" />
						<span>Customer Directory</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">All Customers</h1>
				</div>
				<div className="relative">
					<Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
					<input type="text" placeholder="Search customers..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary" />
				</div>
			</div>

			<div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-xs">
						<thead className="bg-muted/50 border-y border-border text-muted-foreground uppercase font-extrabold tracking-wider">
							<tr>
								<th className="py-3 px-4">ID</th>
								<th className="py-3 px-4">Name</th>
								<th className="py-3 px-4">Phone</th>
								<th className="py-3 px-4">Bookings</th>
								<th className="py-3 px-4">Total Spent</th>
								<th className="py-3 px-4">Joined</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{customers.map((c) => (
								<tr key={c.id} className="hover:bg-muted/30 transition-colors">
									<td className="py-3 px-4 font-black text-primary">{c.id}</td>
									<td className="py-3 px-4 font-bold text-foreground">{c.name}</td>
									<td className="py-3 px-4 text-muted-foreground">{c.phone}</td>
									<td className="py-3 px-4 text-foreground">{c.bookings}</td>
									<td className="py-3 px-4 font-black text-foreground">{c.spent}</td>
									<td className="py-3 px-4 text-muted-foreground">{c.joined}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

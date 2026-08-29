"use client";

import { CalendarCheck, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const bookings = [
	{ id: "BK-1089", customer: "Tanvir Hossain", service: "AC Deep Servicing", vendor: "Electro Care BD", date: "Aug 30, 10:30 AM", amount: "৳1,200", status: "In Progress" },
	{ id: "BK-1088", customer: "Nusrat Jahan", service: "Home Cleaning", vendor: "CleanCo", date: "Aug 30, 2:00 PM", amount: "৳2,500", status: "Pending" },
	{ id: "BK-1087", customer: "Rahim Chowdhury", service: "Pipe Repair", vendor: "Speedy Plumbers", date: "Aug 29, 11:00 AM", amount: "৳650", status: "Completed" },
	{ id: "BK-1086", customer: "Shakib Al Hasan", service: "Wiring Fix", vendor: "FixIt Master", date: "Aug 29, 4:30 PM", amount: "৳500", status: "Completed" },
	{ id: "BK-1085", customer: "Farhana Islam", service: "Sofa Steam Clean", vendor: "CleanCo", date: "Aug 28, 9:00 AM", amount: "৳800", status: "Cancelled" },
];

export default function AdminBookingsPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<CalendarCheck className="w-3.5 h-3.5" />
						<span>Order Management</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">All Bookings</h1>
				</div>
				<div className="flex items-center gap-2">
					<div className="relative">
						<Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
						<input type="text" placeholder="Search bookings..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary" />
					</div>
					<Button size="sm" variant="outline"><Filter className="w-3.5 h-3.5 mr-1" /> Filter</Button>
				</div>
			</div>

			<div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-xs">
						<thead className="bg-muted/50 border-y border-border text-muted-foreground uppercase font-extrabold tracking-wider">
							<tr>
								<th className="py-3 px-4">ID</th>
								<th className="py-3 px-4">Customer</th>
								<th className="py-3 px-4">Service</th>
								<th className="py-3 px-4">Vendor</th>
								<th className="py-3 px-4">Date</th>
								<th className="py-3 px-4">Amount</th>
								<th className="py-3 px-4">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{bookings.map((b) => (
								<tr key={b.id} className="hover:bg-muted/30 transition-colors">
									<td className="py-3 px-4 font-black text-primary">{b.id}</td>
									<td className="py-3 px-4 font-bold text-foreground">{b.customer}</td>
									<td className="py-3 px-4 text-foreground">{b.service}</td>
									<td className="py-3 px-4 text-muted-foreground">{b.vendor}</td>
									<td className="py-3 px-4 text-muted-foreground">{b.date}</td>
									<td className="py-3 px-4 font-black text-foreground">{b.amount}</td>
									<td className="py-3 px-4">
										<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.status === "Completed" ? "bg-emerald-50 text-emerald-700" : b.status === "In Progress" ? "bg-blue-50 text-blue-700" : b.status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}>{b.status}</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

"use client";

import { CalendarCheck, Search } from "lucide-react";

const bookings = [
	{ id: "BK-1089", customer: "Tanvir Hossain", service: "AC Deep Servicing", date: "Aug 30, 10:30 AM", amount: "৳1,200", status: "In Progress" },
	{ id: "BK-1085", customer: "Farhana Islam", service: "Sofa Steam Clean", date: "Aug 28, 9:00 AM", amount: "৳800", status: "Completed" },
	{ id: "BK-1082", customer: "Karim Ahmed", service: "AC Gas Refill", date: "Aug 27, 2:00 PM", amount: "৳600", status: "Completed" },
];

export default function VendorBookingsPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<CalendarCheck className="w-3.5 h-3.5" />
						<span>My Orders</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">Bookings</h1>
				</div>
				<div className="relative">
					<Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
					<input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary" />
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
									<td className="py-3 px-4 text-muted-foreground">{b.date}</td>
									<td className="py-3 px-4 font-black text-foreground">{b.amount}</td>
									<td className="py-3 px-4">
										<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>{b.status}</span>
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

"use client";

import {
	CalendarCheck,
	CheckCircle2,
	DollarSign,
	Star,
	TrendingUp,
} from "lucide-react";

const stats = [
	{
		title: "My Earnings",
		value: "৳3,55,000",
		change: "+18.4%",
		icon: DollarSign,
		color: "text-emerald-600",
		bg: "bg-emerald-50",
	},
	{
		title: "Total Bookings",
		value: "486",
		change: "+12.1%",
		icon: CalendarCheck,
		color: "text-blue-600",
		bg: "bg-blue-50",
	},
	{
		title: "Completed",
		value: "412",
		change: "+5.2%",
		icon: CheckCircle2,
		color: "text-emerald-600",
		bg: "bg-emerald-50",
	},
	{
		title: "Avg Rating",
		value: "4.9 ★",
		change: "+0.2",
		icon: Star,
		color: "text-amber-500",
		bg: "bg-amber-50",
	},
];

export default function VendorPage() {
	return (
		<div className="space-y-6">
			<div>
				<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
					<TrendingUp className="w-3.5 h-3.5" />
					<span>Vendor Performance</span>
				</div>
				<h1 className="text-2xl font-black text-foreground mt-1">
					Vendor Dashboard
				</h1>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.title}
							className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-3"
						>
							<div className="flex justify-between items-start">
								<span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
									{stat.title}
								</span>
								<div className={`p-2.5 rounded-xl ${stat.bg}`}>
									<Icon className={`w-4 h-4 ${stat.color}`} />
								</div>
							</div>
							<div>
								<div className="text-2xl font-black text-foreground">
									{stat.value}
								</div>
								<div className="flex items-center gap-2 mt-1">
									<span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
										<TrendingUp className="w-3 h-3" />
										{stat.change}
									</span>
									<span className="text-[11px] text-muted-foreground">
										vs last month
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="bg-card rounded-2xl border border-border shadow-sm p-6">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h3 className="font-extrabold text-foreground">
							My Recent Orders
						</h3>
						<p className="text-xs text-muted-foreground mt-0.5">
							Your latest service bookings
						</p>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left text-xs">
						<thead className="bg-muted/50 border-y border-border text-muted-foreground uppercase font-extrabold tracking-wider">
							<tr>
								<th className="py-3 px-4">ID</th>
								<th className="py-3 px-4">Customer</th>
								<th className="py-3 px-4">Service</th>
								<th className="py-3 px-4">Schedule</th>
								<th className="py-3 px-4">Amount</th>
								<th className="py-3 px-4">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{[
								{
									id: "BK-1089",
									customer: "Tanvir Hossain",
									service: "AC Deep Servicing",
									schedule: "Aug 30, 10:30 AM",
									amount: "৳1,200",
									status: "In Progress",
								},
								{
									id: "BK-1085",
									customer: "Farhana Islam",
									service: "Sofa Steam Clean",
									schedule: "Aug 28, 9:00 AM",
									amount: "৳800",
									status: "Completed",
								},
								{
									id: "BK-1082",
									customer: "Karim Ahmed",
									service: "AC Gas Refill",
									schedule: "Aug 27, 2:00 PM",
									amount: "৳600",
									status: "Completed",
								},
							].map((booking) => (
								<tr
									key={booking.id}
									className="hover:bg-muted/30 transition-colors"
								>
									<td className="py-3 px-4 font-black text-primary">
										{booking.id}
									</td>
									<td className="py-3 px-4 font-bold text-foreground">
										{booking.customer}
									</td>
									<td className="py-3 px-4 text-foreground">
										{booking.service}
									</td>
									<td className="py-3 px-4 text-muted-foreground">
										{booking.schedule}
									</td>
									<td className="py-3 px-4 font-black text-foreground">
										{booking.amount}
									</td>
									<td className="py-3 px-4">
										<span
											className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
												booking.status === "Completed"
													? "bg-emerald-50 text-emerald-700"
													: "bg-blue-50 text-blue-700"
											}`}
										>
											{booking.status}
										</span>
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

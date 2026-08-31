"use client";

import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { VENDOR_STATUS, type VendorStatus } from "@/lib/api/vendor";
import { useUpdateVendor, useVendors } from "@/lib/api/vendor/hooks";
import { Building2, Loader2, Search, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const statusColors: Record<VendorStatus, string> = {
	PENDING: "bg-amber-50 text-amber-700 border-amber-200",
	APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
	REJECTED: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminVendorsPage() {
	const [search, setSearch] = useState("");
	const { data: vendors = [], isLoading } = useVendors();
	const { mutate: updateVendor, isPending } = useUpdateVendor();

	const filteredVendors = vendors.filter(
		(v) =>
			v.businessName.toLowerCase().includes(search.toLowerCase()) ||
			v.name.toLowerCase().includes(search.toLowerCase()),
	);

	const handleStatusChange = (userId: number, status: VendorStatus) => {
		updateVendor({ userId, data: { status } });
	};

	const handleActiveToggle = (userId: number, isActive: boolean) => {
		updateVendor({ userId, data: { isActive } });
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<Building2 className="w-3.5 h-3.5" />
						<span>Vendor Management</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">
						All Vendors
					</h1>
				</div>
				<div className="relative">
					<Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search vendors..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center py-20">
					<Loader2 className="w-6 h-6 text-primary animate-spin" />
				</div>
			) : (
				<div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/50">
								<TableHead className="font-bold text-foreground">
									Vendor
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Phone
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Address
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Rating
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Response
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Status
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Active
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredVendors.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7} className="text-center py-10">
										<p className="text-sm text-muted-foreground">
											No vendors found
										</p>
									</TableCell>
								</TableRow>
							) : (
								filteredVendors.map((vendor) => (
									<TableRow
										key={vendor.userId}
										className="hover:bg-muted/30"
									>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="relative w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center overflow-hidden">
													<Image
														src={
															vendor.logoUrl ||
															`https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.businessName)}&background=12544F&color=fff&bold=true`
														}
														alt={vendor.businessName}
														fill
														sizes="36px"
														className="object-cover"
													/>
												</div>
												<div className="min-w-0">
													<p className="text-sm font-bold text-foreground truncate">
														{vendor.businessName}
													</p>
													<p className="text-[11px] text-muted-foreground">
														{vendor.name}
													</p>
												</div>
											</div>
										</TableCell>
										<TableCell className="text-xs text-muted-foreground">
											{vendor.phone}
										</TableCell>
										<TableCell className="text-xs text-muted-foreground max-w-37.5 truncate">
											{vendor.address}
										</TableCell>
										<TableCell>
											<span className="flex items-center gap-1 text-xs font-bold text-amber-500">
												<Star className="w-3 h-3 fill-amber-400" />
												{Number(vendor.rating) || "0.0"}
											</span>
										</TableCell>
										<TableCell className="text-xs text-muted-foreground">
											{vendor.responseTime}
										</TableCell>
										<TableCell>
											<Select
												value={vendor.status}
												onValueChange={(value) =>
													handleStatusChange(
														vendor.userId,
														value as VendorStatus,
													)
												}
												disabled={isPending}
											>
												<SelectTrigger className="w-30 h-8 text-[11px] font-bold border-0 bg-transparent focus:ring-0">
													<SelectValue>
														<Badge
															variant="outline"
															className={`${statusColors[vendor.status]} border font-bold text-[10px] px-2 py-0.5`}
														>
															{vendor.status}
														</Badge>
													</SelectValue>
												</SelectTrigger>
												<SelectContent>
													{Object.values(VENDOR_STATUS).map(
														(status) => (
															<SelectItem
																key={status}
																value={status}
																className="text-xs font-bold"
															>
																<Badge
																	variant="outline"
																	className={`${statusColors[status]} border font-bold text-[10px] px-2 py-0.5`}
																>
																	{status}
																</Badge>
															</SelectItem>
														),
													)}
												</SelectContent>
											</Select>
										</TableCell>
										<TableCell>
											<Switch
												checked={vendor.isActive}
												onCheckedChange={(checked) =>
													handleActiveToggle(
														vendor.userId,
														checked,
													)
												}
												disabled={isPending}
											/>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}

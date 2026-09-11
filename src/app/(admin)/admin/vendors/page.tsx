"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
	useUpdateVendorStatus,
	useUpdateVendorApproval,
	useVendors,
} from "@/lib/api/vendor/hooks";
import {
	AlertTriangle,
	Building2,
	ChevronLeft,
	ChevronRight,
	Eye,
	Loader2,
	Mail,
	Phone,
	Search,
	Star,
	Users,
} from "lucide-react";
import Image from "next/image";

const statusColors: Record<VendorStatus, string> = {
	PENDING: "bg-amber-50 text-amber-700 border-amber-200",
	APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
	REJECTED: "bg-red-50 text-red-700 border-red-200",
};

const statusDotColors: Record<VendorStatus, string> = {
	PENDING: "bg-amber-500",
	APPROVED: "bg-emerald-500",
	REJECTED: "bg-red-500",
};

const PAGE_SIZE = 10;

interface PendingAction {
	type: "status" | "active";
	vendorId: number;
	vendorName: string;
	status?: VendorStatus;
	isActive?: boolean;
}

export default function AdminVendorsPage() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);
	const [updatingActiveId, setUpdatingActiveId] = useState<number | null>(null);
	const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

	const { data, isLoading } = useVendors({ page, limit: PAGE_SIZE });
	const { mutate: updateStatus } = useUpdateVendorStatus();
	const { mutate: updateApproval } = useUpdateVendorApproval();

	const vendors = data?.data ?? [];
	const meta = data?.meta;

	const handleStatusChange = (userId: number, status: VendorStatus) => {
		setUpdatingStatusId(userId);
		updateApproval(
			{ id: userId, data: { status } },
			{
				onSuccess: () => toast.success(`Status changed to ${status}`),
				onError: (error: { message?: string }) =>
					toast.error(error?.message || "Failed to update status"),
				onSettled: () => setUpdatingStatusId(null),
			},
		);
	};

	const handleActiveToggle = (userId: number, isActive: boolean) => {
		setUpdatingActiveId(userId);
		updateStatus(
			{ id: userId, data: { isActive } },
			{
				onSuccess: () =>
					toast.success(isActive ? "Vendor activated" : "Vendor deactivated"),
				onError: (error: { message?: string }) =>
					toast.error(error?.message || "Failed to update active status"),
				onSettled: () => setUpdatingActiveId(null),
			},
		);
	};

	const handleRowClick = (userId: number) => {
		router.push(`/admin/vendors/${userId}`);
	};

	const confirmAction = () => {
		if (!pendingAction) return;
		if (pendingAction.type === "status" && pendingAction.status) {
			handleStatusChange(pendingAction.vendorId, pendingAction.status);
		} else if (pendingAction.type === "active" && pendingAction.isActive !== undefined) {
			handleActiveToggle(pendingAction.vendorId, pendingAction.isActive);
		}
		setPendingAction(null);
	};

	const totalVendors = meta?.total ?? vendors.length;
	const approvedCount = vendors.filter((v) => v.status === "APPROVED").length;
	const pendingCount = vendors.filter((v) => v.status === "PENDING").length;

	return (
		<div className="space-y-5">
			{/* Confirmation Dialog */}
			<AlertDialog
				open={!!pendingAction}
				onOpenChange={(open) => {
					if (!open) setPendingAction(null);
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
							<AlertTriangle className="w-6 h-6 text-destructive" />
						</div>
						<AlertDialogTitle className="text-center">
							Confirm {pendingAction?.type === "status" ? "Status Change" : "Active Toggle"}
						</AlertDialogTitle>
						<AlertDialogDescription className="text-center">
							{pendingAction?.type === "status" ? (
								<>
									Are you sure you want to change <span className="font-bold text-foreground">{pendingAction?.vendorName}</span>&apos;s status to{" "}
									<span className="font-bold text-foreground">{pendingAction?.status}</span>?
								</>
							) : (
								<>
									Are you sure you want to {pendingAction?.isActive ? "activate" : "deactivate"} <span className="font-bold text-foreground">{pendingAction?.vendorName}</span>?
								</>
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={confirmAction}
							className={
								pendingAction?.type === "active" && pendingAction?.isActive === false
									? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
									: ""
							}
						>
							{pendingAction?.type === "status" ? "Change Status" : pendingAction?.isActive ? "Activate" : "Deactivate"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Header */}
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
						className="w-56 pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				<div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
						<Users className="w-5 h-5 text-primary" />
					</div>
					<div>
						<p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
							Total
						</p>
						<p className="text-xl font-black text-foreground">{totalVendors}</p>
					</div>
				</div>
				<div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
						<div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
					</div>
					<div>
						<p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
							Approved
						</p>
						<p className="text-xl font-black text-foreground">{approvedCount}</p>
					</div>
				</div>
				<div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
						<div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
					</div>
					<div>
						<p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
							Pending
						</p>
						<p className="text-xl font-black text-foreground">{pendingCount}</p>
					</div>
				</div>
			</div>

			{/* Table */}
			{isLoading ? (
				<div className="flex items-center justify-center py-20">
					<Loader2 className="w-6 h-6 text-primary animate-spin" />
				</div>
			) : (
				<div className="bg-card rounded-2xl border border-border shadow-sm overflow-x-auto">
					<Table className="min-w-[900px]">
						<TableHeader>
							<TableRow className="bg-muted/50">
								<TableHead className="font-bold text-foreground w-[300px]">
									Vendor
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Contact
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Address
								</TableHead>
								<TableHead className="font-bold text-foreground text-center">
									Rating
								</TableHead>
								<TableHead className="font-bold text-foreground w-[150px]">
									Status
								</TableHead>
								<TableHead className="font-bold text-foreground text-center w-[80px]">
									Active
								</TableHead>
								<TableHead className="font-bold text-foreground text-center w-[60px]">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{vendors.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7} className="text-center py-16">
										<div className="flex flex-col items-center gap-2">
											<Building2 className="w-10 h-10 text-muted-foreground/40" />
											<p className="text-sm font-bold text-muted-foreground">
												No vendors found
											</p>
											<p className="text-xs text-muted-foreground/60">
												Try adjusting your search or filters
											</p>
										</div>
									</TableCell>
								</TableRow>
							) : (
								vendors.map((vendor) => {
									const isStatusUpdating = updatingStatusId === vendor.userId;
									const isActiveUpdating = updatingActiveId === vendor.userId;
									return (
										<TableRow
											key={vendor.userId}
											className="hover:bg-muted/30 cursor-pointer group"
											onClick={() => handleRowClick(vendor.userId)}
										>
											<TableCell>
												<div className="flex items-center gap-3">
													<div className="relative w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center overflow-hidden shrink-0 ring-2 ring-background">
														<Image
															src={
																vendor.logoUrl ||
																`https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.businessName)}&background=12544F&color=fff&bold=true`
															}
															alt={vendor.businessName}
															fill
															sizes="40px"
															className="object-cover"
														/>
													</div>
													<div className="min-w-0">
														<p className="text-sm font-bold text-foreground truncate max-w-[180px]">
															{vendor.businessName}
														</p>
														<p className="text-xs text-muted-foreground truncate max-w-[180px]">
															{vendor.name}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex flex-col gap-0.5">
													{vendor.phone && (
														<span className="flex items-center gap-1.5 text-xs text-foreground">
															<Phone className="w-3 h-3 text-muted-foreground" />
															{vendor.phone}
														</span>
													)}
													{vendor.email && (
														<span className="flex items-center gap-1.5 text-xs text-muted-foreground truncate max-w-[160px]">
															<Mail className="w-3 h-3 shrink-0" />
															{vendor.email}
														</span>
													)}
													{!vendor.phone && !vendor.email && (
														<span className="text-xs text-muted-foreground/50">
															-
														</span>
													)}
												</div>
											</TableCell>
											<TableCell className="text-xs text-muted-foreground max-w-[140px] truncate">
												{vendor.address || "-"}
											</TableCell>
											<TableCell onClick={(e) => e.stopPropagation()}>
												<div className="flex items-center justify-center gap-1">
													<Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
													<span className="text-sm font-black text-foreground">
														{Number(vendor.rating) || "0.0"}
													</span>
												</div>
											</TableCell>
											<TableCell onClick={(e) => e.stopPropagation()}>
												<Select
													value={vendor.status}
													onValueChange={(value) =>
														setPendingAction({
															type: "status",
															vendorId: vendor.userId,
															vendorName: vendor.businessName,
															status: value as VendorStatus,
														})
													}
													disabled={isStatusUpdating}
												>
												<SelectTrigger className="w-full h-8 text-[11px] font-bold border-0 bg-transparent focus:ring-0">
													<SelectValue>
														{isStatusUpdating ? (
															<Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
														) : (
															<div className="flex items-center gap-1.5">
																<div
																	className={`w-2 h-2 rounded-full shrink-0 ${statusDotColors[vendor.status]}`}
																/>
																<Badge
																	variant="outline"
																	className={`${statusColors[vendor.status]} border font-bold text-[10px] px-2 py-0.5 whitespace-nowrap`}
																>
																	{vendor.status}
																</Badge>
															</div>
														)}
													</SelectValue>
												</SelectTrigger>
													<SelectContent>
														{Object.values(VENDOR_STATUS).map((status) => (
															<SelectItem
																key={status}
																value={status}
																className="text-xs font-bold"
															>
																<div className="flex items-center gap-2">
																	<div
																		className={`w-2 h-2 rounded-full ${statusDotColors[status]}`}
																	/>
																	{status}
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</TableCell>
											<TableCell onClick={(e) => e.stopPropagation()}>
												<div className="flex items-center justify-center">
													{isActiveUpdating ? (
														<Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
													) : (
														<Switch
															checked={vendor.isActive}
															onCheckedChange={(checked) =>
																setPendingAction({
																	type: "active",
																	vendorId: vendor.userId,
																	vendorName: vendor.businessName,
																	isActive: checked,
																})
															}
														/>
													)}
												</div>
											</TableCell>
											<TableCell onClick={(e) => e.stopPropagation()}>
												<div className="flex items-center justify-center">
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleRowClick(vendor.userId)}
														className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
													>
														<Eye className="w-4 h-4 text-muted-foreground" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>

					{/* Pagination */}
					{meta && meta.totalPages > 1 && (
						<div className="flex items-center justify-between px-4 py-3 border-t border-border">
							<p className="text-xs text-muted-foreground">
								Showing{" "}
								<span className="font-bold text-foreground">
									{(meta.page - 1) * meta.limit + 1}
								</span>{" "}
								to{" "}
								<span className="font-bold text-foreground">
									{Math.min(meta.page * meta.limit, meta.total)}
								</span>{" "}
								of{" "}
								<span className="font-bold text-foreground">{meta.total}</span>{" "}
								vendors
							</p>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									disabled={page === 1}
									className="h-8 px-3 text-xs font-bold"
								>
									<ChevronLeft className="w-3.5 h-3.5 mr-1" />
									Previous
								</Button>
								<div className="flex items-center gap-1">
									{Array.from({ length: meta.totalPages }, (_, i) => i + 1)
										.filter(
											(p) =>
												p === 1 ||
												p === meta.totalPages ||
												Math.abs(p - page) <= 1,
										)
										.reduce<(number | "ellipsis")[]>((acc, p, i, arr) => {
											if (i > 0 && p - (arr[i - 1] as number) > 1) {
												acc.push("ellipsis");
											}
											acc.push(p);
											return acc;
										}, [])
										.map((item, i) =>
											item === "ellipsis" ? (
												<span
													key={`ellipsis-${i}`}
													className="px-1 text-muted-foreground"
												>
													...
												</span>
											) : (
												<button
													key={item}
													onClick={() => setPage(item)}
													className={`h-8 min-w-8 px-2 rounded-lg text-xs font-bold transition-colors ${
														page === item
															? "bg-primary text-primary-foreground"
															: "bg-card border border-border text-muted-foreground hover:bg-muted"
													}`}
												>
													{item}
												</button>
											),
										)}
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										setPage((p) => Math.min(meta.totalPages, p + 1))
									}
									disabled={page === meta.totalPages}
									className="h-8 px-3 text-xs font-bold"
								>
									Next
									<ChevronRight className="w-3.5 h-3.5 ml-1" />
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

"use client";

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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useCustomers,
	useUpdateCustomerStatus,
	useDeleteCustomer,
} from "@/lib/api/customer/hooks";
import type { Customer } from "@/lib/api/customer";
import {
	ChevronLeft,
	ChevronRight,
	Loader2,
	Trash2,
	UserCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 10;

interface PendingStatusAction {
	customerId: number;
	customerName: string;
	isActive: boolean;
}

export default function AdminCustomersPage() {
	const [page, setPage] = useState(1);
	const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
	const [pendingStatusAction, setPendingStatusAction] = useState<PendingStatusAction | null>(null);

	const { data, isLoading } = useCustomers({ page, limit: PAGE_SIZE });
	const { mutate: updateStatus, isPending: isStatusUpdating } = useUpdateCustomerStatus();
	const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

	const customers = data?.data ?? [];
	const meta = data?.meta;

	const handleStatusChange = (customerId: number, customerName: string, isActive: boolean) => {
		setPendingStatusAction({ customerId, customerName, isActive });
	};

	const confirmStatusChange = () => {
		if (!pendingStatusAction) return;
		updateStatus(
			{ id: pendingStatusAction.customerId, data: { isActive: pendingStatusAction.isActive } },
			{
				onSuccess: () => {
					toast.success(
						pendingStatusAction.isActive
							? "Customer activated"
							: "Customer deactivated",
					);
				},
				onError: (error: { message?: string }) => {
					toast.error(error?.message || "Failed to update status");
				},
				onSettled: () => setPendingStatusAction(null),
			},
		);
	};

	const handleDelete = () => {
		if (!deletingCustomer) return;
		deleteCustomer(deletingCustomer.userId, {
			onSuccess: () => {
				setDeletingCustomer(null);
				toast.success("Customer deleted successfully");
			},
			onError: (error: { message?: string }) => {
				toast.error(error?.message || "Failed to delete customer");
			},
		});
	};

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
				<div className="flex items-center gap-4 text-xs text-muted-foreground">
					<span>Total: {meta?.total ?? 0}</span>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-card rounded-2xl border border-border shadow-sm p-4">
					<p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Customers</p>
					<p className="text-2xl font-black text-foreground mt-1">{meta?.total ?? 0}</p>
				</div>
				<div className="bg-card rounded-2xl border border-border shadow-sm p-4">
					<p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active</p>
					<p className="text-2xl font-black text-green-600 mt-1">
						{customers.filter((c) => c.isActive).length}
					</p>
				</div>
				<div className="bg-card rounded-2xl border border-border shadow-sm p-4">
					<p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Inactive</p>
					<p className="text-2xl font-black text-destructive mt-1">
						{customers.filter((c) => !c.isActive).length}
					</p>
				</div>
			</div>

			{/* Table */}
			<div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
				{isLoading ? (
					<div className="flex items-center justify-center py-20">
						<Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
					</div>
				) : (
					<div className="overflow-x-auto">
						<Table className="min-w-[800px]">
							<TableHeader>
								<TableRow className="bg-muted/50">
									<TableHead className="text-xs font-extrabold uppercase tracking-wider">Name</TableHead>
									<TableHead className="text-xs font-extrabold uppercase tracking-wider">Email</TableHead>
									<TableHead className="text-xs font-extrabold uppercase tracking-wider">Phone</TableHead>
									<TableHead className="text-xs font-extrabold uppercase tracking-wider">Address</TableHead>
									<TableHead className="text-xs font-extrabold uppercase tracking-wider text-center">Active</TableHead>
									<TableHead className="text-xs font-extrabold uppercase tracking-wider text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{customers.length === 0 ? (
									<TableRow>
										<TableCell colSpan={6} className="text-center py-10 text-muted-foreground text-xs">
											No customers found
										</TableCell>
									</TableRow>
								) : (
									customers.map((customer) => {
										const isStatusUpdatingCustomer = isStatusUpdating && pendingStatusAction?.customerId === customer.userId;
										return (
											<TableRow key={customer.userId} className="hover:bg-muted/30 transition-colors">
												<TableCell className="font-bold text-foreground">
													{customer.name}
												</TableCell>
												<TableCell className="text-muted-foreground">
													{customer.email}
												</TableCell>
												<TableCell className="text-muted-foreground">
													{customer.phone || "N/A"}
												</TableCell>
												<TableCell className="text-muted-foreground max-w-[200px] truncate">
													{customer.address || "N/A"}
												</TableCell>
												<TableCell onClick={(e) => e.stopPropagation()}>
													<div className="flex justify-center">
														{isStatusUpdatingCustomer ? (
															<Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
														) : (
															<Switch
																checked={customer.isActive}
																onCheckedChange={(checked) =>
																	handleStatusChange(customer.userId, customer.name, checked)
																}
															/>
														)}
													</div>
												</TableCell>
												<TableCell>
													<div className="flex items-center justify-end gap-1">
														<Button
															variant="ghost"
															size="icon-sm"
															onClick={() => setDeletingCustomer(customer)}
														>
															<Trash2 className="w-4 h-4 text-destructive" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										);
									})
								)}
							</TableBody>
						</Table>
					</div>
				)}

				{/* Pagination */}
				{meta && meta.totalPages > 1 && (
					<div className="flex items-center justify-between px-4 py-3 border-t border-border">
						<p className="text-xs text-muted-foreground">
							Page {page} of {meta.totalPages}
						</p>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
							>
								<ChevronLeft className="w-4 h-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
								disabled={page === meta.totalPages}
							>
								<ChevronRight className="w-4 h-4" />
							</Button>
						</div>
					</div>
				)}
			</div>

			{/* Status Change Confirmation Dialog */}
			<AlertDialog
				open={!!pendingStatusAction}
				onOpenChange={(open) => !open && setPendingStatusAction(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{pendingStatusAction?.isActive ? "Activate Customer" : "Deactivate Customer"}
						</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to{" "}
							{pendingStatusAction?.isActive ? "activate" : "deactivate"}{" "}
							<span className="font-bold text-foreground">
								{pendingStatusAction?.customerName}
							</span>
							?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={confirmStatusChange}>
							{pendingStatusAction?.isActive ? "Activate" : "Deactivate"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				open={!!deletingCustomer}
				onOpenChange={(open) => !open && setDeletingCustomer(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Customer</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete{" "}
							<span className="font-bold text-foreground">
								{deletingCustomer?.name}
							</span>
							? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isDeleting}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{isDeleting ? (
								<Loader2 className="w-4 h-4 animate-spin mr-1.5" />
							) : (
								<Trash2 className="w-4 h-4 mr-1.5" />
							)}
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

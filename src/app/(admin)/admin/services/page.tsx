"use client";

import SearchableSelect from "@/components/global/SearchableSelect";
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
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useCategoryDropdown } from "@/lib/api/category/hooks";
import type {
	CreateServicePayload,
	Service,
	ServiceCategoryVendor,
	ServiceVariation,
	UpdateServicePayload,
} from "@/lib/api/service";
import {
	useCreateService,
	useDeleteService,
	useServices,
	useUpdateService,
	useUpdateServiceStatus,
} from "@/lib/api/service/hooks";
import { useFormik } from "formik";
import {
	ChevronLeft,
	ChevronRight,
	ImagePlus,
	List,
	Loader2,
	Pencil,
	Plus,
	Tag,
	Trash2,
	Wrench,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

const PAGE_SIZE = 10;

interface PendingStatusAction {
	serviceId: number;
	serviceName: string;
	isActive: boolean;
}

export default function AdminServicesPage() {
	const [page, setPage] = useState(1);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [editingService, setEditingService] = useState<Service | null>(null);
	const [deletingService, setDeletingService] = useState<Service | null>(null);
	const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(
		null,
	);
	const [pendingStatusAction, setPendingStatusAction] =
		useState<PendingStatusAction | null>(null);

	const { data, isLoading } = useServices({ page, limit: PAGE_SIZE });
	const { mutate: createService, isPending: isCreating } = useCreateService();
	const { mutate: updateService, isPending: isUpdating } = useUpdateService();
	const { mutate: updateStatus } = useUpdateServiceStatus();
	const { mutate: deleteService, isPending: isDeleting } = useDeleteService();

	const services = data?.data ?? [];
	const meta = data?.meta;

	const handleStatusChange = (id: number, isActive: boolean) => {
		setUpdatingStatusId(id);
		updateStatus(
			{ id, data: { isActive } },
			{
				onSuccess: () =>
					toast.success(
						isActive ? "Service activated" : "Service deactivated",
					),
				onError: (error: { message?: string }) =>
					toast.error(error?.message || "Failed to update status"),
				onSettled: () => setUpdatingStatusId(null),
			},
		);
	};

	const confirmStatusChange = () => {
		if (!pendingStatusAction) return;
		handleStatusChange(
			pendingStatusAction.serviceId,
			pendingStatusAction.isActive,
		);
		setPendingStatusAction(null);
	};

	const handleDelete = () => {
		if (deletingService) {
			deleteService(deletingService.id, {
				onSuccess: () => {
					setDeletingService(null);
					toast.success("Service deleted successfully");
				},
				onError: (error: { message?: string }) => {
					toast.error(error?.message || "Failed to delete service");
				},
			});
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<Wrench className="w-3.5 h-3.5" />
						<span>Service Management</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">
						Manage Services
					</h1>
				</div>
				<Button size="sm" onClick={() => setIsCreateOpen(true)}>
					<Plus className="w-3.5 h-3.5 mr-1" />
					Add Service
				</Button>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center py-20">
					<Loader2 className="w-6 h-6 text-primary animate-spin" />
				</div>
			) : (
				<div className="bg-card rounded-2xl border border-border shadow-sm overflow-x-auto">
					<Table className="min-w-[1000px]">
						<TableHeader>
							<TableRow className="bg-muted/50">
								<TableHead className="font-bold text-foreground">
									Service
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Vendors
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Category
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Price
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Variations
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Status
								</TableHead>
								<TableHead className="font-bold text-foreground text-right">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{services.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7} className="text-center py-10">
										<p className="text-sm text-muted-foreground">
											No services found
										</p>
									</TableCell>
								</TableRow>
							) : (
								services.map((service) => {
									const isStatusUpdating =
										updatingStatusId === service.id;
									const hasVariations = service.variations?.length > 0;
									return (
										<TableRow
											key={service.id}
											className="hover:bg-muted/30"
										>
											<TableCell>
												<div className="flex items-center gap-3">
													{service.imageUrl ? (
														<div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
															<Image
																src={service.imageUrl}
																alt={service.name}
																fill
																sizes="36px"
																className="object-cover"
															/>
														</div>
													) : (
														<div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
															<Wrench className="w-4 h-4 text-primary" />
														</div>
													)}
													<p className="text-sm font-bold text-foreground">
														{service.name}
													</p>
												</div>
											</TableCell>
											<TableCell>
												<VendorAvatars
													vendors={service.vendors ?? []}
												/>
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-1.5">
													<Tag className="w-3 h-3 text-muted-foreground" />
													<span className="text-xs text-muted-foreground">
														{service.category?.name || "-"}
													</span>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<span className="text-sm font-bold text-foreground">
														৳{service.basePrice}
													</span>
													{hasVariations && (
														<Badge
															variant="outline"
															className="text-[9px] px-1.5 py-0 bg-muted text-muted-foreground border-border"
														>
															Base Price
														</Badge>
													)}
												</div>
											</TableCell>
											<TableCell>
												{hasVariations ? (
													<VariationsPopover
														variations={service.variations}
														count={service.variations.length}
													/>
												) : (
													<span className="text-xs text-muted-foreground">
														-
													</span>
												)}
											</TableCell>
											<TableCell
												onClick={(e) => e.stopPropagation()}
											>
												{isStatusUpdating ? (
													<Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
												) : (
													<Switch
														checked={service.isActive}
														onCheckedChange={(checked) =>
															setPendingStatusAction({
																serviceId: service.id,
																serviceName: service.name,
																isActive: checked,
															})
														}
													/>
												)}
											</TableCell>
											<TableCell>
												<div className="flex items-center justify-end gap-1">
													<Button
														variant="ghost"
														size="icon-sm"
														onClick={() =>
															setEditingService(service)
														}
													>
														<Pencil className="w-4 h-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon-sm"
														onClick={() =>
															setDeletingService(service)
														}
														className="text-destructive hover:text-destructive"
													>
														<Trash2 className="w-4 h-4" />
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
								<span className="font-bold text-foreground">
									{meta.total}
								</span>{" "}
								services
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
									{Array.from(
										{ length: meta.totalPages },
										(_, i) => i + 1,
									)
										.filter(
											(p) =>
												p === 1 ||
												p === meta.totalPages ||
												Math.abs(p - page) <= 1,
										)
										.reduce<(number | "ellipsis")[]>(
											(acc, p, i, arr) => {
												if (
													i > 0 &&
													p - (arr[i - 1] as number) > 1
												) {
													acc.push("ellipsis");
												}
												acc.push(p);
												return acc;
											},
											[],
										)
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

			{/* Create Service Sheet */}
			<ServiceSheet
				open={isCreateOpen}
				onOpenChange={setIsCreateOpen}
				onSubmit={(values) =>
					createService(values as CreateServicePayload, {
						onSuccess: () => {
							setIsCreateOpen(false);
							toast.success("Service created successfully");
						},
						onError: (error: { message?: string }) => {
							toast.error(error?.message || "Failed to create service");
						},
					})
				}
				isPending={isCreating}
				title="Create Service"
				description="Add a new service to a category."
			/>

			{/* Edit Service Sheet */}
			{editingService && (
				<ServiceSheet
					open={!!editingService}
					onOpenChange={(open) => !open && setEditingService(null)}
					initialValues={editingService}
					onSubmit={(values) =>
						updateService(
							{
								id: editingService.id,
								data: values as UpdateServicePayload,
							},
							{
								onSuccess: () => {
									setEditingService(null);
									toast.success("Service updated successfully");
								},
								onError: (error: { message?: string }) => {
									toast.error(
										error?.message || "Failed to update service",
									);
								},
							},
						)
					}
					isPending={isUpdating}
					title="Edit Service"
					description="Update the service details below."
				/>
			)}

			{/* Status Change Confirmation Dialog */}
			<AlertDialog
				open={!!pendingStatusAction}
				onOpenChange={(open) => !open && setPendingStatusAction(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{pendingStatusAction?.isActive
								? "Activate Service"
								: "Deactivate Service"}
						</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to{" "}
							{pendingStatusAction?.isActive ? "activate" : "deactivate"}{" "}
							<span className="font-bold text-foreground">
								{pendingStatusAction?.serviceName}
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
				open={!!deletingService}
				onOpenChange={(open) => !open && setDeletingService(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Service</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete{" "}
							<span className="font-bold text-foreground">
								{deletingService?.name}
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

// Variations Popover Component
function VariationsPopover({
	variations,
	count,
}: {
	variations: ServiceVariation[];
	count: number;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

	const handleToggle = () => {
		if (!isOpen && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const popoverHeight = Math.min(count, 5) * 36 + 40;
			const spaceBelow = viewportHeight - rect.bottom;
			const openUp = spaceBelow < popoverHeight + 16;

			setPosition({
				top: openUp
					? rect.top + window.scrollY - popoverHeight - 4
					: rect.bottom + window.scrollY + 4,
				left: Math.min(rect.left + window.scrollX, window.innerWidth - 264),
			});
		}
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button
				ref={buttonRef}
				type="button"
				onClick={handleToggle}
				className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
			>
				<List className="w-3.5 h-3.5" />
				<span>{count}</span>
			</button>

			{isOpen &&
				position &&
				createPortal(
					<>
						<div
							className="fixed inset-0 z-[9998]"
							onClick={() => setIsOpen(false)}
						/>
						<div
							className="fixed z-[9999] w-64 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
							style={{
								top: position.top,
								left: position.left,
							}}
						>
							<div className="px-3 py-2 bg-muted/50 border-b border-border">
								<p className="text-xs font-bold text-foreground">
									Variations ({count})
								</p>
							</div>
							<div className="max-h-[200px] overflow-y-auto custom-scrollbar divide-y divide-border">
								{variations.map((v) => (
									<div
										key={v.id}
										className="flex items-center justify-between px-3 py-2 hover:bg-muted/30"
									>
										<span className="text-xs text-foreground truncate">
											{v.name}
										</span>
										<span className="text-xs font-bold text-foreground shrink-0 ml-2">
											৳{v.price}
										</span>
									</div>
								))}
							</div>
						</div>
					</>,
					document.body,
				)}
		</>
	);
}

// Vendor Avatars Component
function VendorAvatars({ vendors }: { vendors: ServiceCategoryVendor[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [position, setPosition] = useState<{ top: number; left: number; openUp: boolean } | null>(null);

	if (vendors.length === 0) {
		return <span className="text-xs text-muted-foreground">-</span>;
	};

	const handleToggle = () => {
		if (!isOpen && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const popoverHeight = Math.min(vendors.length, 4) * 44 + 40;
			const spaceBelow = viewportHeight - rect.bottom;
			const openUp = spaceBelow < popoverHeight + 16;

			setPosition({
				top: openUp
					? rect.top + window.scrollY - popoverHeight - 4
					: rect.bottom + window.scrollY + 4,
				left: Math.min(rect.left + window.scrollX, window.innerWidth - 264),
				openUp,
			});
		}
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button
				ref={buttonRef}
				type="button"
				onClick={handleToggle}
				className="flex items-center cursor-pointer"
			>
				<div className="flex items-center">
					{vendors.slice(0, 3).map((vendor, i) => (
						<div
							key={vendor.userId}
							className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-card bg-muted"
							style={{
								marginLeft: i > 0 ? "-6px" : 0,
								zIndex: 3 - i,
							}}
						>
							<Image
								src={
									vendor.logoUrl ||
									`https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.businessName)}&background=12544F&color=fff&bold=true&size=28`
								}
								alt={vendor.businessName}
								fill
								sizes="28px"
								className="object-cover"
							/>
						</div>
					))}
					{vendors.length > 3 && (
						<div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-card bg-muted -ml-1.5 z-0">
							<span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-muted-foreground">
								+{vendors.length - 3}
							</span>
						</div>
					)}
				</div>
			</button>

			{isOpen &&
				position &&
				createPortal(
					<>
						<div
							className="fixed inset-0 z-[9998]"
							onClick={() => setIsOpen(false)}
						/>
						<div
							className="fixed z-[9999] w-64 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
							style={{
								top: position.top,
								left: position.left,
							}}
						>
							<div className="px-3 py-2 bg-muted/50 border-b border-border">
								<p className="text-xs font-bold text-foreground">
									Vendors ({vendors.length})
								</p>
							</div>
							<div className="max-h-[240px] overflow-y-auto custom-scrollbar divide-y divide-border">
								{vendors.map((vendor) => (
									<div
										key={vendor.userId}
										className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted/30"
									>
										<div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-muted">
											<Image
												src={
													vendor.logoUrl ||
													`https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.businessName)}&background=12544F&color=fff&bold=true&size=32`
												}
												alt={vendor.businessName}
												fill
												sizes="32px"
												className="object-cover"
											/>
										</div>
										<div className="min-w-0">
											<p className="text-xs font-bold text-foreground truncate">
												{vendor.businessName}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</>,
					document.body,
				)}
		</>
	);
}

// Service Sheet Component
function ServiceSheet({
	open,
	onOpenChange,
	initialValues,
	onSubmit,
	isPending,
	title,
	description,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialValues?: Service;
	onSubmit: (values: CreateServicePayload | UpdateServicePayload) => void;
	isPending: boolean;
	title: string;
	description: string;
}) {
	const [imagePreview, setImagePreview] = useState<string | null>(
		() => initialValues?.imageUrl ?? null,
	);
	const imageFileRef = useRef<File | undefined>(undefined);
	const [hasImage, setHasImage] = useState(() => !!initialValues?.imageUrl);
	const [imageTouched, setImageTouched] = useState(false);
	const [categorySearch, setCategorySearch] = useState("");
	const [variations, setVariations] = useState<
		{ id?: number; name: string; price: string }[]
	>(
		() =>
			initialValues?.variations?.map((v) => ({
				id: v.id,
				name: v.name,
				price: v.price,
			})) ?? [],
	);
	const [newVariationName, setNewVariationName] = useState("");
	const [newVariationPrice, setNewVariationPrice] = useState("");

	const { data: categoriesResponse, isLoading: isCategoriesLoading } =
		useCategoryDropdown(
			{
				isActive: true,
				search: categorySearch || undefined,
			},
			open,
		);
	const categories = categoriesResponse?.data ?? [];

	const categoryOptions = useMemo(
		() =>
			categories.map((cat) => ({
				label: cat.name,
				value: cat.id,
			})),
		[categories],
	);

	const isEditing = !!initialValues;

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: initialValues?.name || "",
			shortDescription: initialValues?.shortDescription || "",
			basePrice: initialValues?.basePrice || "",
			description: initialValues?.description || "",
			categoryId: initialValues?.categoryId || categories[0]?.id || 0,
			discountAmount: initialValues?.discountAmount || "",
			discountType:
				(initialValues?.discountType as "FLAT" | "PERCENTAGE" | "") || "",
		},
		validate: (values) => {
			const errors: Record<string, string> = {};
			if (!values.name.trim()) errors.name = "Name is required";
			if (!values.shortDescription.trim())
				errors.shortDescription = "Short description is required";
			if (!values.basePrice || Number(values.basePrice) <= 0)
				errors.basePrice = "Valid base price is required";
			if (!values.categoryId) errors.categoryId = "Category is required";
			if (!isEditing && !hasImage)
				errors.image = "Service image is required";
			if (values.discountAmount && !values.discountType)
				errors.discountType = "Discount type is required";
			if (values.discountAmount && Number(values.discountAmount) <= 0)
				errors.discountAmount = "Discount amount must be positive";
			if (values.discountType && !values.discountAmount)
				errors.discountAmount = "Discount amount is required";
			return errors;
		},
		onSubmit: (values) => {
			if (isEditing) {
				const payload: UpdateServicePayload = {
					name: values.name,
					shortDescription: values.shortDescription,
					basePrice: values.basePrice,
					categoryId: values.categoryId,
					description: values.description || undefined,
					discountAmount: values.discountAmount || undefined,
					discountType:
						(values.discountType as "FLAT" | "PERCENTAGE") || undefined,
					variations: variations.map((v) => ({
						id: v.id,
						name: v.name,
						price: Number(v.price),
					})),
				};
				if (imageFileRef.current) payload.image = imageFileRef.current;
				onSubmit(payload);
			} else {
				const payload: CreateServicePayload = {
					name: values.name,
					shortDescription: values.shortDescription,
					basePrice: values.basePrice,
					categoryId: values.categoryId,
					description: values.description || undefined,
					discountAmount: values.discountAmount || undefined,
					discountType:
						(values.discountType as "FLAT" | "PERCENTAGE") || undefined,
					variations: variations.map((v) => ({
						name: v.name,
						price: Number(v.price),
					})),
					image: imageFileRef.current!,
				};
				onSubmit(payload);
			}
		},
	});

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setImageTouched(true);
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.error("Image must be less than 5MB");
				return;
			}
			setImagePreview(URL.createObjectURL(file));
			imageFileRef.current = file;
			setHasImage(true);
		}
	};

	const handleAddVariation = () => {
		if (!newVariationName.trim() || !newVariationPrice) return;
		setVariations([
			...variations,
			{ name: newVariationName, price: newVariationPrice },
		]);
		setNewVariationName("");
		setNewVariationPrice("");
	};

	const handleRemoveVariation = (index: number) => {
		setVariations(variations.filter((_, i) => i !== index));
	};

	const handleClose = () => {
		formik.resetForm();
		setImagePreview(null);
		imageFileRef.current = undefined;
		setHasImage(false);
		setImageTouched(false);
		setCategorySearch("");
		setVariations([]);
		setNewVariationName("");
		setNewVariationPrice("");
		onOpenChange(false);
	};

	const handleCategorySearch = (query: string) => {
		setCategorySearch(query);
	};

	return (
		<Sheet open={open} onOpenChange={handleClose}>
			<SheetContent className="sm:max-w-lg overflow-y-auto custom-scrollbar">
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>
				<form onSubmit={formik.handleSubmit} className="space-y-4 mt-6">
					<div className="space-y-1.5">
						<label className="text-xs font-bold text-foreground">
							Service Image <span className="text-destructive">*</span>
						</label>
						<div className="flex items-center gap-3">
							<label className="cursor-pointer">
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleImageChange}
								/>
								<div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted transition-colors">
									<ImagePlus className="w-4 h-4" />
									Choose Image
								</div>
							</label>
							{imagePreview && (
								<div className="relative w-10 h-10 rounded-lg overflow-hidden">
									<Image
										src={imagePreview}
										alt="Preview"
										fill
										sizes="40px"
										className="object-cover"
									/>
								</div>
							)}
						</div>
						{imageTouched && !hasImage && !isEditing && (
							<p className="text-[11px] text-destructive">
								Service image is required
							</p>
						)}
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-bold text-foreground">
							Name <span className="text-destructive">*</span>
						</label>
						<Input
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="e.g. Home Tutoring, Sofa Cleaning"
							className="h-10 text-sm"
						/>
						{formik.touched.name && formik.errors.name && (
							<p className="text-[11px] text-destructive">
								{formik.errors.name}
							</p>
						)}
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-bold text-foreground">
							Short Description{" "}
							<span className="text-destructive">*</span>
						</label>
						<Input
							name="shortDescription"
							value={formik.values.shortDescription}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Brief description (shown in cards)"
							className="h-10 text-sm"
						/>
						{formik.touched.shortDescription &&
							formik.errors.shortDescription && (
								<p className="text-[11px] text-destructive">
									{formik.errors.shortDescription}
								</p>
							)}
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1.5">
							<label className="text-xs font-bold text-foreground">
								Base Price (৳){" "}
								<span className="text-destructive">*</span>
							</label>
							<Input
								name="basePrice"
								type="number"
								min="0"
								value={formik.values.basePrice}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="0"
								className="h-10 text-sm"
							/>
							{formik.touched.basePrice && formik.errors.basePrice && (
								<p className="text-[11px] text-destructive">
									{formik.errors.basePrice}
								</p>
							)}
						</div>

						<div className="space-y-1.5">
							<label className="text-xs font-bold text-foreground">
								Category <span className="text-destructive">*</span>
							</label>
							<SearchableSelect
								options={categoryOptions}
								value={formik.values.categoryId}
								onValueChange={(val) =>
									formik.setFieldValue("categoryId", val)
								}
								placeholder="Select"
								searchPlaceholder="Search..."
								loading={isCategoriesLoading}
								onSearch={handleCategorySearch}
								isSearching={
									isCategoriesLoading && categorySearch.length > 0
								}
							/>
							{formik.touched.categoryId && formik.errors.categoryId && (
								<p className="text-[11px] text-destructive">
									{formik.errors.categoryId}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1.5">
							<label className="text-xs font-bold text-foreground">
								Discount Amount
							</label>
							<Input
								name="discountAmount"
								type="number"
								min="0"
								value={formik.values.discountAmount}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="0"
								className="h-10 text-sm"
							/>
							{formik.touched.discountAmount &&
								formik.errors.discountAmount && (
									<p className="text-[11px] text-destructive">
										{formik.errors.discountAmount}
									</p>
								)}
						</div>

						<div className="space-y-1.5">
							<label className="text-xs font-bold text-foreground">
								Discount Type
							</label>
							<select
								name="discountType"
								value={formik.values.discountType}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full h-10 px-3 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							>
								<option value="">None</option>
								<option value="FLAT">Flat (৳)</option>
								<option value="PERCENTAGE">Percentage (%)</option>
							</select>
							{formik.touched.discountType &&
								formik.errors.discountType && (
									<p className="text-[11px] text-destructive">
										{formik.errors.discountType}
									</p>
								)}
						</div>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-bold text-foreground">
							Description
						</label>
						<textarea
							name="description"
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Detailed description (optional)"
							rows={3}
							className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
						/>
					</div>

					{/* Variations Section */}
					<div className="space-y-2">
						<label className="text-xs font-bold text-foreground">
							Variations
						</label>

						{variations.length > 0 && (
							<div className="space-y-1.5">
								{variations.map((v, i) => (
									<div
										key={v.id ?? `new-${i}`}
										className="flex items-center justify-between px-3 py-2 bg-muted/30 rounded-xl"
									>
										<div className="flex items-center gap-2">
											<span className="text-xs font-medium text-foreground">
												{v.name}
											</span>
											<span className="text-xs text-muted-foreground">
												৳{v.price}
											</span>
										</div>
										<button
											type="button"
											onClick={() => handleRemoveVariation(i)}
											className="text-muted-foreground hover:text-destructive transition-colors"
										>
											<Trash2 className="w-3.5 h-3.5" />
										</button>
									</div>
								))}
							</div>
						)}

						<div className="flex gap-2">
							<Input
								value={newVariationName}
								onChange={(e) => setNewVariationName(e.target.value)}
								placeholder="Name (e.g. Basic)"
								className="h-9 text-xs flex-1"
							/>
							<Input
								type="number"
								min="0"
								value={newVariationPrice}
								onChange={(e) => setNewVariationPrice(e.target.value)}
								placeholder="Price"
								className="h-9 text-xs w-24"
							/>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={handleAddVariation}
								disabled={
									!newVariationName.trim() || !newVariationPrice
								}
								className="h-9 px-3"
							>
								<Plus className="w-3.5 h-3.5" />
							</Button>
						</div>
					</div>

					<SheetFooter className="mt-6">
						<Button
							type="button"
							variant="outline"
							onClick={handleClose}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isPending}>
							{isPending && (
								<Loader2 className="w-4 h-4 animate-spin mr-1.5" />
							)}
							{isEditing ? "Update" : "Create"}
						</Button>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}

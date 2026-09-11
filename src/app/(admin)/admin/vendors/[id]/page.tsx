"use client";

import PasswordInput from "@/components/global/PasswordInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	VENDOR_STATUS,
	type Vendor,
	type VendorStatus,
} from "@/lib/api/vendor";
import {
	useDeleteVendorOffer,
	useToggleVendorService,
	useUpdateVendor,
	useUpdateVendorApproval,
	useUpdateVendorOffer,
	useUpdateVendorStatus,
	useUploadVendorCover,
	useUploadVendorLogo,
	useVendor,
	useVendorServices,
} from "@/lib/api/vendor/hooks";
import { useFormik } from "formik";
import {
	ArrowLeft,
	Building2,
	Calendar,
	Copy,
	Loader2,
	Mail,
	MapPin,
	Pencil,
	Phone,
	Save,
	Star,
	Trash2,
	Upload,
	X,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { toast } from "sonner";

const statusColors: Record<VendorStatus, string> = {
	PENDING: "bg-amber-50 text-amber-700 border-amber-200",
	APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
	REJECTED: "bg-red-50 text-red-700 border-red-200",
};

export default function VendorDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const vendorId = Number(id);
	const router = useRouter();
	const searchParams = useSearchParams();
	const activeTab = searchParams.get("tab") || "info";

	const { data: vendor, isLoading } = useVendor(vendorId);
	const { mutate: updateVendor, isPending: isUpdating } = useUpdateVendor();
	const { mutate: updateApproval, isPending: isApprovalPending } =
		useUpdateVendorApproval();
	const { mutate: updateStatus, isPending: isStatusPending } =
		useUpdateVendorStatus();
	const { mutate: uploadLogo, isPending: isLogoPending } =
		useUploadVendorLogo();
	const { mutate: uploadCover, isPending: isCoverPending } =
		useUploadVendorCover();

	const [isEditing, setIsEditing] = useState(false);

	const isPending =
		isUpdating ||
		isApprovalPending ||
		isStatusPending ||
		isLogoPending ||
		isCoverPending;

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: vendor?.name || "",
			businessName: vendor?.businessName || "",
			phone: vendor?.phone || "",
			address: vendor?.address || "",
			password: "",
			confirmPassword: "",
		},
		onSubmit: (values) => {
			const payload: Record<string, string> = {};
			if (values.name !== vendor?.name) payload.name = values.name;
			if (values.businessName !== vendor?.businessName)
				payload.businessName = values.businessName;
			if (values.phone !== vendor?.phone) payload.phone = values.phone;
			if (values.address !== vendor?.address)
				payload.address = values.address;
			if (values.password) {
				payload.password = values.password;
				payload.confirmPassword = values.confirmPassword;
			}

			if (Object.keys(payload).length === 0) {
				setIsEditing(false);
				return;
			}

			updateVendor(
				{ id: vendorId, data: payload },
				{
					onSuccess: () => {
						setIsEditing(false);
						toast.success("Vendor updated successfully");
					},
					onError: (error: { message?: string }) => {
						toast.error(error?.message || "Failed to update vendor");
					},
				},
			);
		},
	});

	const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			uploadLogo(
				{ id: vendorId, file },
				{
					onSuccess: () => {
						toast.success("Logo uploaded successfully");
					},
					onError: (error: { message?: string }) => {
						toast.error(error?.message || "Failed to upload logo");
					},
				},
			);
		}
		e.target.value = "";
	};

	const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			uploadCover(
				{ id: vendorId, file },
				{
					onSuccess: () => {
						toast.success("Cover image uploaded successfully");
					},
					onError: (error: { message?: string }) => {
						toast.error(error?.message || "Failed to upload cover image");
					},
				},
			);
		}
		e.target.value = "";
	};

	const handleStatusChange = (status: VendorStatus) => {
		updateApproval(
			{ id: vendorId, data: { status } },
			{
				onSuccess: () => {
					toast.success(`Vendor status changed to ${status}`);
				},
				onError: (error: { message?: string }) => {
					toast.error(error?.message || "Failed to update status");
				},
			},
		);
	};

	const handleActiveToggle = (isActive: boolean) => {
		updateStatus(
			{ id: vendorId, data: { isActive } },
			{
				onSuccess: () => {
					toast.success(
						isActive ? "Vendor activated" : "Vendor deactivated",
					);
				},
				onError: (error: { message?: string }) => {
					toast.error(error?.message || "Failed to update active status");
				},
			},
		);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-20">
				<Loader2 className="w-6 h-6 text-primary animate-spin" />
			</div>
		);
	}

	if (!vendor) {
		return (
			<div className="text-center py-20">
				<p className="text-sm text-muted-foreground">Vendor not found</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => router.push("/admin/vendors")}
					>
						<ArrowLeft className="w-4 h-4" />
					</Button>
					<div>
						<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
							<span>Vendor Details</span>
						</div>
						<h1 className="text-2xl font-black text-foreground mt-1">
							{vendor.businessName}
						</h1>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Select
						value={vendor.status}
						onValueChange={(value) =>
							handleStatusChange(value as VendorStatus)
						}
						disabled={isPending}
					>
						<SelectTrigger className="w-[140px] h-9 text-xs font-bold">
							<SelectValue>
								<Badge
									variant="outline"
									className={`${statusColors[vendor.status]} border font-bold text-[11px] px-2 py-0.5`}
								>
									{vendor.status}
								</Badge>
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							{Object.values(VENDOR_STATUS).map((status) => (
								<SelectItem
									key={status}
									value={status}
									className="text-xs font-bold"
								>
									<Badge
										variant="outline"
										className={`${statusColors[status]} border font-bold text-[11px] px-2 py-0.5`}
									>
										{status}
									</Badge>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<div className="flex items-center gap-2">
						<span className="text-xs font-bold text-muted-foreground">
							{vendor.isActive ? "Active" : "Inactive"}
						</span>
						<Switch
							checked={vendor.isActive}
							onCheckedChange={handleActiveToggle}
							disabled={isPending}
						/>
					</div>
				</div>
			</div>

			{/* Tabs */}
			<Tabs
				value={activeTab}
				onValueChange={(value) => {
					const params = new URLSearchParams(searchParams.toString());
					params.set("tab", value);
					router.push(`?${params.toString()}`, { scroll: false });
				}}
				className="space-y-4"
			>
				<TabsList>
					<TabsTrigger value="info">Vendor Info</TabsTrigger>
					<TabsTrigger value="services">Services</TabsTrigger>
					<TabsTrigger value="offers">Offers & Discounts</TabsTrigger>
				</TabsList>

				{/* Vendor Info Tab */}
				<TabsContent value="info" className="space-y-6">
					{/* Cover + Profile Card */}
					<div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
						{/* Cover Image */}
						<div className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20">
							{vendor.coverUrl && (
								<Image
									src={vendor.coverUrl}
									alt="Vendor Cover"
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="object-cover"
								/>
							)}
							<label className="absolute bottom-3 right-3 cursor-pointer z-10">
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleCoverUpload}
								/>
								<div className="flex items-center gap-1.5 px-3 py-1.5 bg-card/90 backdrop-blur-sm border border-border rounded-lg text-xs font-bold text-muted-foreground hover:bg-card transition-colors">
									{isCoverPending ? (
										<Loader2 className="w-3.5 h-3.5 animate-spin" />
									) : (
										<Upload className="w-3.5 h-3.5" />
									)}
									Cover
								</div>
							</label>
						</div>

						{/* Profile Section */}
						<div className="relative px-6  pb-6 pt-2">
							{/* Logo - overlapping cover */}
							<div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-6">
								<div className="relative">
									<div className="w-24 h-24 rounded-2xl bg-card border-4 border-card shadow-lg overflow-hidden">
										<Image
											src={
												vendor.logoUrl ||
												`https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.businessName)}&background=12544F&color=fff&bold=true&size=96`
											}
											alt={vendor.businessName}
											fill
											sizes="96px"
											className="object-cover rounded-2xl"
										/>
									</div>
									<label className="absolute -bottom-1 -right-1 cursor-pointer">
										<input
											type="file"
											accept="image/*"
											className="hidden"
											onChange={handleLogoUpload}
										/>
										<div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
											{isLogoPending ? (
												<Loader2 className="w-3.5 h-3.5 animate-spin" />
											) : (
												<Upload className="w-3.5 h-3.5" />
											)}
										</div>
									</label>
								</div>
								<div className="flex-1 pb-1 mt-3">
									<h2 className="mt-1 text-xl font-black text-foreground">
										{vendor.businessName}
									</h2>
									<p className="text-sm text-muted-foreground">
										{vendor.name}
									</p>
								</div>
								{!isEditing ? (
									<Button
										variant="outline"
										size="sm"
										onClick={() => setIsEditing(true)}
										className="h-8 px-3 text-xs font-bold"
									>
										<Pencil className="w-3.5 h-3.5 mr-1.5" />
										Edit Profile
									</Button>
								) : (
									<div className="flex items-center gap-2">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => setIsEditing(false)}
											className="h-8 px-3 text-xs font-bold"
										>
											<X className="w-3.5 h-3.5 mr-1.5" />
											Cancel
										</Button>
										<Button
											size="sm"
											onClick={() => formik.handleSubmit()}
											disabled={isPending}
											className="h-8 px-3 text-xs font-bold"
										>
											{isPending ? (
												<Loader2 className="w-3.5 h-3.5 animate-spin" />
											) : (
												<Save className="w-3.5 h-3.5 mr-1.5" />
											)}
											Save Changes
										</Button>
									</div>
								)}
							</div>

							{/* Info Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{/* Full Name */}
								<div className="space-y-1">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										Full Name
									</label>
									{isEditing ? (
										<Input
											name="name"
											value={formik.values.name}
											onChange={formik.handleChange}
											className="h-9 text-sm"
										/>
									) : (
										<div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/50">
											<Copy className="w-3.5 h-3.5 text-muted-foreground" />
											<span className="text-sm font-medium text-foreground">
												{vendor.name}
											</span>
										</div>
									)}
								</div>

								{/* Business Name */}
								<div className="space-y-1">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										Business Name
									</label>
									{isEditing ? (
										<Input
											name="businessName"
											value={formik.values.businessName}
											onChange={formik.handleChange}
											className="h-9 text-sm"
										/>
									) : (
										<div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/50">
											<Building2 className="w-3.5 h-3.5 text-muted-foreground" />
											<span className="text-sm font-medium text-foreground">
												{vendor.businessName}
											</span>
										</div>
									)}
								</div>

								{/* Email */}
								<div className="space-y-1">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										Email
									</label>
									<div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/50">
										<Mail className="w-3.5 h-3.5 text-muted-foreground" />
										<span className="text-sm font-medium text-foreground">
											{vendor.email || "-"}
										</span>
									</div>
								</div>

								{/* Phone */}
								<div className="space-y-1">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										Phone
									</label>
									{isEditing ? (
										<Input
											name="phone"
											value={formik.values.phone}
											onChange={formik.handleChange}
											className="h-9 text-sm"
										/>
									) : (
										<div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/50">
											<Phone className="w-3.5 h-3.5 text-muted-foreground" />
											<span className="text-sm font-medium text-foreground">
												{vendor.phone || "-"}
											</span>
										</div>
									)}
								</div>

								{/* Address */}
								<div className="space-y-1">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										Address
									</label>
									{isEditing ? (
										<Input
											name="address"
											value={formik.values.address}
											onChange={formik.handleChange}
											className="h-9 text-sm"
										/>
									) : (
										<div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/50">
											<MapPin className="w-3.5 h-3.5 text-muted-foreground" />
											<span className="text-sm font-medium text-foreground truncate">
												{vendor.address}
											</span>
										</div>
									)}
								</div>

								{/* Rating */}
								<div className="space-y-1">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										Rating
									</label>
									<div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/50">
										<Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
										<span className="text-sm font-bold text-foreground">
											{Number(vendor.rating) || "0.0"}
										</span>
										<span className="text-[11px] text-muted-foreground">
											/5.0
										</span>
									</div>
								</div>

								{/* Password (edit mode only) */}
								{isEditing && (
									<>
										<div className="space-y-1">
											<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
												New Password
											</label>
											<PasswordInput
												name="password"
												value={formik.values.password}
												onChange={formik.handleChange}
												placeholder="Leave blank to keep current"
											/>
										</div>
										<div className="space-y-1">
											<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
												Confirm Password
											</label>
											<PasswordInput
												name="confirmPassword"
												value={formik.values.confirmPassword}
												onChange={formik.handleChange}
												placeholder="Confirm new password"
											/>
										</div>
									</>
								)}
							</div>

							{/* Metadata */}
							<div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
								<span className="flex items-center gap-1.5">
									<Calendar className="w-3.5 h-3.5" />
									Joined:{" "}
									{new Date(vendor.createdAt).toLocaleDateString()}
								</span>
								<span className="flex items-center gap-1.5">
									<Calendar className="w-3.5 h-3.5" />
									Updated:{" "}
									{new Date(vendor.updatedAt).toLocaleDateString()}
								</span>
								<span>Response: {vendor.responseTime}</span>
							</div>
						</div>
					</div>
				</TabsContent>

				{/* Services Tab */}
				<TabsContent value="services">
					<VendorServicesTab vendorId={vendorId} />
				</TabsContent>

				{/* Offers Tab */}
				<TabsContent value="offers">
					<VendorOffersTab vendor={vendor} vendorId={vendorId} />
				</TabsContent>
			</Tabs>
		</div>
	);
}

// Services Tab Component
function VendorServicesTab({ vendorId }: { vendorId: number }) {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useVendorServices(vendorId, { page, limit: 10 });
	const { mutate: toggleService, isPending } = useToggleVendorService();

	const services = data?.data ?? [];
	const meta = data?.meta;

	const handleToggle = (serviceId: number, currentActive: boolean) => {
		if (currentActive) {
			toggleService({
				id: vendorId,
				data: { inActiveServicesId: [serviceId] },
			});
		} else {
			toggleService({
				id: vendorId,
				data: { activeServicesId: [serviceId] },
			});
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-20">
				<Loader2 className="w-6 h-6 text-primary animate-spin" />
			</div>
		);
	}

	return (
		<div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted/50">
						<TableHead className="font-bold text-foreground">
							Service Name
						</TableHead>
						<TableHead className="font-bold text-foreground">
							Category
						</TableHead>
						<TableHead className="font-bold text-foreground">
							Price
						</TableHead>
						<TableHead className="font-bold text-foreground">
							Duration
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
							<TableCell colSpan={6} className="text-center py-10">
								<p className="text-sm text-muted-foreground">
									No services found
								</p>
							</TableCell>
						</TableRow>
					) : (
						services.map((vs, index) => (
							<TableRow
								key={`${vendorId}-service-${index}`}
								className="hover:bg-muted/30"
							>
								<TableCell className="font-bold text-sm">
									{vs.service?.name || "-"}
								</TableCell>
								<TableCell className="text-xs text-muted-foreground">
									Category #{vs.service?.categoryId}
								</TableCell>
								<TableCell className="text-sm font-bold">
									৳{vs.service?.price || 0}
								</TableCell>
								<TableCell className="text-xs text-muted-foreground">
									{vs.service?.duration || "-"}
								</TableCell>
								<TableCell>
									<Badge
										variant="outline"
										className={`font-bold text-[10px] px-2 py-0.5 ${
											vs.isActive
												? "bg-emerald-50 text-emerald-700 border-emerald-200"
												: "bg-red-50 text-red-700 border-red-200"
										}`}
									>
										{vs.isActive ? "Active" : "Inactive"}
									</Badge>
								</TableCell>
								<TableCell className="text-right">
									<Switch
										checked={vs.isActive}
										onCheckedChange={() =>
											handleToggle(vs.serviceId, vs.isActive)
										}
										disabled={isPending}
									/>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			{/* Pagination */}
			{meta && meta.totalPages > 1 && (
				<div className="flex items-center justify-between px-4 py-3 border-t border-border">
					<p className="text-xs text-muted-foreground">
						Showing {(meta.page - 1) * meta.limit + 1} to{" "}
						{Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
					</p>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={page === 1}
							className="h-8 px-3 text-xs font-bold"
						>
							Previous
						</Button>
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
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

// Offers Tab Component
function VendorOffersTab({
	vendor,
	vendorId,
}: {
	vendor: Vendor;
	vendorId: number;
}) {
	const { mutate: updateOffer, isPending: isUpdating } =
		useUpdateVendorOffer();
	const { mutate: deleteOffer, isPending: isDeleting } =
		useDeleteVendorOffer();
	const { mutate: updateOfferStatus, isPending: isStatusPending } =
		useUpdateVendorOffer();

	const isPending = isUpdating || isDeleting || isStatusPending;
	const offer = vendor.vendorOffer;

	const handleDelete = () => {
		if (offer) {
			deleteOffer(vendorId);
		}
	};

	const handleStatusToggle = (isActive: boolean) => {
		updateOfferStatus({
			id: vendorId,
			data: { isActive },
		});
	};

	return (
		<div className="bg-card rounded-2xl border border-border shadow-sm p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-lg font-black text-foreground">
					Offer & Discount
				</h2>
				{offer && (
					<div className="flex items-center gap-2">
						<span className="text-xs font-bold text-muted-foreground">
							{offer.isActive ? "Active" : "Inactive"}
						</span>
						<Switch
							checked={offer.isActive}
							onCheckedChange={handleStatusToggle}
							disabled={isPending}
						/>
						<Button
							variant="destructive"
							size="sm"
							onClick={handleDelete}
							disabled={isPending}
							className="h-8 px-3 text-xs font-bold"
						>
							<Trash2 className="w-3.5 h-3.5 mr-1.5" />
							Delete
						</Button>
					</div>
				)}
			</div>

			{!offer ? (
				<div className="text-center py-10">
					<p className="text-sm text-muted-foreground">
						No active offer or discount
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<div className="space-y-1.5">
						<label className="text-xs font-bold text-muted-foreground">
							Type
						</label>
						<p className="text-sm font-bold text-foreground">
							{offer.type}
						</p>
					</div>
					<div className="space-y-1.5">
						<label className="text-xs font-bold text-muted-foreground">
							Value
						</label>
						<p className="text-sm font-bold text-foreground">
							{offer.type === "PERCENTAGE"
								? `${offer.value}%`
								: `৳${offer.value}`}
						</p>
					</div>
					{offer.title && (
						<div className="space-y-1.5">
							<label className="text-xs font-bold text-muted-foreground">
								Title
							</label>
							<p className="text-sm font-bold text-foreground">
								{offer.title}
							</p>
						</div>
					)}
					{offer.description && (
						<div className="space-y-1.5">
							<label className="text-xs font-bold text-muted-foreground">
								Description
							</label>
							<p className="text-sm text-foreground">
								{offer.description}
							</p>
						</div>
					)}
					<div className="space-y-1.5">
						<label className="text-xs font-bold text-muted-foreground">
							Start Date
						</label>
						<p className="text-sm text-foreground">
							{new Date(offer.startDate).toLocaleDateString()}
						</p>
					</div>
					{offer.hasExpireDate && offer.endDate && (
						<div className="space-y-1.5">
							<label className="text-xs font-bold text-muted-foreground">
								End Date
							</label>
							<p className="text-sm text-foreground">
								{new Date(offer.endDate).toLocaleDateString()}
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

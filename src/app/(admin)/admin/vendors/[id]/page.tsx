"use client";

import PasswordInput from "@/components/global/PasswordInput";
import ServiceImage from "@/components/global/service-card/ServiceImage";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	OFFER_TYPE,
	VENDOR_STATUS,
	type OfferType,
	type Vendor,
	type VendorOfferPayload,
	type VendorStatus,
} from "@/lib/api/vendor";
import {
	useDeleteVendorOffer,
	useToggleVendorService,
	useUpdateVendor,
	useUpdateVendorApproval,
	useUpdateVendorOffer,
	useUpdateVendorOfferStatus,
	useUpdateVendorStatus,
	useUploadVendorCover,
	useUploadVendorLogo,
	useVendor,
	useVendorServices,
} from "@/lib/api/vendor/hooks";
import { useFormik } from "formik";
import {
	AlertTriangle,
	ArrowLeft,
	Building2,
	Calendar,
	Copy,
	Gift,
	Layers,
	Loader2,
	Mail,
	MapPin,
	Pencil,
	Phone,
	Plus,
	Save,
	Star,
	Tag,
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
	const { data, isLoading } = useVendorServices(vendorId);
	const { mutate: toggleService, isPending } = useToggleVendorService();
	const [pendingToggle, setPendingToggle] = useState<{
		serviceId: number;
		serviceName: string;
		currentActive: boolean;
	} | null>(null);

	const categories = data?.data ?? [];
	const meta = data?.meta;

	const totalServices = categories.reduce(
		(sum, cat) => sum + cat.services.length,
		0,
	);
	const servedServices = categories.reduce(
		(sum, cat) => sum + cat.services.filter((s) => s.isActive).length,
		0,
	);
	const unservedServices = totalServices - servedServices;

	const handleToggle = () => {
		if (!pendingToggle) return;
		const { serviceId, currentActive } = pendingToggle;
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
		setPendingToggle(null);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-20">
				<Loader2 className="w-6 h-6 text-primary animate-spin" />
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Confirmation Dialog */}
			<AlertDialog
				open={!!pendingToggle}
				onOpenChange={(open) => {
					if (!open) setPendingToggle(null);
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
							<AlertTriangle className="w-6 h-6 text-destructive" />
						</div>
						<AlertDialogTitle className="text-center">
							Confirm Service{" "}
							{pendingToggle?.currentActive
								? "Deactivation"
								: "Activation"}
						</AlertDialogTitle>
						<AlertDialogDescription className="text-center">
							Are you sure you want to{" "}
							{pendingToggle?.currentActive ? "deactivate" : "activate"}{" "}
							<span className="font-bold text-foreground">
								{pendingToggle?.serviceName}
							</span>
							?
							{pendingToggle?.currentActive && (
								<span className="block mt-1 text-destructive font-medium">
									The vendor will no longer offer this service.
								</span>
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleToggle}
							className={
								pendingToggle?.currentActive
									? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
									: ""
							}
						>
							{pendingToggle?.currentActive ? "Deactivate" : "Activate"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Summary Cards */}
			<div className="grid grid-cols-3 gap-3">
				<div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
						<Layers className="w-5 h-5 text-primary" />
					</div>
					<div>
						<p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
							Total Services
						</p>
						<p className="text-xl font-black text-foreground">
							{totalServices}
						</p>
					</div>
				</div>
				<div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
						<div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
					</div>
					<div>
						<p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
							Served
						</p>
						<p className="text-xl font-black text-foreground">
							{servedServices}
						</p>
					</div>
				</div>
				<div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
						<div className="w-2.5 h-2.5 rounded-full bg-red-500" />
					</div>
					<div>
						<p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
							Unserved
						</p>
						<p className="text-xl font-black text-foreground">
							{unservedServices}
						</p>
					</div>
				</div>
			</div>

			{/* Category Groups */}
			{categories.length === 0 ? (
				<div className="bg-card rounded-2xl border border-border shadow-sm text-center py-16">
					<div className="flex flex-col items-center gap-2">
						<Layers className="w-10 h-10 text-muted-foreground/40" />
						<p className="text-sm font-bold text-muted-foreground">
							No services found
						</p>
					</div>
				</div>
			) : (
				<div className="space-y-4">
					{categories.map((group) => {
						const servedCount = group.services.filter(
							(s) => s.isActive,
						).length;
						return (
							<div
								key={group.category.id}
								className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
							>
								{/* Category Header */}
								<div className="flex items-center justify-between px-5 py-3 bg-muted/30 border-b border-border">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
											<Tag className="w-4 h-4 text-primary" />
										</div>
										<div>
											<h3 className="text-sm font-black text-foreground">
												{group.category.name}
											</h3>
											<p className="text-[11px] text-muted-foreground">
												{servedCount}/{group.services.length} served
											</p>
										</div>
									</div>
									<Badge
										variant="outline"
										className="bg-primary/10 text-primary border-primary/20 font-bold text-[10px] px-2 py-0.5"
									>
										{group.services.length} services
									</Badge>
								</div>

								{/* Services List */}
								<div className="divide-y divide-border">
									{group.services.map((service) => (
										<div
											key={service.id}
											className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors"
										>
											<div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
												<div className="relative w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
													<ServiceImage
														src={service.imageUrl || undefined}
														alt={service.name}
														sizes="40px"
														className="object-cover"
													/>
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2">
														<p className="text-sm font-bold text-foreground truncate">
															{service.name}
														</p>
														<Badge
															variant="outline"
															className={`font-bold text-[10px] px-2 py-0.5 shrink-0 ${
																service.isActive
																	? "bg-emerald-50 text-emerald-700 border-emerald-200"
																	: "bg-red-50 text-red-700 border-red-200"
															}`}
														>
															{service.isActive
																? "Active"
																: "Inactive"}
														</Badge>
													</div>
													{service.description && (
														<p className="text-xs text-muted-foreground truncate mt-0.5 max-w-[400px]">
															{service.description}
														</p>
													)}
												</div>
											</div>
											<Switch
												checked={service.isActive}
												onCheckedChange={() =>
													setPendingToggle({
														serviceId: service.id,
														serviceName: service.name,
														currentActive: service.isActive,
													})
												}
												disabled={isPending}
											/>
										</div>
									))}
								</div>
							</div>
						);
					})}
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
		useUpdateVendorOfferStatus();

	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

	const isPending = isUpdating || isDeleting || isStatusPending;
	const offer = vendor.vendorOffer;

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			type: (offer?.type || "PERCENTAGE") as OfferType,
			title: offer?.title || "",
			description: offer?.description || "",
			value: offer?.value || "",
			startDate: offer?.startDate
				? new Date(offer.startDate).toISOString().split("T")[0]
				: new Date().toISOString().split("T")[0],
			hasExpireDate: offer?.hasExpireDate || false,
			endDate: offer?.endDate
				? new Date(offer.endDate).toISOString().split("T")[0]
				: "",
		},
		validate: (values) => {
			const errors: Record<string, string> = {};
			if (values.type !== "TEXT" && !values.value) {
				errors.value = "Value is required";
			}
			if (values.type === "TEXT" && !values.title) {
				errors.title = "Title is required";
			}
			if (!values.startDate) {
				errors.startDate = "Start date is required";
			}
			return errors;
		},
		onSubmit: (values) => {
			const payload: Record<string, unknown> = {
				type: values.type,
				description: values.description,
				startDate: values.startDate,
				hasExpireDate: values.hasExpireDate,
				endDate: values.endDate,
			};
			if (values.type === "TEXT") {
				payload.title = values.title;
			} else {
				payload.value = Number(values.value);
			}
			updateOffer(
				{ id: vendorId, data: payload as VendorOfferPayload },
				{
					onSuccess: () => {
						toast.success(
							offer
								? "Offer updated successfully"
								: "Offer created successfully",
						);
						setIsSheetOpen(false);
					},
					onError: (error: { message?: string }) => {
						toast.error(error?.message || "Failed to save offer");
					},
				},
			);
		},
	});

	const handleDelete = () => {
		deleteOffer(vendorId, {
			onSuccess: () => {
				toast.success("Offer deleted successfully");
				setDeleteConfirmOpen(false);
			},
			onError: (error: { message?: string }) => {
				toast.error(error?.message || "Failed to delete offer");
			},
		});
	};

	const handleStatusToggle = (isActive: boolean) => {
		updateOfferStatus(
			{ id: vendorId, data: { isActive } },
			{
				onSuccess: () => {
					toast.success(
						isActive ? "Offer activated" : "Offer deactivated",
					);
				},
				onError: (error: { message?: string }) => {
					toast.error(error?.message || "Failed to update offer status");
				},
			},
		);
	};

	return (
		<div className="space-y-4">
			{/* Delete Confirmation Dialog */}
			<AlertDialog
				open={deleteConfirmOpen}
				onOpenChange={setDeleteConfirmOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
							<AlertTriangle className="w-6 h-6 text-destructive" />
						</div>
						<AlertDialogTitle className="text-center">
							Delete Offer
						</AlertDialogTitle>
						<AlertDialogDescription className="text-center">
							Are you sure you want to delete this offer? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Create/Edit Offer Sheet */}
			<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
				<SheetContent className="w-full sm:max-w-lg overflow-y-auto custom-scrollbar">
					<SheetHeader>
						<SheetTitle className="flex items-center gap-2">
							<Gift className="w-5 h-5 text-primary" />
							{offer ? "Edit Offer" : "Create Offer"}
						</SheetTitle>
						<SheetDescription>
							{offer
								? "Update the offer details below."
								: "Fill in the details to create a new offer for this vendor."}
						</SheetDescription>
					</SheetHeader>

					<form onSubmit={formik.handleSubmit} className="space-y-5 mt-6">
						{/* Offer Type */}
						<div className="space-y-2">
							<label className="text-xs font-bold text-foreground">
								Offer Type *
							</label>
							<select
								name="type"
								value={formik.values.type}
								onChange={(e) =>
									formik.setFieldValue(
										"type",
										e.target.value as OfferType,
									)
								}
								className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
							>
								{Object.values(OFFER_TYPE).map((type) => (
									<option key={type} value={type}>
										{type === "PERCENTAGE"
											? "Percentage Discount"
											: type === "FLAT"
												? "Flat Discount"
												: "Text Offer"}
									</option>
								))}
							</select>
						</div>

						{/* Value - only show when type is not TEXT */}
						{formik.values.type !== "TEXT" && (
							<div className="space-y-2">
								<label className="text-xs font-bold text-foreground">
									{formik.values.type === "PERCENTAGE"
										? "Percentage *"
										: "Amount *"}
								</label>
								<div className="relative">
									{formik.values.type === "FLAT" && (
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
											৳
										</span>
									)}
									<Input
										name="value"
										type="number"
										value={formik.values.value}
										onChange={formik.handleChange}
										placeholder={
											formik.values.type === "PERCENTAGE"
												? "e.g. 10"
												: "e.g. 500"
										}
										className={`h-10 ${formik.values.type === "FLAT" ? "pl-8" : ""}`}
										min="0"
										max={
											formik.values.type === "PERCENTAGE"
												? "100"
												: undefined
										}
									/>
									{formik.values.type === "PERCENTAGE" && (
										<span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
											%
										</span>
									)}
								</div>
								{formik.errors.value && (
									<p className="text-xs text-destructive">
										{formik.errors.value}
									</p>
								)}
							</div>
						)}

						{/* Title - only show when type is TEXT */}
						{formik.values.type === "TEXT" && (
							<div className="space-y-2">
								<label className="text-xs font-bold text-foreground">
									Title *
								</label>
								<Input
									name="title"
									value={formik.values.title}
									onChange={formik.handleChange}
									placeholder="e.g. Free Service"
									className="h-10"
								/>
								{formik.errors.title && (
									<p className="text-xs text-destructive">
										{formik.errors.title}
									</p>
								)}
							</div>
						)}

						{/* Description */}
						<div className="space-y-2">
							<label className="text-xs font-bold text-foreground">
								Description
							</label>
							<textarea
								name="description"
								value={formik.values.description}
								onChange={formik.handleChange}
								placeholder="Describe the offer..."
								rows={3}
								className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
							/>
						</div>

						{/* Dates */}
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-xs font-bold text-foreground">
									Start Date *
								</label>
								<Input
									name="startDate"
									type="date"
									value={formik.values.startDate}
									onChange={formik.handleChange}
									className="h-10"
								/>
							</div>
							<div className="space-y-2">
								<label className="text-xs font-bold text-foreground">
									End Date
								</label>
								<Input
									name="endDate"
									type="date"
									value={formik.values.endDate}
									onChange={formik.handleChange}
									disabled={!formik.values.hasExpireDate}
									className="h-10"
								/>
							</div>
						</div>

						{/* Has Expiry */}
						<div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
							<Switch
								checked={formik.values.hasExpireDate}
								onCheckedChange={(checked) => {
									formik.setFieldValue("hasExpireDate", checked);
									if (!checked) {
										formik.setFieldValue("endDate", "");
									}
								}}
							/>
							<div>
								<p className="text-sm font-bold text-foreground">
									Has Expiry Date
								</p>
								<p className="text-[11px] text-muted-foreground">
									Set an end date for this offer
								</p>
							</div>
						</div>

						<SheetFooter className="pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsSheetOpen(false)}
								className="h-10"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={
									isPending || Object.keys(formik.errors).length > 0
								}
								className="h-10"
							>
								{isPending ? (
									<Loader2 className="w-4 h-4 animate-spin mr-2" />
								) : (
									<Save className="w-4 h-4 mr-2" />
								)}
								{offer ? "Update Offer" : "Create Offer"}
							</Button>
						</SheetFooter>
					</form>
				</SheetContent>
			</Sheet>

			{/* Header Card */}
			<div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
				<div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
							<Gift className="w-5 h-5 text-primary" />
						</div>
						<div>
							<h2 className="text-lg font-black text-foreground">
								Offer & Discount
							</h2>
							<p className="text-xs text-muted-foreground">
								{offer
									? "Manage the vendor's current offer"
									: "Create an offer for this vendor"}
							</p>
						</div>
					</div>
					<Button
						onClick={() => setIsSheetOpen(true)}
						className="h-9 px-4 text-xs font-bold"
					>
						{offer ? (
							<>
								<Pencil className="w-3.5 h-3.5 mr-1.5" />
								Edit Offer
							</>
						) : (
							<>
								<Plus className="w-3.5 h-3.5 mr-1.5" />
								Create Offer
							</>
						)}
					</Button>
				</div>

				{/* Offer Content */}
				{!offer ? (
					<div className="text-center py-16">
						<div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
							<Gift className="w-8 h-8 text-muted-foreground/40" />
						</div>
						<p className="text-sm font-bold text-muted-foreground mb-1">
							No offer created yet
						</p>
						<p className="text-xs text-muted-foreground/60 mb-4">
							Create an offer to attract more customers
						</p>
						<Button
							onClick={() => setIsSheetOpen(true)}
							variant="outline"
							className="h-9 px-4 text-xs font-bold"
						>
							<Plus className="w-3.5 h-3.5 mr-1.5" />
							Create Offer
						</Button>
					</div>
				) : (
					<div className="p-6">
						{/* Status & Actions */}
						<div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
							<div className="flex items-center gap-3">
								<Badge
									variant="outline"
									className={`font-bold text-[11px] px-3 py-1 ${
										offer.isActive
											? "bg-emerald-50 text-emerald-700 border-emerald-200"
											: "bg-red-50 text-red-700 border-red-200"
									}`}
								>
									{offer.isActive ? "Active" : "Inactive"}
								</Badge>
								<span className="text-xs text-muted-foreground">
									{offer.type === "PERCENTAGE"
										? `${offer.value}% off`
										: offer.type === "FLAT"
											? `৳${offer.value} off`
											: offer.value}
								</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									<span className="text-xs font-bold text-muted-foreground">
										{offer.isActive ? "Active" : "Inactive"}
									</span>
									<Switch
										checked={offer.isActive}
										onCheckedChange={handleStatusToggle}
										disabled={isPending}
									/>
								</div>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => setDeleteConfirmOpen(true)}
									disabled={isPending}
									className="h-8 px-3 text-xs font-bold"
								>
									<Trash2 className="w-3.5 h-3.5 mr-1.5" />
									Delete
								</Button>
							</div>
						</div>

						{/* Offer Details */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							<div className="space-y-1.5">
								<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
									Type
								</label>
								<p className="text-sm font-bold text-foreground">
									{offer.type === "PERCENTAGE"
										? "Percentage Discount"
										: offer.type === "FLAT"
											? "Flat Discount"
											: "Text Offer"}
								</p>
							</div>
							{offer.value != null && (
								<div className="space-y-1.5">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										Value
									</label>
									<p className="text-sm font-bold text-foreground">
										{offer.type === "PERCENTAGE"
											? `${offer.value}%`
											: `৳${offer.value}`}
									</p>
								</div>
							)}
							{offer.title && (
								<div className="space-y-1.5">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										Title
									</label>
									<p className="text-sm font-bold text-foreground">
										{offer.title}
									</p>
								</div>
							)}
							{offer.description && (
								<div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										Description
									</label>
									<p className="text-sm text-foreground">
										{offer.description}
									</p>
								</div>
							)}
							<div className="space-y-1.5">
								<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
									Start Date
								</label>
								<p className="text-sm text-foreground">
									{new Date(offer.startDate).toLocaleDateString()}
								</p>
							</div>
							{offer.hasExpireDate && offer.endDate && (
								<div className="space-y-1.5">
									<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
										End Date
									</label>
									<p className="text-sm text-foreground">
										{new Date(offer.endDate).toLocaleDateString()}
									</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

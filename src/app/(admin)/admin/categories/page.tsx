"use client";

import { useState } from "react";
import { useFormik } from "formik";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useCategories,
	useCreateCategory,
	useUpdateCategory,
	useUpdateCategoryStatus,
	useDeleteCategory,
} from "@/lib/api/category/hooks";
import type { Category } from "@/lib/api/category";
import {
	ChevronLeft,
	ChevronRight,
	ImagePlus,
	Loader2,
	Pencil,
	Plus,
	Tag,
	Trash2,
} from "lucide-react";
import Image from "next/image";

const PAGE_SIZE = 10;

export default function AdminCategoriesPage() {
	const [page, setPage] = useState(1);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
	const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);

	const { data, isLoading } = useCategories({ page, limit: PAGE_SIZE });
	const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
	const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
	const { mutate: updateStatus } = useUpdateCategoryStatus();
	const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

	const categories = data?.data ?? [];
	const meta = data?.meta;

	const handleStatusChange = (id: number, isActive: boolean) => {
		setUpdatingStatusId(id);
		updateStatus(
			{ id, data: { isActive } },
			{ onSettled: () => setUpdatingStatusId(null) },
		);
	};

	const handleDelete = () => {
		if (deletingCategory) {
			deleteCategory(deletingCategory.id, {
				onSuccess: () => setDeletingCategory(null),
			});
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
						<Tag className="w-3.5 h-3.5" />
						<span>Service Categories</span>
					</div>
					<h1 className="text-2xl font-black text-foreground mt-1">
						Manage Categories
					</h1>
				</div>
				<Button size="sm" onClick={() => setIsCreateOpen(true)}>
					<Plus className="w-3.5 h-3.5 mr-1" />
					Add Category
				</Button>
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
									Category
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Description
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Services
								</TableHead>
								<TableHead className="font-bold text-foreground">
									Vendors
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
							{categories.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} className="text-center py-10">
										<p className="text-sm text-muted-foreground">
											No categories found
										</p>
									</TableCell>
								</TableRow>
							) : (
								categories.map((cat) => {
									const isStatusUpdating = updatingStatusId === cat.id;
									return (
										<TableRow key={cat.id} className="hover:bg-muted/30">
											<TableCell>
												<div className="flex items-center gap-3">
													{cat.imageUrl ? (
														<div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
															<Image
																src={cat.imageUrl}
																alt={cat.name}
																fill
																sizes="36px"
																className="object-cover"
															/>
														</div>
													) : (
														<div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
															<Tag className="w-4 h-4 text-primary" />
														</div>
													)}
													<p className="text-sm font-bold text-foreground">
														{cat.name}
													</p>
												</div>
											</TableCell>
											<TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
												{cat.description || "-"}
											</TableCell>
											<TableCell className="text-sm font-bold text-foreground">
												{cat.totalServices || 0}
											</TableCell>
											<TableCell className="text-sm font-bold text-foreground">
												{cat.totalVendors || 0}
											</TableCell>
											<TableCell onClick={(e) => e.stopPropagation()}>
												{isStatusUpdating ? (
													<Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
												) : (
													<Switch
														checked={cat.isActive}
														onCheckedChange={(checked) =>
															handleStatusChange(cat.id, checked)
														}
													/>
												)}
											</TableCell>
											<TableCell>
												<div className="flex items-center justify-end gap-1">
													<Button
														variant="ghost"
														size="icon-sm"
														onClick={() => setEditingCategory(cat)}
													>
														<Pencil className="w-4 h-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon-sm"
														onClick={() => setDeletingCategory(cat)}
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
								<span className="font-bold text-foreground">{meta.total}</span>{" "}
								categories
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

			{/* Create Category Sheet */}
			<CategorySheet
				open={isCreateOpen}
				onOpenChange={setIsCreateOpen}
				onSubmit={(values) =>
					createCategory(values, { onSuccess: () => setIsCreateOpen(false) })
				}
				isPending={isCreating}
				title="Create Category"
				description="Add a new category to organize your services."
			/>

			{/* Edit Category Sheet */}
			{editingCategory && (
				<CategorySheet
					open={!!editingCategory}
					onOpenChange={(open) => !open && setEditingCategory(null)}
					initialValues={{
						name: editingCategory.name,
						description: editingCategory.description || "",
					}}
					onSubmit={(values) =>
						updateCategory(
							{ id: editingCategory.id, data: values },
							{ onSuccess: () => setEditingCategory(null) },
						)
					}
					isPending={isUpdating}
					title="Edit Category"
					description="Update the category details below."
				/>
			)}

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				open={!!deletingCategory}
				onOpenChange={(open) => !open && setDeletingCategory(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Category</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete{" "}
							<span className="font-bold text-foreground">
								{deletingCategory?.name}
							</span>
							? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
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

// Category Sheet Component
function CategorySheet({
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
	initialValues?: { name: string; description: string };
	onSubmit: (values: {
		name: string;
		description?: string;
		image?: File;
	}) => void;
	isPending: boolean;
	title: string;
	description: string;
}) {
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const formik = useFormik<{
		name: string;
		description: string;
		image?: File;
	}>({
		enableReinitialize: true,
		initialValues: {
			name: initialValues?.name || "",
			description: initialValues?.description || "",
			image: undefined,
		},
		validate: (values) => {
			const errors: Partial<typeof values> = {};
			if (!values.name) errors.name = "Name is required";
			return errors;
		},
		onSubmit: (values) => {
			onSubmit({
				name: values.name,
				description: values.description || undefined,
				image: values.image,
			});
		},
	});

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImagePreview(URL.createObjectURL(file));
			formik.setFieldValue("image", file);
		}
	};

	const handleClose = () => {
		formik.resetForm();
		setImagePreview(null);
		onOpenChange(false);
	};

	return (
		<Sheet open={open} onOpenChange={handleClose}>
			<SheetContent className="sm:max-w-md">
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>
				<form onSubmit={formik.handleSubmit} className="space-y-4 mt-6">
					<div className="space-y-1.5">
						<label className="text-xs font-bold text-foreground">
							Name <span className="text-destructive">*</span>
						</label>
						<Input
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="e.g. Cleaning, Electrical"
							className="h-10 text-sm"
						/>
						{formik.touched.name && formik.errors.name && (
							<p className="text-[11px] text-destructive">{formik.errors.name}</p>
						)}
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
							placeholder="Optional description"
							rows={3}
							className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-bold text-foreground">
							Category Image
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
							{isPending && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
							{initialValues ? "Update" : "Create"}
						</Button>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}

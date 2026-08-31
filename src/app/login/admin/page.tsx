"use client";

import PasswordInput from "@/components/global/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLoginMutate from "@/lib/api/auth/useLoginMutate";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
	const { mutate, isPending, error } = useLoginMutate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate: (values) => {
			const errors: Partial<typeof values> = {};
			if (!values.email) {
				errors.email = "Email is required";
			} else if (!/\S+@\S+\.\S+/.test(values.email)) {
				errors.email = "Invalid email format";
			}
			if (!values.password) {
				errors.password = "Password is required";
			} else if (values.password.length < 6) {
				errors.password = "Password must be at least 6 characters";
			}
			return errors;
		},
		onSubmit: (values) => {
			mutate(values);
		},
	});

	return (
		<div className="min-h-screen flex">
			{/* Left - Branding */}
			<div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
				<div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[20px_20px]" />
				<div className="absolute -top-32 -left-32 w-64 h-64 bg-secondary/30 rounded-full blur-3xl" />
				<div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

				<div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 w-full">
					<div className="flex items-center gap-3 mb-8">
						<Image
							src="/shebapro.png"
							alt="ShebaPro"
							width={44}
							height={44}
							className="rounded-xl object-contain"
						/>
						<div>
							<span className="text-xl font-extrabold text-white leading-none">
								ShebaPro
							</span>
							<span className="text-[10px] text-white/50 font-bold uppercase tracking-widest block mt-0.5">
								Admin Console
							</span>
						</div>
					</div>

					<h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
						Manage Your
						<br />
						<span className="text-accent">Service Platform</span>
					</h1>
					<p className="text-sm text-white/60 mt-4 max-w-md leading-relaxed">
						Full control over vendors, bookings, categories, and customer
						support. Monitor performance and scale your marketplace.
					</p>

					<div className="mt-10 flex items-center gap-6 text-xs text-white/50">
						<span className="flex items-center gap-2">
							<ShieldCheck className="w-4 h-4 text-accent" />
							Secure Access
						</span>
						<span className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-accent" />
							Real-time Analytics
						</span>
					</div>
				</div>
			</div>

			{/* Right - Form */}
			<div className="flex-1 flex flex-col">
				{/* Mobile Logo */}
				<div className="lg:hidden p-6">
					<Link href="/" className="flex items-center gap-2.5">
						<Image
							src="/shebapro.png"
							alt="ShebaPro"
							width={36}
							height={36}
							className="rounded-lg object-contain"
						/>
						<span className="font-extrabold text-lg text-foreground">
							Sheba<span className="text-secondary">Pro</span>
						</span>
					</Link>
				</div>

				{/* Form Area */}
				<div className="flex-1 flex items-center justify-center p-6 sm:p-10">
					<div className="w-full max-w-sm">
						{/* Badge */}
						<div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold mb-6">
							<ShieldCheck className="w-3.5 h-3.5" />
							<span>Super Admin Access</span>
						</div>

						{/* Title */}
						<h2 className="text-2xl font-black text-foreground">
							Sign in to Admin
						</h2>
						<p className="text-sm text-muted-foreground mt-1.5">
							Enter your credentials to access the admin panel
						</p>

						{/* Error Alert */}
						{error && (
							<div className="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
								{(error as { message?: string })?.message || "Login failed. Please try again."}
							</div>
						)}

						{/* Form */}
						<form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
							<div className="space-y-1.5">
								<label className="block text-xs font-bold text-foreground">
									Email Address
								</label>
								<div className="relative">
									<Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
									<Input
										type="email"
										name="email"
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										placeholder="admin@shebapro.com"
										className="h-11 pl-10 bg-muted/50 border-border text-sm rounded-xl focus-visible:ring-primary/20"
									/>
								</div>
								{formik.touched.email && formik.errors.email && (
									<p className="text-[11px] text-destructive">{formik.errors.email}</p>
								)}
							</div>

							<PasswordInput
								label="Password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Enter your password"
							/>
							{formik.touched.password && formik.errors.password && (
								<p className="text-[11px] text-destructive">{formik.errors.password}</p>
							)}

							<div className="flex items-center justify-between pt-1">
								<label className="flex items-center gap-2 cursor-pointer select-none">
									<input
										type="checkbox"
										defaultChecked
										className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
									/>
									<span className="text-xs font-medium text-muted-foreground">
										Remember me
									</span>
								</label>
								<a href="#" className="text-xs font-bold text-primary hover:underline">
									Forgot password?
								</a>
							</div>

							<Button
								type="submit"
								disabled={isPending}
								className="w-full h-11 rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
							>
								{isPending ? (
									<div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
								) : (
									<>
										Sign In
										<ArrowRight className="w-4 h-4 ml-1" />
									</>
								)}
							</Button>
						</form>

						<p className="mt-6 text-center text-xs text-muted-foreground">
							<Link href="/login/vendor" className="font-bold text-primary hover:underline">
								Vendor login?
							</Link>
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="p-6 text-center text-[11px] text-muted-foreground border-t border-border">
					© {new Date().getFullYear()} ShebaPro. Admin Console.
				</div>
			</div>
		</div>
	);
}

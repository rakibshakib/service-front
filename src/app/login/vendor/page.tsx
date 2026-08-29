"use client";

import PasswordInput from "@/components/global/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Building2, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VendorLoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email || !password) {
			setError("Please enter both email and password.");
			return;
		}

		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			alert("Logged in as Vendor!");
		}, 1200);
	};

	return (
		<div className="min-h-screen flex">
			{/* Left - Branding */}
			<div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden">
				<div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[20px_20px]" />
				<div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
				<div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

				<div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 w-full">
					<div className="flex items-center gap-3 mb-8">
						<Image
							src="/shebapro.png"
							alt="ShebaPro"
							width={44}
							height={44}
							className="rounded-xl shadow-md group-hover:scale-105 transition-transform object-contain bg-accent-foreground"
						/>
						<div>
							<span className="text-xl font-extrabold text-white leading-none">
								ShebaPro
							</span>
							<span className="text-[10px] text-white/50 font-bold uppercase tracking-widest block mt-0.5">
								Vendor Portal
							</span>
						</div>
					</div>

					<h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
						Grow Your
						<br />
						<span className="text-accent">Service Business</span>
					</h1>
					<p className="text-sm text-white/60 mt-4 max-w-md leading-relaxed">
						Manage your services, track bookings, and connect with
						customers across Bangladesh. Scale your business with
						ShebaPro.
					</p>

					<div className="mt-10 flex items-center gap-6 text-xs text-white/50">
						<span className="flex items-center gap-2">
							<Sparkles className="w-4 h-4 text-accent" />
							Verified Partner
						</span>
						<span className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-accent" />
							Instant Payouts
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
						<div className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-xs font-bold mb-6">
							<Building2 className="w-3.5 h-3.5" />
							<span>Vendor Access</span>
						</div>

						{/* Title */}
						<h2 className="text-2xl font-black text-foreground">
							Sign in to Vendor Portal
						</h2>
						<p className="text-sm text-muted-foreground mt-1.5">
							Enter your credentials to manage your services
						</p>

						{/* Error */}
						{error && (
							<div className="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
								{error}
							</div>
						)}

						{/* Form */}
						<form onSubmit={handleSubmit} className="mt-6 space-y-4">
							<div className="space-y-1.5">
								<label className="block text-xs font-bold text-foreground">
									Business Email
								</label>
								<div className="relative">
									<Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
									<Input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="vendor@company.com"
										className="h-11 pl-10 bg-muted/50 border-border text-sm rounded-xl focus-visible:ring-primary/20"
									/>
								</div>
							</div>

							<PasswordInput
								label="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
							/>

							<div className="flex items-center justify-between pt-1">
								<label className="flex items-center gap-2 cursor-pointer select-none">
									<input
										type="checkbox"
										defaultChecked
										className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary/20"
									/>
									<span className="text-xs font-medium text-muted-foreground">
										Remember me
									</span>
								</label>
								<a
									href="#"
									className="text-xs font-bold text-secondary hover:underline"
								>
									Forgot password?
								</a>
							</div>

							<Button
								type="submit"
								disabled={isLoading}
								variant="secondary"
								className="w-full h-11 rounded-xl font-bold text-sm shadow-lg shadow-secondary/20"
							>
								{isLoading ? (
									<div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
								) : (
									<>
										Sign In
										<ArrowRight className="w-4 h-4 ml-1" />
									</>
								)}
							</Button>
						</form>

						<p className="mt-6 text-center text-xs text-muted-foreground">
							New vendor?{" "}
							<a
								href="#"
								className="font-bold text-secondary hover:underline"
							>
								Register here
							</a>
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="p-6 text-center text-[11px] text-muted-foreground border-t border-border">
					© {new Date().getFullYear()} ShebaPro. Vendor Portal.
				</div>
			</div>
		</div>
	);
}

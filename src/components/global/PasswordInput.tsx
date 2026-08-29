"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const PasswordInput = ({
	label,
	error,
	className,
	...props
}: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="space-y-1.5">
			{label && (
				<label className="block text-xs font-bold text-foreground">
					{label}
				</label>
			)}
			<div className="relative">
				<Input
					type={showPassword ? "text" : "password"}
					className={cn(
						"h-11 pl-4 pr-11 bg-muted/50 border-border text-sm rounded-xl focus-visible:ring-primary/20",
						error && "border-destructive focus-visible:ring-destructive/20",
						className,
					)}
					{...props}
				/>
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
				>
					{showPassword ? (
						<EyeOff className="w-4 h-4" />
					) : (
						<Eye className="w-4 h-4" />
					)}
				</button>
			</div>
			{error && (
				<p className="text-[11px] font-medium text-destructive">{error}</p>
			)}
		</div>
	);
};

export default PasswordInput;

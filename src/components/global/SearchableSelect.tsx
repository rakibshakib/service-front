"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

export interface SearchableSelectOption {
	label: string;
	value: string | number;
	disabled?: boolean;
}

interface SearchableSelectProps {
	options: SearchableSelectOption[];
	value?: string | number;
	onValueChange?: (value: string | number) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	disabled?: boolean;
	className?: string;
	clearable?: boolean;
	loading?: boolean;
	// API search mode
	onSearch?: (query: string) => void;
	isSearching?: boolean;
	// For external control
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const SearchableSelect = forwardRef<HTMLDivElement, SearchableSelectProps>(
	(
		{
			options,
			value,
			onValueChange,
			placeholder = "Select...",
			searchPlaceholder = "Search...",
			disabled = false,
			className,
			clearable = true,
			loading = false,
			onSearch,
			isSearching = false,
			open: controlledOpen,
			onOpenChange,
		},
		ref,
	) => {
		const [internalOpen, setInternalOpen] = useState(false);
		const [search, setSearch] = useState("");
		const [highlightedIndex, setHighlightedIndex] = useState(-1);

		const open = controlledOpen ?? internalOpen;
		const setOpen = onOpenChange ?? setInternalOpen;

		const containerRef = useRef<HTMLDivElement>(null);
		const searchInputRef = useRef<HTMLInputElement>(null);
		const listRef = useRef<HTMLDivElement>(null);

		const selectedOption = useMemo(
			() => options.find((opt) => opt.value === value),
			[options, value],
		);

		const filteredOptions = useMemo(() => {
			if (onSearch) return options; // API mode handles filtering externally
			if (!search) return options;
			return options.filter((opt) =>
				opt.label.toLowerCase().includes(search.toLowerCase()),
			);
		}, [options, search, onSearch]);

		const handleSelect = useCallback(
			(option: SearchableSelectOption) => {
				if (option.disabled) return;
				onValueChange?.(option.value);
				setOpen(false);
				setSearch("");
				setHighlightedIndex(-1);
			},
			[onValueChange, setOpen],
		);

		const handleClear = useCallback(
			(e: React.MouseEvent) => {
				e.stopPropagation();
				onValueChange?.(undefined as unknown as string | number);
				setSearch("");
			},
			[onValueChange],
		);

		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (disabled) return;

				switch (e.key) {
					case "Enter":
						e.preventDefault();
						if (open && highlightedIndex >= 0) {
							handleSelect(filteredOptions[highlightedIndex]);
						} else if (!open) {
							setOpen(true);
						}
						break;
					case "ArrowDown":
						e.preventDefault();
						if (!open) {
							setOpen(true);
						} else {
							setHighlightedIndex((prev) =>
								prev < filteredOptions.length - 1 ? prev + 1 : 0,
							);
						}
						break;
					case "ArrowUp":
						e.preventDefault();
						if (open) {
							setHighlightedIndex((prev) =>
								prev > 0 ? prev - 1 : filteredOptions.length - 1,
							);
						}
						break;
					case "Escape":
						setOpen(false);
						setSearch("");
						setHighlightedIndex(-1);
						break;
				}
			},
			[disabled, open, highlightedIndex, filteredOptions, handleSelect, setOpen],
		);

		// Close on outside click
		useEffect(() => {
			const handleClickOutside = (e: MouseEvent) => {
				if (
					containerRef.current &&
					!containerRef.current.contains(e.target as Node)
				) {
					setOpen(false);
					setSearch("");
					setHighlightedIndex(-1);
				}
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}, [setOpen]);

		// Focus search input when opened
		useEffect(() => {
			if (open) {
				setTimeout(() => searchInputRef.current?.focus(), 50);
			}
		}, [open]);

		// Scroll highlighted item into view
		useEffect(() => {
			if (highlightedIndex >= 0 && listRef.current) {
				const item = listRef.current.children[highlightedIndex] as HTMLElement;
				if (item) {
					item.scrollIntoView({ block: "nearest" });
				}
			}
		}, [highlightedIndex]);

		// API search with debounce
		useEffect(() => {
			if (onSearch && open) {
				const timer = setTimeout(() => {
					onSearch(search);
				}, 300);
				return () => clearTimeout(timer);
			}
		}, [search, onSearch, open]);

		// Merge refs
		const mergedRef = useCallback(
			(node: HTMLDivElement | null) => {
				(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
				if (typeof ref === "function") {
					ref(node);
				} else if (ref) {
					(ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
				}
			},
			[ref],
		);

		return (
			<div ref={mergedRef} className={cn("relative", className)}>
				{/* Trigger */}
				<button
					type="button"
					onClick={() => {
						if (!disabled) setOpen(!open);
					}}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					className={cn(
						"flex h-10 w-full items-center justify-between rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors",
						"focus:outline-none focus:ring-2 focus:ring-ring",
						"disabled:cursor-not-allowed disabled:opacity-50",
						open ? "border-ring ring-2 ring-ring/50" : "border-input",
						selectedOption
							? "text-foreground"
							: "text-muted-foreground",
					)}
				>
					<span className="truncate">
						{selectedOption ? selectedOption.label : placeholder}
					</span>
					<div className="flex items-center gap-1 shrink-0 ml-2">
						{clearable && selectedOption && !disabled && (
							<span
								onClick={handleClear}
								className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
							>
								<X className="w-3.5 h-3.5" />
							</span>
						)}
						<ChevronDown
							className={cn(
								"w-4 h-4 text-muted-foreground transition-transform",
								open && "rotate-180",
							)}
						/>
					</div>
				</button>

				{/* Dropdown */}
				{open && (
					<div
						ref={listRef}
						className={cn(
							"absolute z-[100] mt-1 w-full min-w-[200px] max-h-[240px] overflow-y-auto custom-scrollbar",
							"rounded-lg border border-border bg-popover text-popover-foreground shadow-lg",
							"animate-in fade-in-0 zoom-in-95",
						)}
					>
						{/* Search Input */}
						<div className="sticky top-0 z-10 p-2 bg-popover border-b border-border">
							<div className="relative">
								<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
								<input
									ref={searchInputRef}
									type="text"
									value={search}
									onChange={(e) => {
										setSearch(e.target.value);
										setHighlightedIndex(-1);
									}}
									onKeyDown={handleKeyDown}
									placeholder={searchPlaceholder}
									className="w-full h-8 pl-8 pr-3 text-xs bg-muted/50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
								/>
								{(isSearching || loading) && (
									<Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground animate-spin" />
								)}
							</div>
						</div>

						{/* Options List */}
						<div className="p-1">
							{filteredOptions.length === 0 ? (
								<div className="py-6 text-center text-xs text-muted-foreground">
									{isSearching ? "Searching..." : "No options found"}
								</div>
							) : (
								filteredOptions.map((option, index) => {
									const isSelected = option.value === value;
									const isHighlighted = index === highlightedIndex;
									return (
										<div
											key={option.value}
											onClick={() => handleSelect(option)}
											onMouseEnter={() => setHighlightedIndex(index)}
											className={cn(
												"flex items-center gap-2 px-2.5 py-2 text-sm rounded-md cursor-pointer transition-colors",
												option.disabled && "opacity-50 cursor-not-allowed",
												isSelected &&
													"bg-primary/10 text-primary font-medium",
												!isSelected &&
													isHighlighted &&
													"bg-accent text-accent-foreground",
												!isSelected &&
													!isHighlighted &&
													"text-foreground hover:bg-muted",
											)}
										>
											<div
												className={cn(
													"w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
													isSelected
														? "border-primary bg-primary"
														: "border-muted-foreground/30",
												)}
											>
												{isSelected && (
													<Check className="w-2.5 h-2.5 text-primary-foreground" />
												)}
											</div>
											<span className="truncate">{option.label}</span>
										</div>
									);
								})
							)}
						</div>
					</div>
				)}
			</div>
		);
	},
);

SearchableSelect.displayName = "SearchableSelect";

export default SearchableSelect;

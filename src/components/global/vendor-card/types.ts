export interface Vendor {
	id: number;
	name: string;
	jobs: string;
	rating: number;
	reviewsCount: number;
	badge: string;
	avatar: string;
	specialty: string;
	coverBg: string;
	logoBg: string;
	responseTime: string;
	location: string;
	skills: string[];
	isOnline: boolean;
	startingPrice: number;
	introDiscount?: string;
	joined?: string;
}

export interface VendorCardComputed extends Vendor {}

export interface VendorCardProps {
	vendor: Vendor;
	isFav?: boolean;
	toggleFavorite?: (id: number, e: React.MouseEvent) => void;
}

export interface FeaturedProps {
	vendor: VendorCardComputed;
}

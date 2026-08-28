export interface Vendor {
	name: string;
	avatar?: string;
	rating?: number;
}

export interface Service {
	name: string;
	shortDescription: string;
	basePrice: number;
	discountAmount?: number;
	discountType?: "percent" | "flat";
	image?: string;
	category?: string;
	vendors?: Vendor[];
}

export interface ServiceCardComputed {
	service: Service;
	finalPrice: number;
	hasDiscount: boolean;
	avgRating: number;
}

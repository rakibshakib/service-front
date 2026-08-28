import Vertical from "./Vertical";
import Horizontal from "./Horizontal";
import type { Service, ServiceCardComputed } from "./types";

interface ServiceCardProps {
	service: Service;
	variant?: "vertical" | "horizontal";
}

const ServiceCard = ({ service, variant = "vertical" }: ServiceCardProps) => {
	const {
		basePrice,
		discountAmount = 0,
		discountType,
		vendors = [],
	} = service;

	const calculateFinalPrice = () => {
		if (!discountAmount || discountAmount <= 0) return basePrice;

		if (discountType === "percent") {
			return basePrice - (basePrice * discountAmount) / 100;
		}
		if (discountType === "flat") {
			return Math.max(0, basePrice - discountAmount);
		}
		return basePrice;
	};

	const computed: ServiceCardComputed = {
		service,
		finalPrice: calculateFinalPrice(),
		hasDiscount: discountAmount > 0,
		avgRating:
			vendors.length > 0
				? vendors.reduce((sum, v) => sum + (v.rating || 0), 0) / vendors.length
				: 0,
	};

	if (variant === "horizontal") {
		return <Horizontal {...computed} />;
	}

	return <Vertical {...computed} />;
};

export default ServiceCard;
export type { Service, Vendor } from "./types";

"use client";

import type { VendorCardProps } from "./types";
import Default from "./Default";
import Featured from "./Featured";

const VendorCard = ({
	vendor,
	variant = "default",
	...props
}: VendorCardProps & { variant?: "default" | "featured" }) => {
	if (variant === "featured") {
		return <Featured vendor={vendor} />;
	}

	return <Default vendor={vendor} isFav={props.isFav} toggleFavorite={props.toggleFavorite} />;
};

export default VendorCard;

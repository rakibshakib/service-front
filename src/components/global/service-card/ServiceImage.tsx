"use client";

import AlterImage from "@/helper/Image-contant";
import Image from "next/image";
import { useState } from "react";

interface ServiceImageProps {
	src?: string;
	alt: string;
	className?: string;
	sizes: string;
}

const ServiceImage = ({ src, alt, className, sizes }: ServiceImageProps) => {
	const [imgSrc, setImgSrc] = useState(src);
	const [hasError, setHasError] = useState(false);

	const showPlaceholder = !imgSrc || hasError;

	return (
		<Image
			src={showPlaceholder ? AlterImage.service.serviceAvatar : imgSrc}
			alt={alt}
			fill
			sizes={sizes}
			className={className}
			onError={() => {
				setImgSrc(undefined);
				setHasError(true);
			}}
		/>
	);
};

export default ServiceImage;

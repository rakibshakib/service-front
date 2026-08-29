"use client";
import { ReactNode } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";

interface SliderConfig {
	className?: string;
	spaceBetween?: number;
	centeredSlides?: boolean;
	centerInsufficientSlides?: boolean;
	breakpoints?: SwiperOptions["breakpoints"];
	navigation?: boolean;
	pagination?: boolean;
	loop?: boolean;
	autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
}

interface SliderProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => ReactNode;
	config?: SliderConfig;
}

const defaultBreakpoints: SwiperOptions["breakpoints"] = {
	0: {
		slidesPerView: 1.2,
		spaceBetween: 8,
	},
	480: {
		slidesPerView: 2,
		spaceBetween: 12,
	},
	640: {
		slidesPerView: 2.9,
		spaceBetween: 14,
	},
	768: {
		slidesPerView: 3.2,
		spaceBetween: 14,
	},
	1024: {
		slidesPerView: 3.6,
		spaceBetween: 16,
	},
	1280: {
		slidesPerView: 4.2,
		spaceBetween: 16,
	},
};

function Slider<T>({ data, renderItem, config = {} }: SliderProps<T>) {
	const {
		className = "",
		spaceBetween = 16,
		centeredSlides = false,
		centerInsufficientSlides = true,
		breakpoints = defaultBreakpoints,
		navigation = false,
		pagination = false,
		loop = false,
		autoplay = false,
	} = config;

	if (data?.length === 0) {
		return null;
	}

	const autoplayConfig =
		autoplay === true
			? { delay: 3000, disableOnInteraction: false }
			: typeof autoplay === "object"
				? { delay: 3000, disableOnInteraction: false, ...autoplay }
				: false;

	return (
		<Swiper
			modules={[Autoplay]}
			spaceBetween={spaceBetween}
			centeredSlides={centeredSlides}
			centerInsufficientSlides={loop ? false : centerInsufficientSlides}
			breakpoints={breakpoints}
			navigation={navigation}
			pagination={pagination ? { clickable: true } : false}
			loop={loop}
			autoplay={autoplayConfig || undefined}
			className={className}
		>
			{data.map((item, index) => (
				<SwiperSlide key={index} className="h-auto!">
					{renderItem(item, index)}
				</SwiperSlide>
			))}
		</Swiper>
	);
}

export default Slider;
export type { SliderConfig, SliderProps };

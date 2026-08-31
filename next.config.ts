import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "https",
				hostname: "opfxqefystdomhxikitd.supabase.co",
			},
		],
	},
};

export default nextConfig;

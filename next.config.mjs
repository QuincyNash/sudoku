import withPWA from "next-pwa";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	reactStrictMode: false,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	images: {
		domains: ["www.gstatic.com"],
	},
};

export default withPWA({
	nextConfig,
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === "development",
	},
});

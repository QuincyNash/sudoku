const withPWA = require("next-pwa");

const nextConfig = {
	reactStrictMode: false,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
};

module.exports = withPWA({
	nextConfig,
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === "development",
	},
	async redirects() {
		return [
			{
				source: "/play",
				destination: "/api/random",
				permanent: true,
			},
			{
				source: "/",
				destination: "/play/1",
				permanent: false,
			},
		];
	},
});

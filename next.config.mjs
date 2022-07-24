import withPWA from "next-pwa";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ["www.gstatic.com"],
	},
	env: {
		NEXT_PUBLIC_NAME: "WebSudoku",
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
};

export default withPWA({
	...nextConfig,
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === "development",
	},
});

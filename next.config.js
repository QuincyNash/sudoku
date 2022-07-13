/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	reactStrictMode: false,
};

module.exports = {
	nextConfig,

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

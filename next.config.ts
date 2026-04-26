import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "X-Frame-Options", value: "SAMEORIGIN" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
				],
			},
		];
	},
	async rewrites() {
		return [
			{ source: "/imprint", destination: "/gad-studios-wf/imprint.html" },
			{ source: "/privacy-policy", destination: "/gad-studios-wf/privacy-policy.html" },
			{ source: "/datenschutz", destination: "/gad-studios-wf/privacy-policy.html" },
		];
	},
};

export default nextConfig;

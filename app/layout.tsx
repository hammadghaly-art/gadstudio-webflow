import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.gad-studios.com"),
	icons: {
		icon: "/gad-favicon.png",
		apple: "/gad-favicon.png",
	},
	title: "Gad Studios | Cinematography · Photography · Sound",
	description:
		"Gad Studios – Kreatives Studio von Ahmed Gad & Melissa Ghaly. Film, Fotografie und Sound.",
	openGraph: {
		title: "Gad Studios | Cinematography · Photography · Sound",
		description: "Visual storytelling, Film & Fotografie.",
		type: "website",
		url: "https://www.gad-studios.com",
		images: ["/opengraph-image.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "Gad Studios | Cinematography · Photography · Sound",
		description: "Visual storytelling, Film & Fotografie.",
		images: ["/twitter-image.png"],
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="gad-html">
			<body className="gad-body">
				{children}
			</body>
		</html>
	);
}

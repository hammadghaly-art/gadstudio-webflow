import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Gad Studios | Cinematography · Photography · Sound",
	description:
		"Gad Studios – Kreatives Studio von Ahmed Gad & Melissa Ghaly. Film, Fotografie und Sound.",
	openGraph: {
		title: "Gad Studios | Cinematography · Photography · Sound",
		description: "Visual storytelling, Film & Fotografie.",
		type: "website",
		url: "https://www.gad-studios.com",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="gad-html">
			<body className="gad-body">
				{children}
			</body>
		</html>	);
}

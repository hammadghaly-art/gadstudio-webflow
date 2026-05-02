import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://www.gad-studios.com";

const SEO_TITLE = "Gad Studios | Cinematography · Photography · Sound";
const SEO_DESCRIPTION =
	"Gad Studios – Creative studio by Ahmed Gad & Melissa Ghaly. Cinematic film, photography, and sound design for premium brands and visual storytelling.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: { default: SEO_TITLE, template: "%s | Gad Studios" },
	description: SEO_DESCRIPTION,
	applicationName: "Gad Studios",
	authors: [{ name: "Ahmed Gad" }, { name: "Melissa Ghaly" }],
	creator: "Gad Studios",
	publisher: "Gad Studios",
	keywords: [
		"Gad Studios",
		"Ahmed Gad",
		"Melissa Ghaly",
		"Cinematography",
		"Photography",
		"Sound Design",
		"Visual Storytelling",
		"Brand Films",
		"Creative Studio Dubai",
		"Premium Video Production",
		"Documentary Photography",
	],
	category: "Arts & Entertainment",
	alternates: {
		canonical: siteUrl,
		languages: { en: siteUrl, "x-default": siteUrl },
	},
	icons: {
		icon: "/gad-favicon.png",
		apple: "/gad-favicon.png",
	},
	manifest: "/site.webmanifest",
	openGraph: {
		title: SEO_TITLE,
		description: SEO_DESCRIPTION,
		type: "website",
		url: siteUrl,
		locale: "en_US",
		siteName: "Gad Studios",
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "Gad Studios — Cinematography, Photography, Sound",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: SEO_TITLE,
		description: "Visual storytelling, Film & Photography.",
		images: ["/twitter-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Gad Studios",
	url: siteUrl,
	logo: `${siteUrl}/gad-favicon.png`,
	image: `${siteUrl}/opengraph-image.png`,
	description: SEO_DESCRIPTION,
	founder: [
		{ "@type": "Person", name: "Ahmed Gad" },
		{ "@type": "Person", name: "Melissa Ghaly" },
	],
};

const localBusinessSchema = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "Gad Studios",
	url: siteUrl,
	image: `${siteUrl}/opengraph-image.png`,
	priceRange: "$$$",
	description:
		"Premium cinematography, photography, and sound design studio specialized in brand films and visual storytelling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="gad-html">
			<body className="gad-body">
				{children}
				<Script
					id="schema-organization"
					type="application/ld+json"
					strategy="beforeInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Static JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
				/>
				<Script
					id="schema-business"
					type="application/ld+json"
					strategy="beforeInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Static JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
				/>
			</body>
		</html>
	);
}

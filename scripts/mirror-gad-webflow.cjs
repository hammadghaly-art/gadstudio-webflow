/**
 * Static mirror of https://gad-studios.webflow.io/ into public/gad-studios-wf
 * (only same-host pages — avoids crawling random external sites)
 *
 * Run: pnpm run mirror
 */
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const scrape = require("website-scraper");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "gad-studios-wf");
const startUrl = "https://gad-studios.webflow.io/";

if (fs.existsSync(outDir)) {
	fs.rmSync(outDir, { recursive: true, force: true });
}

function onlyGadWebflow(u) {
	try {
		return new URL(u).hostname === "gad-studios.webflow.io";
	} catch {
		return false;
	}
}

scrape({
	urls: [startUrl],
	directory: outDir,
	recursive: true,
	maxDepth: 4,
	urlFilter: onlyGadWebflow,
	request: {
		headers: {
			"user-agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
		},
	},
})
	.then(() => {
		console.log("mirror done →", outDir);
		try {
			execFileSync(process.execPath, [path.join(root, "scripts", "patch-gad-hrefs.mjs")], {
				cwd: root,
				stdio: "inherit",
			});
		} catch (e) {
			console.warn("patch-gad-hrefs:", (e && e.message) || e);
		}
	})
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});

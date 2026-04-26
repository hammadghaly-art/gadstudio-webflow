import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "../public/gad-studios-wf");
const files = ["index.html", "imprint.html", "privacy-policy.html"];

for (const f of files) {
	const p = path.join(dir, f);
	let s = fs.readFileSync(p, "utf8");
	const before = s;
	s = s.replaceAll('href="https://www.gad-studios.com/"', 'href="index.html"');
	// Cookie-Banner: Link zur Datenschutz-Seite (statische Kopie)
	s = s.replaceAll('href=\\"/datenschutz\\"', 'href=\\"privacy-policy.html\\"');
	s = s.replaceAll('href="/datenschutz"', 'href="privacy-policy.html"');
	// Reine href-Ziele, nicht data-wf-* Attribute
	s = s.replaceAll(
		'href="https://gad-studios.webflow.io/privacy-policy"',
		'href="privacy-policy.html"',
	);
	s = s.replaceAll('href="https://gad-studios.webflow.io/imprint"', 'href="imprint.html"');
	s = s.replaceAll('href="https://gad-studios.webflow.io/"', 'href="index.html"');
	// TCS-Seite blockt oft Iframe-Loads; in Next-Iframe-Wrapper Top-Level öffnen
	s = s.replaceAll(
		'href="https://tcs.gad-studios.com/" class="tab-link w-inline-block"><div class="text-block-2">Creative Shift</div>',
		'href="https://tcs.gad-studios.com/" target="_top" rel="noopener noreferrer" class="tab-link w-inline-block"><div class="text-block-2">Creative Shift</div>',
	);
	// Kein separater "Sounds"-Eintrag in der Nav
	s = s.replaceAll(
		'<div class="navigation-wrapper div-block-23"><div><a href="https://www.gad-studios.com/sounds" class="tab-link w-inline-block"><div class="text-block-2">Sounds</div><div class="hover-line"><div class="hover-line-fill"></div></div></a></div></div>',
		"",
	);
	s = s.replaceAll(
		'<div class="navigation-wrapper div-block-23"><div><a href="https://gad-studios.webflow.io/sounds" class="tab-link w-inline-block"><div class="text-block-2">Sounds</div><div class="hover-line"><div class="hover-line-fill"></div></div></a></div></div>',
		"",
	);
	if (s !== before) {
		fs.writeFileSync(p, s, "utf8");
		console.log("patched", f);
	}
}

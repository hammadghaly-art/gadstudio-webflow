import fs from "node:fs";

const buf = fs.readFileSync(new URL("./cookiebanner-gadstudio-v14.js", import.meta.url));
const b64 = buf.toString("base64");
const chunkSize = 1200;
const chunks = [];
for (let i = 0; i < b64.length; i += chunkSize) chunks.push(b64.slice(i, i + chunkSize));

const out = [];
for (let i = 0; i < chunks.length; i++) {
	const escaped = chunks[i].replace(/\\/g, "\\\\").replace(/"/g, '\\"');
	const code = `!function(){window.__g14=(window.__g14||"")+"${escaped}";}();`;
	if (code.length > 1990) {
		console.error("chunk too big", i, code.length);
		process.exit(1);
	}
	out.push(code);
}
const final =
	'!function(){try{var c=atob(window.__g14);new Function(c)();window.__g14="";}catch(e){}}();';
if (final.length > 1990) {
	console.error("final too big", final.length);
	process.exit(1);
}
out.push(final);

fs.writeFileSync(
	new URL("./cookiebanner-gadstudio-inline-chunks.json", import.meta.url),
	JSON.stringify({ chunks: out }, null, 0),
	"utf8",
);
console.log("gadstudio chunks", out.length, "maxLen", Math.max(...out.map((s) => s.length)));

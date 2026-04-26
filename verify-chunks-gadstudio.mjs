import fs from "node:fs";

const { chunks } = JSON.parse(
	fs.readFileSync(new URL("./cookiebanner-gadstudio-inline-chunks.json", import.meta.url), "utf8"),
);
let acc = "";
for (let i = 0; i < chunks.length - 1; i++) {
	const m = chunks[i].match(/\+\"([A-Za-z0-9+/=]+)\";/);
	if (!m) throw new Error("no match " + i);
	acc += m[1];
}
try {
	new Function(atob(acc));
	console.log("gadstudio decode ok, max chunk", Math.max(...chunks.map((x) => x.length)));
} catch (e) {
	console.error(e);
	process.exit(1);
}

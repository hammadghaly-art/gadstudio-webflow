import fs from "node:fs";

const siteIdEnv = process.env.GADSTUDIO_WEBFLOW_SITE_ID;
const site_id =
	siteIdEnv && /^[a-f0-9]{24}$/i.test(siteIdEnv)
		? siteIdEnv
		: "REPLACE_WITH_GADSTUDIO_SITE_ID";

const { chunks } = JSON.parse(
	fs.readFileSync(new URL("./cookiebanner-gadstudio-inline-chunks.json", import.meta.url), "utf8"),
);
const actions = chunks.map((sourceCode, idx) => ({
	add_inline_site_script: {
		site_id,
		request: {
			sourceCode,
			version: `14.${idx + 1}.0`,
			displayName: `GadstudioCK${String(idx + 1).padStart(2, "0")}`,
			location: "footer",
		},
	},
}));
const payload = {
	context:
		"Registering sequential footer inline scripts that assemble Gadstudio cookie banner v14 via shared base64 buffer for the Webflow site.",
	actions,
};
fs.writeFileSync(
	new URL("./mcp-scripts-payload-gadstudio.json", import.meta.url),
	JSON.stringify(payload),
	"utf8",
);
console.log(
	"site_id",
	site_id,
	"actions",
	actions.length,
	"bytes",
	Buffer.byteLength(JSON.stringify(payload), "utf8"),
);

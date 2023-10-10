const path = require("path");
const { execSync } = require("child_process");
const fetchModuleVersion = require("./fetch_module_version");
const outputDir = path.join(__dirname, "..", "dist");

for (const {name, entry} of [
	{
		name: "@akashic-extension/akashic-timeline",
		entry: "./node_modules/@akashic-extension/akashic-timeline/lib/index.js",
	},
	{
		name: "@akashic-extension/akashic-label",
		entry: "./node_modules/@akashic-extension/akashic-label/lib/index.js",
	},
	{
		name: "@akashic-extension/akashic-box2d",
		entry: "./node_modules/@akashic-extension/akashic-box2d/lib/index.js",
	},
]) {
	const ver = fetchModuleVersion(name);
	const pkgName = name.match(/[^/]+$/)[0]; // @akashic-extension/akashic-timeline -> akashic-timeline
	const output = path.join(outputDir, `${pkgName}-${ver}.js`); // /path/to/akashic-timeline-x.y.z.js
	execSync(`npx browserify ${entry} -o ${output} -r ${entry}:${name}`);
}

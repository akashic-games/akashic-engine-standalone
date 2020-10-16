const semver = require("semver");
const path = require("path");
const { execSync } = require("child_process");
const pkg = require("../package.json");
const extTimelineVer = semver.clean(pkg.devDependencies["@akashic-extension/akashic-timeline"]); // "~3.0.0" -> "3.0.0"
const extLabelVer = semver.clean(pkg.devDependencies["@akashic-extension/akashic-label"]);
const extBox2dVer = semver.clean(pkg.devDependencies["@akashic-extension/akashic-box2d"]);
const outputDir = path.join(__dirname, "..", "dist");

[
	{
		name: "@akashic-extension/akashic-timeline",
		entry: "./node_modules/@akashic-extension/akashic-timeline/lib/index.js",
		output: path.join(outputDir, `akashic-timeline-${extTimelineVer}.js`)
	},
	{
		name: "@akashic-extension/akashic-label",
		entry: "./node_modules/@akashic-extension/akashic-label/lib/index.js",
		output: path.join(outputDir, `akashic-label-${extLabelVer}.js`)
	},
	{
		name: "@akashic-extension/akashic-box2d",
		entry: "./node_modules/@akashic-extension/akashic-box2d/lib/index.js",
		output: path.join(outputDir, `akashic-box2d-${extBox2dVer}.js`)
	}
].forEach(({name, entry, output}) => {
	execSync(`npx browserify ${entry} -o ${output} -r ${entry}:${name}`);
});

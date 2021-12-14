const semver = require("semver");
const pkg = require("../package.json");
const aksVer = semver.clean(pkg.dependencies["@akashic/akashic-engine"]); // "~3.0.0" -> "3.0.0"
const extLabelVer = semver.clean(pkg.devDependencies["@akashic-extension/akashic-label"]);

module.exports = {
	title: "Akashic Game Sample (akashic-label)",
	canvasId: "canvas",
	canvasWidth: 640,
	canvasHeight: 480,
	akashicEngineFilename: `../akashic-engine-standalone-${aksVer}.js`,
	extFilename: `../akashic-label-${extLabelVer}.js`,
	mainFilename: "main.label.js"
};

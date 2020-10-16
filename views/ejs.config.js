const semver = require("semver");
const pkg = require("../package.json");
const aksVer = semver.clean(pkg.devDependencies["@akashic/akashic-engine"]); // "~3.0.0" -> "3.0.0"

module.exports = {
	title: "Akashic Game Sample",
	canvasId: "canvas",
	canvasWidth: 800,
	canvasHeight: 450,
	akashicEngineFilename: `akashic-engine-standalone-${aksVer}.js`,
	mainFilename: "main.js"
};

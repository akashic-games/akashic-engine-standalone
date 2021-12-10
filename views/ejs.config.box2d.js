const semver = require("semver");
const pkg = require("../package.json");
const aksVer = semver.clean(pkg.dependencies["@akashic/akashic-engine"]); // "~3.0.0" -> "3.0.0"
const extBox2dVer = semver.clean(pkg.devDependencies["@akashic-extension/akashic-box2d"]); // "~3.0.0" -> "3.0.0"

module.exports = {
	title: "Akashic Game Sample (akashic-box2d)",
	canvasId: "canvas",
	canvasWidth: 800,
	canvasHeight: 450,
	akashicEngineFilename: `../akashic-engine-standalone-${aksVer}.js`,
	extFilename: `../akashic-box2d-${extBox2dVer}.js`,
	mainFilename: "main.box2d.js"
};

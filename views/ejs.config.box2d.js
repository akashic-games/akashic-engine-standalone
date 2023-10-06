const fetchModuleVersion = require("../scripts/fetch_module_version");
const aksVer = fetchModuleVersion("@akashic/akashic-engine");
const extBox2dVer = fetchModuleVersion("@akashic-extension/akashic-box2d");

module.exports = {
	title: "Akashic Game Sample (akashic-box2d)",
	canvasId: "canvas",
	canvasWidth: 800,
	canvasHeight: 450,
	akashicEngineFilename: `../akashic-engine-standalone-${aksVer}.js`,
	extFilename: `../akashic-box2d-${extBox2dVer}.js`,
	mainFilename: "main.box2d.js"
};

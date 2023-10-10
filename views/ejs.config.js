const fetchModuleVersion = require("../scripts/fetch_module_version");
const aksVer = fetchModuleVersion("@akashic/akashic-engine");

module.exports = {
	title: "Akashic Game Sample",
	canvasId: "canvas",
	canvasWidth: 800,
	canvasHeight: 450,
	akashicEngineFilename: `akashic-engine-standalone-${aksVer}.js`,
	mainFilename: "main.js"
};

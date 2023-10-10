const fetchModuleVersion = require("../scripts/fetch_module_version");
const aksVer = fetchModuleVersion("@akashic/akashic-engine");
const extLabelVer = fetchModuleVersion("@akashic-extension/akashic-label");

module.exports = {
	title: "Akashic Game Sample (akashic-label)",
	canvasId: "canvas",
	canvasWidth: 640,
	canvasHeight: 480,
	akashicEngineFilename: `../akashic-engine-standalone-${aksVer}.js`,
	extFilename: `../akashic-label-${extLabelVer}.js`,
	mainFilename: "main.label.js"
};

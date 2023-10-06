const fetchModuleVersion = require("../scripts/fetch_module_version");
const aksVer = fetchModuleVersion("@akashic/akashic-engine");
const extTimelineVer = fetchModuleVersion("@akashic-extension/akashic-timeline");

module.exports = {
	title: "Akashic Game Sample (akashic-timeline)",
	canvasId: "canvas",
	canvasWidth: 800,
	canvasHeight: 450,
	akashicEngineFilename: `../akashic-engine-standalone-${aksVer}.js`,
	extFilename: `../akashic-timeline-${extTimelineVer}.js`,
	mainFilename: "main.timeline.js"
};

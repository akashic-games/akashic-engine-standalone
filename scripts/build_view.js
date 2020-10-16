const ejs = require("ejs");
const fs = require("fs-extra");
const path = require("path");

[
	{
		filename: "index.ejs",
		output: "index.html",
		config: "ejs.config.js",
	},
	{
		filename: "index.ext.ejs",
		output: "samples/index.timeline.html",
		config: "ejs.config.timeline.js"
	},
	{
		filename: "index.ext.ejs",
		output: "samples/index.label.html",
		config: "ejs.config.label.js"
	},
	{
		filename: "index.ext.ejs",
		output: "samples/index.box2d.html",
		config: "ejs.config.box2d.js"
	}
].forEach(({filename, config, output}) => {
	const template = fs.readFileSync(path.join(__dirname, "..", "views", filename), {encoding: "utf-8"});
	const conf = require((path.join(__dirname, "..", "views", config)));
	const html = ejs.render(template, conf);
	fs.writeFileSync(path.join(__dirname, "..", "dist", output), html);
});

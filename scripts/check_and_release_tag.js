const { execSync } = require("child_process");
const { Octokit } = require("@octokit/rest");
const fetchModuleVersion = require("./fetch_module_version");
const octokit = new Octokit();
const aksVer = fetchModuleVersion("@akashic/akashic-engine");
const owner = "akashic-games";
const repo = "akashic-engine-standalone";
const tag = `akashic-engine@${aksVer}`;

(async () => {
	// git tag が存在しないことを確認
	try {
		await octokit.git.getRef({
			owner,
			repo,
			ref: `tags/${tag}`
		});
		console.log(`tags/${tag} already exists`);
		process.exit();
	} catch (e) {
		if (e.status !== 404) {
			console.error(e);
			process.exit(1);
		}
	}

	try {
		// git tag を発行
		execSync(`git tag -a ${tag} -m ${tag}`);
		execSync(`git push origin ${tag}`);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
})();

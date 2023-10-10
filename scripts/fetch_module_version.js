const { execSync } = require("node:child_process");

/**
 * 指定のモジュールのインストール済みバージョンを文字列で返す。
 * @param {string} moduleName モジュール名
 * @returns {string} モジュールのバージョンを示す文字列
 */
module.exports = (moduleName) => {
	try {
		const stdout = execSync(`npm list ${moduleName} --json --depth 0`, { encoding: "utf-8" });
		return JSON.parse(stdout).dependencies[moduleName].version;
	} catch (error) {
		throw new Error(`could not fetch the module name: ${moduleName}.`)
	}
}

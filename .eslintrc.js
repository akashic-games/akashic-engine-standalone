module.exports = {
	"extends": [
		"@akashic/eslint-config",
		"prettier"
	],
	"parserOptions": {
		"project": "tsconfig.json",
		"sourceType": "module"
	},
	"rules": {
		// TODO: 原因不明。一旦無効に。
		"@typescript-eslint/no-unused-vars": "off",
		"no-undef": "off",
	}
};

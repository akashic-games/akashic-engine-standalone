const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const typescript = require("@rollup/plugin-typescript");
const semver = require("semver");

const pkg = require("./package.json");
const aksVer = semver.clean(pkg.dependencies["@akashic/akashic-engine"]); // "~3.0.0" -> "3.0.0"
const name = `akashic-engine-standalone-${aksVer}`;
const banner = `/*! akashic-engine-standalone@${pkg.version} */`;

module.exports = {
  input: "src/main.ts",
  output: [
    {
      file: `dist/${name}.js`,
      format: "umd",
      name: "AE",
      banner,
      plugins: []
    },
    {
      file: `dist/${name}.min.js`,
      format: "umd",
      name: "AE",
      banner,
      plugins: [
        terser({
          format: {
            comments: "some"
          }
        })
      ]
    }
  ],
  plugins: [
    typescript({
      declaration: false,
    }),
    commonjs({
      extensions: [".js", ".ts"]
    }),
    nodeResolve()
  ]
};

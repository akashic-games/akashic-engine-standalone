const path = require("path");
const semver = require("semver");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const pkg = require("./package.json");
const aksVer = semver.clean(pkg.dependencies["@akashic/akashic-engine"]); // "~3.0.0" -> "3.0.0"

module.exports = {
  entry: {
    [`akashic-engine-standalone-${aksVer}`]: "./src/main.ts"
  },
  output: {
    path: path.join(__dirname, "dist"),
    library: "AE"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `v${pkg.version}`
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  }
};

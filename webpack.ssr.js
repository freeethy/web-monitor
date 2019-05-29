const path = require("path");
const webpack = require("webpack");
const Merge = require("webpack-merge");

const CommonConfig = require("./webpack.common.js");

module.exports = Merge(CommonConfig, {
  mode: "production",
  output: {
    filename: "index.js",
    libraryTarget: "umd",
    globalObject: "this"
  }
});

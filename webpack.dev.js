const path = require("path");
const webpack = require("webpack");
const Merge = require("webpack-merge");

const CommonConfig = require("./webpack.common.js");

module.exports = Merge(CommonConfig, {
  mode: "development",
  plugins: [
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // 指定静态文件的路径
    contentBase: path.join(__dirname, "build"),
    // 通过setup方法，可以获得app对象,从而扩展devServer或添加中间件
    setup(app) {},
    allowedHosts: [
      // 白名单
      ".icsoc.net",
      "*"
      // '.host.com',//可以匹配所有xx.host.com
      // 'subdomain.host.com',
    ],
    compress: true, // 开启gzip
    port: 3003,
    // proxy: {
    //   "/v1": {
    //     target: apiUrl,
    //     changeOrigin: true
    //   }
    // },
    // 当单页模式采用HTML5 History API 时  http://192.168.96.82:8888
    // 开启此选项,任意的 404 响应都可能需要被替代为index.html,可以通过rewrites进一步详细指定
    historyApiFallback: true
  }
});

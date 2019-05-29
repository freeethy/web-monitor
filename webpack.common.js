const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Ensure environment variables are read.
const getClientEnvironment = require("./config/env");
const env = getClientEnvironment();

const isEnvDevelopment = process.env.NODE_ENV === "dev";
const isEnvProduction = process.env.NODE_ENV === "prod";
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

// 打包配置
var packConfig = {
  mode: "production",
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? "source-map"
      : false
    : isEnvDevelopment && "cheap-module-source-map",
  entry: {
    index: "./src/index.js"
  },
  output: {
    // webpack 会在输出文件中生成路径信息。然而在打包数千个模块的项目中，会导致造成垃圾回收性能压力。
    // 在 options.output.pathinfo 设置中关闭
    pathinfo: isEnvDevelopment,
    // 开发模式下devserver有开启热替换，不能使用chunkhash
    filename: isEnvProduction
      ? "[name].[hash:8].bundle.js"
      : "[name].bundle.js",
    chunkFilename: isEnvProduction
      ? "[name].[hash:8].chunk.js"
      : "[name].chunk.js",
    // <!-- 打包后的文件路径 -->
    path: path.resolve(__dirname, "build"),
    // <!-- 资源文件 -->
    publicPath: "/"
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      // js文件解析
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: ["last 2 versions", "Firefox ESR"]
                    },
                    useBuiltIns: "usage"
                  }
                ],
                "@babel/preset-react"
              ],
              plugins: [
                // 可以让你依然使用import { Button } from 'antd'的模式引入组件，
                // 该插件会自动转换为import Button from 'antd/lib/button';/import 'antd/lib/button/style';
                // `style: true` 会加载 less 文件
                [
                  "import",
                  { libraryName: "antd", libraryDirectory: "es", style: true },
                  "antd"
                ],
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import"
              ]
            }
          }
        ]
      },
      // 样式文件解析
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isEnvDevelopment
            }
          },
          "css-loader"
        ],
        exclude: /(node_modules(?! \/antd) && node_modules(?! \/icsoc-rc))/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isEnvDevelopment
            }
          },
          "css-loader",
          "less-loader"
        ],
        exclude: /(node_modules(?! \/antd) && node_modules(?! \/icsoc-rc))/
      },
      // 图片文件解析
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   loader: "url-loader?limit=10000&name=images/[name].[hash].[ext]",
      //   exclude: /node_modules/
      // },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "images/[name].[hash:8].[ext]"
            }
          }
        ],
        // use: ["url-loader?limit=10000&name=img/[name].[hash:8].[ext]"],
        exclude: /(node_modules)/
      },
      // 字体文件解析
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ["file-loader?name=css/[name].[hash:8]"],
        exclude: /(node_modules)/
        // 需要读取antdex中的字体图标
      },
      // 读取html，是html中引用的静态资源能被webpack加载到
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader"
        },
        exclude: /(node_modules)/
      }
    ]
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  // 此选项控制是否生成，以及如何生成 source map。
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(env.stringified),
    //复制指定文件
    new CopyWebpackPlugin([
      // {
      //   from: "./src/static/images",
      //   to: "./images"
      // }
      // icsoc_chat_lib中使用的css，必须的
      // {
      //   from: "./src/css/user-button.css",
      //   to: "./css/user-button.css"
      // }
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isEnvProduction ? "[name].[hash:8].css" : "[name].css",
      chunkFilename: isEnvProduction
        ? "[name].[hash:8].chunk.css"
        : "[name].chunk.css"
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          // 生成出来的html文件名
          filename: "index.html",
          // 每个html的模版，这里多个页面使用同一个模版
          template: "src/index.html",
          // 自动将引用插入html
          inject: true
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
          : undefined
      )
    )
  ]
};

module.exports = packConfig;

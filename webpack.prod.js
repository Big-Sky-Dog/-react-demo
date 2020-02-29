const merge = require("webpack-merge");
const common = require("./webpack.common");
const theme = require("./package.json").theme; // 自定义主题变量
const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); // 压缩js文件
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清除dist文件夹在每次打包时
const autoprefixer = require("autoprefixer");
var ImageminPlugin = require("imagemin-webpack-plugin").default;

const config = merge(common, {
  devtool: false,
  mode: "production", // 生产环境
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-class-properties", // es6 class定义转换
                "@babel/plugin-syntax-dynamic-import",
                ["import", { libraryName: "antd", style: true }] // `style: true` 会加载 less 文件
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          require.resolve("style-loader"),
          require.resolve("css-loader"),
          {
            loader: require.resolve("postcss-loader"),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: ["> 0.01%"]
                })
              ]
            }
          },
          {
            loader: require.resolve("less-loader"),
            options: {
              // theme vars, also can use theme.js instead of this.
              modifyVars: theme,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        use: ["file-loader?limit=8192&name=images/[hash:8].[name].[ext]"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["./dist"]),
    new UglifyJSPlugin(),
    new ImageminPlugin({
      disable: process.env.NODE_ENV == "production",
      pngquant: {
        quality: "90"
      }
    })
  ]
});

module.exports = config;

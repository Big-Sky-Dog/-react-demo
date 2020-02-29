const merge = require("webpack-merge"); // 合并webpack的配置
const common = require("./webpack.common");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer"); // 自动填充css前缀
const theme = require("./package.json").theme; // 自定义主题变量
const OpenBrowserPlugin = require("open-browser-webpack-plugin"); //编译完成后自动打开浏览器

const config = merge(common, {
	devtool: "inline-source-map",
	mode: "development", // 开发环境
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		proxy: {
			"/myApi": {
				//过滤请求头为api的接口 进行反向代理
				target: "http://ip.taobao.com", //匹配到相应的接口后添加请求路径
				changeOrigin: true,
				pathRewrite: { "^/myApi": "" } //将过滤字符串替换为空
			}
		}
	},
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
				use: ["file-loader"]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // 热加载
		new OpenBrowserPlugin() // 加载完成自动打开浏览器
	]
});

module.exports = config;

const path = require('path');
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  // 入口文件  babel-polyfill 转化浏览器不支持的es6的语法
  entry: ['babel-polyfill', './src/index.js'],
  // 输出文件
  output: {
    filename: 'bundle-[hash].js',
    path: path.join(__dirname, 'dist')
  },
  //自动解析后缀文件
  resolve: {
    extensions: [
      '.web.js',
      '.mjs',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
      '.less',
      '.css'
    ],
    // 文件夹别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      template: path.resolve(__dirname, './src/template'),
      $http: path.resolve(__dirname, './src/public/axios'),
      components: path.resolve(__dirname, './src/components'),
      style: path.resolve(__dirname, './src/style'),
      images: path.resolve(__dirname, './src/images')
    }
  },


  plugins: [
    // 根html文件
    new HtmlWebpackPlugin({
      title: '',
      template: './public/index.html'
    }),
    // 配置全局变量
    new webpack.ProvidePlugin({
      Global: "Global"
    })
  ]
}

module.exports = config;
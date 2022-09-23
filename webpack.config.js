var webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.join(srcPath, "app.js"),
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  output: {
    path: buildPath,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js?$/,
        use: "babel-loader",
      },
    ],
  },
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    hot: true,
  },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  module: require("./webpack-config/module.config.js"),
  resolve: require("./webpack-config/resolve.config.js"),
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
  devtool: "eval-source-map",
  devServer: {
    port: 3000,
    static: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
  },
};

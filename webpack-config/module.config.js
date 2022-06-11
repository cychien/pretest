const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  rules: [
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    },
  ],
};

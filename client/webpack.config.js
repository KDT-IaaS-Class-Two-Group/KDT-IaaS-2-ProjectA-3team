const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // 또는 프로젝트의 진입 파일 경로
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development", // 또는 'production'
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
  },
};

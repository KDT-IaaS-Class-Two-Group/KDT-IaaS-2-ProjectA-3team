const path = require('path');

module.exports = {
  entry: "./dist/index.js",
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js"
  },
  resolve: {
    alias: {
      '@validate': path.resolve(__dirname, 'dist/model/auth/validate/'),
      '@request': path.resolve(__dirname, 'dist/model/auth/request')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
}
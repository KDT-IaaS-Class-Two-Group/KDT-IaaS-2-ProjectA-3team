const path = require('path');
const glob = require('glob');

module.exports = {
  entry: glob.sync('./src/notice/**/**/*.ts').reduce((all, filePath) => {
    const entryName = path.relative('src', filePath).replace('.ts', ''); 
    all[entryName] = path.resolve(__dirname, filePath);
    return all;
  }, {}),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `[name].bundle.js`,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: 'node', // Node.js 환경을 위한 설정
  node: {
    __dirname: false, // Node.js의 __dirname을 사용하도록 설정
    __filename: false 
  },
  externals: {
    kerberos: 'commonjs kerberos',
    timers: 'commonjs timers',
    '@mongodb-js/zstd': 'commonjs @mongodb-js/zstd',
    '@aws-sdk/credential-providers': 'commonjs @aws-sdk/credential-providers',
    'gcp-metadata': 'commonjs gcp-metadata',
    snappy: 'commonjs snappy',
    aws4: 'commonjs aws4',
    'mongodb-client-encryption': 'commonjs mongodb-client-encryption',
  },
};

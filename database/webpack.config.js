const path = require('path');
const glob = require('glob');
module.exports={
  entry: glob.sync('./src/notice/**/*.ts').reduce((all, filePath) => {
    const entryName = filePath.replace('./src/', '').replace('.ts', '');
    all[entryName] = filePath;
    return all;
  }, {}),
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:`[name].bundle.js`
  },
  module:{
    rules:[
      {
        test:/\.ts$/,
        use:"ts-loader",
        exclude:/node_modules/
      }
    ],
  },
  resolve:{
    extensions: [".ts",".js"]
  }
}

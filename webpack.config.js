const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./js/app.js",
    output: {  
      path: path.join(__dirname, "./js/"), 
      filename : 'out.js' 
    },
    watch: true,
    module: {
        rules : [{
            test: /\.js$/,  exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [["@babel/preset-env", {
                targets: {
                  browsers: ['> 1%']
                }
              }]]
            }
        }]
    }
};
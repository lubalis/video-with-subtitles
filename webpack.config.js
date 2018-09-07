const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./js/ui.js",
    output: {  
      path: path.join(__dirname, "./js/"), 
      filename : 'out.js' 
    },
    watch: true,
    module: {
        rules : [{
            test: /\.jsx$/,  exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [["env", {
                targets: {
                  browsers: ['> 1%']
                }
              }]]
            }
        }]
    }
};
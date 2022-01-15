const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");


module.exports = {
    entry: "./src/main.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    experiments: {
        topLevelAwait: true,
      },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                // Embed your WGSL files as strings
                test: /\.wgsl$/i,
                type: "asset/source",
            },
            {
                test: /\.(png|svg|jpg|gif|pdf)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]'
                    }
                  }
                ]
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./labeler.html",
    })],
};
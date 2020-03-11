const path = require('path');
const webpack = require('webpack');

let plugins = []
plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new webpack.NamedModulesPlugin());

module.exports = {
    entry: './index.js',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                exclude: /(node_modules)/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    output: {
        path: path.resolve(__dirname),
        filename: './dist/bundle.js'
    }
};
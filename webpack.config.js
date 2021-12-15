const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'MatrixCurtain',
        libraryExport: 'default'
    },
    optimization: {
        minimize: false
    },
    devtool: "eval-cheap-module-source-map",
    plugins: [new webpack.SourceMapDevToolPlugin({})],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}
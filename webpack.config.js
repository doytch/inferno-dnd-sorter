const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

let config = {
    entry: {
        lib: './src/lib.js',
        example: './example/example.js',
    },
    output: {
        path: path.join(__dirname, 'out'),
        filename: '[name].js',
        library: 'InfernoDnDSorter',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.(js|jsx)?$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }],
        }, {
            test: /\.html$/,
            loader: 'file-loader',
        }],
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules',
        ],
        extensions: ['.js', '.jsx'],
    },
    externals: {
        inferno: 'inferno',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'example/index.html'),
            to: path.join(__dirname, 'out/index.html'),
        }])
    ],
    devServer: {
        port: 30000,
        inline: true,
        host: '0.0.0.0',
        historyApiFallback: true,
    },
};

if (process.argv.indexOf('-p') === -1) {
    config = Object.assign({
        devtool: 'source-map',
    }, config);

    config.externals = undefined;
}

module.exports = config;

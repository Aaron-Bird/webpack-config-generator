const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
    mode: 'production',
    entry: {
        babelPolyfill: '@babel/polyfill',
        webpackDevServer: 'webpack-dev-server/client?http://127.0.0.1:8080',
        main: './src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'none',
    devServer: {
        contentBase: './dist',
        watchContentBase: true,
        port: 8000,
        host: '0.0.0.0',
        open: true,
        public: '127.0.0.1:8000',
        hot: true
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    "presets": [
                        [
                            "@babel/preset-env",
                            {
                                "useBuiltIns": "usage"
                            }
                        ]
                    ]
                }
            }
        }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new FilterWarningsPlugin({
            exclude: /Critical dependency: the request of a dependency is an expression/,
        }),
    ],
};
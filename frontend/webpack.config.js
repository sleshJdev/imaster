var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: './dist',
        filename: 'assets/app.bundle.js'
    },
    module: {
        exprContextCritical: false,
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
            }, {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8899',
                pathRewrite: {'^/api': ''},
                secure: false,
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return './dist/index.html';
                    }
                },
                changeOrigin: true
            }
        }
    },
    devtool: "sourcemap",
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/favicon.ico'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts']
    }
};
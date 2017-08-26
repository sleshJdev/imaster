const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (params) {
    var sourceMap = (params.ienv === 'dev' ? '&sourceMap' : '');
    var lessExtractor = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'to-string-loader'
        }, {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        }, {
            loader: 'postcss-loader',
            options: {
                sourceMap: true
            }
        }, {
            loader: 'less-loader',
            options: {
                sourceMap: true
            }
        }]
    });
    return {
        context: __dirname + '/src',
        entry: {
            bundle: './main'
        },
        output: {
            path: __dirname + '/build',
            publicPath: params.publicPath,
            filename: 'scripts/[name].js'
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.ts', '.js']
        },
        resolveLoader: {
            modules: ['node_modules'],
            extensions: ['.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [{
                        loader: 'awesome-typescript-loader'
                    }, {
                        loader: 'angular2-template-loader'
                    }]
                }, {
                    test: /\.html$/,
                    exclude: /assets\//,
                    use: [{
                        loader: 'raw-loader'
                    }]
                }, {
                    test: /\.less$/,
                    exclude: /assets\//,
                    use: lessExtractor
                }, {
                    test: /\.less$/,
                    include: /assets\/stylesheets\//,
                    use: lessExtractor
                }, {
                    test: /\.*$/,
                    include: /(assets\/icons\/|assets\/images\/)/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[1].[ext]',
                            regExp: /assets\/(.*)/
                        }
                    }]
                }
            ]
        },

        plugins: [
            new ExtractTextPlugin('styles/style.css', {allChunks: true}),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity
            }),
            new HtmlWebpackPlugin({
                favicon: './favicon.ico',
                template: './index.html'
            })
        ]
    };
};
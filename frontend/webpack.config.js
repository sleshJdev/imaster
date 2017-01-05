var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (params) {
    var q = (params.ienv === 'dev' ? '&sourceMap' : '');
    return {
        context: __dirname + '/src'
        , entry: {
            main: './main'
        }
        , output: {
            path: __dirname + '/build'
            , publicPath: params.publicPath
            , filename: 'scripts/[name].js'
        }

        , resolve: {
            modulesDirectories: ['node_modules'],
            extensions: ['', '.js', '.ts']
        }

        , resolveLoader: {
            modulesDirectories: ['node_modules'],
            moduleTemplates: ['*-loader', '*'],
            extensions: ['', '.js']
        }

        , module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'awesome-typescript!angular2-template'
                }
                , {
                    test: /\.html$/,
                    exclude: /assets\//,
                    loader: 'raw'
                }
                , {
                    test: /\.less$/,
                    exclude: /assets\//,
                    loader: 'raw!postcss!less?relativeUrls' + q
                }
                , {
                    test: /\.less$/,
                    include: /assets\/stylesheets\//,
                    loader: ExtractTextPlugin.extract('style',
                        'css?importLoaders=1' + q + '!postcss!less?relativeUrls' + q)
                }
                , {
                    test: /\.*$/,
                    include: /assets\/images\//,
                    loader: 'file?name=[1].[ext]&regExp=assets/(.*)'
                }
                , {
                    test: /\.*$/,
                    include: /assets\/icons\//,
                    loader: 'file?name[1].[ext]&regExp=assets/(.*)'
                }
            ]
        }

        , plugins: [
            new ExtractTextPlugin('styles/style.css', {allChunks: true})
            , new webpack.NoErrorsPlugin()
            , new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity
            })
            , new HtmlWebpackPlugin({
                favicon: './favicon.ico',
                template: './index.html'
            })
        ]
    };
};
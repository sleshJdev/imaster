var webpackProdConfig = require('./webpack.config')({
    ienv: 'prod',
    publicPath: './assets'
});
var webpack = require('webpack');

webpackProdConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    })
);

module.exports = webpackProdConfig;
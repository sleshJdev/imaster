const webpack = require('webpack');

const baseConfig = require('./webpack.config')({
    ienv: 'dev',
    publicPath: '/'
});

baseConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
        debug: true
    })
);

var webpackDevConfig = Object.assign(baseConfig, {
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        aggregationTimeout: 500
    },
    devServer: {
        port: 8999,
        contentBase: baseConfig.context,
        proxy: {
            '/api': {
                target: {
                    protocol: 'http',
                    host: 'localhost',
                    port: 9000
                },
                secure: false,
                changeOrigin: true
            }
        }
    }
});

module.exports = webpackDevConfig;
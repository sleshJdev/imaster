var baseConfig = require('./webpack.config')({
    ienv: 'dev',
    publicPath: '/'
});

var webpackDevConfig = Object.assign(baseConfig, {
    debug: true
    , devtool: 'source-map'
    , watch: true
    , watchOptions: {
        aggregationTimeout: 500
    }
    , devServer: {
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
var path = require('path');

var conf = {
    module: 'imaster',
    src: './src',
    temp: './.tmp',
    dest: './dest'
};

conf.app = path.join(conf.src, '/app');
conf.favicon = path.join(conf.src, 'favicon.ico');

conf.assets = path.join(conf.src, '/assets');
conf.dependencies = path.join(conf.src, '/bower_components');

conf.index = [
    path.join(conf.src, 'index.html'),
    path.join(conf.src, 'favicon.ico'),
    path.join(conf.assets, '/**/*.png'),
    path.join(conf.assets, '/**/*.gif')
];
conf.css = [path.join(conf.assets, 'stylesheets/**/*.scss'), path.join(conf.app, '**/*.scss')];
conf.html = path.join(path.join(conf.app, '**/*.html'));
conf.js = path.join(conf.app, '**/*.js');

module.exports = conf;